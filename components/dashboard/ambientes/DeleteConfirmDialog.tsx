"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Ambiente } from "@/app/types/ambiente"
import { AnimatePresence } from "framer-motion"

type DeleteConfirmDialogProps = {
    open: boolean
    ambiente: Ambiente | null
    onCloseAction: () => void
    onConfirmAction: (id: string) => void
}

export default function DeleteConfirmDialog({
                                                open,
                                                ambiente,
                                                onCloseAction,
                                                onConfirmAction,
                                            }: DeleteConfirmDialogProps) {
    return (
        <AnimatePresence>
            {open && (
                <Dialog open={open} onOpenChange={onCloseAction}>
                    <DialogContent
                        className="sm:max-w-[425px]"
                    >
                        <DialogHeader>
                            <DialogTitle>Confirmar Exclusão</DialogTitle>
                        </DialogHeader>

                        <p className="text-sm text-muted-foreground">
                            Tem certeza que deseja excluir o ambiente{" "}
                            <span className="font-medium">{ambiente?.nome}</span>?
                        </p>

                        <DialogFooter className="pt-4">
                            <Button variant="ghost" onClick={onCloseAction}>
                                Cancelar
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    if (ambiente) onConfirmAction(ambiente.id)
                                }}
                            >
                                Confirmar exclusão
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
