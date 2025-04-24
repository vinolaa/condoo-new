"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Ambiente } from "@/app/types/ambiente";

type Props = {
    ambiente: Ambiente;
    onCloseAction: () => void;
    onSuccessAction: () => void;
};

export function EditAmbienteModal({ ambiente, onCloseAction, onSuccessAction }: Props) {
    const [nome, setNome] = useState(ambiente.nome);
    const [valorPorDia, setValorPorDia] = useState(ambiente.valorPorDia.toString());
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async () => {
        setLoading(true);
        const { error } = await supabase
            .from("ambientes")
            .update({ nome, valor_por_dia: parseFloat(valorPorDia) })
            .eq("id", ambiente.id);

        setLoading(false);

        if (error) {
            console.error("Erro ao editar ambiente:", error.message);
            alert("Erro ao editar ambiente. Tente novamente.");
        } else {
            alert("Ambiente editado com sucesso!");
            onSuccessAction();
            onCloseAction();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Editar Ambiente</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Valor por Dia</label>
                    <input
                        type="number"
                        value={valorPorDia}
                        onChange={(e) => setValorPorDia(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCloseAction}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-black"
                        disabled={loading}
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    );
}