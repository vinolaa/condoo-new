import { Lancamento } from "@/app/types/lancamento"

export const lancamentosMock: Lancamento[] = [
    {
        id: "1",
        tipo: "entrada",
        data: "2025-03-01",
        valor: 4500,
        descricao: "Pagamentos de condomínio - Março/2025",
        morador: "Todos",
        comprovanteUrl: "",
    },
    {
        id: "2",
        tipo: "saida",
        data: "2025-03-03",
        valor: 780,
        descricao: "Conta de energia elétrica - Março/2025",
        morador: null,
        comprovanteUrl: "",
    },
    {
        id: "3",
        tipo: "saida",
        data: "2025-03-05",
        valor: 320,
        descricao: "Serviço de limpeza - Março/2025",
        morador: null,
        comprovanteUrl: "",
    },
    {
        id: "4",
        tipo: "entrada",
        data: "2025-03-10",
        valor: 300,
        descricao: "Pagamento de taxa extra - Apto 302",
        morador: "Apto 302",
        comprovanteUrl: "",
    },
    {
        id: "5",
        tipo: "saida",
        data: "2025-03-12",
        valor: 1500,
        descricao: "Manutenção do elevador",
        morador: null,
        comprovanteUrl: "",
    },
]
