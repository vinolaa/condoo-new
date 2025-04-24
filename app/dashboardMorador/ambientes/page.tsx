
import { createClient } from "@/utils/supabase/server";
import { ReservaClient } from "@/components/dashboardMorador/ReservaClient";
import { redirect } from "next/navigation";

export default async function ReservasPage() {
    const supabase = await createClient();

    // Buscar o usuário logado
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/sign-in"); // Redirecionar se não estiver logado

    // Buscar as informações do usuário logado
    const { data: usuario, error } = await supabase
        .from("usuarios")
        .select("cargo")
        .eq("id", user.id)
        .single();

    if (error || usuario?.cargo !== "morador") {
        redirect("/"); // Redirecionar se o usuário não for morador
    }

    // Buscar os ambientes disponíveis para reserva
    const { data: ambientes, error: ambientesError } = await supabase
        .from("ambientes")
        .select("id, nome, valor_por_dia, condominio_id");

    if (ambientesError) {
        return <div>Erro ao carregar os ambientes.</div>;
    }

    return (
        <ReservaClient
            ambientes={ambientes || []}
            usuarioId={user.id}
        />
    );
}
