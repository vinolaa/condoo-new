import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/client"

export async function GET(
    req: Request,
    context: { params: { id: string } }
) {
    const supabase = createClient()
    const { id } = context.params

    const { data, error } = await supabase
        .from("reservas_ambientes")
        .select("data_reservada")
        .eq("ambiente_id", id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const datas = data?.map((r) => r.data_reservada) || []

    return NextResponse.json({ datasReservadas: datas })
}
