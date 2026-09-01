import pandas as pd
import json
import numpy as np

# Load db_capo.json
print("Carregando db_capo.json...")
with open('db_capo.json', 'r', encoding='utf-8') as f:
    db_data = json.load(f)
df_db = pd.DataFrame(db_data)

# Normalize matricula and vinculo in db_capo
def clean_mat_vinc(val):
    if pd.isna(val) or val == 'None' or val is None: return ''
    try:
        return str(int(float(val))).strip()
    except:
        return str(val).strip()

df_db['matricula_clean'] = df_db['matricula'].apply(clean_mat_vinc)
vinc_col = 'VINCULO' if 'VINCULO' in df_db.columns else 'vinculo'
df_db['vinculo_clean'] = df_db[vinc_col].apply(clean_mat_vinc)

# Remove empty matricula from db
df_db = df_db[df_db['matricula_clean'] != '']
# Drop duplicates in db_capo for matricula and vinculo to avoid cross join explosions
# We will keep the first occurrence for simplicity in this report
df_db_unique = df_db.drop_duplicates(subset=['matricula_clean', 'vinculo_clean'])

# Load falecidos
print("Carregando Dados_falecidos...")
df_falecidos = pd.read_excel('SAS_252308_Dados_falecidos_080726.xlsx')
df_falecidos['matricula_clean'] = df_falecidos['MATRICULA'].apply(clean_mat_vinc)
df_falecidos['vinculo_clean'] = df_falecidos['VINCULO'].apply(clean_mat_vinc)
df_falecidos_unique = df_falecidos.drop_duplicates(subset=['matricula_clean', 'vinculo_clean'])

# Load aguardando
print("Carregando Dados_aguardando...")
df_aguardando = pd.read_excel('SAS_252308_Dados_aguardando_aposentadoria_080726.xlsx')
df_aguardando['matricula_clean'] = df_aguardando['MATRICULA'].apply(clean_mat_vinc)
df_aguardando['vinculo_clean'] = df_aguardando['VINCULO'].apply(clean_mat_vinc)
df_aguardando_unique = df_aguardando.drop_duplicates(subset=['matricula_clean', 'vinculo_clean'])

# Cross Reference: Falecidos in db_capo
falecidos_no_db = pd.merge(df_db_unique, df_falecidos_unique, on=['matricula_clean', 'vinculo_clean'], how='inner', suffixes=('_db', '_sas'))

# Output results for Falecidos
print(f"Total de falecidos no SAS (únicos): {len(df_falecidos_unique)}")
print(f"Falecidos encontrados na base consolidada (únicos): {len(falecidos_no_db)}")

# Cross Reference: Aguardando in db_capo
aguardando_no_db = pd.merge(df_db_unique, df_aguardando_unique, on=['matricula_clean', 'vinculo_clean'], how='inner', suffixes=('_db', '_sas'))
print(f"Total aguardando no SAS (únicos): {len(df_aguardando_unique)}")
print(f"Aguardando encontrados na base consolidada (únicos): {len(aguardando_no_db)}")

# Let's save a report
with open('relatorio_cruzamento.md', 'w', encoding='utf-8') as f:
    f.write("# Relatório de Cruzamento de Dados\n\n")
    f.write("## 1. Cruzamento com Dados de Falecidos\n")
    f.write(f"- Total de servidores falecidos no SAS (únicos): {len(df_falecidos_unique)}\n")
    f.write(f"- Destes, encontrados na Base Consolidada CAPO com processo: **{len(falecidos_no_db)}**\n\n")
    
    if len(falecidos_no_db) > 0:
        f.write("Estes servidores possuem processo na base (podendo estar travados aguardando documentação), mas constam como falecidos.\n\n")
        f.write("### Alguns exemplos (Top 10)\n")
        f.write("| Servidor | Matrícula | Vínculo | Status Base | Pendência | Foi ao IGEPPS? |\n")
        f.write("|----------|-----------|---------|-------------|-----------|----------------|\n")
        for _, row in falecidos_no_db.head(10).iterrows():
            servidor = str(row.get('SERVIDOR_db', row.get('SERVIDOR', '')))
            mat = row.get('matricula_clean', '')
            vinc = row.get('vinculo_clean', '')
            status = str(row.get('STATUS_PADRAO', ''))
            pendencia = str(row.get('Pendncias', row.get('Pendências', ''))).replace('\n', ' ')
            igepps = str(row.get('Processo foi ao IGEPPS?', ''))
            f.write(f"| {servidor} | {mat} | {vinc} | {status} | {pendencia} | {igepps} |\n")
    
    f.write("\n## 2. Cruzamento com Dados Aguardando Aposentadoria\n")
    f.write(f"- Total de servidores aguardando aposentadoria no SAS (únicos): {len(df_aguardando_unique)}\n")
    f.write(f"- Encontrados na base consolidada: **{len(aguardando_no_db)}**\n")
    f.write(f"- Aguardando aposentadoria no SAS que **NÃO** constam na base: **{len(df_aguardando_unique) - len(aguardando_no_db)}**\n\n")
    
    f.write("### O que fazer com essas informações?\n")
    f.write("1. **Falecidos com Processo Ativo:** O status desses processos deve ser alterado (ex: Encerrado por Óbito) para que não distorçam os indicadores de 'processos parados com o analista' ou 'aguardando documentação'.\n")
    f.write("2. **Atualização de Indicadores:** Com os falecidos filtrados e cruzando quem realmente aguarda aposentadoria ou já foi ao IGEPPS, podemos construir os dois novos indicadores:\n")
    f.write("   - **IGEPPES**: Processos em análise no IGEPPS.\n")
    f.write("   - **CAPO/SAGEP**: Processos que o CAPO enviou para o IGEPPS.\n")

# Save a CSV with the dead people to help the user
falecidos_no_db.to_csv('falecidos_na_base_capo.csv', index=False, encoding='utf-8-sig')
print("Relatório detalhado gerado em relatorio_cruzamento.md e falecidos_na_base_capo.csv")
