-- FinançasPessoais - Schema SQL para Supabase
-- Execute este script no SQL Editor do seu projeto Supabase

-- Tabela de transações
create table if not exists public.transactions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  description text not null,
  amount      numeric(12, 2) not null check (amount > 0),
  date        date not null,
  type        text not null check (type in ('receita', 'despesa')),
  category    text not null check (category in (
    'Alimentação', 'Transporte', 'Moradia', 'Lazer',
    'Saúde', 'Educação', 'Salário', 'Freelance', 'Outros'
  )),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Índices para performance
create index if not exists transactions_user_id_idx on public.transactions(user_id);
create index if not exists transactions_date_idx on public.transactions(date desc);
create index if not exists transactions_type_idx on public.transactions(type);

-- Trigger para atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_transactions_updated
  before update on public.transactions
  for each row execute procedure public.handle_updated_at();

-- Habilitar Row Level Security
alter table public.transactions enable row level security;

-- Policies RLS: cada usuário acessa apenas suas próprias transações
create policy "Usuários veem apenas suas transações"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Usuários criam suas próprias transações"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Usuários atualizam apenas suas transações"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Usuários deletam apenas suas transações"
  on public.transactions for delete
  using (auth.uid() = user_id);
