'use client'

import { useEffect, useState } from 'react'
import { listarLancamentosCondominio } from './actions'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type Lancamento = {
    id: string
    tipo: "entrada" | "saida"
    descricao: string
    valor: number
    data: string
    condominio_id: string
    comprovante?: string
    created_at: string
}

interface Props {
    condominioId: string
}

export default function LancamentosCondominioList({ condominioId }: Props) {
    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])

    useEffect(() => {
        const load = async () => {
            const data = await listarLancamentosCondominio(condominioId)
            setLancamentos(data)
        }

        load()
    }, [condominioId])

    if (!lancamentos.length) {
        return <p className="text-muted-foreground">Nenhum lançamento encontrado.</p>
    }

    return (
        <div className="space-y-2">
            {lancamentos.map((l) => (
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
                </div>
            ))}
        </div>
    )
}
