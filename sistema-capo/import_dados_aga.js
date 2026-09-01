import { createClient } from '@supabase/supabase-js';
import { read, utils } from 'xlsx';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://lhrcbhdnowdtsucqrurn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocmNiaGRub3dkdHN1Y3FydXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTAwNTYsImV4cCI6MjA5Nzg4NjA1Nn0.RdRkbDu5KlnPPP7H0uJCed4QbZzI_IkcWuomMKRLx2k';
const supabase = createClient(supabaseUrl, supabaseKey);

const excelFilePath = path.join(__dirname, '..', 'AGUARDANDO APOSENTADORIA (AGA e AAI) 25082026 SAS 256084 .xlsx');

function normalizeKey(key) {
  if (!key) return '';
  return String(key).replace(/\.0$/, '').trim();
}

async function run() {
  console.log('Lendo a planilha de aguardando aposentadoria...');
  
  const buf = fs.readFileSync(excelFilePath);
  const workbook = read(buf, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const newRecords = utils.sheet_to_json(worksheet);

  console.log(`✅ ${newRecords.length} registros lidos do Excel.`);
  
  const batchInsert = [];

  for (const row of newRecords) {
    const mat = normalizeKey(row['MATRICULA']);
    if (!mat && !row['SERVIDOR']) continue; // Pula linha em branco
    
    // Mapeamento mantendo a estrutura do json "dados" semelhante
    const mappedDados = {
      ...row, // traz todos os dados originais do excel
      "matricula": mat,
      "DRE": row['URE_LOT'],
      "MUNICIPIO": row['MUNICIPIO_LOT'],
      "ESCOLA": row['SETOR_LOT'],
      "VINCULO_PADRAO": String(row['VINCULO']),
      "SERVIDOR_PADRAO": row['SERVIDOR'],
      "MATRICULA_PADRAO": mat,
      "CARGO_PADRAO": row['CARGO'],
      "STATUS_PADRAO": row['ATIVIDADE'],
      "LOCAL_PADRAO": row['URE_LOT'],
      "base_origem": "Dados AGA" // O RÓTULO CHAVE
    };
    
    batchInsert.push({
      matricula: mat || 'N/I',
      analisador: 'N/I',
      status: row['ATIVIDADE'] || 'N/I',
      dados: mappedDados
    });
  }
  
  console.log(`\nResumo:`);
  console.log(`- Registros para Inserir (Dados AGA): ${batchInsert.length}`);
  
  if (batchInsert.length > 0) {
    console.log(`Inserindo novos registros...`);
    const chunkSize = 500;
    for (let i = 0; i < batchInsert.length; i += chunkSize) {
      const chunk = batchInsert.slice(i, i + chunkSize);
      const { error } = await supabase.from('processos').insert(chunk);
      if (error) {
        console.error('Erro no Insert:', error);
      } else {
        process.stdout.write('.');
      }
    }
    console.log('\n');
  }
  
  console.log('Sincronização da nova base concluída com o Supabase!');
}

run();
