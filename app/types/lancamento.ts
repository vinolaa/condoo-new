export type Lancamento = {
    id: string
    tipo: "entrada" | "saida"
    data: string // YYYY-MM-DD
    valor: number
    descricao: string
    morador: string | null
    comprovanteUrl: string
}
