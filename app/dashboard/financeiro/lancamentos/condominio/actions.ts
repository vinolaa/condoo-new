'use server'

import { createClient } from '@/utils/supabase/server'

export async function listarLancamentos(condominioId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('lancamentos')
        .select('*')
        .eq('condominio_id', condominioId)
        .is('usuario_id', null) // Garante que é lançamento do condomínio
        .order('data', { ascending: false });

    if (error) throw new Error(error.message)
    return data
}