
import { SidebarMorador } from "@/components/dashboard/SideBarMorador"
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

    if (usuario?.cargo === "sindico") {
        redirect("/dashboard");
    }

    // Se der erro ou não for síndico, redireciona pra home ou outra rota apropriada
    if (error || usuario?.cargo !== "morador") {
        redirect("/");
    }


    return (
        <div className="flex">
            <SidebarMorador/>
            <main className="flex-1 p-6 bg-muted/40 min-h-screen">
                {children}
            </main>
        </div>
    )
}
