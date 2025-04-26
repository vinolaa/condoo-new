"use client"

import { listarLancamentosBalancete } from '../actions'
import { FiltroMesAno } from './FiltroMesAno'
import { calcularTotais } from '../utils/processarDadosBalancete'
import { useEffect, useState } from 'react'

type Lancamento = {
    id: string
    data: string
    descricao: string
    tipo: string
    categoria: string
    valor: number
}

// Função para corrigir a data inválida
const corrigirDataInvalida = (data: string): string => {
    const [ano, mes, dia] = data.split("-").map(Number);
    const ultimoDia = new Date(ano, mes, 0).getDate(); // Retorna o último dia do mês
    return `${ano}-${String(mes).padStart(2, '0')}-${String(Math.min(dia, ultimoDia)).padStart(2, '0')}`;
};

interface BalancetePageClientProps {
    condominioId: string | null // Adicionei o tipo correto aqui
}

export default function BalancetePageClient({ condominioId }: BalancetePageClientProps) {
    const dataAtual = new Date()
    const mesAtual = dataAtual.getMonth() + 1
    const anoAtual = dataAtual.getFullYear()

    const [mes, setMes] = useState(mesAtual)
    const [ano, setAno] = useState(anoAtual)
    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
    const [totais, setTotais] = useState({ entradas: 0, saidas: 0, saldo: 0 })

    const buscarLancamentos = async () => {
        if (condominioId) {
            // Corrigir a data antes de fazer a consulta
            const dataCorrigida = corrigirDataInvalida(`${ano}-${String(mes).padStart(2, '0')}-01`);
            console.log("Data corrigida:", dataCorrigida); // Apenas para depuração, pode ser removido depois

            // Buscar os lançamentos com a data corrigida
            const data = await listarLancamentosBalancete(condominioId, mes, ano)
            setLancamentos(data)
            setTotais(calcularTotais(data))
        }
    }

    useEffect(() => {
        buscarLancamentos()
    }, [mes, ano, condominioId]) // Agora inclui condominioId como dependência

    return (
        <main className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Balancete Mensal</h1>

            <FiltroMesAno
                onChangeAction={(novoMes, novoAno) => {
                    setMes(novoMes)
                    setAno(novoAno)
                }}
            />

            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded shadow-sm">
                    <h2 className="text-green-600 font-bold">Entradas</h2>
                    <p className="text-xl">R$ {totais.entradas.toFixed(2)}</p>
                </div>
                <div className="p-4 border rounded shadow-sm">
                    <h2 className="text-red-600 font-bold">Saídas</h2>
                    <p className="text-xl">R$ {totais.saidas.toFixed(2)}</p>
                </div>
                <div className="p-4 border rounded shadow-sm">
                    <h2 className="text-blue-600 font-bold">Saldo</h2>
                    <p className="text-xl">R$ {totais.saldo.toFixed(2)}</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Lançamentos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lancamentos.map((lancamento) => (
                        <div key={lancamento.id} className="border p-4 rounded shadow-sm space-y-1">
                            <div className="text-sm text-gray-600">
                                {new Date(lancamento.data).toLocaleDateString()}
                            </div>
                            <div className="font-semibold">{lancamento.descricao}</div>
                            <div className="text-sm">
                                {lancamento.tipo.toUpperCase()} | {lancamento.categoria}
                            </div>
                            <div className="text-sm">R$ {lancamento.valor.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
