'use server'

import { createClient } from "@/utils/supabase/server"

export async function listarLancamentosBalancete(condominioId: string, mes: number, ano: number) {
    const supabase = await createClient()

    // Corrigir a data final para o último dia real do mês
    const ultimoDia = new Date(ano, mes, 0).getDate(); // Retorna o último dia do mês

    const { data, error } = await supabase
        .from('lancamentos')
        .select('*')
        .eq('condominio_id', condominioId)
        .gte('data', `${ano}-${String(mes).padStart(2, '0')}-01`)  // Início do mês
        .lte('data', `${ano}-${String(mes).padStart(2, '0')}-${String(ultimoDia).padStart(2, '0')}`)  // Último dia do mês
        .order('data', { ascending: true })

    if (error) {
        throw new Error(error.message)
    }

    return data
}
