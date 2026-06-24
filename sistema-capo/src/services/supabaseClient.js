import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Cliente secundário utilizado APENAS para cadastro de novos usuários pelo Gestor
// O persistSession: false garante que a sessão atual do Gestor não será sobrescrita.
export const supabaseAdminAuth = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    storageKey: 'supabase.admin.auth.token',
  }
});
