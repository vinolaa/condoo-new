import { createClient } from '@/utils/supabase/server'
import BalanceteMoradorClient from './components/BalanceteMoradorClient'

export default async function BalanceteMoradorWrapper() {
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
    const usuarioId = user.id

    return <BalanceteMoradorClient
        condominioId={condominioId}
        usuarioId={usuarioId}
    />
}
