// utils/processarDados.ts
interface Lancamento {
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

export function agruparPorTipo(lancamentos: Lancamento[]) {
    const resultado = [
        { tipo: 'entrada', valor: 0 },
        { tipo: 'saida', valor: 0 },
    ]

    lancamentos.forEach((lancamento) => {
        const item = resultado.find((r) => r.tipo === lancamento.tipo)
        if (item) {
            item.valor += lancamento.valor
        }
    })

    return resultado
}

export function agruparPorMorador(lancamentos: Lancamento[], usuarios: { id: string; nome: string }[]) {
    const mapa = new Map<string, number>()

    lancamentos.forEach((lancamento) => {
        mapa.set(lancamento.usuario_id, (mapa.get(lancamento.usuario_id) || 0) + lancamento.valor)
    })

    return Array.from(mapa.entries()).map(([usuario_id, valor]) => {
        const usuario = usuarios.find((u) => u.id === usuario_id)
        return {
            nome: usuario ? usuario.nome : 'Desconhecido',
            valor,
        }
    })
}
