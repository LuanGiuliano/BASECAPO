import json
import pandas as pd
import math
import numpy as np

def fix_cpf(cpf):
    if pd.isna(cpf) or cpf == '' or cpf is None:
        return None
    # convert to string, remove float decimals
    cpf_str = str(cpf)
    if cpf_str.endswith('.0'):
        cpf_str = cpf_str[:-2]
    
    # remove non-numeric chars just in case
    cpf_str = ''.join(filter(str.isdigit, cpf_str))
    
    if len(cpf_str) == 0:
        return None
        
    # The rule: "o 0 à esquerda foi movido para o final (ex: um CPF que deveria ser 08687463200 está salvo como 86874632000)"
    if len(cpf_str) == 11 and cpf_str.endswith('0') and not cpf_str.startswith('0'):
        # Move the trailing 0 to the front
        cpf_str = '0' + cpf_str[:-1]
        
    # Pad left up to 11
    return cpf_str.zfill(11)

def get_col(df, possible_names):
    for col in df.columns:
        for name in possible_names:
            if name.lower() in col.lower():
                return col
    return None

def main():
    print("Carregando bases...")
    with open('db_capo.json', 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    df_aga = pd.read_excel('Cópia de AGA ATUALIZADO .xlsx')
    
    print(f"Total inicial na base consolidada: {len(db)}")
    print(f"Total na base AGA: {len(df_aga)}")
    
    # Index DB by (matricula, vinculo)
    db_dict = {}
    cpf_fixed_count = 0
    
    for row in db:
        # Fix CPF
        old_cpf = row.get('CPF')
        new_cpf = fix_cpf(old_cpf)
        if str(old_cpf) != str(new_cpf) and old_cpf is not None and str(old_cpf) != 'nan':
            cpf_fixed_count += 1
        row['CPF'] = new_cpf
        
        try:
            mat = int(float(row.get('matricula', 0)))
            vinc = int(float(row.get('VINCULO', 0)))
            db_dict[(mat, vinc)] = row
        except (ValueError, TypeError):
            pass

    print(f"CPFs corrigidos na base: {cpf_fixed_count}")
    
    # Find columns in AGA
    col_matricula = get_col(df_aga, ['matricula'])
    col_vinculo = get_col(df_aga, ['vinculo', 'vínculo'])
    col_pae = get_col(df_aga, ['pae', 'siig'])
    col_loc = get_col(df_aga, ['localiza', 'atual'])
    col_mov = get_col(df_aga, ['ultima', 'movimenta'])
    col_pend = get_col(df_aga, ['pend'])
    col_doc = get_col(df_aga, ['qual document'])
    
    print(f"Colunas mapeadas no AGA:")
    print(f" PAE: {col_pae}")
    print(f" Localizacao: {col_loc}")
    print(f" Movimentacao: {col_mov}")
    
    # Find columns in DB
    db_keys = list(db[0].keys())
    db_col_pae = get_col(pd.DataFrame(columns=db_keys), ['pae'])
    db_col_loc = get_col(pd.DataFrame(columns=db_keys), ['localiza', 'atual'])
    db_col_mov = get_col(pd.DataFrame(columns=db_keys), ['ultima', 'movimenta'])
    db_col_pend = get_col(pd.DataFrame(columns=db_keys), ['pend'])
    db_col_doc = get_col(pd.DataFrame(columns=db_keys), ['qual document'])
    
    if not db_col_pae: db_col_pae = 'Nº PAE'
    if not db_col_loc: db_col_loc = 'Localização atual'
    if not db_col_mov: db_col_mov = 'Ultima movimentação'
    
    updates_pae = 0
    updates_loc = 0
    updates_mov = 0
    inserts = 0
    
    for _, row in df_aga.iterrows():
        try:
            mat = int(float(row[col_matricula]))
            vinc = int(float(row[col_vinculo]))
        except (ValueError, TypeError):
            continue
            
        key = (mat, vinc)
        
        aga_pae = str(row[col_pae]) if col_pae and pd.notna(row[col_pae]) else ''
        aga_loc = str(row[col_loc]) if col_loc and pd.notna(row[col_loc]) else ''
        aga_mov = str(row[col_mov]) if col_mov and pd.notna(row[col_mov]) else ''
        aga_pend = str(row[col_pend]) if col_pend and pd.notna(row[col_pend]) else ''
        aga_doc = str(row[col_doc]) if col_doc and pd.notna(row[col_doc]) else ''
        
        def is_empty(val):
            v = str(val).strip()
            return v in ['', '-', 'nan', 'None', 'N/I', 'null']

        if key in db_dict:
            # Exists, check missing
            db_row = db_dict[key]
            
            # Check PAE
            if not is_empty(aga_pae):
                curr_pae = db_row.get(db_col_pae)
                if is_empty(curr_pae):
                    db_row[db_col_pae] = aga_pae
                    updates_pae += 1
            
            # Check Localizacao
            if not is_empty(aga_loc):
                curr_loc = db_row.get(db_col_loc)
                if is_empty(curr_loc):
                    db_row[db_col_loc] = aga_loc
                    updates_loc += 1
                    
            # Check Movimentacao
            if not is_empty(aga_mov):
                curr_mov = db_row.get(db_col_mov)
                if is_empty(curr_mov):
                    db_row[db_col_mov] = aga_mov
                    updates_mov += 1
                    
            # Check Pendencias
            if db_col_pend and not is_empty(aga_pend):
                curr_pend = db_row.get(db_col_pend)
                if is_empty(curr_pend):
                    db_row[db_col_pend] = aga_pend
                    
            # Check Documentacao
            if db_col_doc and not is_empty(aga_doc):
                curr_doc = db_row.get(db_col_doc)
                if is_empty(curr_doc):
                    db_row[db_col_doc] = aga_doc
                    
        else:
            # DOES NOT EXIST - Append
            new_row = {
                'matricula': mat,
                'VINCULO': vinc,
                'CPF': fix_cpf(row.get(get_col(df_aga, ['cpf'])))
            }
            # copy all columns from AGA to db_row carefully
            for col in df_aga.columns:
                val = row[col]
                if pd.notna(val):
                    # check if we have a match in DB cols
                    db_col_match = get_col(pd.DataFrame(columns=db_keys), [col])
                    if db_col_match:
                        # use native python types
                        if isinstance(val, (np.int64, np.float64)):
                            val = val.item()
                        elif isinstance(val, pd.Timestamp):
                            val = str(val)
                        new_row[db_col_match] = val
                    else:
                        if isinstance(val, (np.int64, np.float64)):
                            val = val.item()
                        elif isinstance(val, pd.Timestamp):
                            val = str(val)
                        new_row[col] = val
                        
            # Set default source
            new_row['arquivo_origem'] = 'AGA ATUALIZADO 12052026'
            db.append(new_row)
            inserts += 1

    print(f"Total de Nº PAE complementados: {updates_pae}")
    print(f"Total de Localização atual complementados: {updates_loc}")
    print(f"Total de Ultima movimentação complementados: {updates_mov}")
    print(f"Novos servidores inseridos (não existiam): {inserts}")
    print(f"Total final na base consolidada: {len(db)}")
    
    # Save files
    print("Salvando arquivos...")
    with open('db_capo.json', 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
        
    with open('sistema-capo/src/data/db.json', 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
        
    print("Concluído!")

if __name__ == '__main__':
    main()
