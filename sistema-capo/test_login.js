import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhrcbhdnowdtsucqrurn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocmNiaGRub3dkdHN1Y3FydXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTAwNTYsImV4cCI6MjA5Nzg4NjA1Nn0.RdRkbDu5KlnPPP7H0uJCed4QbZzI_IkcWuomMKRLx2k';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  console.log('Tentando login com a matrícula 5991332...');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: '5991332@seduc.pa.gov.br',
    password: '13042022',
  });

  if (error) {
    console.error('Erro no login:', error.message);
  } else {
    console.log('Login funcionou pelo script!');
  }
}
testLogin();
