// /dashboardMorador/financeiro/balancete/components/FiltroMesAno.tsx

import React, { FC, useState } from 'react'

interface FiltroMesAnoProps {
    onChangeAction: (mes: number, ano: number) => void
}

const FiltroMesAno: FC<FiltroMesAnoProps> = ({ onChangeAction }) => {
    const dataAtual = new Date()
    const [mes, setMes] = useState(dataAtual.getMonth() + 1) // Mês atual (começa de 0 no JavaScript, por isso +1)
    const [ano, setAno] = useState(dataAtual.getFullYear()) // Ano atual

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const novoMes = Number(event.target.value)
        onChangeAction(novoMes, ano)
        setMes(novoMes) // Atualiza o estado do mês
    }

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const novoAno = Number(event.target.value)
        onChangeAction(mes, novoAno)
        setAno(novoAno) // Atualiza o estado do ano
    }

    return (
        <div className="flex gap-4 items-center">
            <select
                value={mes}
                onChange={handleMonthChange}
                className="border rounded p-2"
            >
                {Array.from({ length: 12 }).map((_, index) => (
                    <option key={index} value={index + 1}>
                        {new Date(0, index).toLocaleString('pt-BR', { month: 'long' })}
                    </option>
                ))}
            </select>

            <select
                value={ano}
                onChange={handleYearChange}
                className="border rounded p-2"
            >
                {Array.from({ length: 5 }, (_, i) => dataAtual.getFullYear() - i).map((a) => (
                    <option key={a} value={a}>
                        {a}
                    </option>
                ))}
            </select>

            <button
                onClick={() => onChangeAction(mes, ano)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Buscar
            </button>
        </div>
    )
}

export { FiltroMesAno }
