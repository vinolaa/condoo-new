'use server'

import { createClient } from '@/utils/supabase/server'

export async function listarLancamentosMorador(
    condominioId: string | null,
    usuarioId: string | null,
    mes: number,
    ano: number
) {
    if (!condominioId || !usuarioId) return []

    const supabase = await createClient()

    // Corrigir o último dia real do mês
    const ultimoDia = new Date(ano, mes, 0).getDate(); // << aqui ajusta certinho o dia final

    const { data, error } = await supabase
        .from('lancamentos')
        .select('*')
        .eq('condominio_id', condominioId)
        .eq('usuario_id', usuarioId) // filtra pelo morador
        .gte('data', `${ano}-${String(mes).padStart(2, '0')}-01`) // primeiro dia do mês
        .lte('data', `${ano}-${String(mes).padStart(2, '0')}-${String(ultimoDia).padStart(2, '0')}`) // último dia real do mês
        .order('data', { ascending: true })

    if (error) {
        throw new Error(error.message)
    }

    return data
}
