import { DashboardClient } from '@/components/dashboard/dashboard-client'

export const metadata = {
  title: 'Dashboard | FinançasPessoais',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão geral das suas finanças
        </p>
      </div>
      <DashboardClient />
    </div>
  )
}
