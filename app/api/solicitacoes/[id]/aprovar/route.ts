import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "ID da solicitação é obrigatório" }, { status: 400 });
    }

    const supabase = createClient();

    // Buscar a solicitação para obter o usuario_id
    const { data: solicitacao, error: fetchError } = await supabase
        .from("solicitacoes_entrada")
        .select("usuario_id, condominio_id")
        .eq("id", id)
        .single();

    if (fetchError || !solicitacao) {
        return NextResponse.json({ error: fetchError?.message || "Solicitação não encontrada" }, { status: 404 });
    }

    const { usuario_id } = solicitacao;

    // Atualizar o cargo do usuário para "morador"
    const { error: updateUserError } = await supabase
        .from("usuarios")
        .update({ cargo: "morador" , condominio_id: solicitacao.condominio_id })
        .eq("id", usuario_id);

    if (updateUserError) {
        return NextResponse.json({ error: updateUserError.message }, { status: 500 });
    }

    // Atualizar o status da solicitação para "aceito"
    const { error: updateSolicitacaoError } = await supabase
        .from("solicitacoes_entrada")
        .update({ status: "aceito" })
        .eq("id", id);

    if (updateSolicitacaoError) {
        return NextResponse.json({ error: updateSolicitacaoError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Solicitação aceita com sucesso" }, { status: 200 });
}