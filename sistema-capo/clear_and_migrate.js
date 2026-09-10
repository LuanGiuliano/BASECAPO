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
  console.log('Deletando todos os registros antigos da tabela processos...');
  
  // To delete all records, we can use a filter that matches all rows
  const { error: deleteError } = await supabase.from('processos').delete().not('id', 'is', null);
  
  if (deleteError) {
    console.error('Erro ao deletar registros:', deleteError.message);
    process.exit(1);
  }
  
  console.log('Registros antigos deletados com sucesso!');
  console.log('Lendo db.json novo (somente AGA)...');
  
  const rawDataPath = path.join(__dirname, 'src', 'data', 'db.json');
  const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
  
  console.log(`Total de ${rawData.length} registros encontrados no JSON.`);
  console.log('Iniciando envio em lotes...');

  const batchSize = 1000;
  let successCount = 0;

  for (let i = 0; i < rawData.length; i += batchSize) {
    const batch = rawData.slice(i, i + batchSize);
    
    const formattedBatch = batch.map(item => {
      // Find the PAE key despite encoding issues
      const paeKey = Object.keys(item).find(k => k.includes('PAE'));
      const paeValue = paeKey ? item[paeKey] : null;

      // Fix encoding issue by explicitly setting 'Nº PAE'
      item['Nº PAE'] = paeValue;
      
      // Standardize fields for the frontend
      item['SERVIDOR_PADRAO'] = item['SERVIDOR'] || item['SERVIDOR_PADRAO'];
      item['MATRICULA_PADRAO'] = item['MATRICULA'] || item['matricula'] || item['MATRICULA_PADRAO'];
      item['VINCULO_PADRAO'] = item['VINCULO'] || item['VINCULO_PADRAO'];
      item['STATUS_PADRAO'] = item['ATIVIDADE'] || item['STATUS_PADRAO'];
      item['CARGO_PADRAO'] = item['CARGO'] || item['CARGO_PADRAO'];
      item['LOCAL_PADRAO'] = item['SETOR_LOT'] || item['LOCAL_PADRAO'];
      item['OBSERVAÇÃO'] = item['OBS'] || item['OBSERVAÇÃO'];
      
      return {
        matricula: String(item['MATRICULA_PADRAO'] || ''),
        analisador: String(item['INSTRUTOR_PADRAO'] || 'N/I'),
        status: String(item['STATUS_PADRAO'] || ''),
        dados: item
      };
    });

    const { error } = await supabase.from('processos').insert(formattedBatch);

    if (error) {
      console.error(`❌ Erro ao enviar lote ${i} - ${i + batchSize}:`, error.message);
    } else {
      successCount += batch.length;
      console.log(`✅ ${successCount} registros enviados...`);
    }
  }

  console.log('\n🎉 MIGRAÇÃO CONCLUÍDA!');
}

run();
