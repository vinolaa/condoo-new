'use server'

import {createClient} from '@/utils/supabase/server'

export async function listarLancamentosCondominio(condominioId: string) {
    const supabase = await createClient();

    // Obtemos o nome do condomínio apenas para preencher nos dados
    const { data: condominioData, error: condominioError } = await supabase
        .from('condominios')
        .select('nome')
        .eq('id', condominioId)
        .single();

    if (condominioError) throw new Error(condominioError.message);

    const { data, error } = await supabase
        .from('lancamentos')
        .select('*')
        .eq('condominio_id', condominioId)
        .is('usuario_id', null) // Garante que é lançamento do condomínio
        .order('data', { ascending: false });

    if (error) throw new Error(error.message);

    return data.map((lancamento) => {
        lancamento.nome = condominioData.nome;
        return lancamento;
    });
}
