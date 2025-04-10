// components/dashboard/Sidebar.tsx
"use client"

import { Home, Building2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const links = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/dashboard/ambientes", label: "Ambientes", icon: <Building2 size={18} /> },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-60 border-r h-screen p-4 bg-white dark:bg-zinc-950">
            <div className="text-lg font-bold mb-6">Painel do Síndico</div>
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
        </aside>
    )
}
