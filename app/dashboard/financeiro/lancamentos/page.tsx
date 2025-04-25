import { createClient } from '@/utils/supabase/server'
import LancamentosList from './LancamentosList'
import EntradasSaidasChart from './EntradaSaidaCharts'
import DistribuicaoMoradorChart from './DistribuicaoMoradorCharts'
import { agruparPorTipo, agruparPorMorador } from './utils/processarDados'
import CriarLancamentoModal from './CriarLancamentoModal'

export default async function LancamentosPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return <p>Falha ao encontrar usuário. Por favor, saia e entre novamente no sistema.</p>
    }

    const { data: usuario, error: errorUsuario } = await supabase
        .from('usuarios')
        .select('condominio_id')
        .eq('id', user.id)
        .single()

    if (errorUsuario || !usuario?.condominio_id) {
        return <p>Erro ao buscar dados do condomínio.</p>
    }

    const condominioId = usuario.condominio_id

    // Busca os lançamentos
    const { data: lancamentos, error: errorLancamentos } = await supabase
        .from('lancamentos')
        .select('*')
        .eq('condominio_id', condominioId)

    if (errorLancamentos || !lancamentos) {
        return <p>Erro ao carregar lançamentos.</p>
    }

    // Busca nomes dos usuários envolvidos
    const { data: usuarios, error: errorUsuarios } = await supabase
        .from('usuarios')
        .select('id, nome')
        .in('id', lancamentos.map((l) => l.usuario_id))

    if (errorUsuarios || !usuarios) {
        return <p>Erro ao carregar nomes dos usuários.</p>
    }

    // Processa dados para os gráficos
    const dadosTipo = agruparPorTipo(lancamentos)
    const dadosMorador = agruparPorMorador(lancamentos, usuarios)

    return (
        <div className="h-screen overflow-hidden"> {/* ocupa a tela toda, mas impede overflow geral */}
            <div className="h-full overflow-y-auto p-6 space-y-6"> {/* somente o conteúdo rola */}
                <h1 className="text-2xl font-bold mb-2">Lançamentos</h1>

                {/* Botão de novo lançamento */}
                <div className="flex justify-end mb-4">
                    <CriarLancamentoModal
                        condominioId={condominioId}
                        usuarioId={user.id}
                    />
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Entradas vs Saídas</h2>
                        <EntradasSaidasChart data={dadosTipo} />
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">Distribuição por Morador</h2>
                        <DistribuicaoMoradorChart data={dadosMorador} />
                    </div>
                </div>

                {/* Lista de lançamentos */}
                <div>
                    <h2 className="text-lg font-semibold mt-6 mb-4">Todos os lançamentos</h2>
                    <LancamentosList condominioId={condominioId} />
                </div>
            </div>
        </div>
    )
}
