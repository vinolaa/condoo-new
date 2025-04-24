"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function CriarCondominioPage() {
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Obter usuário logado
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                alert("Erro ao obter usuário logado.");
                return;
            }

            // Inserir endereço
            const { data: endereco, error: enderecoError } = await supabase
                .from("enderecos")
                .insert({
                    logradouro,
                    numero,
                    complemento,
                    bairro,
                    cidade,
                    estado,
                    cep,
                })
                .select("id")
                .single();

            if (enderecoError) {
                alert(`Erro ao criar endereço: ${enderecoError.message}`);
                return;
            }

            // Inserir condomínio e retornar o id
            const { data: condominio, error: condominioError } = await supabase
                .from("condominios")
                .insert({
                    nome,
                    cnpj,
                    endereco_id: endereco.id,
                })
                .select("id")
                .single();

            if (condominioError) {
                alert(`Erro ao criar condomínio: ${condominioError.message}`);
                return
            }

            // Atualizar o usuário com o id do condomínio e cargo "sindico"
            const { error: usuarioUpdateError } = await supabase
                .from("usuarios")
                .update({
                    condominio_id: condominio.id,
                    cargo: "sindico",
                })
                .eq("id", user.id);

            if (usuarioUpdateError) {
                alert(`Erro ao atualizar usuário: ${usuarioUpdateError.message}`);
                return
            }

            alert("Condomínio criado com sucesso!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error(error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full min-h-screen flex items-center justify-center px-4 py-20">
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold">Criar Condomínio</h1>

                {/* Nome do Condomínio */}
                <div>
                    <label className="block text-sm font-medium mb-1">Nome do Condomínio</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* CNPJ */}
                <div>
                    <label className="block text-sm font-medium mb-1">CNPJ</label>
                    <input
                        type="text"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Logradouro */}
                <div>
                    <label className="block text-sm font-medium mb-1">Logradouro</label>
                    <input
                        type="text"
                        value={logradouro}
                        onChange={(e) => setLogradouro(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Número */}
                <div>
                    <label className="block text-sm font-medium mb-1">Número</label>
                    <input
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Complemento */}
                <div>
                    <label className="block text-sm font-medium mb-1">Complemento</label>
                    <input
                        type="text"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Bairro */}
                <div>
                    <label className="block text-sm font-medium mb-1">Bairro</label>
                    <input
                        type="text"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Cidade */}
                <div>
                    <label className="block text-sm font-medium mb-1">Cidade</label>
                    <input
                        type="text"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Estado */}
                <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <input
                        type="text"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* CEP */}
                <div>
                    <label className="block text-sm font-medium mb-1">CEP</label>
                    <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                {/* Botão de Enviar */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Criando..." : "Criar Condomínio"}
                    </button>
                </div>
            </form>
        </div>
    );
}