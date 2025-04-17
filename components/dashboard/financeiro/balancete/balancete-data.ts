import type { Lancamento } from "@/app/dashboard/financeiro/balancete/page"

export const lancamentosMock: Lancamento[] = [
    ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        descricao: `Pagamento de taxa condominial - Morador ${String.fromCharCode(65 + (i % 5))}`,
        tipo: "entrada" as const,
        valor: parseFloat((Math.random() * (1000 - 300) + 300).toFixed(2)),
        data: `2025-${String(i % 3 === 0 ? 3 : (i % 3 === 1 ? 4 : 5)).padStart(2, "0")}-${(i % 30 + 1).toString().padStart(2, "0")}`,
        categoria: "Taxa Condominial",
        morador: `Morador ${String.fromCharCode(65 + (i % 5))}`,
    })),

    ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 51,
        descricao: [
            "Manutenção do elevador",
            "Pagamento de energia elétrica",
            "Pagamento de limpeza do prédio",
            "Salário do zelador",
            "Pagamento de seguro do prédio",
        ][i % 5],
        tipo: "saida" as const,
        valor: parseFloat((Math.random() * (1500 - 100) + 100).toFixed(2)),
        data: `2025-${String(i % 3 === 0 ? 3 : (i % 3 === 1 ? 4 : 5)).padStart(2, "0")}-${(i % 30 + 1).toString().padStart(2, "0")}`,
        categoria: [
            "Manutenção",
            "Contas",
            "Serviços",
            "Salários",
            "Seguro",
        ][i % 5],
        morador: `Morador ${String.fromCharCode(65 + (i % 5))}`,
    }))
]
