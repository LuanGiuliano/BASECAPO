# Relatório de Análise Profunda: AGA ATUALIZADO vs Base Consolidada
**Arquivo Analisado:** `Cópia de AGA ATUALIZADO .xlsx`

**Nota Importante:** A base consolidada (`db_capo.json`) possui um erro estrutural nos CPFs: a maioria dos CPFs teve o zero à esquerda movido para o final (ex: um CPF que deveria ser `08687463200` está salvo como `86874632000`). Para este relatório, o cruzamento principal foi feito utilizando a combinação **Matrícula + Vínculo**.

## 1. Visão Geral dos Dados
- **Total de registros na Base Consolidada (`db_capo.json`):** 20326
- **Total de registros no arquivo `AGA ATUALIZADO`:** 4130

## 2. Cruzamento de Vínculos (Matrícula + Vínculo)
- **Vínculos únicos na planilha AGA:** 4112
- **Vínculos da planilha AGA encontrados na Base Consolidada:** 4112 (100.0%)
- **Vínculos da planilha AGA FALTANDO na Base Consolidada:** 0 (0.0%)

## 3. Análise de Processos (Aguardando Aposentadoria)

### Comparativo para os 4112 vínculos encontrados nas duas bases:
- **Processos iguais em ambas:** 574
- **Número de processo diferente entre AGA e Base:** 34
- **A planilha AGA tem o nº do processo, mas a Base Consolidada NÃO tem:** 1221

### Atualização de Localização / Status na Tramitação:
- Existem **607** registros onde a 'Localização atual' diverge. Isso indica que a base AGA possui informações de tramitação mais recentes que precisam ser atualizadas na Base Consolidada.

## 4. Resumo e Conclusões
1. **Erro nos CPFs:** A base consolidada `db_capo.json` contém um problema crônico na formatação dos CPFs (o 0 à esquerda foi movido para a direita e inserido como 0 final). Cruzamentos via CPF sempre falharão a menos que o erro seja tratado na extração/importação.
2. **Integração Bem Sucedida:** Cerca de **100.0%** (4112) dos vínculos na planilha AGA já existem na Base Consolidada do CAPO.
3. **Enriquecimento de Dados:** A planilha AGA traz novos números de processo para **1221** vínculos que atualmente não possuem essa informação na Base Consolidada. Ela também traz 607 atualizações de movimentação de processos.
4. **Registros Ausentes:** Há **0** vínculos na planilha AGA que estão completamente ausentes da Base Consolidada.

## 5. Próximos Passos Recomendados
- **Limpeza de Base:** Executar um script de correção (migration) em `db_capo.json` para corrigir a formatação dos CPFs.
- **Atualização (Merge):** Criar uma rotina para atualizar a Base Consolidada utilizando o CPF/Matrícula+Vínculo para injetar as colunas `Nº PAE` e `Localização atual` vindas da planilha AGA.
- **Inserção:** Cadastrar os 0 servidores da planilha AGA que não estão na Base Consolidada.