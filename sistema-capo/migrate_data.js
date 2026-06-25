import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://lhrcbhdnowdtsucqrurn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocmNiaGRub3dkdHN1Y3FydXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTAwNTYsImV4cCI6MjA5Nzg4NjA1Nn0.RdRkbDu5KlnPPP7H0uJCed4QbZzI_IkcWuomMKRLx2k';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Verificando acesso ao Supabase e existência da tabela...');
  
  // Test if table exists by selecting 1 row
  const { data: testData, error: testError } = await supabase.from('processos').select('id').limit(1);
  
  if (testError) {
    console.error('\n❌ ERRO: A tabela "processos" não existe ou você não liberou o acesso.');
    console.error('Por favor, vá no SQL Editor do Supabase e rode aquele código CREATE TABLE que eu enviei na mensagem anterior.');
    console.error('Detalhe do erro do Supabase:', testError.message);
    process.exit(1);
  }

  console.log('Tabela verificada! Lendo db.json...');
  
  const rawDataPath = path.join(__dirname, 'src', 'data', 'db.json');
  const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
  
  console.log(`Total de ${rawData.length} registros encontrados no JSON.`);
  console.log('Iniciando envio em lotes (isso pode levar alguns minutos)...');

  // Prepare batch size
  const batchSize = 1000;
  let successCount = 0;

  for (let i = 0; i < rawData.length; i += batchSize) {
    const batch = rawData.slice(i, i + batchSize);
    
    // Map to table structure: matricula, analisador, status, dados (jsonb with everything else)
    const formattedBatch = batch.map(item => ({
      matricula: String(item.MATRICULA_PADRAO || ''),
      analisador: String(item.INSTRUTOR_PADRAO || 'N/I'),
      status: String(item.STATUS_PADRAO || ''),
      dados: item // store the whole object in JSONB for maximum flexibility in the frontend
    }));

    const { error } = await supabase.from('processos').insert(formattedBatch);

    if (error) {
      console.error(`❌ Erro ao enviar lote ${i} - ${i + batchSize}:`, error.message);
    } else {
      successCount += batch.length;
      console.log(`✅ ${successCount} registros enviados...`);
    }
  }

  console.log('\n🎉 MIGRAÇÃO CONCLUÍDA!');
  console.log('Agora você já pode deletar o db.json se quiser, os dados já estão na nuvem.');
}

run();
