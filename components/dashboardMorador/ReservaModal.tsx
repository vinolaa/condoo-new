"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface Props {
    ambienteId: string;
    ambienteNome: string;
    onCloseAction: () => void;
    onConfirmAction: (data: Date) => void;
}

export function ReservaDateModal({ ambienteId, ambienteNome, onCloseAction, onConfirmAction }: Props) {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [datasReservadas, setDatasReservadas] = useState<string[]>([]);

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const res = await fetch(`/api/reservas/${ambienteId}`);
                const { datasReservadas } = await res.json();

                const datasFormatadas = datasReservadas.map((d: string) =>
                    new Date(d).toISOString().split("T")[0]
                );

                setDatasReservadas(datasFormatadas);
            } catch (err) {
                console.error("Erro ao buscar datas reservadas:", err);
            }
        };

        fetchDatas();
    }, [ambienteId]);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const isDateDisabled = (date: Date) => {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const dataFormatada = formatDate(date);
        return date < hoje || datasReservadas.includes(dataFormatada);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[400px]">
                <h2 className="text-lg font-semibold mb-4">Reservar: {ambienteNome}</h2>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateDisabled}
                />
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={onCloseAction}>Cancelar</Button>
                    <Button disabled={!selectedDate} onClick={() => selectedDate && onConfirmAction(selectedDate)}>Confirmar</Button>
                </div>
            </div>
        </div>
    );
}
