import { createClient } from '@/utils/supabase/server'
import BalancetePageClient from './BalancetePageClient'

export default async function BalanceteWrapper() {
    const supabase = await createClient()
    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        return <div className="text-red-500">Usuário não autenticado.</div>
    }

    const { data: usuarioData } = await supabase
        .from('usuarios')
        .select('condominio_id')
        .eq('id', user.id)
        .single()

    const condominioId = usuarioData?.condominio_id

    return <BalancetePageClient condominioId={condominioId} />
}
