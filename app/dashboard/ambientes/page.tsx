"use client"

import { useState } from "react"
import { Ambiente } from "@/app/types/ambiente"
import { mockAmbientes } from "@/components/dashboard/ambientes/ambiente-data"

import AmbienteTable from "@/components/dashboard/ambientes/AmbienteTable"
import AmbienteModal from "@/components/dashboard/ambientes/AmbienteModal"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function AmbientesPage() {
    const [ambientes, setAmbientes] = useState<Ambiente[]>(mockAmbientes)
    const [editing, setEditing] = useState<Ambiente | null>(null)
    const [open, setOpen] = useState(false)

    const [ambienteToDelete, setAmbienteToDelete] = useState<Ambiente | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const addAmbiente = (ambiente: Omit<Ambiente, "id">) => {
        const newAmbiente: Ambiente = {
            ...ambiente,
            id: Date.now().toString(),
        }
        setAmbientes((prev) => [...prev, newAmbiente])
    }

    const updateAmbiente = (updated: Ambiente) => {
        setAmbientes((prev) =>
            prev.map((a) => (a.id === updated.id ? updated : a))
        )
    }

    const deleteAmbiente = (id: string) => {
        setAmbientes((prev) => prev.filter((a) => a.id !== id))
        setDeleteDialogOpen(false)
        setAmbienteToDelete(null)
    }

    const handleCloseModal = () => {
        setOpen(false)
        setEditing(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Ambientes</h1>
                <button
                    onClick={() => {
                        setEditing(null)
                        setOpen(true)
                    }}
                    className="bg-primary text-white px-4 py-2 rounded"
                >
                    Novo Ambiente
                </button>
            </div>

            <AmbienteTable
                ambientes={ambientes}
                onEdit={(ambiente) => {
                    setEditing(ambiente)
                    setOpen(true)
                }}
                onDelete={(ambiente) => {
                    setAmbienteToDelete(ambiente)
                    setDeleteDialogOpen(true)
                }}
            />

            <AmbienteModal
                open={open}
                ambiente={editing}
                onCloseAction={handleCloseModal}
                clearEdit={() => setEditing(null)}
                onSaveAction={(data) => {
                    if ("id" in data) {
                        updateAmbiente(data)
                    } else {
                        addAmbiente(data)
                    }
                    handleCloseModal()
                }}
            />

            {/* Modal de Confirmação de Exclusão */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        Tem certeza que deseja excluir o ambiente{" "}
                        <span className="font-semibold">{ambienteToDelete?.nome}</span>?
                    </p>
                    <DialogFooter className="pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setDeleteDialogOpen(false)
                                setAmbienteToDelete(null)
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (ambienteToDelete) {
                                    deleteAmbiente(ambienteToDelete.id)
                                }
                            }}
                        >
                            Confirmar Exclusão
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
