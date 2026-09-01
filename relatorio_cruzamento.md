# Relatório de Cruzamento de Dados

## 1. Cruzamento com Dados de Falecidos
- Total de servidores falecidos no SAS (únicos): 13
- Destes, encontrados na Base Consolidada CAPO com processo: **3**

Estes servidores possuem processo na base (podendo estar travados aguardando documentação), mas constam como falecidos.

### Alguns exemplos (Top 10)
| Servidor | Matrícula | Vínculo | Status Base | Pendência | Foi ao IGEPPS? |
|----------|-----------|---------|-------------|-----------|----------------|
| SONIA SUELY BERNAL DE LIMA | 5217440 | 2 | PROF AGUARD APOSENTADORIA | nan | nan |
| TEREZINHA DE JESUS RODRIGUES DE ALMADA | 5272181 | 2 | JORNADA PROF AGA ART 4 LEI 8030/14 | nan | nan |
| ROBERTO ALEXANDRE DOS SANTOS | 5375851 | 2 | PROF AGUARD APOSENTADORIA | nan | nan |

## 2. Cruzamento com Dados Aguardando Aposentadoria
- Total de servidores aguardando aposentadoria no SAS (únicos): 1435
- Encontrados na base consolidada: **845**
- Aguardando aposentadoria no SAS que **NÃO** constam na base: **590**

### O que fazer com essas informações?
1. **Falecidos com Processo Ativo:** O status desses processos deve ser alterado (ex: Encerrado por Óbito) para que não distorçam os indicadores de 'processos parados com o analista' ou 'aguardando documentação'.
2. **Atualização de Indicadores:** Com os falecidos filtrados e cruzando quem realmente aguarda aposentadoria ou já foi ao IGEPPS, podemos construir os dois novos indicadores:
   - **IGEPPES**: Processos em análise no IGEPPS.
   - **CAPO/SAGEP**: Processos que o CAPO enviou para o IGEPPS.
