// app/dashboard/layout.tsx
import { Sidebar } from "@/components/dashboard/Sidebar"
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-muted/40 min-h-screen">
                {children}
            </main>
        </div>
    )
}
