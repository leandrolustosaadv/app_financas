import { TransactionsClient } from '@/components/transactions/transactions-client'

export const metadata = {
  title: 'Transações | FinançasPessoais',
}

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transações</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie todas as suas receitas e despesas
        </p>
      </div>
      <TransactionsClient />
    </div>
  )
}
