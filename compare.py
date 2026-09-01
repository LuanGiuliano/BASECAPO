import pandas as pd
import json
import traceback

try:
    print("Loading db.json...")
    with open('sistema-capo/src/data/db.json', 'r', encoding='utf-8') as f:
        db_data = json.load(f)
    db_df = pd.DataFrame(db_data)
    
    print("Loading BASE CONSOLIDADA - DADOS.csv...")
    # The file has a different encoding probably, let's try latin1
    try:
        new_df = pd.read_csv('BASE CONSOLIDADA - DADOS.csv', encoding='utf-8', on_bad_lines='skip')
    except UnicodeDecodeError:
        new_df = pd.read_csv('BASE CONSOLIDADA - DADOS.csv', encoding='latin1', on_bad_lines='skip')
    
    print(f"Columns in new base: {new_df.columns.tolist()}")
    
    db_rows = len(db_df)
    new_rows = len(new_df)
    print(f"db.json rows: {db_rows}")
    print(f"new_df rows: {new_rows}")
    
    # Identify the registration column in the new DataFrame
    mat_col_new = None
    for col in new_df.columns:
        if 'mat' in col.lower() or 'tr' in col.lower():
            if 'matr' in col.lower() or 'matricula' in col.lower() or 'matrcula' in col.lower():
                mat_col_new = col
                break
    
    if mat_col_new is None:
        print("Could not find matricula column in the new base")
    else:
        print(f"Using column '{mat_col_new}' for matricula in new base.")
        
        # Clean matriculas
        db_mats = set(db_df['matricula'].dropna().astype(str).str.replace(r'\.0$', '', regex=True))
        new_mats = set(new_df[mat_col_new].dropna().astype(str).str.replace(r'\.0$', '', regex=True))
        
        print(f"Unique matriculas in db: {len(db_mats)}")
        print(f"Unique matriculas in new base: {len(new_mats)}")
        
        missing_in_db = new_mats - db_mats
        missing_in_new = db_mats - new_mats
        
        print(f"Missing in db.json (to be added): {len(missing_in_db)}")
        print(f"Missing in new base: {len(missing_in_new)}")
        
        # Save missing to a JSON to preview what needs to be added
        if len(missing_in_db) > 0:
            missing_records = new_df[new_df[mat_col_new].astype(str).str.replace(r'\.0$', '', regex=True).isin(missing_in_db)]
            missing_records.to_json('missing_records.json', orient='records', force_ascii=False)
            print("Saved missing records to missing_records.json")
        
except Exception as e:
    print("Error occurred:")
    traceback.print_exc()
