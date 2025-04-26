import { FC } from 'react'

interface Lancamento {
    id: string
    data: string
    descricao: string
    tipo: string
    categoria: string
    valor: number
}

interface LancamentosProps {
    lancamentos: Lancamento[]
}

const Lancamentos: FC<LancamentosProps> = ({ lancamentos }) => {
    return (
        <div className="space-y-4">
            {lancamentos.map((lancamento) => (
                <div key={lancamento.id} className="border p-4 rounded shadow-sm space-y-1">
                    <div className="text-sm text-gray-600">
                        {new Date(lancamento.data).toLocaleDateString()}
                    </div>
                    <div className="font-semibold">{lancamento.descricao}</div>
                    <div className="text-sm">
                        {lancamento.tipo.toUpperCase()} | {lancamento.categoria}
                    </div>
                    <div className="text-sm">R$ {lancamento.valor.toFixed(2)}</div>
                </div>
            ))}
        </div>
    )
}

export { Lancamentos }
