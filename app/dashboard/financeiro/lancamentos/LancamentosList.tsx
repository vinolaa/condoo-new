'use client'

import { listarLancamentos } from '@/app/dashboard/financeiro/lancamentos/actions'
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale";
import { useState, useEffect } from 'react'
import LancamentoExcluirButton from './LancamentoExcluirButton'

type Lancamento = {
    id: string
    tipo: "entrada" | "saida"
    descricao: string
    valor: number
    data: string
    usuario_id: string
    condominio_id: string
    comprovante?: string
    created_at: string
    usuarios: {
        nome: string;
    };
}

interface LancamentosListProps {
    condominioId: string
    acoes?: boolean // mostra ou não botões de ação
}

export default function LancamentosList({ condominioId, acoes = true }: LancamentosListProps) {
    const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);

    // Carregar os lançamentos ao montar o componente
    useEffect(() => {
        const loadLancamentos = async () => {
            const lancamentosData = await listarLancamentos(condominioId);
            setLancamentos(lancamentosData);
        }

        loadLancamentos();
    }, [condominioId]);

    // Função para remover um lançamento da lista
    const handleLancamentoExcluido = (id: string) => {
        setLancamentos(lancamentos.filter(lancamento => lancamento.id !== id));
    };

    if (!lancamentos.length) {
        return <p className="text-muted-foreground">Nenhum lançamento encontrado.</p>;
    }

    return (
        <div className="space-y-2">
            {lancamentos.map(l => (
                <div
                    key={l.id}
                    className={`flex justify-between items-center border rounded-md p-4 ${
                        l.tipo === 'entrada' ? 'border-green-500' : 'border-red-500'
                    }`}
                >
                    <div className="flex flex-col">
                        <span className="font-medium">{l.descricao}</span>
                        <span className="text-sm text-muted-foreground">
                {format(new Date(l.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
                        <span>{l.usuarios.nome}</span>

                        {l.comprovante && (
                            <a
                                href={`https://lddbvagjouddwgszyzqe.supabase.co/storage/v1/object/public/comprovantes/${l.comprovante}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 text-blue-600 text-sm underline hover:text-blue-800"
                            >
                                Visualizar comprovante
                            </a>
                        )}
                    </div>

                    <div className="text-right">
            <span
                className={`font-bold ${
                    l.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'
                }`}
            >
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(l.valor)}
            </span>

                        {acoes && (
                            <div className="flex gap-2 mt-2 justify-end">
                                <LancamentoExcluirButton
                                    lancamentoId={l.id}
                                    onLancamentoExcluidoAction={handleLancamentoExcluido}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}

        </div>
    )
}
