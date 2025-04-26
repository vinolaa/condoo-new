export interface Lancamento {
    id: string
    tipo: 'entrada' | 'saida'
    valor: number
    descricao: string
    data: string
}

export function agruparPorTipo(lancamentos: Lancamento[]) {
    const resultado = lancamentos.reduce<Record<string, number>>((acc, lancamento) => {
        acc[lancamento.tipo] = (acc[lancamento.tipo] || 0) + lancamento.valor
        return acc
    }, {})

    return Object.entries(resultado).map(([tipo, valor]) => ({ tipo, valor }))
}
