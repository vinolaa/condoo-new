"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { lancamentosMock } from "@/components/dashboard/financeiro/balancete/balancete-data"

export interface Lancamento {
    id: number;
    descricao: string;
    tipo: "entrada" | "saida";
    valor: number;
    data: string;
    categoria: string;
    morador: string;
}

export default function BalanceteMensal() {
    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
    const [mes, setMes] = useState<number | null>(null)
    const [ano, setAno] = useState<number | null>(null)

    useEffect(() => {
        const now = new Date()
        const currentMonth = now.getMonth() + 1
        const currentYear = now.getFullYear()

        setMes(currentMonth)
        setAno(currentYear)

        const dados = lancamentosMock.filter((lanc) => {
            const data = new Date(lanc.data)
            return data.getMonth() + 1 === currentMonth && data.getFullYear() === currentYear
        })

        setLancamentos(dados)
    }, [])

    useEffect(() => {
        if (mes && ano) {
            const dados = lancamentosMock.filter((lanc) => {
                const data = new Date(lanc.data)
                return data.getMonth() + 1 === mes && data.getFullYear() === ano
            })
            setLancamentos(dados)
        }
    }, [mes, ano])

    const totalEntradas = lancamentos.filter(l => l.tipo === "entrada").reduce((acc, curr) => acc + curr.valor, 0)
    const totalSaidas = lancamentos.filter(l => l.tipo === "saida").reduce((acc, curr) => acc + curr.valor, 0)
    const saldoFinal = totalEntradas - totalSaidas

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Balancete Mensal</CardTitle>
                    <div className="flex gap-2">
                        <Button onClick={() => setMes((prev) => (prev === 1 ? 12 : (prev ?? 1) - 1))}>&lt; Mês Anterior</Button>
                        <Button onClick={() => setMes((prev) => (prev === 12 ? 1 : (prev ?? 1) + 1))}>Próximo Mês &gt;</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Resumo Financeiro</h3>
                            <div className="flex justify-between">
                                <span>Entradas Totais:</span>
                                <span>R$ {totalEntradas.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saídas Totais:</span>
                                <span>R$ {totalSaidas.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Saldo Final:</span>
                                <span>R$ {saldoFinal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-6">Lançamentos</h3>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Categoria</TableHead>
                                    <TableHead>Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {lancamentos.map((lanc) => (
                                    <TableRow key={lanc.id}>
                                        <TableCell>{lanc.descricao}</TableCell>
                                        <TableCell>{lanc.tipo === "entrada" ? "Entrada" : "Saída"}</TableCell>
                                        <TableCell>R$ {lanc.valor.toFixed(2)}</TableCell>
                                        <TableCell>{new Date(lanc.data).toLocaleDateString()}</TableCell>
                                        <TableCell>{lanc.categoria}</TableCell>
                                        <TableCell>
                                            <Button size="sm" variant="ghost">Editar</Button>
                                            <Button size="sm" variant="ghost" className="text-red-500">Excluir</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
