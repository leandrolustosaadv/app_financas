'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { type Transaction } from '@/lib/types'

interface DeleteDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  transaction: Transaction | null
}

export function DeleteDialog({ open, onClose, onSuccess, transaction }: DeleteDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!transaction) return
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transaction.id)

    if (error) {
      toast.error('Erro ao excluir transação.')
    } else {
      toast.success('Transação excluída.')
      onSuccess()
      onClose()
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Excluir transação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir{' '}
            <span className="font-medium text-foreground">
              {transaction?.description}
            </span>
            ? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
