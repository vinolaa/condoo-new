import { createClient } from '@/utils/supabase/server'
import LancamentosCondominioList from './LancamentosCondominioList'

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

    if (!usuarioData?.condominio_id) {
        return <div className="text-red-500">Condomínio não encontrado.</div>
    }

    return (
        <main className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Lançamentos do Condomínio</h1>
            <LancamentosCondominioList condominioId={usuarioData.condominio_id} />
        </main>
    )
}
