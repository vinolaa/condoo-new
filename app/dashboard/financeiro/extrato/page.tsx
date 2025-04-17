"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { extratoMoradorMock } from "@/components/dashboard/financeiro/extrat-morador/extrato-morador-data"

export interface Extrato {
    id: number
    morador: string
    descricao: string
    tipo: "entrada" | "saida"
    valor: number
    data: string
    categoria: string
}

export default function ExtratoPorMorador() {
    const [moradorSelecionado, setMoradorSelecionado] = useState<string | null>(null)
    const [lancamentos, setLancamentos] = useState<Extrato[]>([])

    const moradoresUnicos = Array.from(new Set(extratoMoradorMock.map(l => l.morador)))

    useEffect(() => {
        if (moradorSelecionado) {
            const filtrados = extratoMoradorMock.filter(l => l.morador === moradorSelecionado)
            setLancamentos(filtrados)
        } else {
            setLancamentos([])
        }
    }, [moradorSelecionado])

    const totalEntradas = lancamentos.filter(l => l.tipo === "entrada").reduce((acc, l) => acc + l.valor, 0)
    const totalSaidas = lancamentos.filter(l => l.tipo === "saida").reduce((acc, l) => acc + l.valor, 0)
    const saldo = totalEntradas - totalSaidas

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Extrato por Morador</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Select onValueChange={(value) => setMoradorSelecionado(value)}>
                        <SelectTrigger className="w-full md:w-1/2">
                            <SelectValue placeholder="Selecione um morador" />
                        </SelectTrigger>
                        <SelectContent>
                            {moradoresUnicos.map((morador, index) => (
                                <SelectItem key={index} value={morador}>
                                    {morador}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {moradorSelecionado && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold">
                                <div>Entradas: <span className="text-green-600">R$ {totalEntradas.toFixed(2)}</span></div>
                                <div>Saídas: <span className="text-red-600">R$ {totalSaidas.toFixed(2)}</span></div>
                                <div>Saldo: <span className={saldo >= 0 ? "text-green-600" : "text-red-600"}>R$ {saldo.toFixed(2)}</span></div>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Descrição</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead>Valor</TableHead>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Categoria</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {lancamentos.map((l) => (
                                            <TableRow key={l.id}>
                                                <TableCell>{l.descricao}</TableCell>
                                                <TableCell>{l.tipo === "entrada" ? "Entrada" : "Saída"}</TableCell>
                                                <TableCell>R$ {l.valor.toFixed(2)}</TableCell>
                                                <TableCell>{new Date(l.data).toLocaleDateString()}</TableCell>
                                                <TableCell>{l.categoria}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
