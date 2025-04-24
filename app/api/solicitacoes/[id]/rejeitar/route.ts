import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({ error: "ID da solicitação é obrigatório" }, { status: 400 });
    }

    const supabase = await createClient();

    // Atualizar o status para "negado"
    const { error } = await supabase
        .from("solicitacoes_entrada")
        .update({ status: "negado" })
        .eq("id", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Solicitação rejeitada com sucesso" }, { status: 200 });
}