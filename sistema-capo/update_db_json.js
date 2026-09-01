import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://lhrcbhdnowdtsucqrurn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocmNiaGRub3dkdHN1Y3FydXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTAwNTYsImV4cCI6MjA5Nzg4NjA1Nn0.RdRkbDu5KlnPPP7H0uJCed4QbZzI_IkcWuomMKRLx2k';
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDbJson() {
  console.log('Baixando dados do Supabase para atualizar db.json...');
  let allProcesses = [];
  let page = 0;
  const pageSize = 1000;
  let fetchMore = true;

  while (fetchMore) {
    const { data, error } = await supabase
      .from('processos')
      .select('dados')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error('Erro:', error);
      break;
    }

    if (data.length === 0) {
      fetchMore = false;
    } else {
      // db.json seems to just contain the array of `dados`
      const dadosOnly = data.map(d => d.dados);
      allProcesses = allProcesses.concat(dadosOnly);
      page++;
    }
  }

  const dbPath = path.join(__dirname, 'src', 'data', 'db.json');
  fs.writeFileSync(dbPath, JSON.stringify(allProcesses, null, 2), 'utf8');
  console.log(`✅ db.json atualizado com ${allProcesses.length} registros.`);
}

updateDbJson();
