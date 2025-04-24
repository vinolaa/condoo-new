import { Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Ambiente } from "@/app/types/ambiente"

type Props = {
    ambientes: Ambiente[]
    onEditAction: (ambiente: Ambiente) => void
    onDeleteAction: (ambiente: Ambiente) => void
}

export function AmbientesTable({ ambientes, onEditAction, onDeleteAction }: Props) {
    return (
        <div className="overflow-x-auto">
            <Table className="table-auto w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/2 text-left">Nome</TableHead>
                        <TableHead className="w-1/4 text-left">Valor por Dia</TableHead>
                        <TableHead className="w-1/4 text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ambientes.map((ambiente) => (
                        <TableRow key={ambiente.id}>
                            <TableCell className="text-left">{ambiente.nome}</TableCell>
                            <TableCell className="text-left">R$ {ambiente.valorPorDia.toFixed(2)}</TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onEditAction(ambiente)}
                                        aria-label="Editar"
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-500"
                                        onClick={() => onDeleteAction(ambiente)}
                                        aria-label="Excluir"
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}