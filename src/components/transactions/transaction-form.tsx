'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import {
  type Transaction,
  type TransactionType,
  type Category,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from '@/lib/types'

interface TransactionFormProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  transaction?: Transaction | null
}

export function TransactionForm({
  open,
  onClose,
  onSuccess,
  transaction,
}: TransactionFormProps) {
  const isEditing = !!transaction

  const [type, setType] = useState<TransactionType>('despesa')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [category, setCategory] = useState<Category | ''>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (transaction) {
      setType(transaction.type)
      setDescription(transaction.description)
      setAmount(String(transaction.amount))
      setDate(transaction.date)
      setCategory(transaction.category)
    } else {
      setType('despesa')
      setDescription('')
      setAmount('')
      setDate(new Date().toISOString().split('T')[0])
      setCategory('')
    }
  }, [transaction, open])

  const categories = type === 'receita' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  function handleTypeChange(newType: string) {
    setType(newType as TransactionType)
    setCategory('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!category) {
      toast.error('Selecione uma categoria.')
      return
    }

    const parsedAmount = parseFloat(amount.replace(',', '.'))
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Informe um valor válido.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const payload = { description, amount: parsedAmount, date, type, category }

    if (isEditing) {
      const { error } = await supabase
        .from('transactions')
        .update(payload)
        .eq('id', transaction!.id)

      if (error) {
        toast.error('Erro ao atualizar transação.')
      } else {
        toast.success('Transação atualizada!')
        onSuccess()
        onClose()
      }
    } else {
      const { error } = await supabase.from('transactions').insert(payload)

      if (error) {
        toast.error('Erro ao criar transação.')
      } else {
        toast.success('Transação criada!')
        onSuccess()
        onClose()
      }
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar transação' : 'Nova transação'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs value={type} onValueChange={handleTypeChange}>
            <TabsList className="w-full">
              <TabsTrigger value="despesa" className="flex-1">
                Despesa
              </TabsTrigger>
              <TabsTrigger value="receita" className="flex-1">
                Receita
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Supermercado"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                disabled={loading}
                inputMode="decimal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={category}
              onValueChange={(v) => v !== null && setCategory(v as Category)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Salvar' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
