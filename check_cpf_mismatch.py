import pandas as pd
import json

def clean_cpf(cpf):
    if pd.isna(cpf): return None
    cpf_str = str(cpf).replace('.', '').replace('-', '').strip()
    try:
        if cpf_str.endswith('.0'): cpf_str = cpf_str[:-2]
        cpf_str = cpf_str.zfill(11)
        return cpf_str
    except:
        return cpf_str

def clean_matricula(mat):
    if pd.isna(mat): return None
    mat_str = str(mat).strip()
    if mat_str.endswith('.0'):
        mat_str = mat_str[:-2]
    return mat_str

print("Loading data...")
# Load db_capo
with open('db_capo.json', encoding='utf-8') as f:
    db_list = json.load(f)
db = pd.DataFrame(db_list)
db['MATRICULA_clean'] = db['matricula'].apply(clean_matricula)
db['CPF_clean'] = db['CPF'].apply(clean_cpf)

# Load AGA
aga_df = pd.read_excel('Cópia de AGA ATUALIZADO .xlsx')
aga_df['MATRICULA_clean'] = aga_df['MATRICULA'].apply(clean_matricula)
aga_df['CPF_clean'] = aga_df['CPF'].apply(clean_cpf)

merged = pd.merge(aga_df, db, on='MATRICULA_clean', suffixes=('_AGA', '_DB'))
print(f"Total matriculas matched: {len(merged)}")
if len(merged) > 0:
    print("\nSample of matched Matriculas and their CPFs:")
    print(merged[['MATRICULA_clean', 'CPF_clean_AGA', 'CPF_clean_DB']].head(10).to_string())

