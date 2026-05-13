import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

interface SummaryCardsProps {
  totalIncome: number
  totalExpenses: number
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function SummaryCards({ totalIncome, totalExpenses }: SummaryCardsProps) {
  const balance = totalIncome - totalExpenses

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receitas
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(totalIncome)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesas
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
            <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500 dark:text-red-400">
            {formatCurrency(totalExpenses)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo
          </CardTitle>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
            balance >= 0
              ? 'bg-blue-100 dark:bg-blue-900/40'
              : 'bg-red-100 dark:bg-red-900/40'
          }`}>
            <Wallet className={`h-4 w-4 ${
              balance >= 0
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-red-500 dark:text-red-400'
            }`} />
          </div>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${
            balance >= 0
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-red-500 dark:text-red-400'
          }`}>
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
