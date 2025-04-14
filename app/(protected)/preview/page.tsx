import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function PreviewPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    const { data: usuario, error } = await supabase
        .from("usuarios")
        .select("cargo, nome, email")
        .eq("id", user.id)
        .single();

    if (error || !usuario) {
        return <div className="p-4">Erro ao buscar dados do usuário.</div>;
    }

    if (usuario.cargo === "sindico") {
        // Redireciona se já tiver cargo atribuído
        redirect("/dashboard");
    }

    return (
        <div className="p-8 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Bem-vindo, {usuario.nome}</h1>

            <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Cargo atual:</strong> {usuario.cargo}</p>
            </div>

            <form action="/planos-sindico">
                <Button type="submit">Ver planos síndico</Button>
            </form>
        </div>
    );
}
