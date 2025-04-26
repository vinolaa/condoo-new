'use client'

import { useState } from 'react'
import { listarLancamentosMorador } from '../actions'
import { FiltroMesAno } from './FiltroMesAno'
import { Lancamentos } from './Lancamentos'
import { Totais } from './Totais'
import { calcularTotais } from '../utils/processarDaosBalancete'

interface BalanceteMoradorClientProps {
    condominioId: string | null
    usuarioId: string | null
}

export default function BalanceteMoradorClient({ condominioId, usuarioId }: BalanceteMoradorClientProps) {
    const [mes, setMes] = useState<number>(new Date().getMonth() + 1)
    const [ano, setAno] = useState<number>(new Date().getFullYear())
    const [lancamentos, setLancamentos] = useState<any[]>([])
    const [totais, setTotais] = useState({ entradas: 0, saidas: 0, saldo: 0 })
    const [buscou, setBuscou] = useState(false)

    const buscarLancamentos = async (mes: number, ano: number) => {
        if (condominioId && usuarioId) {
            const data = await listarLancamentosMorador(condominioId, usuarioId, mes, ano)
            setLancamentos(data)
            setTotais(calcularTotais(data))
            setBuscou(true)
        }
    }

    return (
        <main className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Balancete do Morador</h1>

            <FiltroMesAno
                onChangeAction={(novoMes, novoAno) => {
                    setMes(novoMes)
                    setAno(novoAno)
                    buscarLancamentos(novoMes, novoAno)
                }}
            />

            {buscou && (
                <>
                    <Totais
                        entradas={totais.entradas}
                        saidas={totais.saidas}
                        saldo={totais.saldo}
                    />

                    <Lancamentos lancamentos={lancamentos} />
                </>
            )}
        </main>
    )
}
