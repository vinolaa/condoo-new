"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DeleteConfirmDialog from "@/components/dashboard/ambientes/DeleteConfirmDialog"
import LancamentoModal from "@/components/dashboard/financeiro/lancamentos/LancamentoModal"
import { Lancamento } from "@/app/types/lancamento"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { lancamentosMock } from "@/components/dashboard/financeiro/lancamentos/lancamento-data"

export default function LancamentosPage() {
    const [lancamentos, setLancamentos] = useState<Lancamento[]>(lancamentosMock)
    const [modalOpen, setModalOpen] = useState(false)
    const [selected, setSelected] = useState<Lancamento | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const handleSave = (data: Omit<Lancamento, "id"> | Lancamento) => {
        if ("id" in data) {
            setLancamentos((prev) =>
                prev.map((l) => (l.id === data.id ? data : l))
            )
        } else {
            setLancamentos((prev) => [
                ...prev,
                { ...data, id: crypto.randomUUID() },
            ])
        }
        setModalOpen(false)
    }

    const handleDelete = (id: string) => {
        setLancamentos((prev) => prev.filter((l) => l.id !== id))
        setDeleteDialogOpen(false)
    }

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Lançamentos Financeiros</CardTitle>
                    <Button onClick={() => { setSelected(null); setModalOpen(true) }}>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Novo Lançamento
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Morador</TableHead>
                                <TableHead>Comprovante</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lancamentos.map((lanc) => (
                                <TableRow key={lanc.id}>
                                    <TableCell>{lanc.descricao}</TableCell>
                                    <TableCell>{lanc.tipo === "entrada" ? "Entrada" : "Saída"}</TableCell>
                                    <TableCell>R$ {lanc.valor.toFixed(2)}</TableCell>
                                    <TableCell>{lanc.data}</TableCell>
                                    <TableCell>{lanc.morador}</TableCell>
                                    <TableCell>
                                        {lanc.comprovanteUrl ? (
                                            <a
                                                href={lanc.comprovanteUrl}
                                                target="_blank"
                                                className="text-sm underline text-blue-600"
                                            >
                                                Ver comprovante
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                setSelected(lanc)
                                                setModalOpen(true)
                                            }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-500"
                                            onClick={() => {
                                                setSelected(lanc)
                                                setDeleteDialogOpen(true)
                                            }}
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {lancamentos.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                                        Nenhum lançamento cadastrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <LancamentoModal
                open={modalOpen}
                lancamento={selected}
                onCloseAction={() => setModalOpen(false)}
                onSaveAction={handleSave}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                ambiente={selected as any} // compatibilidade temporária
                onCloseAction={() => setDeleteDialogOpen(false)}
                onConfirmAction={handleDelete}
            />
        </div>
    )
}
