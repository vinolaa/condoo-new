// /dashboardMorador/financeiro/balancete/components/Totais.tsx

import { FC } from 'react'

interface TotaisProps {
    entradas: number
    saidas: number
    saldo: number
}

const Totais: FC<TotaisProps> = ({ entradas, saidas, saldo }) => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 border rounded shadow-sm">
                <h2 className="text-green-600 font-bold">Entradas</h2>
                <p className="text-xl">R$ {entradas.toFixed(2)}</p>
            </div>
            <div className="p-4 border rounded shadow-sm">
                <h2 className="text-red-600 font-bold">Saídas</h2>
                <p className="text-xl">R$ {saidas.toFixed(2)}</p>
            </div>
            <div className="p-4 border rounded shadow-sm">
                <h2 className="text-blue-600 font-bold">Saldo</h2>
                <p className="text-xl">R$ {saldo.toFixed(2)}</p>
            </div>
        </div>
    )
}

export { Totais }
