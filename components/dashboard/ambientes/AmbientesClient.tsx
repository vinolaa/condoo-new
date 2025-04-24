"use client"

import { useEffect, useState } from "react"
import { Ambiente } from "@/app/types/ambiente"
import { AmbientesTable } from "@/components/dashboard/ambientes/AmbienteTable"
import { AmbienteSearchBar } from "@/components/dashboard/ambientes/AmbienteSearchBar"
import { CreateAmbienteModal } from "@/components/dashboard/ambientes/CreateAmbienteModal"
import { EditAmbienteModal } from "@/components/dashboard/ambientes/EditAmbienteModal"
import { DeleteAmbienteModal } from "@/components/dashboard/ambientes/DeleteAmbienteModal"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"

type Props = {
    ambientes: Ambiente[];
}

export function AmbientesClient({ ambientes }: Props) {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editAmbiente, setEditAmbiente] = useState<Ambiente | null>(null)
    const [deleteAmbiente, setDeleteAmbiente] = useState<Ambiente | null>(null)
    const [usuarioId, setUsuarioId] = useState<string | null>(null)
    const itemsPerPage = 5

    const supabase = createClient()

    useEffect(() => {
        const getUserId = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (user) {
                setUsuarioId(user.id)
            }
        }

        getUserId()
    }, [])

    const filteredAmbientes = ambientes.filter((ambiente) =>
        ambiente.nome.toLowerCase().includes(search.toLowerCase())
    )

    const startIndex = (currentPage - 1) * itemsPerPage
    const currentItems = filteredAmbientes.slice(startIndex, startIndex + itemsPerPage)
    const totalPages = Math.ceil(filteredAmbientes.length / itemsPerPage)

    const handleModalSuccess = () => {
        window.location.reload()
    }

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Gestão de Ambientes</CardTitle>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        + Adicionar Ambiente
                    </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                    <AmbienteSearchBar onSearchAction={setSearch} />

                    <AmbientesTable
                        ambientes={currentItems}
                        onEditAction={(ambiente) => setEditAmbiente(ambiente)}
                        onDeleteAction={(ambiente) => setDeleteAmbiente(ambiente)}
                    />

                    <div className="flex justify-between items-center pt-2">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                            &lt; Anterior
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Página {currentPage} de {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        >
                            Próxima &gt;
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {isCreateModalOpen && usuarioId && (
                <CreateAmbienteModal
                    usuarioId={usuarioId}
                    onCloseAction={() => setIsCreateModalOpen(false)}
                    onSuccessAction={handleModalSuccess}
                />
            )}

            {editAmbiente && (
                <EditAmbienteModal
                    ambiente={editAmbiente}
                    onCloseAction={() => setEditAmbiente(null)}
                    onSuccessAction={handleModalSuccess}
                />
            )}
            {deleteAmbiente && (
                <DeleteAmbienteModal
                    ambiente={deleteAmbiente}
                    onCloseAction={() => setDeleteAmbiente(null)}
                    onSuccessAction={handleModalSuccess}
                />
            )}
        </div>
    )
}
