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
import { AnimatePresence, motion } from "framer-motion"

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
                        asChild
                    >
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
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
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
