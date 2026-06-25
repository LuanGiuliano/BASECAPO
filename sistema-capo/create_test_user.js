import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhrcbhdnowdtsucqrurn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocmNiaGRub3dkdHN1Y3FydXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTAwNTYsImV4cCI6MjA5Nzg4NjA1Nn0.RdRkbDu5KlnPPP7H0uJCed4QbZzI_IkcWuomMKRLx2k';

const supabase = createClient(supabaseUrl, supabaseKey);

async function criarUsuarioTeste() {
  console.log('Tentando criar o usuário desenvolvedor no Supabase Auth...');
  
  const { data, error } = await supabase.auth.signUp({
    email: '5991332@seduc.pa.gov.br',
    password: '13042022',
  });

  if (error) {
    console.error('Erro ao criar usuário:', error.message);
  } else {
    console.log('✅ Usuário de teste criado com sucesso!');
    console.log('Matrícula:', '5991332');
    console.log('Senha:', '13042022');
    console.log('\nSe o login ainda der erro, é porque o Supabase exige confirmação de email por padrão.');
    console.log('Nesse caso, você precisará ir no painel do Supabase -> Authentication -> Providers -> Email e desativar "Confirm email".');
  }
}

criarUsuarioTeste();
