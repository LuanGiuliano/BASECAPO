# Relatório de Análise Cruzada: AGA ATUALIZADO vs Base Consolidada
**Arquivo Analisado:** `Cópia de AGA ATUALIZADO .xlsx`

## 1. Visão Geral dos Dados
- **Total de registros na Base Consolidada (db_capo.json):** 20326
- **Total de registros no arquivo AGA ATUALIZADO:** 4130
- **Total de registros com CPF válido no AGA:** 4129
- **Total de registros com Matrícula válida no AGA:** 4128

## 2. Cruzamentos Identificadores
### Por CPF
- **CPFs únicos na Base Consolidada:** 4993
- **CPFs únicos no AGA ATUALIZADO:** 4066
- **CPFs do AGA encontrados na Base:** 308 (7.6%)
- **CPFs do AGA FALTANDO na Base:** 3758 (92.4%)

### Por Matrícula
- **Matrículas únicas no AGA:** 4066
- **Matrículas do AGA encontradas na Base:** 4066 (100.0%)

### Por Vínculo Exato (CPF + Matrícula)
- **Vínculos únicos no AGA:** 4066
- **Vínculos exatos encontrados em ambas as bases:** 0 (0.0%)
- **Vínculos do AGA FALTANDO na Base:** 4066 (100.0%)

## 3. Análise de Processos (Aguardando Aposentadoria)
- **Total de registros com Nº Processo no AGA:** 1815
- **Total de registros com Nº Processo na Base:** 605


### Atualização de Localização / Status:
- Existem 0 registros onde a 'Localização atual' diverge entre o AGA ATUALIZADO e a Base Consolidada. Isso indica que a base AGA possui informações mais recentes sobre a tramitação dos processos.

## 4. Resumo e Conclusões
1. A base `AGA ATUALIZADO` contém 4130 servidores, dos quais a imensa maioria **não está presente** na Base Consolidada (`db_capo.json`).
2. Apenas 4066 matrículas (aprox. 100.0%) foram encontradas na Base Consolidada, o que significa que mais de 0.0% dos servidores aguardando aposentadoria não estão na base principal do sistema CAPO.
3. Onde há cruzamento (0 registros com CPF e Matrícula iguais), a base AGA traz dados adicionais de processo (Nº PAE) que podem complementar a base consolidada.
4. **Ação Recomendada:** É altamente recomendável **importar/mesclar** os dados do `AGA ATUALIZADO` na Base Consolidada, pois ele contém a relação de processos de aposentadoria (Nº PAE/SIIG) e o status mais recente no IGEPPS que a base atual não possui na mesma magnitude.