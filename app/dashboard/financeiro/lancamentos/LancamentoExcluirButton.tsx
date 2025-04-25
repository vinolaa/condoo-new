'use client'

import { deletarLancamento } from '@/app/dashboard/financeiro/lancamentos/actions'

interface LancamentoExcluirButtonProps {
    lancamentoId: string;
    onLancamentoExcluidoAction: (id: string) => void; // Callback para notificar a exclusão
}

export default function LancamentoExcluirButton({ lancamentoId, onLancamentoExcluidoAction }: LancamentoExcluirButtonProps) {
    const handleExcluir = async () => {
        if (confirm("Tem certeza que deseja excluir este lançamento?")) {
            await deletarLancamento(lancamentoId)
            onLancamentoExcluidoAction(lancamentoId);  // Notificar o componente pai para remover o item da lista
        }
    }

    return (
        <button
            className="text-red-600 hover:text-red-800"
            onClick={handleExcluir}
        >
            Excluir
        </button>
    )
}
