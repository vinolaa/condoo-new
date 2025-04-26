export const calcularTotais = (lancamentos: any[]) => {
    let entradas = 0
    let saidas = 0

    lancamentos.forEach((lancamento) => {
        if (lancamento.tipo === 'entrada') {
            entradas += lancamento.valor
        } else if (lancamento.tipo === 'saida') {
            saidas += lancamento.valor
        }
    })

    const saldo = entradas - saidas

    return { entradas, saidas, saldo }
}
