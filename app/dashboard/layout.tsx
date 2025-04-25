
import { Sidebar } from "@/components/dashboard/Sidebar"
import React from "react";
import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function DashboardLayout({children}: { children: React.ReactNode }) {
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    // Busca o cargo do usuário na tabela `usuarios`
    const { data: usuario, error } = await supabase
        .from("usuarios")
        .select("cargo")
        .eq("id", user.id)
        .single();

    if (usuario?.cargo === "morador") {
        redirect("/dashboardMorador");
    }

    // Se der erro ou não for síndico, redireciona pra home ou outra rota apropriada
    if (error || usuario?.cargo !== "sindico") {
        redirect("/");
    }


    return (
        <div className="flex">
            <Sidebar/>
            <main className="flex-1 h-screen overflow-y-auto p-6 bg-muted/40">
                {children}
            </main>
        </div>
    )
}
