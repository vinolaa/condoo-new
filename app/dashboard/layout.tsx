
import { Sidebar } from "@/components/dashboard/Sidebar"
import React from "react";
import { createClient } from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function DashboardLayout({children}: { children: React.ReactNode }) {
    const supabase = await createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();

    // 🔐 Se não estiver logado, redireciona para login
    if (!user) {
        redirect("/sign-in");
    }

    return (
        <div className="flex">
            <Sidebar/>
            <main className="flex-1 p-6 bg-muted/40 min-h-screen">
                {children}
            </main>
        </div>
    )
}
