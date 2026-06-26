-- SQL de Configuração do Banco de Dados para Analistas e Distribuição
-- Por favor, copie e cole este script no SQL Editor do Supabase e clique em "RUN".

-- 1. Tabela de Configurações do Sistema
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

-- Ativar cadastro por padrão (pode ser mudado no sistema)
INSERT INTO public.system_settings (key, value) 
VALUES ('cadastro_aberto', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 2. Tabela de Atribuição de Processos (Distribuição de Passivo)
CREATE TABLE IF NOT EXISTS public.process_assignments (
    process_id TEXT PRIMARY KEY,
    matricula TEXT NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Tabela de Atualizações de Processos (Minhas Atividades)
CREATE TABLE IF NOT EXISTS public.process_updates (
    process_id TEXT PRIMARY KEY,
    matricula TEXT NOT NULL,
    novo_status TEXT,
    novo_pae TEXT,
    observacao TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Políticas de Segurança (Row Level Security)
-- Permitir leitura e gravação autenticada para todas essas tabelas:
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública/autenticada em system_settings" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Permitir alteração autenticada em system_settings" ON public.system_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir leitura/escrita em process_assignments" ON public.process_assignments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Permitir leitura/escrita em process_updates" ON public.process_updates FOR ALL USING (auth.role() = 'authenticated');
