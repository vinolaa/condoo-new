// components/dashboard/financeiro/lancamentos/LancamentoTable.tsx
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Lancamento } from "@/app/types/lancamento"
import LancamentoRow from "./LancamentoRow"

interface Props {
    lancamentos: Lancamento[]
    onEdit: (lancamento: Lancamento) => void
    onDelete: (lancamento: Lancamento) => void
}

export default function LancamentoTable({ lancamentos, onEdit, onDelete }: Props) {
    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Morador</TableHead>
                            <TableHead>Comprovante</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lancamentos.map((l) => (
                            <LancamentoRow key={l.id} lancamento={l} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}