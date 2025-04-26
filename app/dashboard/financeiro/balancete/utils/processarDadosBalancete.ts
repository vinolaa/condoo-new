type Lancamento = {
    id: string
    condominio_id: string
    usuario_id?: string | null
    tipo: 'entrada' | 'saida'
    categoria: string
    descricao: string
    valor: number
    data: string
    comprovante?: string | null
}

export function calcularTotais(lancamentos: Lancamento[]) {
    let entradas = 0
    let saidas = 0

    lancamentos.forEach((lancamento) => {
        if (lancamento.tipo === 'entrada') {
            entradas += lancamento.valor
        } else if (lancamento.tipo === 'saida') {
            saidas += lancamento.valor
        }
    })

    return {
        entradas,
        saidas,
        saldo: entradas - saidas
    }
}
