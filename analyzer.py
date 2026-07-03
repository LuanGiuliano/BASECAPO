import pandas as pd
import json

def clean_matricula(mat):
    if pd.isna(mat): return None
    mat_str = str(mat).strip()
    if mat_str.endswith('.0'):
        mat_str = mat_str[:-2]
    return mat_str

def clean_vinculo(vinc):
    if pd.isna(vinc): return None
    vinc_str = str(vinc).strip()
    if vinc_str.endswith('.0'):
        vinc_str = vinc_str[:-2]
    return vinc_str

def clean_cpf_db(cpf_str):
    # Reverse the corruption to see if it matches AGA
    if pd.isna(cpf_str): return None
    s = str(cpf_str).strip()
    if s.endswith('0'):
        s = s[:-1]
    return s.zfill(11)

def clean_cpf_aga(cpf_str):
    if pd.isna(cpf_str): return None
    s = str(cpf_str).replace('.', '').replace('-', '').strip()
    try:
        if s.endswith('.0'): s = s[:-2]
        return s.zfill(11)
    except:
        return s

def analyze_cross_reference():
    # Load db_capo
    with open('db_capo.json', encoding='utf-8') as f:
        db_list = json.load(f)
    db = pd.DataFrame(db_list)
    
    db['MATRICULA_clean'] = db['matricula'].apply(clean_matricula)
    db['VINCULO_clean'] = db['VINCULO'].apply(clean_vinculo)
    db['UNIQUE_KEY'] = db['MATRICULA_clean'].astype(str) + "_" + db['VINCULO_clean'].astype(str)
    
    # Clean CPF
    db['CPF_clean'] = db['CPF'].apply(clean_cpf_db)
    
    # Load AGA ATUALIZADO
    try:
        aga_df = pd.read_excel('Cópia de AGA ATUALIZADO .xlsx')
        aga_name = 'Cópia de AGA ATUALIZADO .xlsx'
    except:
        aga_df = pd.read_excel('AGA ATUALIZADO 12052026 SERVIDORES_LOTADOS_AGA_AAI.xlsx')
        aga_name = 'AGA ATUALIZADO 12052026 SERVIDORES_LOTADOS_AGA_AAI.xlsx'
        
    if 'MATRICULA' in aga_df.columns:
        aga_df['MATRICULA_clean'] = aga_df['MATRICULA'].apply(clean_matricula)
    else:
        aga_df['MATRICULA_clean'] = aga_df['matricula'].apply(clean_matricula)
        
    aga_df['VINCULO_clean'] = aga_df['VINCULO'].apply(clean_vinculo)
    aga_df['UNIQUE_KEY'] = aga_df['MATRICULA_clean'].astype(str) + "_" + aga_df['VINCULO_clean'].astype(str)
    
    aga_df['CPF_clean'] = aga_df['CPF'].apply(clean_cpf_aga)

    if 'Nº PAE/SIIG' in aga_df.columns:
        aga_df['PROCESSO'] = aga_df['Nº PAE/SIIG']
    elif 'Nº PAE' in aga_df.columns:
        aga_df['PROCESSO'] = aga_df['Nº PAE']
    else:
        aga_df['PROCESSO'] = None

    db['PROCESSO_DB'] = db.get('Nº PAE', None)
    if 'Localizao atual' in db.columns:
        db_loc_col = 'Localizao atual'
    else:
        db_loc_col = 'Localização atual'
        
    # Matches by Vínculo (Matricula + Vinculo)
    db_keys = set(db['UNIQUE_KEY'].dropna().unique())
    aga_keys = set(aga_df['UNIQUE_KEY'].dropna().unique())
    
    keys_in_both = aga_keys.intersection(db_keys)
    keys_only_in_aga = aga_keys - db_keys
    
    merged = pd.merge(aga_df, db, on='UNIQUE_KEY', how='inner', suffixes=('_AGA', '_DB'))
    
    report = []
    report.append(f"# Relatório de Análise Profunda: AGA ATUALIZADO vs Base Consolidada")
    report.append(f"**Arquivo Analisado:** `{aga_name}`\n")
    report.append(f"**Nota Importante:** A base consolidada (`db_capo.json`) possui um erro estrutural nos CPFs: a maioria dos CPFs teve o zero à esquerda movido para o final (ex: um CPF que deveria ser `08687463200` está salvo como `86874632000`). Para este relatório, o cruzamento principal foi feito utilizando a combinação **Matrícula + Vínculo**.\n")
    
    report.append(f"## 1. Visão Geral dos Dados")
    report.append(f"- **Total de registros na Base Consolidada (`db_capo.json`):** {len(db)}")
    report.append(f"- **Total de registros no arquivo `AGA ATUALIZADO`:** {len(aga_df)}")
    
    report.append(f"\n## 2. Cruzamento de Vínculos (Matrícula + Vínculo)")
    report.append(f"- **Vínculos únicos na planilha AGA:** {len(aga_keys)}")
    report.append(f"- **Vínculos da planilha AGA encontrados na Base Consolidada:** {len(keys_in_both)} ({len(keys_in_both)/len(aga_keys)*100:.1f}%)")
    report.append(f"- **Vínculos da planilha AGA FALTANDO na Base Consolidada:** {len(keys_only_in_aga)} ({len(keys_only_in_aga)/len(aga_keys)*100:.1f}%)")
    
    # Missing Analysis
    if len(keys_only_in_aga) > 0:
        report.append(f"\n*Nota: Existe uma parcela de servidores ({len(keys_only_in_aga)}) na planilha de aguardando aposentadoria que não constam na base atual do CAPO.*")

    # Process Analysis
    report.append(f"\n## 3. Análise de Processos (Aguardando Aposentadoria)")
    
    process_diffs = []
    status_diffs = 0
    process_agregado_novo = 0
    
    status_col_aga = 'Localização atual' if 'Localização atual' in aga_df.columns else 'Localizao atual'
    status_col_db = db_loc_col + '_DB'
    
    for idx, row in merged.iterrows():
        proc_aga = str(row.get('PROCESSO', '')).strip()
        proc_db = str(row.get('PROCESSO_DB', '')).strip()
        
        # Check process difference
        if proc_aga != 'nan' and proc_aga != 'None' and proc_aga != '':
            if proc_db == 'nan' or proc_db == 'None' or proc_db == '':
                process_diffs.append("A planilha AGA tem o nº do processo, mas a Base Consolidada NÃO tem")
                process_agregado_novo += 1
            elif proc_aga != proc_db:
                process_diffs.append("Número de processo diferente entre AGA e Base")
            else:
                process_diffs.append("Processos iguais em ambas")
                
        # Check status difference
        st_aga = str(row.get(status_col_aga, '')).strip()
        st_db = str(row.get(status_col_db, '')).strip()
        if st_aga != st_db and st_aga != 'nan' and st_db != 'nan' and st_aga != 'None' and st_db != 'None':
            status_diffs += 1
                
    if process_diffs:
        from collections import Counter
        c = Counter(process_diffs)
        report.append(f"\n### Comparativo para os {len(keys_in_both)} vínculos encontrados nas duas bases:")
        for k, v in c.items():
            report.append(f"- **{k}:** {v}")
    
    report.append(f"\n### Atualização de Localização / Status na Tramitação:")
    report.append(f"- Existem **{status_diffs}** registros onde a 'Localização atual' diverge. Isso indica que a base AGA possui informações de tramitação mais recentes que precisam ser atualizadas na Base Consolidada.")
    
    report.append(f"\n## 4. Resumo e Conclusões")
    report.append(f"1. **Erro nos CPFs:** A base consolidada `db_capo.json` contém um problema crônico na formatação dos CPFs (o 0 à esquerda foi movido para a direita e inserido como 0 final). Cruzamentos via CPF sempre falharão a menos que o erro seja tratado na extração/importação.")
    report.append(f"2. **Integração Bem Sucedida:** Cerca de **{len(keys_in_both)/len(aga_keys)*100:.1f}%** ({len(keys_in_both)}) dos vínculos na planilha AGA já existem na Base Consolidada do CAPO.")
    report.append(f"3. **Enriquecimento de Dados:** A planilha AGA traz novos números de processo para **{process_agregado_novo}** vínculos que atualmente não possuem essa informação na Base Consolidada. Ela também traz {status_diffs} atualizações de movimentação de processos.")
    report.append(f"4. **Registros Ausentes:** Há **{len(keys_only_in_aga)}** vínculos na planilha AGA que estão completamente ausentes da Base Consolidada.")
    report.append(f"\n## 5. Próximos Passos Recomendados")
    report.append(f"- **Limpeza de Base:** Executar um script de correção (migration) em `db_capo.json` para corrigir a formatação dos CPFs.")
    report.append(f"- **Atualização (Merge):** Criar uma rotina para atualizar a Base Consolidada utilizando o CPF/Matrícula+Vínculo para injetar as colunas `Nº PAE` e `Localização atual` vindas da planilha AGA.")
    report.append(f"- **Inserção:** Cadastrar os {len(keys_only_in_aga)} servidores da planilha AGA que não estão na Base Consolidada.")

    with open('analise_profunda_aga.md', 'w', encoding='utf-8') as f:
        f.write("\n".join(report))
        
    print("Report saved to analise_profunda_aga.md")

if __name__ == "__main__":
    analyze_cross_reference()
