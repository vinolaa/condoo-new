'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

const schema = z.object({
    tipo: z.enum(['entrada', 'saida']),
    descricao: z.string().min(1),
    valor: z.coerce.number().positive(),
    data: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Data inválida',
    }),
    usuario_id: z.string().uuid(),
    condominio_id: z.string(),
    comprovante: z.string().url().optional(),
})

export async function listarLancamentos(condominioId: string) {
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
        .order('data', { ascending: false });

    if (error) throw new Error(error.message);

    return data;
}


export async function deletarLancamento(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('lancamentos')
        .delete()
        .eq('id', id)

    if (error) throw new Error(error.message)

    revalidatePath('/dashboard/financeiro/lancamentos')
}

export async function editarLancamento(id: string, values: any) {
    const supabase = await createClient()
    const dados = schema.parse(values)

    const { error } = await supabase
        .from('lancamentos')
        .update(dados)
        .eq('id', id)

    if (error) throw new Error(error.message)

    revalidatePath('/dashboard/financeiro/lancamentos')
}

export async function salvarLancamento(values: any) {
    const supabase = await createClient();
    const dados = schema.parse(values);

    const { error } = await supabase.from('lancamentos').insert(dados)

    if (error) throw new Error(error.message)

    revalidatePath('/dashboard/financeiro/lancamentos')
}