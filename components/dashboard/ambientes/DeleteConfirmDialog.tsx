// components/dashboard/ambientes/DeleteConfirmDialog.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Ambiente } from "@/app/types/ambiente"

type DeleteConfirmDialogProps = {
    open: boolean
    ambiente: Ambiente | null
    onClose: () => void
    onConfirm: (id: string) => void
}

export default function DeleteConfirmDialog({
                                                open,
                                                ambiente,
                                                onClose,
                                                onConfirm,
                                            }: DeleteConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    Tem certeza que deseja excluir o ambiente{" "}
                    <span className="font-medium">{ambiente?.nome}</span>?
                </p>

                <DialogFooter className="pt-4">
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (ambiente) onConfirm(ambiente.id)
                        }}
                    >
                        Confirmar exclusão
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
