import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { Ambiente } from "@/app/types/ambiente"

interface Props {
    ambiente: Ambiente
    onEdit: (ambiente: Ambiente) => void
    onDelete: (ambiente: Ambiente) => void
}

export default function AmbienteRow({ ambiente, onEdit, onDelete }: Props) {
    return (
        <tr>
            <td className="py-2">{ambiente.nome}</td>
            <td className="py-2">R$ {ambiente.valorPorDia.toFixed(2)}</td>
            <td className="py-2 text-right">
                <Button variant="ghost" size="icon" onClick={() => onEdit(ambiente)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(ambiente)}>
                    <Trash className="h-4 w-4 text-red-500" />
                </Button>
            </td>
        </tr>
    )
}
