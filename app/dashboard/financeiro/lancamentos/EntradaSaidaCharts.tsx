'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface EntradasSaidasChartProps {
    data: { tipo: string; valor: number }[]
}

export default function EntradasSaidasChart({ data }: EntradasSaidasChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    )
}
