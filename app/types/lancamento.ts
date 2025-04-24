export type Lancamento = {
    id: string
    tipo: "entrada" | "saida"
    data: string
    valor: number
    descricao: string
    morador: string | null
    comprovanteUrl: string
}
