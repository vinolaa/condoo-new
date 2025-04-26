import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import EntrarCondominioModal from "@/components/preview/EntrarCondominioModal";

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
        .select("id, cargo, nome, email, condominio_id")
        .eq("id", user.id)
        .single();

    if (error || !usuario) {
        return <div className="p-4">Erro ao buscar dados do usuário.</div>;
    }

    if (usuario.cargo === "sindico" && usuario.condominio_id !== null) {
        redirect("/dashboard");
    }

    if (usuario.cargo === "morador" && usuario.condominio_id !== null) {
        redirect("/dashboardMorador");
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-2xl space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Como deseja começar?</h1>
                    <p className="text-muted-foreground">
                        Este sistema é 100% gratuito. Escolha se deseja entrar em um condomínio já existente ou criar o seu próprio como síndico.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>Entrar em um condomínio</CardTitle>
                            <CardDescription>Já existe um condomínio criado? Solicite acesso.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EntrarCondominioModal usuarioId={usuario.id} />
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle>Criar um condomínio</CardTitle>
                            <CardDescription>Deseja ser síndico e iniciar a gestão do seu prédio?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action="/preview/criar-condominio">
                                <Button className="w-full" type="submit">Criar</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
