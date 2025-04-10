import AmbienteRow from "./AmbienteRow"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Ambiente } from "@/app/types/ambiente"

interface Props {
    ambientes: Ambiente[]
    onEdit: (ambiente: Ambiente) => void
    onDelete: (ambiente: Ambiente) => void
}

export default function AmbienteTable({ ambientes, onEdit, onDelete }: Props) {
    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Valor / dia</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ambientes.map((ambiente) => (
                            <AmbienteRow
                                key={ambiente.id}
                                ambiente={ambiente}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
