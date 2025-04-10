// components/dashboard/financeiro/lancamentos/LancamentoRow.tsx
import { Button } from "@/components/ui/button"
import { Trash, Pencil } from "lucide-react"
import { Lancamento } from "@/app/types/lancamento"

interface Props {
    lancamento: Lancamento
    onEdit: (lancamento: Lancamento) => void
    onDelete: (lancamento: Lancamento) => void
}

export default function LancamentoRow({ lancamento, onEdit, onDelete }: Props) {
    return (
        <tr>
            <td className="py-2">{lancamento.tipo}</td>
            <td className="py-2">{lancamento.descricao}</td>
            <td className="py-2">R$ {lancamento.valor.toFixed(2)}</td>
            <td className="py-2">{new Date(lancamento.data).toLocaleDateString()}</td>
            <td className="py-2">{lancamento.morador}</td>
            <td className="py-2">
                {lancamento.comprovanteUrl ? (
                    <a href={lancamento.comprovanteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Visualizar
                    </a>
                ) : (
                    <span className="text-muted-foreground">Nenhum</span>
                )}
            </td>
            <td className="py-2 text-right">
                <Button variant="ghost" size="icon" onClick={() => onEdit(lancamento)}>
                    <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => onDelete(lancamento)}>
                    <Trash className="w-4 h-4 text-red-500" />
                </Button>
            </td>
        </tr>
    )
}