"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { comprovantesMock } from "@/components/dashboard/financeiro/comprovantes/comprovantes-data"

export interface Comprovante {
    id: number;
    descricao: string;
    tipo: "comprovante" | "nota fiscal";
    valor: number;
    data: string;
    categoria: string;
    morador: string;
    arquivo: string;
}

export default function ComprovantesNF() {
    const [comprovantes, setComprovantes] = useState<Comprovante[]>([])
    const [filtroTipo, setFiltroTipo] = useState<string>("todos")

    useEffect(() => {
        setComprovantes(comprovantesMock)
    }, [])

    const filtrarPorTipo = (tipo: string) => {
        setFiltroTipo(tipo)
        const dadosFiltrados = tipo === "todos"
            ? comprovantesMock
            : comprovantesMock.filter((comprovante) => comprovante.tipo === tipo)
        setComprovantes(dadosFiltrados)
    }

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Comprovantes e Notas Fiscais</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6 mb-6">
                        <Select onValueChange={filtrarPorTipo}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filtrar por tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="comprovante">Comprovante</SelectItem>
                                <SelectItem value="nota fiscal">Nota Fiscal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">Lista de Comprovantes e Notas Fiscais</h3>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Valor</TableHead>
                                    <TableHead>Data</TableHead>
                                    <TableHead>Categoria</TableHead>
                                    <TableHead>Arquivo</TableHead>
                                    <TableHead>Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {comprovantes.map((comprovante) => (
                                    <TableRow key={comprovante.id}>
                                        <TableCell>{comprovante.descricao}</TableCell>
                                        <TableCell>{comprovante.tipo === "comprovante" ? "Comprovante" : "Nota Fiscal"}</TableCell>
                                        <TableCell>R$ {comprovante.valor.toFixed(2)}</TableCell>
                                        <TableCell>{new Date(comprovante.data).toLocaleDateString()}</TableCell>
                                        <TableCell>{comprovante.categoria}</TableCell>
                                        <TableCell>
                                            <a href={comprovante.arquivo} target="_blank" rel="noopener noreferrer" className="text-blue-500">Ver Arquivo</a>
                                        </TableCell>
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
