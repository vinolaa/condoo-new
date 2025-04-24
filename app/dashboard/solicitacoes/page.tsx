import { createClient } from "@/utils/supabase/client";
import SolicitudesClient from "@/components/dashboard/solicitacoes/SolicitacoesClient";

export default async function SolicitudesPage() {
    const supabase = createClient();

    const { data: solicitacoesBase } = await supabase
        .from("solicitacoes_entrada")
        .select("*")
        .eq("status", "pendente")
        .order("criado_em", { ascending: false });

    if (!solicitacoesBase || solicitacoesBase.length === 0) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold">Solicitações de Entrada</h2>
                <p className="mt-4 text-gray-600">Nenhuma solicitação encontrada.</p>
            </div>
        );
    }

    const solicitacoesCompletas = await Promise.all(
        solicitacoesBase.map(async (s) => {
            const [{ data: usuario }, { data: condominio }] = await Promise.all([
                supabase
                    .from("usuarios")
                    .select("nome, email")
                    .eq("id", s.usuario_id)
                    .single(),
                supabase
                    .from("condominios")
                    .select("nome")
                    .eq("id", s.condominio_id)
                    .single(),
            ]);

            return {
                ...s,
                usuario,
                condominio,
            };
        })
    );

    return <SolicitudesClient solicitacoes={solicitacoesCompletas} />;
}