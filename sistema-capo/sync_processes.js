import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://lhrcbhdnowdtsucqrurn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxocmNiaGRub3dkdHN1Y3FydXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMTAwNTYsImV4cCI6MjA5Nzg4NjA1Nn0.RdRkbDu5KlnPPP7H0uJCed4QbZzI_IkcWuomMKRLx2k';
const supabase = createClient(supabaseUrl, supabaseKey);

const csvFilePath = path.join(__dirname, '..', 'BASE CONSOLIDADA - DADOS.csv');

async function fetchAllSupabaseProcesses() {
  console.log('Baixando registros atuais do Supabase...');
  let allProcesses = [];
  let page = 0;
  const pageSize = 1000;
  let fetchMore = true;

  while (fetchMore) {
    const { data, error } = await supabase
      .from('processos')
      .select('id, matricula, status, dados')
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error('Erro ao buscar do Supabase:', error);
      break;
    }

    if (data.length === 0) {
      fetchMore = false;
    } else {
      allProcesses = allProcesses.concat(data);
      page++;
    }
  }
  console.log(`✅ Total de registros no Supabase: ${allProcesses.length}`);
  return allProcesses;
}

function normalizeKey(key) {
  if (!key) return '';
  return String(key).replace(/\.0$/, '').trim();
}

async function run() {
  const existingProcesses = await fetchAllSupabaseProcesses();
  
  // Create quick lookup maps
  // We map by PAE and by Matricula
  const dbByPae = new Map();
  const dbByMatricula = new Map();
  
  for (const proc of existingProcesses) {
    const dados = proc.dados || {};
    const pae = normalizeKey(dados['Nº PAE'] || dados['N° PAE'] || dados['PAE'] || dados['Nº PAE/SIIG']);
    const mat = normalizeKey(proc.matricula);
    
    if (pae && pae !== '-' && pae.toLowerCase() !== 'não informado' && pae !== 'N/I') {
      // It's possible for multiple records to have the same PAE if duplicated, keep the first or an array
      if (!dbByPae.has(pae)) dbByPae.set(pae, []);
      dbByPae.get(pae).push(proc);
    }
    
    if (mat) {
      if (!dbByMatricula.has(mat)) dbByMatricula.set(mat, []);
      dbByMatricula.get(mat).push(proc);
    }
  }

  const newRecords = [];
  
  console.log('Lendo a planilha consolidada...');
  
  fs.createReadStream(csvFilePath, { encoding: 'utf8' })
    .pipe(csv({
      mapHeaders: ({ header }) => header.trim()
    }))
    .on('data', (row) => {
      newRecords.push(row);
    })
    .on('end', async () => {
      console.log(`✅ ${newRecords.length} registros lidos do CSV.`);
      
      let insertedCount = 0;
      let updatedCount = 0;
      let skippedCount = 0;
      
      const batchInsert = [];
      const batchUpdate = [];

      for (const row of newRecords) {
        const rawPae = row['Nº PAE/SIIG'] || row['N° PAE/SIIG'] || row['PAE'];
        let pae = normalizeKey(rawPae);
        if (!pae || pae === '-') {
            pae = 'Não informado';
        }
        
        const mat = normalizeKey(row['Matrícula'] || row['Matrcula']);
        if (!mat && !rawPae) continue; // Pula linha em branco
        
        const cpf = normalizeKey(row['CPF']);
        
        let matchedProc = null;
        
        // 1. Try to find by PAE first (if it is informed)
        if (pae !== 'Não informado' && dbByPae.has(pae)) {
          matchedProc = dbByPae.get(pae)[0];
        } 
        // 2. If no PAE match, find by Matricula, BUT we should only use Matricula match if we are updating a record that doesn't have a PAE yet
        else if (mat && dbByMatricula.has(mat)) {
          const procsByMat = dbByMatricula.get(mat);
          // Find if there's a record for this matricula that doesn't have a PAE
          const emptyPaeProc = procsByMat.find(p => {
             const pPae = normalizeKey(p.dados['Nº PAE'] || p.dados['N° PAE'] || p.dados['PAE'] || p.dados['Nº PAE/SIIG']);
             return !pPae || pPae === '-' || pPae.toLowerCase() === 'não informado' || pPae === 'N/I';
          });
          
          if (emptyPaeProc) {
              matchedProc = emptyPaeProc;
          }
        }
        
        // Map the fields for inserting/updating
        const mappedDados = {
          "DRE": row['DRE'],
          "MUNICIPIO": row['MUNICIPIO'],
          "ESCOLA": row['ESCOLA'],
          "matricula": mat,
          "VINCULO": row['VINCULO'],
          "SERVIDOR": row['SERVIDOR'],
          "CPF": cpf,
          "TIPO_VINCULO": row['TIPO_VINCULO'],
          "DT_EXERCICIO": row['DT_EXERCICIO'],
          "DT_INICIO_LOTACAO": row['DT_INICIO_LOTACAO'],
          "DT_FIM_LOTACAO": row['DT_FIM_LOTACAO'],
          "CARGO": row['CARGO'],
          "ATIVIDADE": row['ATIVIDADE'],
          "MODALIDADE": row['MODALIDADE'],
          "LICENCA_MNEMONICO": row['MNEMONICO'],
          "Nº PAE/SIIG": pae,
          "Processo foi ao IGEPPS?": row['Processo foi ao IGEPPS?'],
          "Processo retornou do IGEPPS?": row['Processo retornou do IGEPPS?'],
          "Localização atual": row['Localização atual'] || row['Localizao atual'], // fallback for latin1 accents if any
          "Ultima movimentação": row['Ultima movimentação'] || row['Ultima movimentao'],
          "Pendências": row['Pendências'] || row['Pendncias'],
          "Qual documentação": row['qual documentação?'] || row['qual documentao?'],
          "SERVIDOR_PADRAO": row['SERVIDOR'],
          "MATRICULA_PADRAO": mat,
          "VINCULO_PADRAO": row['VINCULO'],
          "CARGO_PADRAO": row['CARGO'],
          "STATUS_PADRAO": row['ATIVIDADE'],
          "LOCAL_PADRAO": row['DRE'],
          "INSTRUTOR_PADRAO": "N/I",
          "ANO_ENTRADA_PADRAO": "N/I",
          "grupo_funcional": "DADOS",
          "arquivo_origem": "BASE CONSOLIDADA - DADOS.csv"
        };
        
        if (matchedProc) {
          // Rule 1: "se já existe apenas atualize caso algum novo numero apareça. não precisa alterar os que já estao ok"
          let needsUpdate = false;
          const updatedDados = { ...matchedProc.dados };
          
          // Check if PAE needs to be populated
          const oldPae = normalizeKey(updatedDados['Nº PAE/SIIG'] || updatedDados['Nº PAE']);
          if ((!oldPae || oldPae === 'Não informado' || oldPae === 'N/I' || oldPae === '-') && pae !== 'Não informado') {
             updatedDados['Nº PAE/SIIG'] = pae;
             needsUpdate = true;
          }
          
          // Check if other fields are empty in DB but exist in CSV
          const keysToCheck = ['Pendências', 'Localização atual', 'Ultima movimentação', 'Qual documentação', 'CPF'];
          for (const k of keysToCheck) {
             const oldVal = updatedDados[k];
             const newVal = mappedDados[k];
             if ((!oldVal || oldVal.toString().trim() === '' || oldVal === '-') && newVal && newVal.toString().trim() !== '') {
                 updatedDados[k] = newVal;
                 needsUpdate = true;
             }
          }
          
          if (needsUpdate) {
            batchUpdate.push({
               id: matchedProc.id,
               dados: updatedDados,
               matricula: mat || matchedProc.matricula,
               status: mappedDados['ATIVIDADE'] || matchedProc.status
            });
            updatedCount++;
          } else {
            skippedCount++;
          }
          
        } else {
          // Rule 2: "se não tiver o PAE pode deixar em branco. coloque como não infromado e ai deixe o cpf que os analisadores podem encontrar mais facilmente"
          batchInsert.push({
            matricula: mat || 'N/I',
            analisador: 'N/I',
            status: mappedDados['ATIVIDADE'] || 'N/I',
            dados: mappedDados
          });
          insertedCount++;
        }
      }
      
      console.log(`\nResumo:`);
      console.log(`- Registros para Inserir: ${batchInsert.length}`);
      console.log(`- Registros para Atualizar: ${batchUpdate.length}`);
      console.log(`- Registros já OK (Ignorados): ${skippedCount}`);
      
      if (batchInsert.length > 0) {
        console.log(`Inserindo novos registros...`);
        // chunk inserts to avoid limits
        const chunkSize = 500;
        for (let i = 0; i < batchInsert.length; i += chunkSize) {
          const chunk = batchInsert.slice(i, i + chunkSize);
          const { error } = await supabase.from('processos').insert(chunk);
          if (error) console.error('Erro no Insert:', error);
        }
      }
      
      if (batchUpdate.length > 0) {
        console.log(`Atualizando registros...`);
        // Update must be done individually or via upsert
        for (const up of batchUpdate) {
           const { error } = await supabase.from('processos').update({
              dados: up.dados,
              matricula: up.matricula,
              status: up.status
           }).eq('id', up.id);
           if (error) console.error(`Erro no Update (id ${up.id}):`, error);
        }
      }
      
      console.log('Sincronização concluída com o Supabase!');
    });
}

run();
