const fs = require('fs');
const path = require('path');

console.log("Loading db.json...");
const dbPath = path.join(__dirname, 'sistema-capo', 'src', 'data', 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log(`Loaded ${dbData.length} records from db.json`);

const csvPath = path.join(__dirname, 'BASE CONSOLIDADA - DADOS.csv');
const csvContent = fs.readFileSync(csvPath, 'latin1'); // Use latin1 or utf8

const rows = csvContent.split('\n');
const headers = rows[0].split(',');
console.log("CSV Headers:", headers);

// Find PAE column index
const paeColIndex = headers.findIndex(h => h && (h.includes('PAE') || h.includes('SIIG')));
console.log("PAE Column Index in CSV:", paeColIndex);

const newProcesses = [];
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  if (!row.trim()) continue;
  
  // Use a proper regex to split CSV line (handles quotes)
  const cols = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
  if (cols.length > paeColIndex) {
    let pae = cols[paeColIndex];
    if (pae) {
      pae = pae.replace(/^"|"$/g, '').trim();
      newProcesses.push({
         pae: pae,
         raw: row,
         cols: cols
      });
    }
  }
}

console.log(`Found ${newProcesses.length} valid processes in CSV`);

// Extract PAEs from db.json
const dbPaes = new Set();
for (const item of dbData) {
  let pae = item['Nº PAE'] || item['N° PAE'] || item['PAE'];
  if (pae) {
    dbPaes.add(String(pae).trim());
  }
}

console.log(`Unique PAEs in db.json: ${dbPaes.size}`);

// Compare
const missingInDb = [];
for (const p of newProcesses) {
  if (!dbPaes.has(p.pae)) {
    missingInDb.push(p);
  }
}

console.log(`Processes missing in db.json (to be added): ${missingInDb.length}`);

if (missingInDb.length > 0) {
  fs.writeFileSync('missing_processes.json', JSON.stringify(missingInDb.map(m => m.pae), null, 2));
  console.log("Saved missing PAEs to missing_processes.json");
}
