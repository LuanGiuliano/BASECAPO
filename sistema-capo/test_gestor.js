import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhrcbhdnowdtsucqrurn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocmNiaGRub3dkdHN1Y3FydXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTAwNTYsImV4cCI6MjA5Nzg4NjA1Nn0.RdRkbDu5KlnPPP7H0uJCed4QbZzI_IkcWuomMKRLx2k';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testGestor() {
  console.log('Tentando criar usuário "gestor"...');
  const { data, error } = await supabase.auth.signUp({
    email: 'gestor@seduc.pa.gov.br',
    password: 'capogestao2026',
  });

  if (error) {
    console.error('Erro ao criar gestor:', error.message);
  } else {
    console.log('✅ Usuário gestor criado! Testando login...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'gestor@seduc.pa.gov.br',
        password: 'capogestao2026',
    });
    if (loginError) {
       console.error('Erro no login do gestor:', loginError.message);
    } else {
       console.log('✅ Login funcionou perfeitamente para o gestor!');
    }
  }
}
testGestor();
