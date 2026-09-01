import pandas as pd
import json
import re

print("Carregando bases...")
with open('db_capo.json', 'r', encoding='utf-8') as f:
    db_data = json.load(f)
df_db = pd.DataFrame(db_data)

# Find the exact name of the PAE column in db_capo
pae_col = None
for col in df_db.columns:
    if 'PAE' in col:
        pae_col = col
        break

if not pae_col:
    print("Coluna de processo PAE nao encontrada na base!")
    exit(1)

def clean_mat_vinc(val):
    if pd.isna(val) or val == 'None' or val is None: return ''
    try:
        return str(int(float(val))).strip()
    except:
        return str(val).strip()

df_db['matricula_clean'] = df_db['matricula'].apply(clean_mat_vinc)
vinc_col = 'VINCULO' if 'VINCULO' in df_db.columns else 'vinculo'
df_db['vinculo_clean'] = df_db[vinc_col].apply(clean_mat_vinc)

# Clean process numbers in DB
def extract_process(text):
    if pd.isna(text): return ''
    text = str(text)
    # Procurar padrão como 2021/123456 ou 2023/123456
    matches = re.findall(r'(\d{4}/\d+)', text)
    if matches:
        return matches[0]
    
    # Procurar apenas números se não achar barra
    numeros = re.sub(r'\D', '', text)
    return numeros if len(numeros) >= 5 else ''

df_db['processo_db'] = df_db[pae_col].apply(extract_process)
df_db_unique = df_db.drop_duplicates(subset=['matricula_clean', 'vinculo_clean'])

# Aguardando
df_aguardando = pd.read_excel('SAS_252308_Dados_aguardando_aposentadoria_080726.xlsx')
df_aguardando['matricula_clean'] = df_aguardando['MATRICULA'].apply(clean_mat_vinc)
df_aguardando['vinculo_clean'] = df_aguardando['VINCULO'].apply(clean_mat_vinc)
df_aguardando['processo_sas'] = df_aguardando['OBSERVACAO'].apply(extract_process)

# Since we want to compare process numbers, we shouldn't arbitrarily drop duplicates if they have different process numbers
# Let's keep all unique pairs of (matricula, vinculo, processo_sas)
df_aguardando_unique_proc = df_aguardando.drop_duplicates(subset=['matricula_clean', 'vinculo_clean', 'processo_sas'])

# Merge
merged = pd.merge(df_db_unique, df_aguardando_unique_proc, on=['matricula_clean', 'vinculo_clean'], how='inner', suffixes=('_db', '_sas'))

# Identify matches and mismatches
merged['processo_igual'] = merged.apply(lambda r: r['processo_db'] == r['processo_sas'] if r['processo_sas'] != '' else 'SAS sem processo', axis=1)

diferentes = merged[(merged['processo_igual'] == False) & (merged['processo_sas'] != '')]
iguais = merged[merged['processo_igual'] == True]
sem_proc_sas = merged[merged['processo_igual'] == 'SAS sem processo']

print(f"Total cruzados: {len(merged)}")
print(f"Processos iguais: {len(iguais)}")
print(f"Processos diferentes: {len(diferentes)}")
print(f"Sem número de processo na observação do SAS: {len(sem_proc_sas)}")

# Save different ones to CSV for user to inspect
diferentes[['SERVIDOR_db', 'matricula_clean', 'vinculo_clean', pae_col, 'processo_db', 'OBSERVACAO', 'processo_sas']].to_csv('processos_diferentes.csv', index=False, encoding='utf-8-sig')

# Falecidos (don't have OBSERVACAO column usually, but let's check)
df_falecidos = pd.read_excel('SAS_252308_Dados_falecidos_080726.xlsx')
if 'OBSERVACAO' in df_falecidos.columns:
    df_falecidos['matricula_clean'] = df_falecidos['MATRICULA'].apply(clean_mat_vinc)
    df_falecidos['vinculo_clean'] = df_falecidos['VINCULO'].apply(clean_mat_vinc)
    df_falecidos['processo_sas'] = df_falecidos['OBSERVACAO'].apply(extract_process)
    df_falecidos_unique_proc = df_falecidos.drop_duplicates(subset=['matricula_clean', 'vinculo_clean', 'processo_sas'])
    merged_falecidos = pd.merge(df_db_unique, df_falecidos_unique_proc, on=['matricula_clean', 'vinculo_clean'], how='inner')
    merged_falecidos['processo_igual'] = merged_falecidos.apply(lambda r: r['processo_db'] == r['processo_sas'] if r['processo_sas'] != '' else 'SAS sem processo', axis=1)
    falecidos_diff = merged_falecidos[(merged_falecidos['processo_igual'] == False) & (merged_falecidos['processo_sas'] != '')]
    if len(falecidos_diff) > 0:
        falecidos_diff[['SERVIDOR_db', 'matricula_clean', 'vinculo_clean', pae_col, 'processo_db', 'OBSERVACAO', 'processo_sas']].to_csv('falecidos_processos_diferentes.csv', index=False, encoding='utf-8-sig')
    print(f"Falecidos com processos diferentes: {len(falecidos_diff)}")
else:
    print("Tabela de Falecidos não possui coluna OBSERVACAO.")

with open('relatorio_processos.md', 'w', encoding='utf-8') as f:
    f.write("# Análise de Números de Processo\n\n")
    f.write("Fizemos a extração dos números de processo da coluna `OBSERVACAO` do SAS e comparamos com a nossa base consolidada (`Nº PAE`).\n\n")
    f.write(f"- Servidores cruzados com sucesso: {len(merged)}\n")
    f.write(f"- Processos IGUAIS: {len(iguais)}\n")
    f.write(f"- Processos DIFERENTES: {len(diferentes)}\n")
    f.write(f"- SAS não informou número do processo: {len(sem_proc_sas)}\n\n")
    
    if len(diferentes) > 0:
        f.write("### Alguns Servidores com Processos Diferentes (Top 10)\n")
        f.write("Abaixo estão casos onde o servidor tem um número de processo na base CAPO, mas a observação do SAS cita outro número de processo.\n\n")
        f.write("| Servidor | Mat/Vinc | Nº PAE (Base CAPO) | Observação (SAS) | Nº Processo Extraído (SAS) |\n")
        f.write("|----------|----------|--------------------|------------------|-----------------------------|\n")
        for _, row in diferentes.head(10).iterrows():
            servidor = str(row['SERVIDOR_db'])
            mat = row['matricula_clean'] + '/' + row['vinculo_clean']
            pae = str(row[pae_col]).replace('\n', ' ')
            obs = str(row['OBSERVACAO']).replace('\n', ' ')
            proc_sas = row['processo_sas']
            f.write(f"| {servidor} | {mat} | {pae} | {obs} | {proc_sas} |\n")

print("Análise de processos concluída e gerada em relatorio_processos.md")
