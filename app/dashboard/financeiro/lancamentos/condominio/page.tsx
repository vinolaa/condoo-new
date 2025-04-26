import { listarLancamentos } from './actions'
import CriarLancamentoModal from './components/CriarLancamentoModal'
import { DistribuicaoPorTipoChart } from './components/DistribuicaoPorTipoChart'
import {createClient} from "@/utils/supabase/server";

export default async function LancamentosCondominioPage() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return <div className="text-red-500">Usuário não autenticado.</div>
    }

    const { data: usuarioData } = await supabase
        .from('usuarios')
        .select('condominio_id')
        .eq('id', user.id)
        .single()

    const lancamentos = await listarLancamentos(usuarioData?.condominio_id)

    return (
        <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lançamentos do Condomínio</h1>
                <CriarLancamentoModal condominioId={usuarioData?.condominio_id} />
            </div>

            <DistribuicaoPorTipoChart lancamentos={lancamentos} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lancamentos.map((lancamento) => (
                    <div key={lancamento.id} className="border p-4 rounded shadow-sm space-y-1">
                        <div className="text-sm text-gray-600">{new Date(lancamento.data).toLocaleString()}</div>
                        <div className="font-semibold">{lancamento.descricao}</div>
                        <div className="text-sm">{lancamento.tipo.toUpperCase()} - R$ {lancamento.valor.toFixed(2)}</div>
                        {lancamento.comprovante && (
                            <a href={`https://lddbvagjouddwgszyzqe.supabase.co/storage/v1/object/public/comprovantes/${lancamento.comprovante}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                                Ver comprovante
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </main>
    )
}
