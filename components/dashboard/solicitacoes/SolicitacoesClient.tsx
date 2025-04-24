"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Usuario = {
    nome: string;
    email: string;
};

type Condominio = {
    nome: string;
};

type Solicitacao = {
    id: string;
    status: string;
    usuario_id: string;
    condominio_id: string;
    criado_em: string;
    usuario: Usuario;
    condominio: Condominio;
};

interface Props {
    solicitacoes: Solicitacao[];
}

export default function SolicitudesClient({ solicitacoes: initialSolicitacoes }: Props) {
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(initialSolicitacoes);

    const handleRejeitar = async (id: string) => {
        const response = await fetch(`/api/solicitacoes/${id}/rejeitar`, {
            method: "POST",
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            setSolicitacoes((prev: Solicitacao[]) => prev.filter((s) => s.id !== id));
        } else {
            alert(`Erro: ${result.error}`);
        }
    };

    const handleAprovar = async (id: string) => {
        const response = await fetch(`/api/solicitacoes/${id}/aprovar`, {
            method: "POST",
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            setSolicitacoes((prev: Solicitacao[]) => prev.filter((s) => s.id !== id));
        } else {
            alert(`Erro: ${result.error}`);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Solicitações de Entrada</h2>
            {solicitacoes.map((s) => (
                <div key={s.id} className="border p-4 rounded">
                    <div>
                        <strong>Usuário:</strong> {s.usuario?.nome} ({s.usuario?.email})
                    </div>
                    <div>
                        <strong>Condomínio:</strong> {s.condominio?.nome}
                    </div>
                    <div>
                        <strong>Status:</strong> {s.status}
                    </div>
                    <div className="mt-2 space-x-2">
                        <Button variant="default" size="sm" onClick={() => handleAprovar(s.id)}>
                            Aprovar
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleRejeitar(s.id)}>
                            Rejeitar
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
