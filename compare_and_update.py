import csv
import json
import traceback

try:
    print("Loading db.json...")
    with open('sistema-capo/src/data/db.json', 'r', encoding='utf-8') as f:
        db_data = json.load(f)
    
    db_paes = set()
    db_mats = set()
    for item in db_data:
        pae = item.get('Nº PAE') or item.get('N° PAE') or item.get('PAE')
        if pae and str(pae).strip() != '-':
            db_paes.add(str(pae).strip())
        mat = item.get('matricula') or item.get('MATRICULA_PADRAO')
        if mat:
            # handle float like 398993.0
            db_mats.add(str(mat).replace('.0', '').strip())

    print(f"Loaded {len(db_data)} records from db.json")
    print(f"Unique PAEs in db.json: {len(db_paes)}")
    print(f"Unique Matriculas in db.json: {len(db_mats)}")

    new_processes = []
    
    print("Loading BASE CONSOLIDADA - DADOS.csv...")
    try:
        f = open('BASE CONSOLIDADA - DADOS.csv', 'r', encoding='utf-8')
        reader = csv.DictReader(f)
        for row in reader:
             new_processes.append(row)
    except UnicodeDecodeError:
        f.close()
        f = open('BASE CONSOLIDADA - DADOS.csv', 'r', encoding='latin1')
        reader = csv.DictReader(f)
        for row in reader:
             new_processes.append(row)

    print(f"Loaded {len(new_processes)} records from CSV.")
    if len(new_processes) > 0:
        print("Keys:", list(new_processes[0].keys()))
    
    missing_records = []
    
    # We will match by PAE or by Matricula
    for row in new_processes:
        pae = row.get('Nº PAE/SIIG') or row.get('N° PAE/SIIG') or row.get('PAE')
        mat = row.get('Matrícula') or row.get('Matrcula')
        
        has_match = False
        if pae and str(pae).strip() != '-' and str(pae).strip() in db_paes:
            has_match = True
        elif mat and str(mat).replace('.0','').strip() in db_mats:
            has_match = True
            
        if not has_match:
            missing_records.append(row)
            
    print(f"Missing records to be added: {len(missing_records)}")
    
    # Write the missing to a json for inspection
    with open('missing_processes_parsed.json', 'w', encoding='utf-8') as mf:
        json.dump(missing_records, mf, indent=2, ensure_ascii=False)
        
    print("Saved missing records to missing_processes_parsed.json")
    
    # Also we want to add them to db.json to update it
    # We should map the CSV fields to db.json fields
    if missing_records:
        for row in missing_records:
            # Create a mapped object
            new_item = {
                "DRE": row.get('DRE'),
                "MUNICIPIO": row.get('MUNICIPIO'),
                "ESCOLA": row.get('ESCOLA'),
                "matricula": float(row.get('Matrícula', 0)) if row.get('Matrícula', '').isnumeric() else row.get('Matrícula'),
                "VINCULO": float(row.get('VINCULO', 1)) if row.get('VINCULO', '').isnumeric() else row.get('VINCULO'),
                "SERVIDOR": row.get('SERVIDOR'),
                "CPF": float(row.get('CPF', 0)) if row.get('CPF', '').isnumeric() else row.get('CPF'),
                "TIPO_VINCULO": row.get('TIPO_VINCULO'),
                "DT_EXERCICIO": row.get('DT_EXERCICIO'),
                "DT_INICIO_LOTACAO": row.get('DT_INICIO_LOTACAO'),
                "DT_FIM_LOTACAO": row.get('DT_FIM_LOTACAO'),
                "CARGO": row.get('CARGO'),
                "ATIVIDADE": row.get('ATIVIDADE'),
                "MODALIDADE": row.get('MODALIDADE'),
                "LICENCA_MNEMONICO": row.get('MNEMONICO'),
                "Nº PAE": row.get('Nº PAE/SIIG'),
                "Processo foi ao IGEPPS?": row.get('Processo foi ao IGEPPS?'),
                "Processo retornou do IGEPPS?": row.get('Processo retornou do IGEPPS?'),
                "Localização atual": row.get('Localização atual'),
                "Ultima movimentação": row.get('Ultima movimentação'),
                "Pendências": row.get('Pendências'),
                "Qual documentação": row.get('qual documentação?'),
                "SERVIDOR_PADRAO": row.get('SERVIDOR'),
                "MATRICULA_PADRAO": float(row.get('Matrícula', 0)) if row.get('Matrícula', '').isnumeric() else row.get('Matrícula'),
                "VINCULO_PADRAO": float(row.get('VINCULO', 1)) if row.get('VINCULO', '').isnumeric() else row.get('VINCULO'),
                "CARGO_PADRAO": row.get('CARGO'),
                "STATUS_PADRAO": row.get('ATIVIDADE'),
                "DATA_PUB_PADRAO": None,
                "LOCAL_PADRAO": row.get('DRE'),
                "INSTRUTOR_PADRAO": "N/I",
                "ANO_ENTRADA_PADRAO": "N/I",
                "grupo_funcional": "DADOS_NOVOS",
                "arquivo_origem": "BASE CONSOLIDADA - DADOS.csv"
            }
            db_data.append(new_item)
            
        with open('sistema-capo/src/data/db.json', 'w', encoding='utf-8') as f:
            json.dump(db_data, f, ensure_ascii=False, indent=2)
            
        print(f"Added {len(missing_records)} records to db.json successfully!")
        
except Exception as e:
    print("Error:")
    traceback.print_exc()
