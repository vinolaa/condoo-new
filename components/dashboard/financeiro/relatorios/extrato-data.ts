export type Extrato = {
    id: number
    descricao: string
    tipo: "entrada" | "saida"
    valor: number
    data: string
    categoria: string
    morador: string
}

export const extratosMock: Extrato[] = [
    ...Array.from({ length: 250 }, (_, i) => ({
        id: i + 1,
        descricao: `Pagamento de taxa condominial - Morador ${String.fromCharCode(65 + (i % 10))}`,
        tipo: "entrada" as const,
        valor: parseFloat((Math.random() * (1000 - 300) + 300).toFixed(2)),
        data: `2025-${String(i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3).padStart(2, "0")}-${(i % 28 + 1).toString().padStart(2, "0")}`,
        categoria: "Taxa Condominial",
        morador: `Morador ${String.fromCharCode(65 + (i % 10))}`,
    })),

    ...Array.from({ length: 250 }, (_, i) => ({
        id: i + 251,
        descricao: [
            "Manutenção do portão",
            "Conta de água",
            "Serviço de jardinagem",
            "Salário do síndico",
            "Seguro contra incêndio",
        ][i % 5],
        tipo: "saida" as const,
        valor: parseFloat((Math.random() * (2000 - 200) + 200).toFixed(2)),
        data: `2025-${String(i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3).padStart(2, "0")}-${(i % 28 + 1).toString().padStart(2, "0")}`,
        categoria: [
            "Manutenção",
            "Contas",
            "Serviços",
            "Salários",
            "Seguro",
        ][i % 5],
        morador: `Morador ${String.fromCharCode(65 + (i % 10))}`,
    })),
]
