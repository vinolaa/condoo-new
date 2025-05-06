import { createClient } from '@/utils/supabase/server'
import LancamentosMoradorList from './LancamentosMoradorList'

export default async function LancamentosMoradorPage() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return <div className="text-red-500">Usuário não autenticado.</div>
    }

    // Recupera o ID do condomínio do usuário (ajuste conforme sua estrutura de metadados)
    const { data: usuarioData } = await supabase
        .from('usuarios')
        .select('condominio_id')
        .eq('id', user.id)
        .single()

    if (!usuarioData) {
        return <div className="text-red-500">Condomínio não encontrado.</div>
    }

    if (!usuarioData?.condominio_id) {
        return <div className="text-red-500">Condomínio não definido para o usuário.</div>
    }


    return (
        <main className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Meus Lançamentos</h1>
            <LancamentosMoradorList
                condominioId={usuarioData.condominio_id}
                usuarioId={user.id}
            />
        </main>
    )
}
