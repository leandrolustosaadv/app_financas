import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Transaction } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight } from 'lucide-react'

interface RecentTransactionsProps {
  transactions: Transaction[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const recent = transactions.slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Últimas Transações</CardTitle>
        <Link href="/transactions">
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            Ver todas
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-6">
            Nenhuma transação registrada neste período.
          </p>
        ) : (
          <div className="space-y-3">
            {recent.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{t.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(t.date + 'T00:00:00'), "dd MMM yyyy", { locale: ptBR })}
                    {' · '}
                    {t.category}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant={t.type === 'receita' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {t.type === 'receita' ? '+' : '-'} {formatCurrency(t.amount)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
