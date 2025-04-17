"use client"

import { useEffect, useState } from "react"
import { extratosMock } from "@/components/dashboard/financeiro/relatorios/extrato-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveAs } from "file-saver"
import * as XLSX from "xlsx"

export interface Extrato {
    id: number
    descricao: string
    tipo: "entrada" | "saida"
    valor: number
    data: string
    categoria: string
    morador: string
}

export default function RelatoriosExportacao() {
    const [dados, setDados] = useState<Extrato[]>([])
    const [moradorSelecionado, setMoradorSelecionado] = useState<string>("todos")
    const [tipoSelecionado, setTipoSelecionado] = useState<string>("todos")
    const [mesSelecionado, setMesSelecionado] = useState<string>("todos")
    const [anoSelecionado, setAnoSelecionado] = useState<string>("todos")

    useEffect(() => {
        let filtrado = [...extratosMock]

        if (moradorSelecionado !== "todos") {
            filtrado = filtrado.filter(e => e.morador === moradorSelecionado)
        }

        if (tipoSelecionado !== "todos") {
            filtrado = filtrado.filter(e => e.tipo === tipoSelecionado)
        }

        if (mesSelecionado !== "todos") {
            filtrado = filtrado.filter(e => new Date(e.data).getMonth() + 1 === parseInt(mesSelecionado))
        }

        if (anoSelecionado !== "todos") {
            filtrado = filtrado.filter(e => new Date(e.data).getFullYear() === parseInt(anoSelecionado))
        }

        setDados(filtrado)
    }, [moradorSelecionado, tipoSelecionado, mesSelecionado, anoSelecionado])

    const exportarExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dados)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Extrato")
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
        saveAs(blob, "extrato.xlsx")
    }

    const moradores = Array.from(new Set(extratosMock.map(e => e.morador)))
    const anos = Array.from(new Set(extratosMock.map(e => new Date(e.data).getFullYear())))
    const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Relatórios e Exportação</CardTitle>
                    <div className="flex gap-2">
                        <Button onClick={exportarExcel}>Exportar Excel</Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Select value={moradorSelecionado} onValueChange={setMoradorSelecionado}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por Morador" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos os moradores</SelectItem>
                                {moradores.map((m, idx) => (
                                    <SelectItem key={idx} value={m}>{m}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={tipoSelecionado} onValueChange={setTipoSelecionado}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos os tipos</SelectItem>
                                <SelectItem value="entrada">Entradas</SelectItem>
                                <SelectItem value="saida">Saídas</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={mesSelecionado} onValueChange={setMesSelecionado}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por Mês" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos os meses</SelectItem>
                                {meses.map((m, idx) => (
                                    <SelectItem key={idx} value={m}>{m.padStart(2, "0")}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={anoSelecionado} onValueChange={setAnoSelecionado}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por Ano" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos os anos</SelectItem>
                                {anos.map((a, idx) => (
                                    <SelectItem key={idx} value={a.toString()}>{a}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                                    <TableHead>Morador</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dados.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.descricao}</TableCell>
                                        <TableCell>{item.tipo === "entrada" ? "Entrada" : "Saída"}</TableCell>
                                        <TableCell>R$ {item.valor.toFixed(2)}</TableCell>
                                        <TableCell>{new Date(item.data).toLocaleDateString()}</TableCell>
                                        <TableCell>{item.categoria}</TableCell>
                                        <TableCell>{item.morador}</TableCell>
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
