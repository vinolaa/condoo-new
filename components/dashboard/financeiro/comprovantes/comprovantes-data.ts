import type { Comprovante } from "@/app/dashboard/financeiro/comprovantes/page"

export const comprovantesMock: Comprovante[] = [
    {
        id: 1,
        descricao: "Pagamento de energia elétrica",
        tipo: "comprovante",
        valor: 350.00,
        data: "2025-04-01",
        categoria: "Contas",
        morador: "Morador A",
        arquivo: "/comprovantes/energia-elétrica.pdf"
    },
    {
        id: 2,
        descricao: "Nota Fiscal de manutenção do elevador",
        tipo: "nota fiscal",
        valor: 500.00,
        data: "2025-04-05",
        categoria: "Manutenção",
        morador: "Morador B",
        arquivo: "/comprovantes/manutencao-elevador.pdf"
    },
    {
        id: 3,
        descricao: "Pagamento de limpeza do prédio",
        tipo: "comprovante",
        valor: 200.00,
        data: "2025-04-10",
        categoria: "Serviços",
        morador: "Morador C",
        arquivo: "/comprovantes/limpeza-predio.pdf"
    },
    {
        id: 4,
        descricao: "Nota Fiscal de seguro do prédio",
        tipo: "nota fiscal",
        valor: 1500.00,
        data: "2025-04-12",
        categoria: "Seguro",
        morador: "Morador D",
        arquivo: "/comprovantes/seguro-predio.pdf"
    },
    {
        id: 5,
        descricao: "Pagamento de salário do zelador",
        tipo: "comprovante",
        valor: 2500.00,
        data: "2025-04-15",
        categoria: "Salários",
        morador: "Morador E",
        arquivo: "/comprovantes/salario-zelador.pdf"
    }
]
