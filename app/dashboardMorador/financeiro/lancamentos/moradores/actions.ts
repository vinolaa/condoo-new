'use server'

import {createClient} from '@/utils/supabase/server'

export async function listarLancamentosMoradores(condominioId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('lancamentos')
        .select(`
            *,
            usuarios (
                nome
            )
        `)
        .eq('condominio_id', condominioId)
        .not('usuario_id', 'is', null) // Garante que tenha usuario_id
        .order('data', { ascending: false });

    if (error) throw new Error(error.message);

    return data.map((lancamento) => {
        lancamento.nome = lancamento.usuarios?.nome || 'Usuário';
        return lancamento;
    });
}

