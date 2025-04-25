'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'

interface Props {
    condominioId: string
    usuarioId: string
}

export default function CriarLancamentoModal({ condominioId, usuarioId }: Props) {
    const [open, setOpen] = useState(false)
    const [usuarios, setUsuarios] = useState<{ id: string; nome: string }[]>([])
    const [form, setForm] = useState({
        tipo: 'entrada',
        descricao: '',
        valor: '',
        data: '',
        usuario_id: '',
    })

    const supabase = createClient()

    useEffect(() => {
        if (!open) return

        const fetchUsuarios = async () => {
            const { data, error } = await supabase
                .from('usuarios')
                .select('id, nome')
                .eq('condominio_id', condominioId)

            if (!error && data) {
                setUsuarios(data)
            }
        }

        fetchUsuarios()
    }, [open, condominioId, supabase])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value })
    }

    const salvarLancamento = async () => {
        const payload = {
            ...form,
            condominio_id: condominioId,
            valor: parseFloat(form.valor),
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
                        <Label htmlFor="tipo">Tipo</Label>
                        <Select value={form.tipo} onValueChange={(val) => handleSelectChange('tipo', val)}>
                            <SelectTrigger id="tipo">
                                <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="entrada">Entrada</SelectItem>
                                <SelectItem value="saida">Saída</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="descricao">Descrição</Label>
                        <Input id="descricao" name="descricao" value={form.descricao} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="valor">Valor</Label>
                        <Input id="valor" name="valor" type="number" value={form.valor} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="data">Data</Label>
                        <Input id="data" name="data" type="date" value={form.data} onChange={handleChange} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="usuario_id">Usuário</Label>
                        <Select value={form.usuario_id} onValueChange={(val) => handleSelectChange('usuario_id', val)}>
                            <SelectTrigger id="usuario_id">
                                <SelectValue placeholder="Selecione um usuário" />
                            </SelectTrigger>
                            <SelectContent>
                                {usuarios.map((u) => (
                                    <SelectItem key={u.id} value={u.id}>
                                        {u.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={salvarLancamento}>Salvar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
