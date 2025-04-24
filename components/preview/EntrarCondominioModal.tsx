"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function EntrarCondominioModal({ usuarioId }: { usuarioId: string }) {
    const [condominios, setCondominios] = useState<any[]>([]);
    const [condominioSelecionado, setCondominioSelecionado] = useState<string | undefined>();
    const [open, setOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);

    useEffect(() => {
        const fetchCondominios = async () => {
            const supabase = createClient();
            const { data } = await supabase.from("condominios").select("id, nome");
            setCondominios(data || []);
        };
        fetchCondominios().catch((e) => console.error("Erro ao carregar condomínios:", e));
    }, []);

    const handleSolicitar = async () => {
        if (!condominioSelecionado) return;

        const supabase = createClient();

        // Verificar se já existe uma solicitação para este usuário e condomínio
        const { data: existingRequest, error: requestError } = await supabase
            .from("solicitacoes_entrada")
            .select("*")
            .eq("usuario_id", usuarioId)
            .eq("condominio_id", condominioSelecionado)
            .single();

        if (requestError && requestError.code !== "PGRST116") {
            setStatusMessage({ type: "error", message: "Erro ao verificar solicitações existentes." });
            return;
        }

        if (existingRequest) {
            if (existingRequest.status === "negado") {
                setStatusMessage({ type: "error", message: "Sua solicitação foi negada anteriormente." });
                return;
            }
            setStatusMessage({ type: "error", message: "Você já enviou uma solicitação para este condomínio." });
            return;
        }

        const { error } = await supabase.from("solicitacoes_entrada").insert({
            usuario_id: usuarioId,
            condominio_id: condominioSelecionado,
        });

        if (error) {
            setStatusMessage({ type: "error", message: "Erro ao enviar solicitação." });
        } else {
            setStatusMessage({ type: "success", message: "Solicitação enviada com sucesso!" });
            setCondominioSelecionado(undefined);
        }
    };

    const renderStatusMessage = () => {
        if (!statusMessage) return null;
        return (
            <div
                className={`text-sm p-2 rounded-md mb-3 ${
                    statusMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
            >
                {statusMessage.message}
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
                setStatusMessage(null); // limpa mensagem ao fechar
                setCondominioSelecionado(undefined); // limpa seleção
            }
        }}>
            <DialogTrigger asChild>
                <Button className="w-full">Entrar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Solicitar entrada em condomínio</DialogTitle>
                </DialogHeader>

                {renderStatusMessage()}

                <Select onValueChange={setCondominioSelecionado} value={condominioSelecionado}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um condomínio" />
                    </SelectTrigger>
                    <SelectContent>
                        {condominios.map((cond) => (
                            <SelectItem key={cond.id} value={cond.id}>
                                {cond.nome}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <DialogFooter>
                    <Button onClick={handleSolicitar} disabled={!condominioSelecionado}>
                        Enviar solicitação
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
