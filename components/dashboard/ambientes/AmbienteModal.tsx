"use client"

import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Ambiente } from "@/app/types/ambiente"
import { motion } from "framer-motion"

type AmbienteForm = Omit<Ambiente, "id">

type AmbienteModalProps = {
    open: boolean
    onCloseAction: () => void
    onSaveAction: (ambiente: Ambiente | AmbienteForm) => void
    ambiente: Ambiente | null
    clearEdit: () => void
}

export default function AmbienteModal({
                                          open,
                                          onCloseAction,
                                          onSaveAction,
                                          ambiente,
                                      }: AmbienteModalProps) {
    const [nome, setNome] = useState("")
    const [valorPorDia, setValorPorDia] = useState("")

    useEffect(() => {
        if (ambiente) {
            setNome(ambiente.nome)
            setValorPorDia(String(ambiente.valorPorDia))
        } else {
            setNome("")
            setValorPorDia("")
        }
    }, [ambiente])

    const handleSave = () => {
        const valor = parseFloat(valorPorDia)
        if (!nome.trim() || isNaN(valor)) return

        const data = {
            ...(ambiente?.id ? { id: ambiente.id } : {}),
            nome,
            valorPorDia: valor,
        }

        onSaveAction(data as Ambiente | AmbienteForm)
        handleClose()
    }

    const handleClose = () => {
        onCloseAction() // responsável por setOpen(false) e clearEdit()
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            {ambiente ? "Editar Ambiente" : "Novo Ambiente"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        <Input
                            placeholder="Nome do ambiente"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <Input
                            placeholder="Valor por dia"
                            type="number"
                            value={valorPorDia}
                            onChange={(e) => setValorPorDia(e.target.value)}
                        />
                    </div>

                    <DialogFooter className="pt-4">
                        <Button variant="ghost" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSave}>
                            {ambiente ? "Salvar Alterações" : "Cadastrar"}
                        </Button>
                    </DialogFooter>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}
