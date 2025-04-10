import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Lancamento } from "@/app/types/lancamento"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type LancamentoModalProps = {
    open: boolean
    lancamento: Lancamento | null
    onCloseAction: () => void
    onSaveAction: (data: Lancamento | Omit<Lancamento, "id">) => void
}

export default function LancamentoModal({
                                            open,
                                            lancamento,
                                            onCloseAction,
                                            onSaveAction
                                        }: LancamentoModalProps) {
    const [form, setForm] = useState<Omit<Lancamento, "id">>({
        descricao: "",
        tipo: "entrada",
        valor: 0,
        morador: "",
        data: new Date().toISOString().substring(0, 10),
        comprovanteUrl: ""
    })

    useEffect(() => {
        if (lancamento) {
            const { id, ...rest } = lancamento
            setForm(rest)
        } else {
            setForm({
                descricao: "",
                tipo: "entrada",
                valor: 0,
                morador: "",
                data: new Date().toISOString().substring(0, 10),
                comprovanteUrl: ""
            })
        }
    }, [lancamento])

    const handleChange = (field: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        if (lancamento) {
            onSaveAction({ ...form, id: lancamento.id })
        } else {
            onSaveAction(form)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onCloseAction}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {lancamento ? "Editar Lançamento" : "Novo Lançamento"}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Textarea
                            id="descricao"
                            value={form.descricao}
                            onChange={(e: { target: { value: any } }) => handleChange("descricao", e.target.value)}
                            placeholder="Ex: Água, internet, pagamento do zelador..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Tipo</Label>
                        <RadioGroup
                            defaultValue={form.tipo}
                            onValueChange={(value: "entrada" | "saida") => handleChange("tipo", value)}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="entrada" id="entrada" />
                                <Label htmlFor="entrada">Entrada</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="saida" id="saida" />
                                <Label htmlFor="saida">Saída</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="valor">Valor</Label>
                        <Input
                            id="valor"
                            type="number"
                            min={0}
                            step="0.01"
                            value={form.valor}
                            onChange={(e) => handleChange("valor", parseFloat(e.target.value))}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="data">Data</Label>
                        <Input
                            id="data"
                            type="date"
                            value={form.data}
                            onChange={(e) => handleChange("data", e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="comprovante">URL do comprovante (opcional para entrada)</Label>
                        <Input
                            id="comprovante"
                            value={form.comprovanteUrl}
                            onChange={(e) => handleChange("comprovanteUrl", e.target.value)}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onCloseAction}>Cancelar</Button>
                    <Button onClick={handleSubmit}>
                        {lancamento ? "Salvar alterações" : "Criar lançamento"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
