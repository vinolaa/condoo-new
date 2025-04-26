'use client'

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { agruparPorTipo, Lancamento } from '../utils/processarDados'

const COLORS = ['#00C49F', '#FF8042']

export function DistribuicaoPorTipoChart({ lancamentos }: { lancamentos: Lancamento[] }) {
    const data = agruparPorTipo(lancamentos)

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="valor" nameKey="tipo" cx="50%" cy="50%" outerRadius={80} label>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
