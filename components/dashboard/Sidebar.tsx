"use client"

import { Home, Building2, ChevronDown, ChevronRight, Banknote } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { useState } from "react"

const links = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/dashboard/ambientes", label: "Ambientes", icon: <Building2 size={18} /> },
]

const financeiroLinks = [
    { href: "/dashboard/financeiro/lancamentos", label: "Lançamentos" },
    { href: "/dashboard/financeiro/balancete", label: "Balancete Mensal" },
    { href: "/dashboard/financeiro/extrato", label: "Extrato por Morador" },
    { href: "/dashboard/financeiro/comprovantes", label: "Comprovantes e NF" },
    { href: "/dashboard/financeiro/relatorios", label: "Relatórios e Exportação" },
]

export function Sidebar() {
    const pathname = usePathname()
    const [financeiroOpen, setFinanceiroOpen] = useState(
        pathname?.startsWith("/dashboard/financeiro")
    )

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

                <button
                    onClick={() => setFinanceiroOpen(prev => !prev)}
                    className={clsx(
                        "flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-muted transition-all",
                        pathname?.startsWith("/dashboard/financeiro") && "bg-muted font-medium"
                    )}
                >
          <span className="flex items-center gap-2">
            <Banknote size={18} />
            Financeiro
          </span>
                    {financeiroOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {financeiroOpen && (
                    <div className="ml-6 space-y-1">
                        {financeiroLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "block text-sm px-3 py-1 rounded hover:bg-muted",
                                    pathname === link.href && "bg-muted font-semibold"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </aside>
    )
}
