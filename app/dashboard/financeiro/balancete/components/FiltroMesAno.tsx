'use client'

import { useState } from 'react'

interface FiltroMesAnoProps {
    onChangeAction: (mes: number, ano: number) => void
}

export function FiltroMesAno({ onChangeAction }: FiltroMesAnoProps) {
    const dataAtual = new Date()
    const [mes, setMes] = useState(dataAtual.getMonth() + 1)
    const [ano, setAno] = useState(dataAtual.getFullYear())

    const handleChange = () => {
        onChangeAction(mes, ano)
    }

    return (
        <div className="flex gap-4 items-center">
            <select
                className="border rounded p-2"
                value={mes}
                onChange={(e) => setMes(Number(e.target.value))}
            >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                        {m.toString().padStart(2, '0')}
                    </option>
                ))}
            </select>

            <select
                className="border rounded p-2"
                value={ano}
                onChange={(e) => setAno(Number(e.target.value))}
            >
                {Array.from({ length: 5 }, (_, i) => dataAtual.getFullYear() - i).map((a) => (
                    <option key={a} value={a}>
                        {a}
                    </option>
                ))}
            </select>

            <button
                onClick={handleChange}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Buscar
            </button>
        </div>
    )
}
