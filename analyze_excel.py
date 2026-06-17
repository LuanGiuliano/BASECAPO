import os
import pandas as pd
import sys

def analyze_excel(folder_path, output_file):
    excel_files = [f for f in os.listdir(folder_path) if f.endswith('.xlsx')]
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Análise das Planilhas de Aposentadoria - CAPO\n\n")
        
        for file in excel_files:
            file_path = os.path.join(folder_path, file)
            f.write(f"## Arquivo: {file}\n")
            
            try:
                # Load all sheets
                xls = pd.ExcelFile(file_path)
                f.write(f"- **Tamanho do Arquivo:** {os.path.getsize(file_path) / 1024:.2f} KB\n")
                f.write(f"- **Abas encontradas:** {', '.join(xls.sheet_names)}\n\n")
                
                for sheet_name in xls.sheet_names:
                    f.write(f"### Aba: {sheet_name}\n")
                    df = pd.read_excel(xls, sheet_name=sheet_name)
                    
                    f.write(f"- **Dimensões (Linhas, Colunas):** {df.shape}\n\n")
                    
                    if df.empty:
                        f.write("*Aba está vazia.*\n\n")
                        continue
                        
                    f.write("#### Colunas e Tipos de Dados:\n")
                    f.write("| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |\n")
                    f.write("|---|---|---|---|---|\n")
                    
                    for col in df.columns:
                        dtype = str(df[col].dtype)
                        nulls = df[col].isnull().sum()
                        uniques = df[col].nunique()
                        example = str(df[col].iloc[0]) if not df.empty and not pd.isna(df[col].iloc[0]) else "N/A"
                        # Sanitize example
                        example = example.replace('\n', ' ').replace('\r', '').replace('|', '\\|')[:50]
                        f.write(f"| {col} | {dtype} | {nulls} | {uniques} | {example} |\n")
                    
                    f.write("\n#### Primeiras 5 linhas:\n")
                    f.write(df.head(5).to_markdown(index=False))
                    f.write("\n\n---\n\n")
                    
            except Exception as e:
                f.write(f"**Erro ao ler o arquivo:** {e}\n\n")

if __name__ == '__main__':
    analyze_excel('.', 'analysis_report.md')
    print("Análise concluída. Relatório gerado em analysis_report.md")
