import pandas as pd
import json

df1 = pd.read_excel('Cópia de AGA ATUALIZADO .xlsx')
print('AGA Matriculas:')
print(df1['MATRICULA'].head(10).tolist())

with open('db_capo.json', encoding='utf-8') as f:
    db = json.load(f)
db_df = pd.DataFrame(db)
print('\nDB Matriculas:')
print(db_df['matricula'].head(10).tolist())
