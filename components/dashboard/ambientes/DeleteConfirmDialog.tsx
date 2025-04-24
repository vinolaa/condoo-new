"use client";

type Props = {
    open: boolean;
    ambiente: any;
    onConfirmAction: (id: string) => void;
    onCancelAction: () => void;
};

export default function DeleteConfirmDialog({ open, ambiente, onConfirmAction, onCancelAction }: Props) {
    if (!open || !ambiente) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <p>Você tem certeza que deseja excluir o ambiente "{ambiente.nome}"?</p>
                <button onClick={() => onConfirmAction(ambiente.id)}>Sim</button>
                <button onClick={onCancelAction}>Cancelar</button>
            </div>
        </div>
    );
}
