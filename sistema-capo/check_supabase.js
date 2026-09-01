import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhrcbhdnowdtsucqrurn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocmNiaGRub3dkdHN1Y3FydXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTAwNTYsImV4cCI6MjA5Nzg4NjA1Nn0.RdRkbDu5KlnPPP7H0uJCed4QbZzI_IkcWuomMKRLx2k';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Buscando processos do Supabase...');
  
  let allProcesses = [];
  let page = 0;
  const pageSize = 1000;
  let fetchMore = true;

  while (fetchMore) {
    const { data, error } = await supabase
      .from('processos')
      .select("id, dados->'Nº PAE' as pae, dados->'N° PAE' as pae2, dados->'Nº PAE/SIIG' as pae3")
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error('Erro:', error);
      break;
    }

    if (data.length === 0) {
      fetchMore = false;
    } else {
      allProcesses = allProcesses.concat(data);
      page++;
      console.log(`Buscando página ${page}... (${allProcesses.length} registros totais)`);
    }
  }

  const uniquePAEs = new Set();
  let countWithPae = 0;
  for (const row of allProcesses) {
    const pae = row.pae || row.pae2 || row.pae3;
    if (pae && pae !== '-') {
      uniquePAEs.add(String(pae).trim());
      countWithPae++;
    }
  }

  console.log(`\nTotal de registros no Supabase: ${allProcesses.length}`);
  console.log(`Registros com PAE: ${countWithPae}`);
  console.log(`PAEs únicos no Supabase: ${uniquePAEs.size}`);
}

run();
