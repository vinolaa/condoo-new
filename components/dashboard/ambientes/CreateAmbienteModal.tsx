"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = {
    onCloseAction: () => void;
    onSuccessAction: () => void;
    usuarioId: string; // Passando o usuarioId como prop
};

export function CreateAmbienteModal({ onCloseAction, onSuccessAction, usuarioId }: Props) {
    const [nome, setNome] = useState("");
    const [valorPorDia, setValorPorDia] = useState("");
    const [loading, setLoading] = useState(false);
    const [condominioId, setCondominioId] = useState<number | null>(null);
    const supabase = createClient();

    // Função para buscar o condominio_id do usuário
    const getCondominioId = async () => {
        const { data, error } = await supabase
            .from("usuarios")
            .select("condominio_id")
            .eq("id", usuarioId)
            .single();

        if (error || !data) {
            console.error("Erro ao buscar dados do usuário:", error?.message);
            return null;
        }

        return data.condominio_id;
    };

    // Buscar o condominio_id assim que o componente for montado
    useEffect(() => {
        const fetchCondominioId = async () => {
            const id = await getCondominioId();
            if (id) {
                setCondominioId(id);
            }
        };
        fetchCondominioId();
    }, [usuarioId]);

    const handleSubmit = async () => {
        if (!condominioId) {
            alert("Não foi possível identificar o condomínio.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.from("ambientes").insert([
            { nome, valor_por_dia: parseFloat(valorPorDia), condominio_id: condominioId },
        ]);

        setLoading(false);

        if (error) {
            console.error("Erro ao criar ambiente:", error.message);
            alert("Erro ao criar ambiente. Tente novamente.");
        } else {
            alert("Ambiente criado com sucesso!");
            onSuccessAction();
            onCloseAction();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Adicionar Novo Ambiente</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder="Digite o nome do ambiente"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Valor por Dia</label>
                    <input
                        type="number"
                        value={valorPorDia}
                        onChange={(e) => setValorPorDia(e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder="Digite o valor por dia"
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
