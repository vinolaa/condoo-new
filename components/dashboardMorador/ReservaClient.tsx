"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { ReservaDateModal } from "@/components/dashboardMorador/ReservaModal";

interface Ambiente {
    id: string;
    nome: string;
    valor_por_dia: number;
    condominio_id: number;
}

interface ReservaClientProps {
    ambientes: Ambiente[];
    usuarioId: string;
}

export function ReservaClient({ ambientes, usuarioId }: ReservaClientProps) {
    const [selectedAmbiente, setSelectedAmbiente] = useState<Ambiente | null>(null);
    const [ambientesFiltrados, setAmbientesFiltrados] = useState<Ambiente[]>([]);
    const [minhasReservas, setMinhasReservas] = useState<any[]>([]);

    const supabase = createClient();

    useEffect(() => {
        const fetchReservas = async () => {
            const { data, error } = await supabase
                .from("reservas_ambientes")
                .select("data_reservada, status, ambiente_id, ambientes(nome)")
                .eq("usuario_id", usuarioId)
                .order("data_reservada", { ascending: true });

            if (!error) {
                setMinhasReservas(data);
            } else {
                console.error("Erro ao buscar reservas:", error);
            }
        };

        fetchReservas();
    }, [usuarioId]);


    useEffect(() => {
        const fetchAmbientes = async () => {
            const { data: usuario, error } = await supabase
                .from("usuarios")
                .select("condominio_id")
                .eq("id", usuarioId)
                .single();

            if (!usuario || error) {
                console.error("Erro ao buscar condominio_id:", error);
                return;
            }

            const filtrados = ambientes.filter(a => a.condominio_id === usuario.condominio_id);
            setAmbientesFiltrados(filtrados);
        };

        fetchAmbientes();
    }, [ambientes, usuarioId]);

    const handleReserva = async (data: Date) => {
        const dataIso = data.toISOString().split("T")[0];

        const { data: reservas, error: checkError } = await supabase
            .from("reservas_ambientes")
            .select("id")
            .eq("ambiente_id", selectedAmbiente?.id)
            .eq("data_reservada", dataIso);

        if (checkError) {
            alert("Erro ao verificar disponibilidade.");
            return;
        }

        if (reservas && reservas.length > 0) {
            alert("Este ambiente já está reservado nesta data.");
            return;
        }

        const { error: insertError } = await supabase.from("reservas_ambientes").insert([
            {
                usuario_id: usuarioId,
                ambiente_id: selectedAmbiente?.id,
                data_reservada: dataIso,
                status: "pendente",
            },
        ]);

        if (insertError) {
            alert("Erro ao salvar reserva.");
            console.error(insertError);
        } else {
            alert("Reserva realizada com sucesso!");
            setSelectedAmbiente(null);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {minhasReservas.length > 0 && (
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Minhas Reservas</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ambiente</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {minhasReservas.map((reserva, idx) => {
                                const dataReserva = new Date(reserva.data_reservada);
                                const hoje = new Date();
                                hoje.setHours(0, 0, 0, 0); // zera horas

                                let status = "";
                                let cor = "";

                                if (dataReserva.toDateString() === hoje.toDateString()) {
                                    status = "É HOJE!";
                                    cor = "bg-blue-600";
                                } else if (dataReserva < hoje) {
                                    status = "Finalizado";
                                    cor = "bg-red-500";
                                } else {
                                    status = "Aprovada";
                                    cor = "bg-green-600";
                                }

                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{reserva.ambientes?.nome || "Ambiente"}</TableCell>
                                        <TableCell>{dataReserva.toLocaleDateString("pt-BR")}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded text-white text-sm ${cor}`}>
                                                {status}
                                            </span>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                        </TableBody>
                    </Table>
                </div>
            )}

            <h2 className="text-2xl font-semibold">Ambientes Disponíveis</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ambiente</TableHead>
                        <TableHead>Valor por Dia</TableHead>
                        <TableHead>Ação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ambientesFiltrados.map(amb => (
                        <TableRow key={amb.id}>
                            <TableCell>{amb.nome}</TableCell>
                            <TableCell>R$ {amb.valor_por_dia.toFixed(2)}</TableCell>
                            <TableCell>
                                <Button onClick={() => setSelectedAmbiente(amb)}>Reservar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedAmbiente && (
                <ReservaDateModal
                    ambienteId={selectedAmbiente.id}
                    ambienteNome={selectedAmbiente.nome}
                    onCloseAction={() => setSelectedAmbiente(null)}
                    onConfirmAction={handleReserva}
                />
            )}
        </div>
    );
}
