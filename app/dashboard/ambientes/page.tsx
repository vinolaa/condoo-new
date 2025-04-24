import { createClient } from "@/utils/supabase/server";
import { Ambiente } from "@/app/types/ambiente";
import { AmbientesClient } from "@/components/dashboard/ambientes/AmbientesClient";
import { redirect } from "next/navigation";

export default async function AmbientesPage() {
    const supabase = await createClient();

    // Obter o usuário logado
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        // Se o usuário não estiver logado, redirecionar para a página de login
        redirect("/sign-in");
    }

    // Buscar o condominio_id do usuário logado
    const { data: usuarioData, error: userError } = await supabase
        .from("usuarios")
        .select("condominio_id")
        .eq("id", user.id)
        .single();

    if (userError || !usuarioData) {
        console.error("Erro ao buscar dados do usuário:", userError?.message);
        return <div>Erro ao carregar dados do usuário.</div>;
    }

    const { condominio_id } = usuarioData;

    // Buscar ambientes que pertencem ao mesmo condomínio do usuário síndico
    const { data, error } = await supabase
        .from("ambientes")
        .select("*")
        .eq("condominio_id", condominio_id);

    if (error) {
        console.error("Erro ao buscar ambientes:", error.message);
        return <div>Erro ao carregar os ambientes.</div>;
    }

    // Mapear os dados dos ambientes para o tipo Ambiente
    const ambientes: Ambiente[] = data?.map((item) => ({
        id: item.id,
        nome: item.nome,
        valorPorDia: item.valor_por_dia,
        condominio_id: item.condominio_id
    })) || [];

    return <AmbientesClient ambientes={ambientes} />;
}
