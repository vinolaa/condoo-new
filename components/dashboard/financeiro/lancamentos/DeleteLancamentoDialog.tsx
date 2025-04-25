// components/ui/DeleteDialog.tsx

import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Props {
    open: boolean
    onConfirm: () => void
    onCancel: () => void
    title?: string
    description?: string
}

export default function DeleteLancamentoDialog({ open, onConfirm, onCancel, title, description }: Props) {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title || "Deseja excluir este item?"}</DialogTitle>
                </DialogHeader>
                <p className="text-muted-foreground mb-4">{description || "Essa ação não poderá ser desfeita."}</p>
                <DialogFooter>
                    <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
                    <Button variant="destructive" onClick={onConfirm}>Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
