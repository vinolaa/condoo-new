"use client";

import { Ambiente } from "@/app/types/ambiente";
import { createClient } from "@/utils/supabase/client";
import {useState} from "react";

type Props = {
    ambiente: Ambiente;
    onCloseAction: () => void;
    onSuccessAction: () => void;
};

export function DeleteAmbienteModal({ ambiente, onCloseAction, onSuccessAction }: Props) {
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleDelete = async () => {
        setLoading(true);
        const { error } = await supabase.from("ambientes").delete().eq("id", ambiente.id);

        setLoading(false);

        if (error) {
            console.error("Erro ao excluir ambiente:", error.message);
            alert("Erro ao excluir ambiente. Tente novamente.");
        } else {
            alert("Ambiente excluído com sucesso!");
            onSuccessAction();
            onCloseAction();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Excluir Ambiente</h2>
                <p>Tem certeza que deseja excluir o ambiente "{ambiente.nome}"?</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={onCloseAction}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        disabled={loading}
                    >
                        {loading ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            </div>
        </div>
    );
}