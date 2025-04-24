"use client"

import { Home, Building2, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { useState } from "react"

const links = [
    { href: "/dashboardMorador", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/dashboardMorador/ambientes", label: "Reservar Ambiente", icon: <Building2 size={18} /> },
]

export function SidebarMorador() {
    const pathname = usePathname()

    return (
        <aside className="w-60 border-r h-screen flex flex-col justify-between p-4 bg-white dark:bg-zinc-950">
            <div>
                <div className="text-lg font-bold mb-6">Painel do Morador</div>
                <nav className="space-y-1">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all",
                                pathname === link.href && "bg-muted font-medium"
                            )}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    )
}
