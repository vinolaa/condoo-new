'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid'

interface Props {
    condominioId: string
}

export default function CriarLancamentoModal({ condominioId }: Props) {
    const [open, setOpen] = useState(false)
    const [categoria, setCategoria] = useState('')
    const [form, setForm] = useState({
        tipo: 'entrada',
        descricao: '',
        categoria:  '',
        valor: '',
        data: '',
        usuario_id: null,
    })
    const [comprovante, setComprovante] = useState<File | null>(null)

    const supabase = createClient()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type === 'application/pdf') {
            setComprovante(file)
        } else {
            alert('Por favor, selecione um arquivo PDF válido.')
            setComprovante(null)
        }
    }

    const salvarLancamento = async () => {
        if (!comprovante) {
            alert('É obrigatório enviar o comprovante em PDF.')
            return
        }

        const uuid = uuidv4()
        const filePath = `${condominioId}/${uuid}.pdf`

        // Upload do PDF
        const { error: uploadError } = await supabase.storage
            .from('comprovantes')
            .upload(filePath, comprovante, {
                cacheControl: '3600',
                upsert: false,
            })

        if (uploadError) {
            alert('Erro ao fazer upload do comprovante: ' + uploadError.message)
            return
        }

        // Salva no banco
        const payload = {
            ...form,
            condominio_id: condominioId,
            valor: parseFloat(form.valor),
            comprovante: filePath,
        }

        const { error } = await supabase.from('lancamentos').insert(payload)

        if (!error) {
            setOpen(false)
            window.location.reload()
        } else {
            alert('Erro ao criar lançamento: ' + error.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2">
                    <Plus size={16} />
                    Novo lançamento
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Novo lançamento</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Tipo</Label>
                        <Select value={form.tipo} onValueChange={(val) => handleSelectChange('tipo', val)}>
                            <SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="entrada">Entrada</SelectItem>
                                <SelectItem value="saida">Saída</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label>Descrição</Label>
                        <Input name="descricao" value={form.descricao} onChange={handleChange} />
                    </div>

                    <Select onValueChange={setCategoria}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Manutenção">Manutenção</SelectItem>
                            <SelectItem value="Limpeza">Limpeza</SelectItem>
                            <SelectItem value="Água">Água</SelectItem>
                            <SelectItem value="Luz">Luz</SelectItem>
                            <SelectItem value="Taxa Condomínio">Taxa Condomínio</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="grid gap-2">
                        <Label>Valor</Label>
                        <Input name="valor" type="number" value={form.valor} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Data</Label>
                        <Input name="data" type="date" value={form.data} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Comprovante (PDF)</Label>
                        <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={salvarLancamento}>Salvar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
