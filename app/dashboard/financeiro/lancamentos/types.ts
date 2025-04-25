export type Lancamento = {
    id: string
    tipo: "entrada" | "saida"
    descricao: string
    valor: number
    data: string
    usuario_id: string
    condominio_id: string
    comprovante?: string
    created_at: string
}
