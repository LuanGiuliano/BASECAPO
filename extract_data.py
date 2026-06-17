import pandas as pd
import json
import math
import os
import re

def clean_keys(record):
    new_record = {}
    for k, v in record.items():
        if isinstance(k, str):
            new_record[k.strip().upper()] = v
        else:
            new_record[str(k).strip().upper()] = v
    return new_record

def standardize_record(record, filename, sheet):
    # Normalize keys
    r = clean_keys(record)
    
    # 1. SERVIDOR
    servidor = r.get('SERVIDOR') or r.get('NOME DO SERVIDOR') or r.get('NOME DO SEVIDOR') or r.get('NOME') or 'N/I'
    
    # 2. MATRICULA
    matricula = r.get('MATRICULA') or r.get('MATRÍCULA') or r.get('matricula') or r.get('f') or 'N/I'
    
    # 3. CARGO
    cargo = r.get('CARGO') or r.get('FUNÇÃO') or 'N/I'
    
    # 4. STATUS DO PROCESSO
    status = r.get('STATUS DO PROCESSO') or r.get('SITUAÇÃO') or r.get('SITUAÇÃO ATUAL') or r.get('ATIVIDADE')
    
    # If it's from PUBLICAÇÕES, force status to CONCLUIDO/PUBLICADO
    is_publicacao = 'PUBLIC' in filename.upper() or 'APOSENTADOS' in filename.upper()
    if is_publicacao:
        status = 'CONCLUIDO/PUBLICADO'
        
    if not status or pd.isna(status):
        status = 'Não Informado'
        
    # 5. DATA DA PUBLICAÇÃO
    data_pub = r.get('DATA DE PUBLICAÇÃO') or r.get('MÊS/ANO DA PUBLICAÇÃO') or r.get('DATA DO EFEITO FINACEIRO') or r.get('DATA')
    
    # 6. LOCAL ATUAL
    local = r.get('LOCAL ATUAL') or r.get('DRE') or r.get('LOCALIZAÇÃO ATUAL') or r.get('SETOR ATUAL') or r.get('LOCAL. GERAL') or r.get('MUNICIPIO') or 'N/I'
    
    # 7. INTRUTOR(A) PROCESSUAL
    instrutor = r.get('INTRUTOR(A) PROCESSUAL') or r.get('INSTRUTOR PROCESSUAL') or r.get('EQUIPE DADOS') or 'N/I'
    
    # 8. ANO DE ENTRADA / TRAMITAÇÃO
    ano_entrada = r.get('ANO DE ENTRADA ') or r.get('ANO DE ENTRADA') or r.get('ANO TRAMITAÇÃO') or 'N/I'
    if ano_entrada == 'N/I':
        # Try to extract from filename or sheet
        match = re.search(r'\b(19|20)\d{2}\b', filename)
        if match:
            ano_entrada = match.group(0)
        else:
            match = re.search(r'\b(19|20)\d{2}\b', sheet)
            if match:
                ano_entrada = match.group(0)

    # Clean group names
    group = sheet if sheet and len(sheet) < 20 else filename.replace('.xlsx', '')[:20]
    if 'JANEIRO' in group.upper() or 'FEVEREIRO' in group.upper() or 'MARÇO' in group.upper() or 'ABRIL' in group.upper() or 'MAIO' in group.upper() or 'JUNHO' in group.upper() or 'JULHO' in group.upper() or 'AGOSTO' in group.upper() or 'SETEMBRO' in group.upper() or 'OUTUBRO' in group.upper() or 'NOVEMBRO' in group.upper() or 'DEZEMBRO' in group.upper():
        group = f"PUBLICADO {ano_entrada}"

    return {
        'SERVIDOR_PADRAO': servidor,
        'MATRICULA_PADRAO': matricula,
        'CARGO_PADRAO': cargo,
        'STATUS_PADRAO': status,
        'DATA_PUB_PADRAO': data_pub,
        'LOCAL_PADRAO': local,
        'INSTRUTOR_PADRAO': instrutor,
        'ANO_ENTRADA_PADRAO': ano_entrada,
        'grupo_funcional': group,
        'arquivo_origem': filename
    }

def extract():
    directory = '.'
    all_data = []
    
    for filename in os.listdir(directory):
        if filename.endswith('.xlsx') and not filename.startswith('~$'):
            print(f"Lendo arquivo: {filename}...")
            file_path = os.path.join(directory, filename)
            
            try:
                xls = pd.ExcelFile(file_path)
                for sheet in xls.sheet_names:
                    # Skip summary sheets
                    if 'QUANTITATIVO' in sheet.upper() or 'RELAÇÃO' in sheet.upper() or 'RESUMO' in sheet.upper():
                        continue
                        
                    print(f"  Aba: {sheet}")
                    df = pd.read_excel(xls, sheet_name=sheet)
                    
                    if df.empty or len(df.columns) < 2:
                        continue
                        
                    df = df.where(pd.notnull(df), None)
                    
                    for index, row in df.iterrows():
                        record = row.to_dict()
                        
                        # Fix dates
                        for key, val in record.items():
                            if pd.api.types.is_datetime64_any_dtype(type(val)) or str(type(val)) == "<class 'pandas._libs.tslibs.timestamps.Timestamp'>":
                                try:
                                    record[key] = val.strftime('%Y-%m-%d')
                                except:
                                    record[key] = str(val)
                            elif isinstance(val, float) and math.isnan(val):
                                record[key] = None
                                
                        std_record = standardize_record(record, filename, sheet)
                        
                        # Only add if it looks like a valid record (has a Server Name)
                        if std_record['SERVIDOR_PADRAO'] != 'N/I' and not pd.isna(std_record['SERVIDOR_PADRAO']) and str(std_record['SERVIDOR_PADRAO']).upper() != 'NAN':
                            # Combine original with std for full info, but std at top level
                            full_record = {**record, **std_record}
                            all_data.append(full_record)
            except Exception as e:
                print(f"Erro ao processar {filename}: {e}")

    output_path = 'db_capo.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2, default=str)
        
    frontend_path = os.path.join('sistema-capo', 'src', 'data', 'db.json')
    
    # Ensure dir exists
    os.makedirs(os.path.dirname(frontend_path), exist_ok=True)
    
    with open(frontend_path, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2, default=str)
        
    print(f"Extração concluída! {len(all_data)} registros salvos em {output_path} e {frontend_path}")

if __name__ == '__main__':
    extract()
