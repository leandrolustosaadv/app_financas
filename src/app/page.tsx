import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  TrendingUp,
  BarChart2,
  ShieldCheck,
  Download,
  Filter,
  Smartphone,
} from 'lucide-react'

const features = [
  {
    icon: BarChart2,
    title: 'Dashboard Visual',
    description:
      'Visualize receitas, despesas e saldo com gráficos de pizza por categoria.',
  },
  {
    icon: TrendingUp,
    title: 'Controle Total',
    description:
      'Registre, edite e exclua transações com categorias pré-definidas.',
  },
  {
    icon: Filter,
    title: 'Filtros Avançados',
    description:
      'Filtre por mês, categoria ou busque por descrição em segundos.',
  },
  {
    icon: Download,
    title: 'Exportar CSV',
    description:
      'Exporte suas transações filtradas em formato CSV para análise externa.',
  },
  {
    icon: ShieldCheck,
    title: 'Dados Seguros',
    description:
      'Autenticação segura e isolamento de dados por usuário com Row Level Security.',
  },
  {
    icon: Smartphone,
    title: 'Responsivo',
    description:
      'Acesse pelo celular, tablet ou desktop com a mesma experiência.',
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">FinançasPessoais</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Começar grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <TrendingUp className="h-4 w-4" />
            Controle financeiro simplificado
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Suas finanças,{' '}
            <span className="text-primary">sob controle</span>
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            Registre receitas e despesas, visualize seu saldo em tempo real e
            tome decisões mais inteligentes com o FinançasPessoais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register">
              <Button size="lg" className="px-8">
                Criar conta grátis
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Tudo que você precisa</h2>
            <p className="mt-3 text-muted-foreground">
              Uma solução completa para gerenciar sua vida financeira.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-950 text-white">
        <div className="container mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold">Pronto para começar?</h2>
          <p className="text-white/80">
            Crie sua conta gratuitamente e comece a controlar suas finanças hoje mesmo.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="px-8">
              Criar conta grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">FinançasPessoais</span>
        </div>
        <p className="mt-2">Gerencie suas finanças com simplicidade e clareza.</p>
      </footer>
    </div>
  )
}
