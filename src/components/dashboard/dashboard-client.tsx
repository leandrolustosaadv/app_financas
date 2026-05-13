'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SummaryCards } from './summary-cards'
import { CategoryChart } from './category-chart'
import { RecentTransactions } from './recent-transactions'
import { type Transaction } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

function getYearOptions() {
  const current = new Date().getFullYear()
  return Array.from({ length: 5 }, (_, i) => current - i)
}

export function DashboardClient() {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const start = `${year}-${String(month).padStart(2, '0')}-01`
    const endDate = new Date(year, month, 0)
    const end = `${year}-${String(month).padStart(2, '0')}-${endDate.getDate()}`

    const { data } = await supabase
      .from('transactions')
      .select('*')
      .gte('date', start)
      .lte('date', end)
      .order('date', { ascending: false })

    setTransactions(data ?? [])
    setLoading(false)
  }, [month, year])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const totalIncome = transactions
    .filter((t) => t.type === 'receita')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter((t) => t.type === 'despesa')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      {/* Period Filter */}
      <div className="flex items-center gap-3">
        <Select value={String(month)} onValueChange={(v) => v !== null && setMonth(Number(v))}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((name, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={String(year)} onValueChange={(v) => v !== null && setYear(Number(v))}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {getYearOptions().map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <SummaryCards totalIncome={totalIncome} totalExpenses={totalExpenses} />
          <div className="grid gap-6 lg:grid-cols-2">
            <CategoryChart transactions={transactions} />
            <RecentTransactions transactions={transactions} />
          </div>
        </>
      )}
    </div>
  )
}
