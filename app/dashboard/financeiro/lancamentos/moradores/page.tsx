import { listarLancamentosMorador } from './actions'
import CriarLancamentoMoradorModal from './components/CriarLancamentoMoradorModal'
import { DistribuicaoPorTipoChart } from './components/DistribuirPorTipoChart'
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

    const lancamentos = await listarLancamentosMorador(usuarioData?.condominio_id)

    return (
        <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Lançamentos de Moradores</h1>
                <CriarLancamentoMoradorModal condominioId={usuarioData?.condominio_id} />
            </div>

            <DistribuicaoPorTipoChart lancamentos={lancamentos} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lancamentos.map((lancamento) => (
                    <div key={lancamento.id} className="border p-4 rounded shadow-sm space-y-1">
                        <div className="text-sm text-gray-600">{new Date(lancamento.data).toLocaleString()}</div>
                        <div className="font-semibold">{lancamento.descricao}</div>
                        <div className="text-sm italic text-muted-foreground">{lancamento.categoria}</div>
                        <div className="text-sm">{lancamento.tipo.toUpperCase()} - R$ {lancamento.valor.toFixed(2)}</div>
                        <div className="text-sm">Usuário: {lancamento.usuarios?.nome}</div> {/* Exibindo o nome do usuário */}
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
