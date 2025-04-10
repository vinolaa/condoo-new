"use client"

import { useState } from "react"
import { Ambiente } from "@/app/types/ambiente"
import { mockAmbientes } from "@/components/dashboard/ambientes/ambiente-data"

import AmbienteTable from "@/components/dashboard/ambientes/AmbienteTable"
import AmbienteModal from "@/components/dashboard/ambientes/AmbienteModal"
import DeleteConfirmDialog from "@/components/dashboard/ambientes/DeleteConfirmDialog"

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

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                ambiente={ambienteToDelete}
                onCloseAction={() => {
                    setDeleteDialogOpen(false)
                    setAmbienteToDelete(null)
                }}
                onConfirmAction={(id) => {
                    deleteAmbiente(id)
                }}
            />
        </div>
    )
}
