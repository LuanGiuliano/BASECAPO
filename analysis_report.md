# Análise das Planilhas de Aposentadoria - CAPO

## Arquivo: AGA ATUALIZADO 12052026 SERVIDORES_LOTADOS_AGA_AAI.xlsx
- **Tamanho do Arquivo:** 735.86 KB
- **Abas encontradas:** DADOS, SERVIDORES

### Aba: DADOS
- **Dimensões (Linhas, Colunas):** (4129, 22)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| DRE | str | 1 | 13 | 19A URE - BELEM |
| MUNICIPIO | str | 1 | 21 | BELEM |
| ESCOLA | str | 1 | 43 | Seção de Cadastro da Capital |
| matricula | float64 | 1 | 4067 | 398993.0 |
| VINCULO | float64 | 1 | 7 | 1.0 |
| SERVIDOR | str | 1 | 4064 | ANA MARIA SIMOES DA SILVA |
| CPF | float64 | 1 | 4066 | 8687463200.0 |
| TIPO_VINCULO | str | 1 | 3 | EFETIVO |
| DT_EXERCICIO | datetime64[us] | 1 | 1437 | 1977-03-15 00:00:00 |
| DT_INICIO_LOTACAO | datetime64[us] | 1 | 878 | 2008-12-02 00:00:00 |
| DT_FIM_LOTACAO | float64 | 4129 | 0 | N/A |
| CARGO | str | 1 | 72 | INSPETOR DE ALUNOS |
| ATIVIDADE | str | 1 | 25 | AGUARD APOSENTADORIA ADM P/INVALIDEZ |
| MODALIDADE | str | 4 | 6 | GESTAO |
| LICENCA_MNEMONICO | str | 1 | 2 | Aguardando Aposentadoria Incapacidade Permanente |
| Nº PAE | str | 3524 | 562 | 2021/1216183 |
| Processo foi ao IGEPPS? | str | 3566 | 6 | NÃO |
| Processo retornou do IGEPPS? | str | 3597 | 5 | - |
| Localização atual | str | 3526 | 103 | DRE BELÉM 01 |
| Ultima movimentação | object | 3543 | 339 | 2023-05-02 00:00:00 |
| Pendências | str | 3619 | 66 | Faltou documentação inicial |
| Qual documentação | str | 3539 | 361 | "Para que possamos prosseguir com o processo da se |

#### Primeiras 5 linhas:
| DRE             | MUNICIPIO   | ESCOLA                       |        matricula |   VINCULO | SERVIDOR                  |         CPF | TIPO_VINCULO   | DT_EXERCICIO        | DT_INICIO_LOTACAO   |   DT_FIM_LOTACAO | CARGO                            | ATIVIDADE                            | MODALIDADE   | LICENCA_MNEMONICO                                | Nº PAE       | Processo foi ao IGEPPS?   | Processo retornou do IGEPPS?   | Localização atual   | Ultima movimentação   | Pendências                                                   | Qual documentação                                                                                                                                                                                  |
|:----------------|:------------|:-----------------------------|-----------------:|----------:|:--------------------------|------------:|:---------------|:--------------------|:--------------------|-----------------:|:---------------------------------|:-------------------------------------|:-------------|:-------------------------------------------------|:-------------|:--------------------------|:-------------------------------|:--------------------|:----------------------|:-------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 19A URE - BELEM | BELEM       | Seção de Cadastro da Capital | 398993           |         1 | ANA MARIA SIMOES DA SILVA | 8.68746e+09 | EFETIVO        | 1977-03-15 00:00:00 | 2008-12-02 00:00:00 |              nan | INSPETOR DE ALUNOS               | AGUARD APOSENTADORIA ADM P/INVALIDEZ | GESTAO       | Aguardando Aposentadoria Incapacidade Permanente | 2021/1216183 | NÃO                       | -                              | DRE BELÉM 01        | 2023-05-02 00:00:00   | Faltou documentação inicial                                  | "Para que possamos prosseguir com o processo da servidora junto ao IGEPREV, faz-senecessário que a servidora preencha o termo renúncia de licença prêmio estipulandoadata(01/04/1980 á 31/03/1989. |
|                 |             |                              |                  |           |                           |             |                |                     |                     |                  |                                  |                                      |              |                                                  |              |                           |                                |                     |                       |                                                              | .  A servidora deverá anexar uma nova declaração de acúmulo de cargos atual preenchendocorretamente os valores da pensão por morte."                                                              |
| 19A URE - BELEM | BELEM       | Seção Cadastro do Interior   | 666726           |         1 | MARIA DA SILVA SANTOS     | 1.28982e+10 | EFETIVO        | 1986-05-14 00:00:00 | 2010-08-11 00:00:00 |              nan | SERVENTE REFERENCIA I            | AGUARD APOSENTADORIA ADM P/INVALIDEZ | GESTAO       | Aguardando Aposentadoria Incapacidade Permanente | 2022/1381378 | SIM                       | SIM                            | CAPO                | DRE PARAUAPEBAS       | PENDÊNCIA DOCUMENTAL                                         | Á DRE PARAUAPEBAS, Para atender a solicitação citada no despacho do IGEPPS. Retornar para dar andamento no processo.. 1. CUMULAÇÃO DE APOSENTADORIA E PENSÃO POR MORTE: TERMO DE OPÇÃO             |
| 19A URE - BELEM | BELEM       | Seção Cadastro do Interior   |      6.03178e+06 |         1 | ELY CONSTANTINO DE SOUZA  | 7.17994e+09 | NAO ESTAVEL    | 1989-05-30 00:00:00 | 2011-04-11 00:00:00 |              nan | VIGIA                            | AGUARD APOSENTADORIA ADM             | GESTAO       | Aguardando Aposentadoria                         | 2019/530570  | NÃO                       | nan                            | CORREGEDORIA        | nan                   | Desarquivar processo da corregedoria e prosseguir            | POR PERCEPÇÃO INTEGRAL DE BENEFÍCIO MAIS VANTAJOSO, EM CASO DE                                                                                                                                     |
| 19A URE - BELEM | BELEM       | Seção Cadastro do Interior   | 474533           |         1 | DALILA DE OLIVEIRA        | 5.54231e+09 | EFETIVO        | 1980-08-01 00:00:00 | 2011-11-01 00:00:00 |              nan | PROF. COLABORADOR NIVEL SUPERIOR | PROF AGUARD APOSENTADORIA            | GESTAO       | Aguardando Aposentadoria                         | 2024/806827  | SIM                       | SIM                            | CAPO/IGEPPS         | nan                   | Reconstituir autos próprios para o processo de aposentadoria | DECLARAÇÃO POSITIVA DE RECEBIMENTO DE PENSÃO POR MORTE, ONDE                                                                                                                                       |
| 19A URE - BELEM | BELEM       | Seção Cadastro do Interior   | 603708           |         1 | IVANILDA GONCALVES SENA   | 5.06547e+09 | EFETIVO        | 1985-03-22 00:00:00 | 2011-11-01 00:00:00 |              nan | PROFESSOR CLASSE ESPECIAL        | AGUARD APOSENTADORIA ADM             | GESTAO       | Aguardando Aposentadoria                         | 2021/928053  | SIM                       | SIM                            | DRE ABAETETUBA      | 2026-05-11 00:00:00   | Pendência documental                                         | CONSTE A CIÊNCIA DO SERVIDOR DE QUE A OPÇÃO IMPLICARÁ EM REDUÇÃO                                                                                                                                   |

---

### Aba: SERVIDORES
- **Dimensões (Linhas, Colunas):** (2, 7)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| Unnamed: 0 | float64 | 2 | 0 | N/A |
| Unnamed: 1 | float64 | 2 | 0 | N/A |
| Unnamed: 2 | float64 | 2 | 0 | N/A |
| Unnamed: 3 | float64 | 2 | 0 | N/A |
| Unnamed: 4 | float64 | 2 | 0 | N/A |
| RESUMO | str | 0 | 2 | TOTAL DE SERVIDORES |
| Unnamed: 6 | int64 | 0 | 2 | 4068 |

#### Primeiras 5 linhas:
|   Unnamed: 0 |   Unnamed: 1 |   Unnamed: 2 |   Unnamed: 3 |   Unnamed: 4 | RESUMO              |   Unnamed: 6 |
|-------------:|-------------:|-------------:|-------------:|-------------:|:--------------------|-------------:|
|          nan |          nan |          nan |          nan |          nan | TOTAL DE SERVIDORES |         4068 |
|          nan |          nan |          nan |          nan |          nan | TOTAL DE VINCULOS   |         4113 |

---

## Arquivo: LEVANTAMENTO DOS PROCESSOS DE 2025.xlsx
- **Tamanho do Arquivo:** 79.92 KB
- **Abas encontradas:** DOCENTES, APOIO, Folha3

### Aba: DOCENTES
- **Dimensões (Linhas, Colunas):** (245, 37)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | object | 4 | 236 | 5784069 |
| VINCULO | object | 2 | 16 | 2 |
| SERVIDOR | object | 2 | 234 | CELESTE DE SOUSA ALVES |
| TIPO VINCULO | object | 7 | 8 | EFETIVO |
| SUBCATEGORIA | object | 7 | 8 | DOCENTE |
| CARGO | str | 19 | 27 | PROFESSOR CLASSE II |
| ATIVIDADE | str | 34 | 43 | AGUARD APOSENTADORIA PROF P/INVALIDEZ |
| DT_EXERCICIO | object | 33 | 174 | 2005-11-14 00:00:00 |
| DT_VACANCIA | float64 | 245 | 0 | N/A |
| DTINI_MNEMONICO | object | 101 | 129 | 2020-01-14 00:00:00 |
| MOTIVO_MNEMONICO | str | 96 | 138 | Mudança da Licença 75-LSP para a 107-AAI atráves s |
| ANO DE ENTRADA | float64 | 24 | 9 | 2011.0 |
| DATA DA SAÍDA | datetime64[us] | 16 | 125 | 2025-04-02 00:00:00 |
| ESTÁ NO AGA | str | 19 | 2 | SIM |
| PROTOCOLO N°PAE | str | 16 | 222 | E-2025/2387777 |
| DATA ENTRADA NO AGA | object | 135 | 88 | N/A |
| STATUS DO PROCESSO | str | 84 | 56 | IGEPPS |
| SITUAÇÃO | str | 195 | 5 | N/A |
| JÁ FOI OU RETORNOU DO IGEPPS? | str | 16 | 2 | SIM |
| SETOR ATUAL | str | 16 | 48 | IGEPREV |
| SITUAÇÃO ATUAL | str | 17 | 12 | PARADO MAIS DE 9 MESES |
| PENDÊNCIA? | str | 112 | 8 | N/A |
| ÚLTIMA MOVIMENTAÇÃO | object | 16 | 135 | 2025-04-03 00:00:00 |
| DATA DA ÚLTIMA VERIFICAÇÃO | datetime64[us] | 113 | 2 | 2026-02-15 00:00:00 |
| OBS | str | 209 | 32 | N/A |
| SERVIDOR QUE VERIFICOU | str | 122 | 1 | LUCAS VINGRE |
| Unnamed: 26 | float64 | 245 | 0 | N/A |
| LOCAL | str | 244 | 1 | N/A |
| ULTIMA TRAMITAÇÃO | datetime64[us] | 244 | 1 | N/A |
| DATA DA VERIFICAÇÃO | float64 | 245 | 0 | N/A |
| INSTRUTOR PROCESSUAL | str | 67 | 14 | N/A |
| LOCALIZAÇÃO DO PROCESSO | str | 16 | 39 | IGEPPS |
| SE VOLTA DO IGEPPS PORQUE? | str | 244 | 1 | N/A |
| OBSERVAÇÃO | str | 209 | 35 | N/A |
| LOCAL. GERAL | str | 16 | 5 | IGEPPS |
| EQUIPE DADOS | str | 117 | 7 | ANA EMYLLE DA SILVA COSTA - 5984346-1 |
| DRE ORIGEM DO PROCESSO | float64 | 245 | 0 | N/A |

#### Primeiras 5 linhas:
|   MATRICULA |   VINCULO | SERVIDOR                    | TIPO VINCULO   | SUBCATEGORIA   | CARGO                     | ATIVIDADE                             | DT_EXERCICIO        |   DT_VACANCIA | DTINI_MNEMONICO     | MOTIVO_MNEMONICO                                                                                                                                                        |   ANO DE ENTRADA | DATA DA SAÍDA       | ESTÁ NO AGA   | PROTOCOLO N°PAE   | DATA ENTRADA NO AGA   | STATUS DO PROCESSO   |   SITUAÇÃO | JÁ FOI OU RETORNOU DO IGEPPS?   | SETOR ATUAL      | SITUAÇÃO ATUAL         | PENDÊNCIA?                    | ÚLTIMA MOVIMENTAÇÃO   | DATA DA ÚLTIMA VERIFICAÇÃO   |   OBS | SERVIDOR QUE VERIFICOU   |   Unnamed: 26 |   LOCAL | ULTIMA TRAMITAÇÃO   |   DATA DA VERIFICAÇÃO | INSTRUTOR PROCESSUAL   | LOCALIZAÇÃO DO PROCESSO   |   SE VOLTA DO IGEPPS PORQUE? | OBSERVAÇÃO                   | LOCAL. GERAL   | EQUIPE DADOS                                 |   DRE ORIGEM DO PROCESSO |
|------------:|----------:|:----------------------------|:---------------|:---------------|:--------------------------|:--------------------------------------|:--------------------|--------------:|:--------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------:|:--------------------|:--------------|:------------------|:----------------------|:---------------------|-----------:|:--------------------------------|:-----------------|:-----------------------|:------------------------------|:----------------------|:-----------------------------|------:|:-------------------------|--------------:|--------:|:--------------------|----------------------:|:-----------------------|:--------------------------|-----------------------------:|:-----------------------------|:---------------|:---------------------------------------------|-------------------------:|
|     5784069 |         2 | CELESTE DE SOUSA ALVES      | EFETIVO        | DOCENTE        | PROFESSOR CLASSE II       | AGUARD APOSENTADORIA PROF P/INVALIDEZ | 2005-11-14 00:00:00 |           nan | 2020-01-14 00:00:00 | Mudança da Licença 75-LSP para a 107-AAI atráves solicitação da CSRH/DSP/Seplad                                                                                         |             2011 | 2025-04-02 00:00:00 | SIM           | E-2025/2387777    | nan                   | IGEPPS               |        nan | SIM                             | IGEPREV          | PARADO MAIS DE 9 MESES | nan                           | 2025-04-03 00:00:00   | 2026-02-15 00:00:00          |   nan | LUCAS VINGRE             |           nan |     nan | NaT                 |                   nan | nan                    | IGEPPS                    |                          nan | nan                          | IGEPPS         | ANA EMYLLE DA SILVA COSTA - 5984346-1        |                      nan |
|     5624150 |         1 | ROSIVALDO SACRAMENTO CALDAS | EFETIVO        | DOCENTE        | PROFESSOR CLASSE III      | AGUARD APOSENTADORIA PROF P/INVALIDEZ | 1994-03-07 00:00:00 |           nan | 2025-03-25 00:00:00 | Gerado por perícia médica, laudo número: 126053, realizada em: 20/03/2025                                                                                               |             2025 | 2025-04-02 00:00:00 | SIM           | E-2025/2420760    | nan                   | ARQUIVADO NA DRE     |        nan | NÃO                             | DRE BELÉM 07     | ARQUIVADO              | nan                           | 2025-04-02 00:00:00   | 2026-02-15 00:00:00          |   nan | LUCAS VINGRE             |           nan |     nan | NaT                 |                   nan | nan                    | DRE BELÉM 07              |                          nan | nan                          | ARQUIVADO      | MARIA EDUARDA BARATA CRUZ                    |                      nan |
|     6005217 |         5 | LAURO NUNES MAGALHAES FILHO | EFETIVO        | DOCENTE        | PROFESSOR CLASSE II       | AGUARD APOSENTADORIA PROF P/INVALIDEZ | 2009-04-23 00:00:00 |           nan | 2023-11-18 00:00:00 | CREM 692/2023. Registrado na SEPLAD/DSO em 26/02/24. ALF                                                                                                                |             2025 | 2025-04-02 00:00:00 | SIM           | E-2025/2247899    | 2023-11-18 00:00:00   | nan                  |        nan | NÃO                             | DRE MONTE ALEGRE | PARADO MAIS DE 6 MESES | ADEQUAÇÃO DOCUMENTAL SERVIDOR | 2025-08-22 00:00:00   | 2026-02-15 00:00:00          |   nan | LUCAS VINGRE             |           nan |     nan | NaT                 |                   nan | nan                    | DRE MONTE ALEGRE          |                          nan | nan                          | DRE            | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |                      nan |
|     6303641 |         2 | JOSÉ DIAS DA NATIVIDADE     | EFETIVO        | DOCENTE        | PROFESSOR CLASSE ESPECIAL | JORNADA PROF AGA ART 4 LEI 8030/14    | 1994-04-28 00:00:00 |           nan | 2025-04-04 00:00:00 | PAE 2025/2009922                                                                                                                                                        |             2025 | 2025-04-04 00:00:00 | SIM           | E-2025/2009922    | 2025-04-04 00:00:00   | CONCLUIDO            |        nan | SIM                             | IGEPREV          | EM ANDAMENTO           | nan                           | 2026-01-26 00:00:00   | 2026-02-15 00:00:00          |   nan | LUCAS VINGRE             |           nan |     nan | NaT                 |                   nan | MATEUS - 57212515-1    | IGEPPS                    |                          nan | nan                          | IGEPPS         | nan                                          |                      nan |
|             |           |                             |                |                |                           |                                       |                     |               |                     | , CONFORME DECLARAÇÃO DE AFASTAMENTO EM SEQUENCIAL 1/FLS. 10 DOS AUTOS E PORTARIA 4050-2025 - SAGEP/SEDUC - REVOGAÇÃO DE CESSÃO, PUBLICADA NO DO. 36.262 DE 16/06/2025. |                  |                     |               |                   |                       |                      |            |                                 |                  |                        |                               |                       |                              |       |                          |               |         |                     |                       |                        |                           |                              |                              |                |                                              |                          |
|             |           |                             |                |                |                           |                                       |                     |               |                     | MANUTENÇÃO REALIZADA EM 18/06/2025.                                                                                                                                     |                  |                     |               |                   |                       |                      |            |                                 |                  |                        |                               |                       |                              |       |                          |               |         |                     |                       |                        |                           |                              |                              |                |                                              |                          |
|     5268257 |         2 | ONEIDE CAMPOS POJO          | EFETIVO        | DOCENTE        | PROFESSOR CLASSE ESPECIAL | LICENÇA SAÚDE                         | 1994-01-22 00:00:00 |           nan | 2022-05-01 00:00:00 | Gerado por perícia médica, laudo número: 106709, realizada em: 22/08/2023                                                                                               |             2025 | 2025-04-15 00:00:00 | NÃO           | E-2025/2530587    | nan                   | ARQUIVADO            |        nan | NÃO                             | CAPO AN          | ARQUIVADO              | ADEQUAÇÃO DOCUMENTAL SERVIDOR | 2025-04-15 00:00:00   | 2026-02-15 00:00:00          |   nan | LUCAS VINGRE             |           nan |     nan | NaT                 |                   nan | nan                    | CAPO                      |                          nan | INDEFERIDO 24/06/2025 CIENTE | ARQUIVADO      | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |                      nan |

---

### Aba: APOIO
- **Dimensões (Linhas, Colunas):** (94, 32)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | int64 | 0 | 94 | 57234140 |
| VINCULO | float64 | 1 | 2 | 1.0 |
| SERVIDOR | str | 0 | 94 | OLINDA GRIGORIO TESSARI |
| TIPO_VINCULO | str | 3 | 3 | EFETIVO |
| CARGO | str | 3 | 31 | ESPECIALISTA EM EDUCAÇÃO I |
| ATIVIDADE | str | 10 | 27 | LICENÇA SAÚDE |
| DT_EXERCICIO | datetime64[us] | 9 | 71 | 2010-11-09 00:00:00 |
| DT_VACANCIA | float64 | 94 | 0 | N/A |
| DTINI_MNEMONICO | object | 39 | 53 | 2020-12-16 00:00:00 |
| MOTIVO_MNEMONICO | str | 29 | 64 | Laudo Médico nº 318150/2020. Manutenção realizada  |
| ANO DE ENTRADA | object | 2 | 7 | 2025 |
| DATA DA SAÍDA | datetime64[us] | 0 | 63 | 2025-07-09 00:00:00 |
| ESTÁ NO AGA | str | 4 | 2 | SIM |
| RETORNO DO IGEPPS | str | 9 | 2 | NÃO |
| PROTOCOLO N°PAE | str | 0 | 94 | E-2025/2231006 |
| JÁ FOI OU RETORNOU DO IGEPPS? | str | 0 | 2 | NÃO |
| SETOR ATUAL | str | 0 | 23 | DRE CONCEICAO DO ARAGUAIA |
| LOCALIZAÇÃO DO PROCESSO | str | 0 | 20 | DRE CONCEIÇÃO DO ARAGUAIA |
| SITUAÇÃO ATUAL | str | 0 | 9 | PARADO MAIS DE 5 MESES |
| DATA ENTRADA NO AGA | object | 29 | 60 | 2025-05-19 00:00:00 |
| STATUS DO PROCESSO | str | 12 | 26 | Aguardando documentação |
| SITUAÇÃO | str | 67 | 3 | PENDENCIA SERVIDOR |
| INSTRUTOR PROCESSUAL | str | 8 | 9 | MATEUS - 57212515-1 |
| PENDÊNCIA? | str | 66 | 4 | N/A |
| ÚLTIMA MOVIMENTAÇÃO | object | 0 | 67 | 2025-07-09 00:00:00 |
| OBS | str | 93 | 1 | rita de cassia da silva santos |
| SE VOLTA DO IGEPPS PORQUE? | float64 | 94 | 0 | N/A |
| OBSERVAÇÃO | str | 82 | 12 | N/A |
| EQUIPE DADOS | str | 61 | 5 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| LOCAL. GERAL | str | 0 | 4 | DRE |
| DATA DA ÚLTIMA VERIFICAÇÃO | datetime64[us] | 93 | 1 | 2026-02-15 00:00:00 |
| SERVIDOR QUE VERIFICOU | str | 93 | 1 | LUCAS VINGRE |

#### Primeiras 5 linhas:
|   MATRICULA |   VINCULO | SERVIDOR                         | TIPO_VINCULO   | CARGO                               | ATIVIDADE                | DT_EXERCICIO        |   DT_VACANCIA | DTINI_MNEMONICO     | MOTIVO_MNEMONICO                                                                                                                                                                                                    |   ANO DE ENTRADA | DATA DA SAÍDA       | ESTÁ NO AGA   | RETORNO DO IGEPPS   | PROTOCOLO N°PAE   | JÁ FOI OU RETORNOU DO IGEPPS?   | SETOR ATUAL               | LOCALIZAÇÃO DO PROCESSO   | SITUAÇÃO ATUAL         | DATA ENTRADA NO AGA   | STATUS DO PROCESSO      | SITUAÇÃO           | INSTRUTOR PROCESSUAL     |   PENDÊNCIA? | ÚLTIMA MOVIMENTAÇÃO   | OBS                            |   SE VOLTA DO IGEPPS PORQUE? | OBSERVAÇÃO                     | EQUIPE DADOS                                 | LOCAL. GERAL   | DATA DA ÚLTIMA VERIFICAÇÃO   | SERVIDOR QUE VERIFICOU   |
|------------:|----------:|:---------------------------------|:---------------|:------------------------------------|:-------------------------|:--------------------|--------------:|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------:|:--------------------|:--------------|:--------------------|:------------------|:--------------------------------|:--------------------------|:--------------------------|:-----------------------|:----------------------|:------------------------|:-------------------|:-------------------------|-------------:|:----------------------|:-------------------------------|-----------------------------:|:-------------------------------|:---------------------------------------------|:---------------|:-----------------------------|:-------------------------|
|    57234140 |         1 | OLINDA GRIGORIO TESSARI          | EFETIVO        | ESPECIALISTA EM EDUCAÇÃO I          | LICENÇA SAÚDE            | 2010-11-09 00:00:00 |           nan | 2020-12-16 00:00:00 | Laudo Médico nº 318150/2020.                                                                                                                                                                                        |             2025 | 2025-07-09 00:00:00 | SIM           | NÃO                 | E-2025/2231006    | NÃO                             | DRE CONCEICAO DO ARAGUAIA | DRE CONCEIÇÃO DO ARAGUAIA | PARADO MAIS DE 5 MESES | 2025-05-19 00:00:00   | Aguardando documentação | PENDENCIA SERVIDOR | MATEUS - 57212515-1      |          nan | 2025-07-09 00:00:00   | rita de cassia da silva santos |                          nan | nan                            | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 | DRE            | 2026-02-15 00:00:00          | LUCAS VINGRE             |
|             |           |                                  |                |                                     |                          |                     |               |                     | Manutenção realizada em 20/10/2020 - CAS/SEDUC.                                                                                                                                                                     |                  |                     |               |                     |                   |                                 |                           |                           |                        |                       |                         |                    |                          |              |                       |                                |                              |                                |                                              |                |                              |                          |
|      731684 |         1 | MARIA DE NAZARE TELES DOS SANTOS | EFETIVO        | SERVENTE REFERENCIA I               | AGUARD APOSENTADORIA ADM | 1986-05-13 00:00:00 |           nan | 2025-04-17 00:00:00 | Gerado por perícia médica, laudo número: 124102, realizada em: 20/01/2025                                                                                                                                           |             2025 | 2025-07-14 00:00:00 | NÃO           | NÃO                 | E-2025/2091012    | SIM                             | IGEPREV                   | IGEPPS                    | PARADO MAIS DE 6 MESES | nan                   | nan                     | nan                | PAULO JUNIOR - 5984653-1 |          nan | 2025-07-15 00:00:00   | nan                            |                          nan | nan                            | MARIA EDUARDA BARATA CRUZ                    | IGEPPS         | NaT                          | nan                      |
|    57210257 |         1 | JAIRSON LOPES RIBEIRO            | EFETIVO        | AUXILIAR OPERACIONAL                | nan                      | NaT                 |           nan | nan                 | nan                                                                                                                                                                                                                 |             2025 | 2025-07-21 00:00:00 | SIM           | NÃO                 | 2025/2767606      | SIM                             | IGEPREV                   | IGEPPS                    | PARADO MAIS DE 6 MESES | 2025-05-28 00:00:00   | CONCLUIDO               | nan                | ALEXANDRE - 5984457-1    |          nan | 2025-07-21 00:00:00   | nan                            |                          nan | nan                            | nan                                          | IGEPPS         | NaT                          | nan                      |
|      465470 |         1 | MILTON MARCOS DO ROZARIO NUNES   | EFETIVO        | AGENTE DE PORTARIA                  | VIGIA                    | 1982-04-06 00:00:00 |           nan | 2025-04-17 00:00:00 | Gerado por perícia médica, laudo número: 127058, realizada em: 17/04/2025                                                                                                                                           |             2025 | 2025-08-01 00:00:00 | SIM           | SIM                 | 2025/2556632      | SIM                             | IGEPREV                   | IGEPPS                    | PARADO MAIS DE 7 MESES | 2025-04-17 00:00:00   | CONCLUIDO               | nan                | ALEXANDRE - 5984457-1    |          nan | 2025-08-04 00:00:00   | nan                            |                          nan | nan                            | DAIANE ROSA GOMES - 5984467/1                | IGEPPS         | NaT                          | nan                      |
|      303623 |         1 | MILSON CARLOS LAGO MIRANDA       | EFETIVO        | ASSISTENTE TECNICO REFERENCIA XXVII | AGUARD APOSENTADORIA ADM | 1983-04-29 00:00:00 |           nan | 15/04//2025         | Processo nº 2025/2058408 - Em consonancia com a Declaracao de Afastamento, presente as folhas 04 anexo sequencial 1. manutencao realizada pelo Tecnico Dennis Vilhena Costa, Matricula 5901604-1 no dia 07/05/2025. |             2025 | 2025-08-11 00:00:00 | SIM           | SIM                 | 2025/2058408      | SIM                             | IGEPREV                   | IGEPPS                    | PARADO MAIS DE 7 MESES | 2025-04-15 00:00:00   | CONCLUIDO               | nan                | ALEXANDRE - 5984457-1    |          nan | 2025-08-11 00:00:00   | nan                            |                          nan | Veio no atendimento 08/05/2025 | MARIA EDUARDA BARATA CRUZ                    | IGEPPS         | NaT                          | nan                      |

---

### Aba: Folha3
- **Dimensões (Linhas, Colunas):** (0, 0)

*Aba está vazia.*

## Arquivo: PUBLICAÇÕES 2023.xlsx
- **Tamanho do Arquivo:** 153.89 KB
- **Abas encontradas:** RELAÇÃO QUANTITATIVAS 2023, JANEIRO 2023, FEVEREIRO 2023, MARÇO 2023, ABRIL 2023, MAIO 2023, JUNHO 2023, JULHO 2023, AGOSTO 2023, SETEMBRO 2023, OUTUBRO 2023, NOVEMBRO 2023

### Aba: RELAÇÃO QUANTITATIVAS 2023
- **Dimensões (Linhas, Colunas):** (15, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| Unnamed: 0 | float64 | 15 | 0 | N/A |
| Unnamed: 1 | str | 0 | 15 | QUANTITATIVO DE PUBLICAÇÕES APOSENTADORIA |
| Unnamed: 2 | object | 3 | 12 | N/A |
| Unnamed: 3 | object | 3 | 12 | N/A |
| Unnamed: 4 | object | 2 | 13 | N/A |

#### Primeiras 5 linhas:
|   Unnamed: 0 | Unnamed: 1                                | Unnamed: 2   | Unnamed: 3   | Unnamed: 4   |
|-------------:|:------------------------------------------|:-------------|:-------------|:-------------|
|          nan | QUANTITATIVO DE PUBLICAÇÕES APOSENTADORIA | nan          | nan          | nan          |
|          nan | MÊS                                       | PROFESSOR    | ADM. GERAL   | TOTAL        |
|          nan | 01/2023                                   | 30           | 11           | 41           |
|          nan | 02/2023                                   | 8            | 6            | 14           |
|          nan | 03/2023                                   | 12           | 15           | 27           |

---

### Aba: JANEIRO 2023
- **Dimensões (Linhas, Colunas):** (41, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | str | 0 | 40 | 552585/1 |
| CPF | str | 0 | 40 | 104.961.572-72 |
| NOME DO SERVIDOR | str | 0 | 40 | OSVALDO DA SILVA TELES |
| FUNÇÃO | str | 0 | 2 | ADM.GERAL |
| NUMERO DA PORTARIA | str | 0 | 40 | PORTARIA AP No 5.377 DE 31 DE OUTUBRO DE 2022 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR                 | FUNÇÃO    | NUMERO DA PORTARIA                             |
|:------------|:---------------|:---------------------------------|:----------|:-----------------------------------------------|
| 552585/1    | 104.961.572-72 | OSVALDO DA SILVA TELES           | ADM.GERAL | PORTARIA AP No 5.377 DE 31 DE OUTUBRO DE 2022  |
| 198242/3    | 175.637.392-20 | VERA LUCIA DA CONCEICAO          | ADM.GERAL | PORTARIA AP No 5.393 DE 31 DE OUTUBRO DE 2022  |
| 478547/3    | 188.419.451-68 | BENICIA DE FATIMA DA SILVA ZANI  | PROFESSOR | PORTARIA AP No 5.351 DE 27 DE OUTUBRO DE 2022  |
| 779172/1    | 196.090.271-72 | FRANCISCO DE SOUZA ALVES         | PROFESSOR | PORTARIA AP No 5.510 DE 07 DE NOVEMBRO DE 2022 |
| 466069/1    | 072.119.452-49 | MARIA DO SOCORRO ALENCAR CARDOSO | PROFESSOR | PORTARIA AP No 4.803 DE 23 DE SETEMBRO DE 2022 |

---

### Aba: FEVEREIRO 2023
- **Dimensões (Linhas, Colunas):** (14, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | str | 0 | 14 | 246700/1 |
| CPF | str | 0 | 14 | 146.979.122-68 |
| NOME DO SERVIDOR | str | 0 | 14 | ELZA MARIA SANTOS DA SILVA |
| FUNÇÃO | str | 0 | 2 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 14 | PORTARIA AP No 95 DE 17 DE JANEIRO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR             | FUNÇÃO    | NUMERO DA PORTARIA                          |
|:------------|:---------------|:-----------------------------|:----------|:--------------------------------------------|
| 246700/1    | 146.979.122-68 | ELZA MARIA SANTOS DA SILVA   | PROFESSOR | PORTARIA AP No 95 DE 17 DE JANEIRO DE 2023  |
| 203661/3    | 173.671.152-00 | GILVANETE LOPES FEITOSA,     | PROFESSOR | PORTARIA AP No 20 DE 04 DE JANEIRO DE 2023  |
| 563552/1    | 141.763.862-15 | EMIDIO LIMA DE ANDRADE,      | PROFESSOR | PORTARIA AP No 116 DE 19 DE JANEIRO DE 2023 |
| 646814/1    | 129.002.735-87 | ILZINETE CARDOSO DOS SANTOS, | PROFESSOR | PORTARIA AP No 99 DE 20 DE JANEIRO DE 2023  |
| 308250/1    | 123.985.432-34 | CARMEM CELIA DA SILVA,       | PROFESSOR | PORTARIA AP No 110 DE 19 DE JANEIRO DE 2023 |

---

### Aba: MARÇO 2023
- **Dimensões (Linhas, Colunas):** (27, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | str | 0 | 27 | 604810/1,  |
| CPF | str | 0 | 27 | 059.840.092-34 |
| NOME DO SERVIDOR | str | 0 | 27 | RAIMUNDO NONATO CARDOSO DE QUEIROZ |
| FUNÇÃO | str | 0 | 2 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 27 | PORTARIA AP No 238 DE 02 DE FEVEREIRO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR                        | FUNÇÃO    | NUMERO DA PORTARIA                            |
|:------------|:---------------|:----------------------------------------|:----------|:----------------------------------------------|
| 604810/1,   | 059.840.092-34 | RAIMUNDO NONATO CARDOSO DE QUEIROZ      | PROFESSOR | PORTARIA AP No 238 DE 02 DE FEVEREIRO DE 2023 |
| 731005/1,   | 174.405.802-49 | MARIA DO SOCORRO ALMEIDA DO NASCIMENTO, | PROFESSOR | PORTARIA AP No 214 DE 31 DE JANEIRO DE 2023   |
| 217956/1,   | 450.063.422-34 | CLEUZA MARIA NEGRAO DE ALMEIDA,         | ADM.GERAL | PORTARIA AP No 205 DE 30 DE JANEIRO DE 2023   |
| 602892/2,   | 158.849.962-68 | CARLETE MARIA MARGALHO PIMENTEL,        | PROFESSOR | PORTARIA AP No 285 DE 08 DE FEVEREIRO DE 2023 |
| 587770/1,   | 167.093.142-00 | MARIA LINDALVA LIMA SILVA,              | PROFESSOR | PORTARIA AP No 261 DE 03 DE FEVEREIRO DE 2023 |

---

### Aba: ABRIL 2023
- **Dimensões (Linhas, Colunas):** (25, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | str | 0 | 25 | 246867/2,   |
| CPF | str | 0 | 25 | 231.807.652-91 |
| NOME DO SERVIDOR | str | 0 | 25 | ANA FREITAS PONTES,  |
| FUNÇÃO | str | 0 | 2 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 25 | PORTARIA AP No 581 DE 14 DE MARÇO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR                   | FUNÇÃO    | NUMERO DA PORTARIA                        |
|:------------|:---------------|:-----------------------------------|:----------|:------------------------------------------|
| 246867/2,   | 231.807.652-91 | ANA FREITAS PONTES,                | PROFESSOR | PORTARIA AP No 581 DE 14 DE MARÇO DE 2023 |
| 513067/2,   | 487.719.882-20 | MARIA CLEIDEMAR MAIA CARNEIRO,     | PROFESSOR | PORTARIA AP No 578 DE 14 DE MARÇO DE 2023 |
| 416096/2,   | 008.527.162-49 | SERGIOMAR VILANOVA MONTEIRO,       | PROFESSOR | PORTARIA AP No 625 DE 20 DE MARÇO DE 2023 |
| 5336635/2,  | 248.984.812-72 | ROSELENE SILVA DOS SANTOS BARACHO, | PROFESSOR | PORTARIA AP No 585 DE 15 DE MARÇO DE 2023 |
| 57212027/1, | 088.186.572-91 | SANDRA MARIA DA COSTA MACIEL,      | ADM.GERAL | PORTARIA AP No 609 DE 17 DE MARÇO DE 2023 |

---

### Aba: MAIO 2023
- **Dimensões (Linhas, Colunas):** (21, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | str | 0 | 21 | 554022/1,  |
| CPF | str | 0 | 21 | 243.584.282-15 |
| NOME DO SERVIDOR | str | 0 | 21 | MIRACY RODRIGUES MARTINS, |
| FUNÇÃO | str | 0 | 2 | ADM.GERAL |
| NUMERO DA PORTARIA | str | 0 | 21 | PORTARIA AP No 723 DE 29 DE MARÇO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR                 | FUNÇÃO    | NUMERO DA PORTARIA                        |
|:------------|:---------------|:---------------------------------|:----------|:------------------------------------------|
| 554022/1,   | 243.584.282-15 | MIRACY RODRIGUES MARTINS,        | ADM.GERAL | PORTARIA AP No 723 DE 29 DE MARÇO DE 2023 |
| 557153/1,   | 236.702.822-20 | DEMETRIA FILOMENA ARAUJO FLEXA,  | ADM.GERAL | PORTARIA AP No 650 DE 23 DE MARÇO DE 2023 |
| 5049660/1,  | 289.057.092-49 | ANA LUCIA BASTOS PINHO DE ASSIS, | PROFESSOR | PORTARIA AP No 744 DE 25 DE ABRIL DE 2023 |
| 5657741/1,  | 333.848.192-68 | EDINEIA PIRES DA ROCHA RAMOS,    | PROFESSOR | PORTARIA AP No 833 DE 06 DE ABRIL DE 2023 |
| 5059771/1,  | 190.159.922-15 | VALDINETE FERREIRA RODRIGUES,    | PROFESSOR | PORTARIA AP No 827 DE 05 DE ABRIL DE 2023 |

---

### Aba: JUNHO 2023
- **Dimensões (Linhas, Colunas):** (38, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | str | 0 | 38 | 455610/1 |
| CPF | str | 0 | 37 | 223.997.042-15 |
| NOME DO SERVIDOR | str | 0 | 38 | ANA D ARC MARTINS DE AZEVEDO,   |
| FUNÇÃO | str | 0 | 2 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 38 | PORTARIA AP No 1.161 DE 19 DE MAIO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR               | FUNÇÃO    | NUMERO DA PORTARIA                         |
|:------------|:---------------|:-------------------------------|:----------|:-------------------------------------------|
| 455610/1    | 223.997.042-15 | ANA D ARC MARTINS DE AZEVEDO,  | PROFESSOR | PORTARIA AP No 1.161 DE 19 DE MAIO DE 2023 |
| 399191/1,   | 122.162.672-87 | ANA LUCIA OLIVEIRA DOS SANTOS, | ADM.GERAL | PORTARIA AP No 1.139 DE 17 DE MAIO DE 2023 |
| 5618495/2   | 108.991.622-15 | MARIA CELESTE GOMES RIBEIRO,   | ADM.GERAL | PORTARIA AP No 1124 DE 16 DE MAIO DE 2023  |
| 424404/1;   | 163.507.662-53 | MARIA JOSÉ RIBEIRO DE SOUSA,   | ADM.GERAL | PORTARIA AP No 1128 DE 17 DE MAIO DE 2023  |
| 534722/1,   | 280.617.642-53 | SEBASTIANA RODRIGUES CARVALHO, | ADM.GERAL | PORTARIA AP No 1.131 DE 17 DE MAIO DE 2023 |

---

### Aba: JULHO 2023
- **Dimensões (Linhas, Colunas):** (33, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | object | 0 | 33 | 244554/2, |
| CPF | str | 0 | 33 | 157.465.692-91 |
| NOME DO SERVIDOR | str | 0 | 33 | DORALICE BEZERRA COLARES, |
| FUNÇÃO | str | 0 | 2 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 33 | PORTARIA AP No 1.183 DE 22 DE MAIO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR                  | FUNÇÃO    | NUMERO DA PORTARIA                          |
|:------------|:---------------|:----------------------------------|:----------|:--------------------------------------------|
| 244554/2,   | 157.465.692-91 | DORALICE BEZERRA COLARES,         | PROFESSOR | PORTARIA AP No 1.183 DE 22 DE MAIO DE 2023  |
| 6310800/2,  | 297.715.282-20 | LILIAN CRISTINE FERREIRA CHAGAS,  | PROFESSOR | PORTARIA AP No 1.251 DE 30 DE MAIO DE 2023  |
| 628212/1,   | 297.046.422-53 | ODENILZE MARIA FERREIRA DE PAIVA, | PROFESSOR | PORTARIA AP No 1.240 DE 01 DE JUNHO DE 2023 |
| 6306667/2,  | 159.656.862-34 | JOANA DO SOCORRO COSTA BARATA,    | PROFESSOR | PORTARIA AP No 1.287 DE 05 DE JUNHO DE 2023 |
| 498793/1,   | 257.866.792-68 | MARIA OLIVIA SACRAMENTO DE SOUZA, | PROFESSOR | PORTARIA AP No 1.261 DE 31 DE MAIO DE 2023  |

---

### Aba: AGOSTO 2023
- **Dimensões (Linhas, Colunas):** (37, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | str | 0 | 37 | 520012/1, |
| CPF | str | 0 | 37 | 249.464.862-91 |
| NOME DO SERVIDOR | str | 0 | 37 | SOLANGE MAIA BARROS, |
| FUNÇÃO | str | 0 | 1 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 37 | PORTARIA AP No 1.529 DE 04 DE JULHO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR                    | FUNÇÃO    | NUMERO DA PORTARIA                           |
|:------------|:---------------|:------------------------------------|:----------|:---------------------------------------------|
| 520012/1,   | 249.464.862-91 | SOLANGE MAIA BARROS,                | PROFESSOR | PORTARIA AP No 1.529 DE 04 DE JULHO DE 2023  |
| 460230/1,   | 057.190.248-08 | IVONILDA FERREIRA PEREIRA TEIXEIRA, | PROFESSOR | PORTARIA AP No 1.556 DE 07 DE JULHO DE 2023. |
| 6033750/3,  | 293.892.402-04 | MARCIA ANTONIA MOREIRA DA SILVA,    | PROFESSOR | PORTARIA AP No 1.486 DE 29 DE JUNHO DE 2023. |
| 601381/1,   | 188.213.402-87 | MARIA REGINA DA SILVA CARDOSO,      | PROFESSOR | PORTARIA AP No 1561 DE 10 DE JULHO DE 2023.  |
| 555720/1,   | 206.746.862-68 | MARIA LINDANOR SILVA GUIMARAES,     | PROFESSOR | PORTARIA AP No 1.470 DE 27 DE JUNHO DE 2023. |

---

### Aba: SETEMBRO 2023
- **Dimensões (Linhas, Colunas):** (43, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | object | 0 | 42 | 403512/1, |
| CPF | str | 0 | 43 | 175.901.082-00 |
| NOME DO SERVIDOR | str | 0 | 43 | MARIA ROSELINE RODRIGUES ALFAIA, |
| FUNÇÃO | str | 0 | 2 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 43 | PORTARIA AP No 2067 DE 25 DE AGOSTO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR                      | FUNÇÃO    | NUMERO DA PORTARIA                            |
|:------------|:---------------|:--------------------------------------|:----------|:----------------------------------------------|
| 403512/1,   | 175.901.082-00 | MARIA ROSELINE RODRIGUES ALFAIA,      | PROFESSOR | PORTARIA AP No 2067 DE 25 DE AGOSTO DE 2023   |
| 234796/1,   | 287.656.212-04 | MARIA D AJUDA BRITO GOMES DOS SANTOS, | ADM.GERAL | PORTARIA AP No 1.969 DE 16 DE AGOSTO DE 2023  |
| 399809/1,   | 187.873.472-53 | JANDIRA DE LEÃO BALIEIRO              | ADM.GERAL | PORTARIA AP No 2.063 DE 25 DE AGOSTO DE 2023  |
| 600148/1,   | 095.471.502-00 | EDINA DE LIMA BAIA,                   | ADM.GERAL | PORTARIA AP No 1.420 DE 16 DE AGOSTO DE 2023  |
| 380776/1,   | 207.878.802-30 | ZULMIRA BARRETO BENTES                | PROFESSOR | PORTARIA AP No 2.016 DE 23 DE AGOSTO DE 2023. |

---

### Aba: OUTUBRO 2023
- **Dimensões (Linhas, Colunas):** (79, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | object | 0 | 78 | 498734/1, |
| CPF | str | 0 | 76 | 115.874.152-91 |
| NOME DO SERVIDOR | str | 0 | 78 | JUCILEIA MIRANDA RAMOS |
| FUNÇÃO | str | 0 | 2 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 76 | PORTARIA AP No 2.148 DE 04 DE SETEMBRO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR                    | FUNÇÃO    | NUMERO DA PORTARIA                              |
|:------------|:---------------|:------------------------------------|:----------|:------------------------------------------------|
| 498734/1,   | 115.874.152-91 | JUCILEIA MIRANDA RAMOS              | PROFESSOR | PORTARIA AP No 2.148 DE 04 DE SETEMBRO DE 2023  |
| 304735/1,   | 012.630.992-20 | DANIEL LOURENCO DA SILVA            | ADM.GERAL | PORTARIA AP No 2246 DE 06 DE SETEMBRO 2023      |
| 285560/1,   | 143.988.932-53 | MARIA LUCIMAR DE ALENCAR DE SANTANA | PROFESSOR | PORTARIA AP No 2.248 DE 06 DE SETEMBRO DE 2023  |
| 456594/1,   | 145.311.192-15 | WELLINGTON SILVA SANTOS             | PROFESSOR | PORTARIA AP No 2.285 DE 12 DE SETEMBRO DE 2023. |
| 367303/1,   | 176.638.572-91 | HELIANE DO SOCORRO FERREIRA BRITO   | ADM.GERAL | PORTARIA AP No 2.269 DE 06 DE SETEMBRO DE 2023  |

---

### Aba: NOVEMBRO 2023
- **Dimensões (Linhas, Colunas):** (96, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRICULA | str | 0 | 93 | 521914/1, |
| CPF | str | 0 | 89 | 069.161.632-91 |
| NOME DO SERVIDOR | str | 0 | 91 | PEDRO GILMAR DANTAS DA CUNHA |
| FUNÇÃO | str | 0 | 2 | PROFESSOR |
| NUMERO DA PORTARIA | str | 0 | 92 | PORTARIA AP Nº 2.845 DE 01 DE NOVEMBRO DE 2023 |

#### Primeiras 5 linhas:
| MATRICULA   | CPF            | NOME DO SERVIDOR             | FUNÇÃO    | NUMERO DA PORTARIA                             |
|:------------|:---------------|:-----------------------------|:----------|:-----------------------------------------------|
| 521914/1,   | 069.161.632-91 | PEDRO GILMAR DANTAS DA CUNHA | PROFESSOR | PORTARIA AP Nº 2.845 DE 01 DE NOVEMBRO DE 2023 |
| 388416/2    | 102.387.782-15 | DIVANIRA DE ARAUJO BRITO     | PROFESSOR | PORTARIA AP Nº 2.846 DE 26 DE OUTUBRO DE 2023. |
| 392359/1,   | 098.212.282-91 | Iaci Maria Lira Aguiar       | PROFESSOR | PORTARIA AP Nº 2613 DE 03 DE OUTUBRO DE 2023   |
| 602060/1    | 102.461.182-53 | MARIA JOSE GOMES RIBEIRO     | ADM.GERAL | PORTARIA AP Nº 2.706 DE 11 DE OUTUBRO DE 2023  |
| 675032-1    | 104.530.162-00 | IRANIR GOMES DOS SANTOS      | ADM.GERAL | PORTARIA AP Nº 2.638 DE 05 DE OUTUBRO DE 2023  |

---

## Arquivo: PUBLICAÇÕES DE APOSENTADORIAS 2025.xlsx
- **Tamanho do Arquivo:** 89.69 KB
- **Abas encontradas:** QUANTITATIVO 2025, JANEIRO 2025, FEVEREIRO 2025, MARÇO 2025, ABRIL 2025, MAIO 2025, JUNHO 2025, JULHO 2025, AGOSTO 2025, SETEMBRO 2025, OUTUBRO 2025, NOVEMBRO 2025, DADOS IGEPPS ADM, DADOS IGEPPS PROFESSOR

### Aba: QUANTITATIVO 2025
- **Dimensões (Linhas, Colunas):** (20, 5)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| Unnamed: 0 | float64 | 20 | 0 | N/A |
| Unnamed: 1 | str | 5 | 15 | N/A |
| Unnamed: 2 | object | 8 | 11 | N/A |
| Unnamed: 3 | object | 8 | 11 | N/A |
| Unnamed: 4 | object | 7 | 11 | N/A |

#### Primeiras 5 linhas:
|   Unnamed: 0 |   Unnamed: 1 |   Unnamed: 2 |   Unnamed: 3 |   Unnamed: 4 |
|-------------:|-------------:|-------------:|-------------:|-------------:|
|          nan |          nan |          nan |          nan |          nan |
|          nan |          nan |          nan |          nan |          nan |
|          nan |          nan |          nan |          nan |          nan |
|          nan |          nan |          nan |          nan |          nan |
|          nan |          nan |          nan |          nan |          nan |

---

### Aba: JANEIRO 2025
- **Dimensões (Linhas, Colunas):** (166, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | object | 0 | 166 | 6311482-1 |
| NOME DO SEVIDOR | str | 0 | 166 | ABIGAIL NUNES DA SILVA |
| DRE | str | 164 | 2 | DRE CURRALINHO |
| APOSENTADORIA | str | 0 | 4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| CARGO | str | 0 | 2 | PROFESSOR |
| PAE | str | 126 | 40 | 2020/677911 |
| NÚMERO 
DA PORTARIA | int64 | 0 | 166 | 5001 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 2 | 2025-01-10 00:00:00 |
| DATA 
DO
 EFEITO FINACEIRO | datetime64[us] | 0 | 2 | 2025-01-01 00:00:00 |
| OBSERVAÇÃO | str | 165 | 1 | N/A |
| EQUIPE DADOS | str | 0 | 1 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |

#### Primeiras 5 linhas:
| MATRÍCULA   | NOME DO SEVIDOR              | DRE            | APOSENTADORIA                           | CARGO     | PAE          |       NÚMERO  | DATA                | DATA                | OBSERVAÇÃO   | EQUIPE DADOS                           |
|             |                              |                |                                         |           |              |   DA PORTARIA | DE PUBLICAÇÃO       | DO                  |              |                                        |
|             |                              |                |                                         |           |              |               |                     |  EFEITO FINACEIRO   |              |                                        |
|:------------|:-----------------------------|:---------------|:----------------------------------------|:----------|:-------------|--------------:|:--------------------|:--------------------|:-------------|:---------------------------------------|
| 6311482-1   | ABIGAIL NUNES DA SILVA       | DRE CURRALINHO | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | PROFESSOR | 2020/677911  |          5001 | 2025-01-10 00:00:00 | 2025-01-01 00:00:00 | nan          | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
| 6023088-1   | ADALTA MARIA BRITO FARIAS    | nan            | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | ADM.GERAL | 2021/1214427 |          5010 | 2025-01-10 00:00:00 | 2025-01-01 00:00:00 | nan          | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
| 6320295-2   | AFONSO GOMES DE SOUSA        | nan            | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | PROFESSOR | 2023/1062168 |          5045 | 2025-01-10 00:00:00 | 2025-01-01 00:00:00 | nan          | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
| 539252-1    | AIDA PEREIRA DE SOUZA        | DRE CASTANHAL  | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | PROFESSOR | 2014/268982  |          5155 | 2025-01-10 00:00:00 | 2025-01-01 00:00:00 | nan          | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
| 353450-1    | ALDALINA FIGUEIREDO FERREIRA | nan            | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | PROFESSOR | 2012/98811   |          5133 | 2025-01-10 00:00:00 | 2025-01-01 00:00:00 | 2021/1147383 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |

---

### Aba: FEVEREIRO 2025
- **Dimensões (Linhas, Colunas):** (44, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 44 | 363073 |
| NOME DO SEVIDOR | str | 0 | 44 | ADARLENE CHAVES FIGUEIREDO |
| CARGO | str | 0 | 2 | ADM.GERAL |
| DRE | str | 0 | 5 | APOSENTADORIA POR INVALIDEZ |
| PAE | str | 0 | 44 | 2018/261999 |
| NÚMERO
 DA PORTARIA | int64 | 0 | 44 | 5322 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-02-10 00:00:00 |
| DATA
 DO
 EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-02-01 00:00:00 |
| OBSERVAÇÃO | str | 39 | 5 | N/A |
| EQUIPE DADOS | str | 0 | 1 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |

#### Primeiras 5 linhas:
|   MATRÍCULA | NOME DO SEVIDOR               | CARGO     | DRE                                       | PAE         |         NÚMERO | DATA                | DATA                | OBSERVAÇÃO   | EQUIPE DADOS                           |
|             |                               |           |                                           |             |    DA PORTARIA | DE PUBLICAÇÃO       |  DO                 |              |                                        |
|             |                               |           |                                           |             |                |                     |  EFEITO FINACEIRO   |              |                                        |
|------------:|:------------------------------|:----------|:------------------------------------------|:------------|---------------:|:--------------------|:--------------------|:-------------|:---------------------------------------|
|      363073 | ADARLENE CHAVES FIGUEIREDO    | ADM.GERAL | APOSENTADORIA POR INVALIDEZ               | 2018/261999 |           5322 | 2025-02-10 00:00:00 | 2025-02-01 00:00:00 | nan          | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
|      307122 | ADJALMA MENDES DA CONCEIÇÃO   | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO   | 2023/96522  |           5525 | 2025-02-10 00:00:00 | 2025-02-01 00:00:00 | 2023/96522   | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
|    57174233 | ADRIANA MARÇAL DE LIMA SOARES | PROFESSOR | APOSENTADORIA POR INCAPACIDADE PERMANENTE | 2021/675384 |           5419 | 2025-02-10 00:00:00 | 2025-02-01 00:00:00 | nan          | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
|      449199 | ALAIDE DA SILVA CONCEIÇÃO     | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO   | 2021/625986 |           5511 | 2025-02-10 00:00:00 | 2025-02-01 00:00:00 | nan          | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
|      279579 | ANA MARIA DE SOUZA MAIA       | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO   | 2015/121048 |            148 | 2025-02-10 00:00:00 | 2025-02-01 00:00:00 | nan          | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |

---

### Aba: MARÇO 2025
- **Dimensões (Linhas, Colunas):** (45, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 45 | 517640 |
| NOME DO SEVIDOR | str | 0 | 45 | ALZIRA LINDA DA COSTA LAVOR |
| CARGO | str | 0 | 2 | ADM.GERAL |
| APOSENTADORIA | str | 0 | 4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| DRE | float64 | 45 | 0 | N/A |
| PAE | str | 0 | 45 | 2021/960297 |
| NÚMERO DA PORTARIA | int64 | 0 | 45 | 439 |
| DATA DE PUBLICAÇÃO | str | 0 | 1 | 10/03/0205 |
| DATA DO EFEITO FINACEIRO | str | 0 | 1 | 10/03/0205 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA | NOME DO SEVIDOR                         | CARGO     | APOSENTADORIA                           |   DRE | PAE          |   NÚMERO DA PORTARIA | DATA DE PUBLICAÇÃO   | DATA DO EFEITO FINACEIRO   | EQUIPE DADOS              |
|------------:|:----------------------------------------|:----------|:----------------------------------------|------:|:-------------|---------------------:|:---------------------|:---------------------------|:--------------------------|
|      517640 | ALZIRA LINDA DA COSTA LAVOR             | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2021/960297  |                  439 | 10/03/0205           | 10/03/0205                 | MARIA EDUARDA BARATA CRUZ |
|      731226 | ALBA CELIA ALVES BARROS DA SILVA        | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2021/599653  |                  508 | 10/03/0205           | 10/03/0205                 | MARIA EDUARDA BARATA CRUZ |
|      607240 | ANA MARIA CALANDRINI DE AZEVEDO BARBOSA | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2021/1214527 |                  463 | 10/03/0205           | 10/03/0205                 | MARIA EDUARDA BARATA CRUZ |
|      239933 | ANA LUCIA NOGUEIRA RIBEIRO              | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2021/1222334 |                  417 | 10/03/0205           | 10/03/0205                 | MARIA EDUARDA BARATA CRUZ |
|      567817 | ANA MARIA DO SOCORRO SANTANA PONTES     | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2021/548205  |                  326 | 10/03/0205           | 10/03/0205                 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: ABRIL 2025
- **Dimensões (Linhas, Colunas):** (78, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 78 | 786594 |
| NOME DO SEVIDOR | str | 0 | 78 | ADAUER TADEU SOUZA |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 3 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| DRE | float64 | 78 | 0 | N/A |
| PAE | str | 0 | 78 | 2019/195178 |
| NÚMERO 
DA PORTARIA | int64 | 0 | 77 | 759 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-04-10 00:00:00 |
| DATA 
DO 
EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-04-01 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |

#### Primeiras 5 linhas:
|   MATRÍCULA | NOME DO SEVIDOR                   | CARGO     | APOSENTADORIA                           |   DRE | PAE         |       NÚMERO  | DATA                | DATA                | EQUIPE DADOS                           |
|             |                                   |           |                                         |       |             |   DA PORTARIA | DE PUBLICAÇÃO       | DO                  |                                        |
|             |                                   |           |                                         |       |             |               |                     | EFEITO FINACEIRO    |                                        |
|------------:|:----------------------------------|:----------|:----------------------------------------|------:|:------------|--------------:|:--------------------|:--------------------|:---------------------------------------|
|      786594 | ADAUER TADEU SOUZA                | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2019/195178 |           759 | 2025-04-10 00:00:00 | 2025-04-01 00:00:00 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
|      295833 | ADELIA MARIA LAGOIA VALENTE       | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2013/366957 |           759 | 2025-04-10 00:00:00 | 2025-04-01 00:00:00 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
|     6313949 | ALDENORA FATIMA DE AGUIAR PARENTE | PROFESSOR | APOSENTADORIA POR INVALIDEZ             |   nan | 2020/655680 |           690 | 2025-04-10 00:00:00 | 2025-04-01 00:00:00 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
|      688339 | ANA INES MARQUES DOS SANTOS       | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2018/134431 |           953 | 2025-04-10 00:00:00 | 2025-04-01 00:00:00 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |
|      550159 | ANA MIRA VEIGA DA COSTA           | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan | 2019/380305 |          1087 | 2025-04-10 00:00:00 | 2025-04-01 00:00:00 | LUCAS VINGRE OLIVEIRA BENICIO DE SOUZA |

---

### Aba: MAIO 2025
- **Dimensões (Linhas, Colunas):** (52, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 52 | 958182 |
| VINCULO | int64 | 0 | 2 | 2 |
| NOME DO SEVIDOR | str | 0 | 52 | NILENE FERREIRA CARDOSO SOUZA |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 2 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| DRE | float64 | 52 | 0 | N/A |
| PAE | str | 0 | 52 | 2021/1221229 |
| NÚMERO 
DA PORTARIA | int64 | 0 | 52 | 1054 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-05-12 00:00:00 |
| DATA 
DO 
EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-05-01 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VINCULO | NOME DO SEVIDOR               | CARGO     | APOSENTADORIA                                    |   DRE | PAE          |       NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                               |           |                                                  |       |              |   DA PORTARIA | DE PUBLICAÇÃO       | DO                  |                           |
|             |           |                               |           |                                                  |       |              |               |                     | EFEITO FINACEIRO    |                           |
|------------:|----------:|:------------------------------|:----------|:-------------------------------------------------|------:|:-------------|--------------:|:--------------------|:--------------------|:--------------------------|
|      958182 |         2 | NILENE FERREIRA CARDOSO SOUZA | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |   nan | 2021/1221229 |          1054 | 2025-05-12 00:00:00 | 2025-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      271870 |         2 | SOLANGE PACHECO GUIMARAES     | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |   nan | 2018/134157  |          1167 | 2025-05-12 00:00:00 | 2025-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      771198 |         1 | JOAQUIM DA SILVA SARGES       | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |   nan | 2021/942578  |          1004 | 2025-05-12 00:00:00 | 2025-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     3217469 |         2 | DALVA HELENA DA LUZ SANTANA   | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |   nan | 2018/154804  |          1002 | 2025-05-12 00:00:00 | 2025-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      404217 |         1 | ELIEL CORREA QUARESMA         | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |   nan | 2013/598734  |          1003 | 2025-05-12 00:00:00 | 2025-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: JUNHO 2025
- **Dimensões (Linhas, Colunas):** (84, 12)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 83 | 683248 |
| VINCULO | int64 | 0 | 4 | 3 |
| NOME DO SEVIDOR | str | 0 | 84 | JOSÉ SOLON MARTINS |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 4 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 84 | 2017/139693 |
| Unnamed: 6 | float64 | 84 | 0 | N/A |
| NÚMERO 
DA PORTARIA | int64 | 0 | 83 | 1409 |
| NÚMERO
 DA PORTARIA | datetime64[us] | 0 | 1 | 2025-06-10 00:00:00 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-06-01 00:00:00 |
| DATA 
DO 
EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-06-01 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VINCULO | NOME DO SEVIDOR               | CARGO     | APOSENTADORIA                                    | PAE         |   Unnamed: 6 |       NÚMERO  | NÚMERO              | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                               |           |                                                  |             |              |   DA PORTARIA |  DA PORTARIA        | DE PUBLICAÇÃO       | DO                  |                           |
|             |           |                               |           |                                                  |             |              |               |                     |                     | EFEITO FINACEIRO    |                           |
|------------:|----------:|:------------------------------|:----------|:-------------------------------------------------|:------------|-------------:|--------------:|:--------------------|:--------------------|:--------------------|:--------------------------|
|      683248 |         3 | JOSÉ SOLON MARTINS            | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2017/139693 |          nan |          1409 | 2025-06-10 00:00:00 | 2025-06-01 00:00:00 | 2025-06-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      729582 |         2 | BENTA HELENA PALHETA DA SILVA | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2020/501635 |          nan |          1458 | 2025-06-10 00:00:00 | 2025-06-01 00:00:00 | 2025-06-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      973513 |         1 | VALDECI MORAES DE MENEZES     | PROFESSOR | APOSENTADORIA POR INVALIDEZ                      | 2018/128529 |          nan |          1418 | 2025-06-10 00:00:00 | 2025-06-01 00:00:00 | 2025-06-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      293431 |         1 | ELZA MARIA DE SOUSA MESQUITA  | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2014/521320 |          nan |          1365 | 2025-06-10 00:00:00 | 2025-06-01 00:00:00 | 2025-06-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     6310826 |         1 | ROSANA MARIA MORAES LUCIANO   | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/134927 |          nan |          1452 | 2025-06-10 00:00:00 | 2025-06-01 00:00:00 | 2025-06-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: JULHO 2025
- **Dimensões (Linhas, Colunas):** (42, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 42 | 303569 |
| VINCULO | int64 | 0 | 2 | 1 |
| NOME DO SEVIDOR | str | 0 | 42 | CARLOS ALBERTO LOPES DO VALE |
| CARGO | str | 0 | 2 | ADM.GERAL |
| APOSENTADORIA | str | 0 | 3 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 42 | 2023/1455746 |
| DRE | float64 | 42 | 0 | N/A |
| NÚMERO 
DA PORTARIA | int64 | 0 | 42 | 1825 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-07-10 00:00:00 |
| DATA 
DO
 EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-07-01 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VINCULO | NOME DO SEVIDOR                   | CARGO     | APOSENTADORIA                                    | PAE          |   DRE |       NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                   |           |                                                  |              |       |   DA PORTARIA | DE PUBLICAÇÃO       | DO                  |                           |
|             |           |                                   |           |                                                  |              |       |               |                     |  EFEITO FINACEIRO   |                           |
|------------:|----------:|:----------------------------------|:----------|:-------------------------------------------------|:-------------|------:|--------------:|:--------------------|:--------------------|:--------------------------|
|      303569 |         1 | CARLOS ALBERTO LOPES DO VALE      | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2023/1455746 |   nan |          1825 | 2025-07-10 00:00:00 | 2025-07-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      486345 |         1 | ROSA MARIA DE SOUZA OLIVEIRA      | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2015/172978  |   nan |          1803 | 2025-07-10 00:00:00 | 2025-07-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     6308260 |         1 | ELAINE MARIA GONÇALVES DOS SANTOS | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/1223705 |   nan |          1594 | 2025-07-10 00:00:00 | 2025-07-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      354350 |         1 | MARIA HELENA AZEVEDO MONTEIRO     | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2019/621184  |   nan |          1727 | 2025-07-10 00:00:00 | 2025-07-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      670731 |         1 | MARIA ODETE DA COSTA PEREIRA      | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2010/169825  |   nan |          1714 | 2025-07-10 00:00:00 | 2025-07-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: AGOSTO 2025
- **Dimensões (Linhas, Colunas):** (18, 12)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| Unnamed: 0 | float64 | 18 | 0 | N/A |
| MATRÍCULA | int64 | 0 | 18 | 299022 |
| VINCULO | int64 | 0 | 3 | 1 |
| NOME DO SEVIDOR | str | 0 | 18 | ANNA DE LOURDES MARINHO E SILVA |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 3 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| PAE | str | 0 | 18 | 2014/243637 |
| DRE | float64 | 18 | 0 | N/A |
| NÚMERO
 DA PORTARIA | int64 | 0 | 18 | 1938 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-08-01 00:00:00 |
| DATA
 DO 
EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-08-01 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
|   Unnamed: 0 |   MATRÍCULA |   VINCULO | NOME DO SEVIDOR                           | CARGO     | APOSENTADORIA                           | PAE          |   DRE |         NÚMERO | DATA                | DATA                | EQUIPE DADOS                                 |
|              |             |           |                                           |           |                                         |              |       |    DA PORTARIA | DE PUBLICAÇÃO       |  DO                 |                                              |
|              |             |           |                                           |           |                                         |              |       |                |                     | EFEITO FINACEIRO    |                                              |
|-------------:|------------:|----------:|:------------------------------------------|:----------|:----------------------------------------|:-------------|------:|---------------:|:--------------------|:--------------------|:---------------------------------------------|
|          nan |      299022 |         1 | ANNA DE LOURDES MARINHO E SILVA           | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | 2014/243637  |   nan |           1938 | 2025-08-01 00:00:00 | 2025-08-01 00:00:00 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|          nan |     6003389 |         1 | LEOLINDA PINHEIRO CORREA                  | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | 2021/1217195 |   nan |           1993 | 2025-08-01 00:00:00 | 2025-08-01 00:00:00 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|          nan |      329398 |         2 | PAULO CELSO PANTOJA BANHOS                | PROFESSOR | APOSENTADORIA POR INVALIDEZ             | 2021/1215537 |   nan |           1967 | 2025-08-01 00:00:00 | 2025-08-01 00:00:00 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|          nan |      499200 |         1 | LUIZA DE MARILLAC DA SILVA DOS SANTOS     | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | 2014/581416  |   nan |           2033 | 2025-08-01 00:00:00 | 2025-08-01 00:00:00 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|          nan |     6329764 |         1 | LUIZA DE MARILAC VALENTE DE ANDRADE PAIVA | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | 2013/96566   |   nan |           2012 | 2025-08-01 00:00:00 | 2025-08-01 00:00:00 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: SETEMBRO 2025
- **Dimensões (Linhas, Colunas):** (25, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 25 | 683710 |
| VINCULO | int64 | 0 | 4 | 1 |
| NOME DO SEVIDOR | str | 0 | 25 | MARIA JOSE SOUZA DA SILVA |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 2 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 25 | 2010/169959 |
| DRE | float64 | 25 | 0 | N/A |
| NÚMERO 
DA PORTARIA | int64 | 0 | 25 | 1914 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-09-10 00:00:00 |
| DATA 
DO 
EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-09-10 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VINCULO | NOME DO SEVIDOR                 | CARGO     | APOSENTADORIA                                    | PAE         |   DRE |       NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                 |           |                                                  |             |       |   DA PORTARIA | DE PUBLICAÇÃO       | DO                  |                           |
|             |           |                                 |           |                                                  |             |       |               |                     | EFEITO FINACEIRO    |                           |
|------------:|----------:|:--------------------------------|:----------|:-------------------------------------------------|:------------|------:|--------------:|:--------------------|:--------------------|:--------------------------|
|      683710 |         1 | MARIA JOSE SOUZA DA SILVA       | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2010/169959 |   nan |          1914 | 2025-09-10 00:00:00 | 2025-09-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      362417 |         1 | MARIA DO SOCORRO XAVIER DE SENA | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2014/150103 |   nan |          2152 | 2025-09-10 00:00:00 | 2025-09-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5716691 |         1 | LINA MARIA DIAS DOS SANTOS      | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/963380 |   nan |          2159 | 2025-09-10 00:00:00 | 2025-09-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      369543 |         3 | SONIA MARIA PIRES EVANGELISTA   | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/229365 |   nan |          2164 | 2025-09-10 00:00:00 | 2025-09-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      269700 |         2 | FERDINEY PINHEIRO CARVALHO      | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/135701 |   nan |          2193 | 2025-09-10 00:00:00 | 2025-09-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: OUTUBRO 2025
- **Dimensões (Linhas, Colunas):** (52, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 52 | 558869 |
| VINCULO | int64 | 0 | 3 | 2 |
| NOME DO SEVIDOR | str | 0 | 52 | LEONARDO PANTOJA DA SILVA |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 3 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 52 | 2018/250503  |
| DRE | float64 | 52 | 0 | N/A |
| NÚMERO 
DA PORTARIA | int64 | 0 | 52 | 2659 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-10-10 00:00:00 |
| DATA 
DO 
EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-10-10 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VINCULO | NOME DO SEVIDOR                        | CARGO     | APOSENTADORIA                                    | PAE         |   DRE |       NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                        |           |                                                  |             |       |   DA PORTARIA | DE PUBLICAÇÃO       | DO                  |                           |
|             |           |                                        |           |                                                  |             |       |               |                     | EFEITO FINACEIRO    |                           |
|------------:|----------:|:---------------------------------------|:----------|:-------------------------------------------------|:------------|------:|--------------:|:--------------------|:--------------------|:--------------------------|
|      558869 |         2 | LEONARDO PANTOJA DA SILVA              | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/250503 |   nan |          2659 | 2025-10-10 00:00:00 | 2025-10-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      571482 |         1 | JOSE ROMILDO DIAS DA SILVA             | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2022/337043 |   nan |          2640 | 2025-10-10 00:00:00 | 2025-10-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      761311 |         1 | MARIA DE NAZARE LINS GOMES             | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2024/248807 |   nan |          2651 | 2025-10-10 00:00:00 | 2025-10-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      228737 |         1 | MARIA DE NAZARE OLIVEIRA SANTA BRIGIDA | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/962501 |   nan |          2645 | 2025-10-10 00:00:00 | 2025-10-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      467847 |         1 | OLIVAR DA SILVA MORAES                 | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/170237 |   nan |          2599 | 2025-10-10 00:00:00 | 2025-10-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: NOVEMBRO 2025
- **Dimensões (Linhas, Colunas):** (42, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 42 | 384941 |
| VINCULO | int64 | 0 | 3 | 1 |
| NOME DO SEVIDOR | str | 0 | 42 | ERONDINA DA PAZ PEREIRA DE ARAUJO |
| CARGO | str | 0 | 2 | ADM.GERAL |
| APOSENTADORIA | str | 0 | 2 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 42 | 2014/139376 |
| DRE | float64 | 42 | 0 | N/A |
| NÚMERO 
DA PORTARIA | int64 | 0 | 42 | 2668 |
| DATA 
DE PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2025-11-10 00:00:00 |
| DATA 
DO 
EFEITO FINACEIRO | datetime64[us] | 0 | 1 | 2025-11-10 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VINCULO | NOME DO SEVIDOR                   | CARGO     | APOSENTADORIA                                    | PAE          |   DRE |       NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                   |           |                                                  |              |       |   DA PORTARIA | DE PUBLICAÇÃO       | DO                  |                           |
|             |           |                                   |           |                                                  |              |       |               |                     | EFEITO FINACEIRO    |                           |
|------------:|----------:|:----------------------------------|:----------|:-------------------------------------------------|:-------------|------:|--------------:|:--------------------|:--------------------|:--------------------------|
|      384941 |         1 | ERONDINA DA PAZ PEREIRA DE ARAUJO | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2014/139376  |   nan |          2668 | 2025-11-10 00:00:00 | 2025-11-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     6004717 |         1 | ANA JOANA SOUSA DA SILVA          | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/1022969 |   nan |          2666 | 2025-11-10 00:00:00 | 2025-11-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      529885 |         1 | ANA LÚCIA DA SILVA CARDOSO        | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2024/1345460 |   nan |          2656 | 2025-11-10 00:00:00 | 2025-11-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      429295 |         1 | RAIMUNDA DE LIMA VIEIRA           | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2014/299828  |   nan |          2682 | 2025-11-10 00:00:00 | 2025-11-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      557765 |         1 | TELMA LUCIA LOUREIRO DE LIMA      | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/1219550 |   nan |          2693 | 2025-11-10 00:00:00 | 2025-11-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: DADOS IGEPPS ADM
- **Dimensões (Linhas, Colunas):** (29, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | object | 0 | 29 | 57208175 |
| NOME DO SEVIDOR | str | 0 | 29 | SONIA APARECIDA RODRIGUES DE OLIVEIRA |
| CARGO | str | 0 | 1 | ADM.GERAL |
| APOSENTADORIA | str | 0 | 3 | APOSENTADORIA POR INVALIDEZ |
| DRE | float64 | 29 | 0 | N/A |
| NÚMERO DA PORTARIA | int64 | 0 | 29 | 1640 |
| DATA DE PUBLICAÇÃO | object | 0 | 4 | 2025-04-10 00:00:00 |
| DATA DO EFEITO FINACEIRO | datetime64[us] | 0 | 3 | 2025-04-01 00:00:00 |
| MÊS | str | 0 | 2 | JUNHO |
| EQUIPE DADOS | str | 0 | 2 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
|   MATRÍCULA | NOME DO SEVIDOR                       | CARGO     | APOSENTADORIA                            |   DRE |   NÚMERO DA PORTARIA | DATA DE PUBLICAÇÃO   | DATA DO EFEITO FINACEIRO   | MÊS   | EQUIPE DADOS                                 |
|------------:|:--------------------------------------|:----------|:-----------------------------------------|------:|---------------------:|:---------------------|:---------------------------|:------|:---------------------------------------------|
|    57208175 | SONIA APARECIDA RODRIGUES DE OLIVEIRA | ADM.GERAL | APOSENTADORIA POR INVALIDEZ              |   nan |                 1640 | 2025-04-10 00:00:00  | 2025-04-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|     6026176 | MARIA ODETH DA SILVA NASCIMENTO       | ADM.GERAL | APOSENTADORIA POR INVALIDEZ              |   nan |                 1481 | 2025-06-10 00:00:00  | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|      311359 | REGINA COELI SOARES PEREIRA           | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRUIBUIÇÃO |   nan |                 1435 | 6/10/0205            | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|      210404 | MARIA DE LOURDES SILVA                | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRUIBUIÇÃO |   nan |                 1367 | 2025-06-10 00:00:00  | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|      201421 | LETICE DE SOUZA SASAKURA              | ADM.GERAL | APOSENTADORIA POR TEMPO DE CONTRUIBUIÇÃO |   nan |                 1513 | 2025-06-10 00:00:00  | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: DADOS IGEPPS PROFESSOR
- **Dimensões (Linhas, Colunas):** (79, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | object | 0 | 79 | 501999 |
| NOME DO SEVIDOR | str | 0 | 79 | GREGORIO MARGALHO CAMPOS |
| CARGO | str | 0 | 1 | PROFESSOR |
| APOSENTADORIA | str | 0 | 5 | APOSENTORIA COMPULSORIA |
| DRE | float64 | 79 | 0 | N/A |
| NÚMERO DA PORTARIA | int64 | 0 | 76 | 1388 |
| DATA DE PUBLICAÇÃO | datetime64[us] | 0 | 3 | 2025-06-10 00:00:00 |
| DATA DO EFEITO FINACEIRO | datetime64[us] | 0 | 3 | 2025-06-01 00:00:00 |
| MÊS | str | 0 | 2 | JUNHO |
| EQUIPE DADOS | str | 0 | 2 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
|   MATRÍCULA | NOME DO SEVIDOR                    | CARGO     | APOSENTADORIA                           |   DRE |   NÚMERO DA PORTARIA | DATA DE PUBLICAÇÃO   | DATA DO EFEITO FINACEIRO   | MÊS   | EQUIPE DADOS                                 |
|------------:|:-----------------------------------|:----------|:----------------------------------------|------:|---------------------:|:---------------------|:---------------------------|:------|:---------------------------------------------|
|      501999 | GREGORIO MARGALHO CAMPOS           | PROFESSOR | APOSENTORIA COMPULSORIA                 |   nan |                 1388 | 2025-06-10 00:00:00  | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|     6314139 | MARIA DA CONCEICAO DE SOUSA        | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan |                 1656 | 2025-06-10 00:00:00  | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|     5617235 | LAURINHA NASCIMENTO DE SOUZA       | PROFESSOR | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |   nan |                 1538 | 2025-06-10 00:00:00  | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|    57220518 | CARLA KYSE MENDONCA RANGEL ANTUNES | PROFESSOR | APOSENT INCAPACACIDADE PERMAMENTE       |   nan |                 1632 | 2025-06-10 00:00:00  | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
|     5262992 | JOSE WILDEMAR PAIVA DE ASSIS       | PROFESSOR | APOSENT INCAPACACIDADE PERMAMENTE       |   nan |                 1547 | 2025-06-10 00:00:00  | 2025-06-01 00:00:00        | JUNHO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

## Arquivo: PUBLICAÇÕES DE APOSENTADORIAS 2026.xlsx
- **Tamanho do Arquivo:** 88.20 KB
- **Abas encontradas:** ANALITICO, JANEIRO, FEVEREIRO, MARÇO, ABRIL, MAIO, JUNHO, JULHO, AGOSTO, SETEMBRO, OUTUBRO, NOVEMBRO

### Aba: ANALITICO
- **Dimensões (Linhas, Colunas):** (18, 4)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| Unnamed: 0 | str | 3 | 15 | N/A |
| Unnamed: 1 | object | 12 | 6 | N/A |
| Unnamed: 2 | object | 12 | 5 | N/A |
| Unnamed: 3 | object | 11 | 7 | N/A |

#### Primeiras 5 linhas:
| Unnamed: 0                                | Unnamed: 1   | Unnamed: 2   | Unnamed: 3   |
|:------------------------------------------|:-------------|:-------------|:-------------|
| nan                                       | nan          | nan          | nan          |
| nan                                       | nan          | nan          | nan          |
| nan                                       | nan          | nan          | nan          |
| QUANTITATIVO DE PUBLICAÇÕES APOSENTADORIA | nan          | nan          | nan          |
| MÊS                                       | PROFESSOR    | ADM. GERAL   | TOTAL        |

---

### Aba: JANEIRO
- **Dimensões (Linhas, Colunas):** (127, 12)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 127 | 5062810 |
| VÍNCULO | int64 | 0 | 3 | 2 |
| NOME DO SEVIDOR | str | 0 | 127 | OTACIO RUY NUNES DAS NEVES |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 2 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| SIIG | str | 120 | 7 | 1426731/2019 |
| PAE | str | 0 | 127 | 2021/645444 |
| DRE | float64 | 127 | 0 | N/A |
| NÚMERO 
DA 
PORTARIA | int64 | 0 | 127 | 2833 |
| DATA 
DE 
PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2026-01-09 00:00:00 |
| DATA 
DO 
EFEITO 
FINACEIRO | datetime64[us] | 0 | 1 | 2026-01-01 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VÍNCULO | NOME DO SEVIDOR                | CARGO     | APOSENTADORIA                                    | SIIG         | PAE          |   DRE |    NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                |           |                                                  |              |              |       |        DA  | DE                  | DO                  |                           |
|             |           |                                |           |                                                  |              |              |       |   PORTARIA | PUBLICAÇÃO          | EFEITO              |                           |
|             |           |                                |           |                                                  |              |              |       |            |                     | FINACEIRO           |                           |
|------------:|----------:|:-------------------------------|:----------|:-------------------------------------------------|:-------------|:-------------|------:|-----------:|:--------------------|:--------------------|:--------------------------|
|     5062810 |         2 | OTACIO RUY NUNES DAS NEVES     | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 1426731/2019 | 2021/645444  |   nan |       2833 | 2026-01-09 00:00:00 | 2026-01-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      673803 |         1 | CRISTINA CORDOVIL RODRIGUES    | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | nan          | 2022/1555979 |   nan |       2850 | 2026-01-09 00:00:00 | 2026-01-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5657938 |         2 | EDINA DO SOCORRO XAVIER ANGELO | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | nan          | 2024/140222  |   nan |       2864 | 2026-01-09 00:00:00 | 2026-01-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5059704 |         2 | ANTÔNIO LUÍS CORRÊA LOBATO     | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | nan          | 2023/660051  |   nan |       2847 | 2026-01-09 00:00:00 | 2026-01-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      449318 |         1 | HIPÓLITO QUARESMA MACIEL       | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | nan          | 2024/1075228 |   nan |       2830 | 2026-01-09 00:00:00 | 2026-01-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: FEVEREIRO
- **Dimensões (Linhas, Colunas):** (33, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 33 | 676918 |
| VÍNCULO | int64 | 0 | 4 | 1 |
| NOME DO SEVIDOR | str | 0 | 33 | MARIA DE LOURDES MAIA DIAS |
| CARGO | str | 0 | 2 | ADM.GERAL |
| APOSENTADORIA | str | 0 | 5 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 32 |  2014/459128 |
| DRE | float64 | 33 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | int64 | 0 | 31 | 111 |
| DATA 
DE
 PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2026-02-11 00:00:00 |
| DATA 
DO 
EFEITO 
FINACEIRO | datetime64[us] | 0 | 1 | 2026-02-01 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VÍNCULO | NOME DO SEVIDOR                   | CARGO     | APOSENTADORIA                                    | PAE         |   DRE |     NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                   |           |                                                  |             |       |          DA | DE                  | DO                  |                           |
|             |           |                                   |           |                                                  |             |       |    PORTARIA |  PUBLICAÇÃO         | EFEITO              |                           |
|             |           |                                   |           |                                                  |             |       |             |                     | FINACEIRO           |                           |
|------------:|----------:|:----------------------------------|:----------|:-------------------------------------------------|:------------|------:|------------:|:--------------------|:--------------------|:--------------------------|
|      676918 |         1 | MARIA DE LOURDES MAIA DIAS        | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2014/459128 |   nan |         111 | 2026-02-11 00:00:00 | 2026-02-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      279501 |         1 | JOSE RIBAMAR OLIVEIRA             | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/154482 |   nan |          14 | 2026-02-11 00:00:00 | 2026-02-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      536679 |         1 | IRANI NAZARE DIAS BARROS          | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2019/297566 |   nan |          23 | 2026-02-11 00:00:00 | 2026-02-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5531144 |         2 | ANTONIA VASCONCELOS ALMEIDA       | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/626250 |   nan |           8 | 2026-02-11 00:00:00 | 2026-02-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      680273 |         4 | MARIA NAGELA TRINDADE DE OLIVEIRA | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/124410 |   nan |          25 | 2026-02-11 00:00:00 | 2026-02-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: MARÇO
- **Dimensões (Linhas, Colunas):** (75, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 75 | 238260 |
| VÍNCULO | int64 | 0 | 3 | 1 |
| NOME DO SEVIDOR | str | 0 | 75 | MARIA DOS ANJOS CORREA DE OLIVEIRA |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 4 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 75 | 2021/1227343 |
| DRE | float64 | 75 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | int64 | 0 | 75 | 311 |
| DATA 
DE
 PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2026-03-10 00:00:00 |
| DATA 
DO 
EFEITO 
FINACEIRO | datetime64[us] | 0 | 1 | 2026-03-10 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VÍNCULO | NOME DO SEVIDOR                    | CARGO     | APOSENTADORIA                                    | PAE          |   DRE |     NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                    |           |                                                  |              |       |          DA | DE                  | DO                  |                           |
|             |           |                                    |           |                                                  |              |       |    PORTARIA |  PUBLICAÇÃO         | EFEITO              |                           |
|             |           |                                    |           |                                                  |              |       |             |                     | FINACEIRO           |                           |
|------------:|----------:|:-----------------------------------|:----------|:-------------------------------------------------|:-------------|------:|------------:|:--------------------|:--------------------|:--------------------------|
|      238260 |         1 | MARIA DOS ANJOS CORREA DE OLIVEIRA | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/1227343 |   nan |         311 | 2026-03-10 00:00:00 | 2026-03-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      470996 |         1 | MARIA DO SOCORRO PAULO DA CUNHA    | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/134334  |   nan |         340 | 2026-03-10 00:00:00 | 2026-03-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      212148 |         2 | ALDONOR SANTOSDA SILVA             | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2021/1217882 |   nan |         356 | 2026-03-10 00:00:00 | 2026-03-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|    54197437 |         1 | REGINALDO RODRIGUES FERREIRA       | PROFESSOR | APOSENTADORIA POR INVALIDEZ                      | 2023/748581  |   nan |         364 | 2026-03-10 00:00:00 | 2026-03-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      684678 |         1 | JOSÉ MARQUES PEREIRA CAVALCANTE    | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2023/343610  |   nan |         363 | 2026-03-10 00:00:00 | 2026-03-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: ABRIL
- **Dimensões (Linhas, Colunas):** (80, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 80 | 5619580 |
| VÍNCULO | int64 | 0 | 5 | 1 |
| NOME DO SEVIDOR | str | 0 | 80 | INA MARIA FAVACHO DO CARMO |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 4 | APOSENTADORIA POR INVALIDEZ |
| PAE | str | 0 | 80 | 2021/490438 |
| DRE | float64 | 80 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | int64 | 0 | 80 | 570 |
| DATA 
DE
 PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2026-04-10 00:00:00 |
| DATA 
DO 
EFEITO 
FINACEIRO | datetime64[us] | 0 | 1 | 2026-04-10 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VÍNCULO | NOME DO SEVIDOR                   | CARGO     | APOSENTADORIA                                    | PAE          |   DRE |     NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                   |           |                                                  |              |       |          DA | DE                  | DO                  |                           |
|             |           |                                   |           |                                                  |              |       |    PORTARIA |  PUBLICAÇÃO         | EFEITO              |                           |
|             |           |                                   |           |                                                  |              |       |             |                     | FINACEIRO           |                           |
|------------:|----------:|:----------------------------------|:----------|:-------------------------------------------------|:-------------|------:|------------:|:--------------------|:--------------------|:--------------------------|
|     5619580 |         1 | INA MARIA FAVACHO DO CARMO        | PROFESSOR | APOSENTADORIA POR INVALIDEZ                      | 2021/490438  |   nan |         570 | 2026-04-10 00:00:00 | 2026-04-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      491969 |         3 | ARGEGE LIMA CHAAR                 | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/154060  |   nan |         496 | 2026-04-10 00:00:00 | 2026-04-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5609313 |         1 | AURELIA REGINA ROCHA SOARES VASCO | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2019/508966  |   nan |         601 | 2026-04-10 00:00:00 | 2026-04-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     6023967 |         2 | ANTONIA SOUSA LIMA                | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/187193  |   nan |         518 | 2026-04-10 00:00:00 | 2026-04-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     6015794 |         2 | ARINALDO VIEIRA DA SILVA JUNIOR   | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2024/1127854 |   nan |         565 | 2026-04-10 00:00:00 | 2026-04-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: MAIO
- **Dimensões (Linhas, Colunas):** (113, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 112 | 752010 |
| VÍNCULO | int64 | 0 | 5 | 1 |
| NOME DO SEVIDOR | str | 0 | 112 | MARIA DA CONSOLACAO SIMOES BRAGA |
| CARGO | str | 0 | 2 | ADM.GERAL |
| APOSENTADORIA | str | 0 | 4 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 113 | 2025/2439607  |
| DRE | float64 | 113 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | int64 | 0 | 112 | 749 |
| DATA 
DE
 PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2026-05-11 00:00:00 |
| DATA 
DO 
EFEITO 
FINACEIRO | datetime64[us] | 0 | 1 | 2026-05-01 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VÍNCULO | NOME DO SEVIDOR                  | CARGO     | APOSENTADORIA                                    | PAE          |   DRE |     NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                  |           |                                                  |              |       |          DA | DE                  | DO                  |                           |
|             |           |                                  |           |                                                  |              |       |    PORTARIA |  PUBLICAÇÃO         | EFEITO              |                           |
|             |           |                                  |           |                                                  |              |       |             |                     | FINACEIRO           |                           |
|------------:|----------:|:---------------------------------|:----------|:-------------------------------------------------|:-------------|------:|------------:|:--------------------|:--------------------|:--------------------------|
|      752010 |         1 | MARIA DA CONSOLACAO SIMOES BRAGA | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2025/2439607 |   nan |         749 | 2026-05-11 00:00:00 | 2026-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|      675296 |         1 | IVANEIDE CORPES FRANCO           | ADM.GERAL | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2025/2785845 |   nan |         914 | 2026-05-11 00:00:00 | 2026-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5007275 |         1 | REGINA LUCIA RICARTE CABRAL      | ADM.GERAL | APOSENTADORIA POR INVALIDEZ                      | 2024/67333   |   nan |         689 | 2026-05-11 00:00:00 | 2026-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5300959 |         2 | SANDRA MARIA DA PAIXÃO ARAÚJO    | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/169288  |   nan |         803 | 2026-05-11 00:00:00 | 2026-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     6317391 |         1 | MARIA DO CARMO DAS NEVES MELO    | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2015/70811   |   nan |         723 | 2026-05-11 00:00:00 | 2026-05-01 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: JUNHO
- **Dimensões (Linhas, Colunas):** (136, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | int64 | 0 | 136 | 5230608 |
| VÍNCULO | int64 | 0 | 4 | 2 |
| NOME DO SEVIDOR | str | 0 | 136 | JOCILEIDE DE SOUZA SILVA |
| CARGO | str | 0 | 2 | PROFESSOR |
| APOSENTADORIA | str | 0 | 3 | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO |
| PAE | str | 0 | 136 | 2018/167064 |
| DRE | float64 | 136 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | int64 | 0 | 134 | 956 |
| DATA 
DE
 PUBLICAÇÃO | datetime64[us] | 0 | 1 | 2026-06-10 00:00:00 |
| DATA 
DO 
EFEITO 
FINACEIRO | datetime64[us] | 0 | 1 | 2026-06-10 00:00:00 |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VÍNCULO | NOME DO SEVIDOR                            | CARGO     | APOSENTADORIA                                    | PAE         |   DRE |     NÚMERO  | DATA                | DATA                | EQUIPE DADOS              |
|             |           |                                            |           |                                                  |             |       |          DA | DE                  | DO                  |                           |
|             |           |                                            |           |                                                  |             |       |    PORTARIA |  PUBLICAÇÃO         | EFEITO              |                           |
|             |           |                                            |           |                                                  |             |       |             |                     | FINACEIRO           |                           |
|------------:|----------:|:-------------------------------------------|:----------|:-------------------------------------------------|:------------|------:|------------:|:--------------------|:--------------------|:--------------------------|
|     5230608 |         2 | JOCILEIDE DE SOUZA SILVA                   | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/167064 |   nan |         956 | 2026-06-10 00:00:00 | 2026-06-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     6317219 |         1 | ROSANA DE MELO AMORIM DA LUZ               | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/137017 |   nan |         907 | 2026-06-10 00:00:00 | 2026-06-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5129826 |         2 | ISABEL CRISTINA CHAVES DE OLIVEIRA MAIA    | PROFESSOR | APOSENTADORIA POR INVALIDEZ                      | 2018/228159 |   nan |        1055 | 2026-06-10 00:00:00 | 2026-06-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5057930 |         1 | ROSANGELA CARNEIRO FARIAS                  | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2018/260551 |   nan |        1158 | 2026-06-10 00:00:00 | 2026-06-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |
|     5505429 |         2 | ELLAINE DE FATIMA DA COSTA RODRIGUES FOLHA | PROFESSOR | APOSENTADORIA POR IDADE E TEMPO DE CONTRUIBUIÇÃO | 2020/459749 |   nan |        1135 | 2026-06-10 00:00:00 | 2026-06-10 00:00:00 | MARIA EDUARDA BARATA CRUZ |

---

### Aba: JULHO
- **Dimensões (Linhas, Colunas):** (79, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | float64 | 79 | 0 | N/A |
| VÍNCULO | float64 | 79 | 0 | N/A |
| NOME DO SEVIDOR | float64 | 79 | 0 | N/A |
| CARGO | float64 | 79 | 0 | N/A |
| APOSENTADORIA | float64 | 79 | 0 | N/A |
| PAE | float64 | 79 | 0 | N/A |
| DRE | float64 | 79 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | float64 | 79 | 0 | N/A |
| DATA 
DE
 PUBLICAÇÃO | float64 | 79 | 0 | N/A |
| DATA 
DO 
EFEITO 
FINACEIRO | float64 | 79 | 0 | N/A |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VÍNCULO |   NOME DO SEVIDOR |   CARGO |   APOSENTADORIA |   PAE |   DRE |     NÚMERO  |         DATA  |       DATA  | EQUIPE DADOS              |
|             |           |                   |         |                 |       |       |          DA |            DE |         DO  |                           |
|             |           |                   |         |                 |       |       |    PORTARIA |    PUBLICAÇÃO |     EFEITO  |                           |
|             |           |                   |         |                 |       |       |             |               |   FINACEIRO |                           |
|------------:|----------:|------------------:|--------:|----------------:|------:|------:|------------:|--------------:|------------:|:--------------------------|
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |

---

### Aba: AGOSTO
- **Dimensões (Linhas, Colunas):** (79, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| MATRÍCULA | float64 | 79 | 0 | N/A |
| VÍNCULO | float64 | 79 | 0 | N/A |
| NOME DO SEVIDOR | float64 | 79 | 0 | N/A |
| CARGO | float64 | 79 | 0 | N/A |
| APOSENTADORIA | float64 | 79 | 0 | N/A |
| PAE | float64 | 79 | 0 | N/A |
| DRE | float64 | 79 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | float64 | 79 | 0 | N/A |
| DATA 
DE
 PUBLICAÇÃO | float64 | 79 | 0 | N/A |
| DATA 
DO 
EFEITO 
FINACEIRO | float64 | 79 | 0 | N/A |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   MATRÍCULA |   VÍNCULO |   NOME DO SEVIDOR |   CARGO |   APOSENTADORIA |   PAE |   DRE |     NÚMERO  |         DATA  |       DATA  | EQUIPE DADOS              |
|             |           |                   |         |                 |       |       |          DA |            DE |         DO  |                           |
|             |           |                   |         |                 |       |       |    PORTARIA |    PUBLICAÇÃO |     EFEITO  |                           |
|             |           |                   |         |                 |       |       |             |               |   FINACEIRO |                           |
|------------:|----------:|------------------:|--------:|----------------:|------:|------:|------------:|--------------:|------------:|:--------------------------|
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|         nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |

---

### Aba: SETEMBRO
- **Dimensões (Linhas, Colunas):** (79, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| SETE | float64 | 79 | 0 | N/A |
| VÍNCULO | float64 | 79 | 0 | N/A |
| NOME DO SEVIDOR | float64 | 79 | 0 | N/A |
| CARGO | float64 | 79 | 0 | N/A |
| APOSENTADORIA | float64 | 79 | 0 | N/A |
| PAE | float64 | 79 | 0 | N/A |
| DRE | float64 | 79 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | float64 | 79 | 0 | N/A |
| DATA 
DE
 PUBLICAÇÃO | float64 | 79 | 0 | N/A |
| DATA 
DO 
EFEITO 
FINACEIRO | float64 | 79 | 0 | N/A |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   SETE |   VÍNCULO |   NOME DO SEVIDOR |   CARGO |   APOSENTADORIA |   PAE |   DRE |     NÚMERO  |         DATA  |       DATA  | EQUIPE DADOS              |
|        |           |                   |         |                 |       |       |          DA |            DE |         DO  |                           |
|        |           |                   |         |                 |       |       |    PORTARIA |    PUBLICAÇÃO |     EFEITO  |                           |
|        |           |                   |         |                 |       |       |             |               |   FINACEIRO |                           |
|-------:|----------:|------------------:|--------:|----------------:|------:|------:|------------:|--------------:|------------:|:--------------------------|
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |

---

### Aba: OUTUBRO
- **Dimensões (Linhas, Colunas):** (79, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| SETE | float64 | 79 | 0 | N/A |
| VÍNCULO | float64 | 79 | 0 | N/A |
| NOME DO SEVIDOR | float64 | 79 | 0 | N/A |
| CARGO | float64 | 79 | 0 | N/A |
| APOSENTADORIA | float64 | 79 | 0 | N/A |
| PAE | float64 | 79 | 0 | N/A |
| DRE | float64 | 79 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | float64 | 79 | 0 | N/A |
| DATA 
DE
 PUBLICAÇÃO | float64 | 79 | 0 | N/A |
| DATA 
DO 
EFEITO 
FINACEIRO | float64 | 79 | 0 | N/A |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   SETE |   VÍNCULO |   NOME DO SEVIDOR |   CARGO |   APOSENTADORIA |   PAE |   DRE |     NÚMERO  |         DATA  |       DATA  | EQUIPE DADOS              |
|        |           |                   |         |                 |       |       |          DA |            DE |         DO  |                           |
|        |           |                   |         |                 |       |       |    PORTARIA |    PUBLICAÇÃO |     EFEITO  |                           |
|        |           |                   |         |                 |       |       |             |               |   FINACEIRO |                           |
|-------:|----------:|------------------:|--------:|----------------:|------:|------:|------------:|--------------:|------------:|:--------------------------|
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |

---

### Aba: NOVEMBRO
- **Dimensões (Linhas, Colunas):** (79, 11)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| SETE | float64 | 79 | 0 | N/A |
| VÍNCULO | float64 | 79 | 0 | N/A |
| NOME DO SEVIDOR | float64 | 79 | 0 | N/A |
| CARGO | float64 | 79 | 0 | N/A |
| APOSENTADORIA | float64 | 79 | 0 | N/A |
| PAE | float64 | 79 | 0 | N/A |
| DRE | float64 | 79 | 0 | N/A |
| NÚMERO 
DA
 PORTARIA | float64 | 79 | 0 | N/A |
| DATA 
DE
 PUBLICAÇÃO | float64 | 79 | 0 | N/A |
| DATA 
DO 
EFEITO 
FINACEIRO | float64 | 79 | 0 | N/A |
| EQUIPE DADOS | str | 0 | 1 | MARIA EDUARDA BARATA CRUZ |

#### Primeiras 5 linhas:
|   SETE |   VÍNCULO |   NOME DO SEVIDOR |   CARGO |   APOSENTADORIA |   PAE |   DRE |     NÚMERO  |         DATA  |       DATA  | EQUIPE DADOS              |
|        |           |                   |         |                 |       |       |          DA |            DE |         DO  |                           |
|        |           |                   |         |                 |       |       |    PORTARIA |    PUBLICAÇÃO |     EFEITO  |                           |
|        |           |                   |         |                 |       |       |             |               |   FINACEIRO |                           |
|-------:|----------:|------------------:|--------:|----------------:|------:|------:|------------:|--------------:|------------:|:--------------------------|
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |
|    nan |       nan |               nan |     nan |             nan |   nan |   nan |         nan |           nan |         nan | MARIA EDUARDA BARATA CRUZ |

---

## Arquivo: QUANTITATIVO PROFESSORES SEDUC - APOSENTADOS.xlsx
- **Tamanho do Arquivo:** 863.34 KB
- **Abas encontradas:** QUANTITATIVO, sistema, NAO ESTAVEL, seduc, dre, escola, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025

### Aba: QUANTITATIVO
- **Dimensões (Linhas, Colunas):** (23, 3)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| Unnamed: 0 | float64 | 23 | 0 | N/A |
| Unnamed: 1 | object | 6 | 14 | N/A |
| Unnamed: 2 | object | 11 | 12 | N/A |

#### Primeiras 5 linhas:
|   Unnamed: 0 | Unnamed: 1                       | Unnamed: 2   |
|-------------:|:---------------------------------|:-------------|
|          nan | nan                              | nan          |
|          nan | nan                              | nan          |
|          nan | QUANTITATIVO TOTAL - APOSENTADOS | nan          |
|          nan | ANO                              | PROFESSOR    |
|          nan | 2018                             | 311          |

---

### Aba: sistema
- **Dimensões (Linhas, Colunas):** (4038, 9)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 4027 | DILMO JESUS SEADE DOURADO |
| MATRICULA_BENEFICIARIO | int64 | 0 | 4038 | 5419034701 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 40 | PROFESSOR CLASSE II |
| ORGAO | str | 0 | 49 | SEDUC |
| DATA_INI | datetime64[us] | 0 | 86 | 2025-06-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 8 | 2025 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 12 | 6 |
| TIPO_BENEFICIO | str | 0 | 5 | APOSENTADORIA POR INVALIDEZ |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                       |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          |
|:----------------------------------------|-------------------------:|:------------|:--------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|
| DILMO JESUS SEADE DOURADO               |               5419034701 | INATIVO     | PROFESSOR CLASSE II       | SEDUC                            | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR INVALIDEZ             |
| WALNISE FEIO COSTA                      |                 31932501 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2025-01-01 00:00:00 |                 2025 |                    1 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| JOSE BRAZ DAVIS SERRAO DA CRUZ          |                 25381202 | INATIVO     | PROFESSOR CLASSE I        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-10-01 00:00:00 |                 2024 |                   10 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| LUIZ FLAVIO GUIMARÃES FERREIRA          |                 59495401 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-11-01 00:00:00 |                 2024 |                   11 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| MARIA DE NAZARE CONDE DO ESPIRITO SANTO |                603497703 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-06-01 00:00:00 |                 2024 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |

---

### Aba: NAO ESTAVEL
- **Dimensões (Linhas, Colunas):** (375, 18)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 375 | NUBIA MARIA DOS SANTOS BRANDAO |
| MATRICULA_BENEFICIARIO | int64 | 0 | 375 | 601540901 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 4 | PROFESSOR NIVEL MEDIO |
| NOME_BENEFICIARIO 2 | str | 0 | 1 | NÃO ESTAVEL |
| ORGAO | str | 0 | 14 | SECRETARIA DE ESTADO DE EDUCAÇÃO |
| DATA_INI | datetime64[us] | 0 | 57 | 2018-07-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 8 | 2018 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 11 | 7 |
| TIPO_BENEFICIO | str | 0 | 4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| MATRICULA_BENEFICIARIO 2 | float64 | 375 | 0 | N/A |
| CATEGORIA 2 | float64 | 375 | 0 | N/A |
| CARGO 2 | float64 | 375 | 0 | N/A |
| ORGAO 2 | float64 | 375 | 0 | N/A |
| DATA_INI 2 | float64 | 375 | 0 | N/A |
| ANO_PRIMEIRA_FOLHA 2 | float64 | 375 | 0 | N/A |
| MES_PRIMEIRA_FOLHA 2 | float64 | 375 | 0 | N/A |
| TIPO_BENEFICIO 2 | float64 | 375 | 0 | N/A |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO               |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                 | NOME_BENEFICIARIO 2   | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          |   MATRICULA_BENEFICIARIO 2 |   CATEGORIA 2 |   CARGO 2 |   ORGAO 2 |   DATA_INI 2 |   ANO_PRIMEIRA_FOLHA 2 |   MES_PRIMEIRA_FOLHA 2 |   TIPO_BENEFICIO 2 |
|:--------------------------------|-------------------------:|:------------|:----------------------|:----------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|---------------------------:|--------------:|----------:|----------:|-------------:|-----------------------:|-----------------------:|-------------------:|
| NUBIA MARIA DOS SANTOS BRANDAO  |                601540901 | INATIVO     | PROFESSOR NIVEL MEDIO | NÃO ESTAVEL           | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2018-07-01 00:00:00 |                 2018 |                    7 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |                        nan |           nan |       nan |       nan |          nan |                    nan |                    nan |                nan |
| ROSELINA DA COSTA OLIVEIRA      |                602147601 | INATIVO     | PROFESSOR NIVEL MEDIO | NÃO ESTAVEL           | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2018-07-01 00:00:00 |                 2018 |                    7 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |                        nan |           nan |       nan |       nan |          nan |                    nan |                    nan |                nan |
| AGNALDO MIRANDA SAMPAIO         |                633308701 | INATIVO     | PROFESSOR NIVEL MEDIO | NÃO ESTAVEL           | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2019-02-01 00:00:00 |                 2019 |                    2 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |                        nan |           nan |       nan |       nan |          nan |                    nan |                    nan |                nan |
| IVANILDE NASCIMENTO FERNANDES   |                601537901 | INATIVO     | PROFESSOR NIVEL MEDIO | NÃO ESTAVEL           | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2019-09-01 00:00:00 |                 2019 |                    9 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |                        nan |           nan |       nan |       nan |          nan |                    nan |                    nan |                nan |
| MARIA AGUIDA DAMASCENO DE SOUZA |                630964001 | INATIVO     | PROFESSOR NIVEL MEDIO | NÃO ESTAVEL           | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2019-07-01 00:00:00 |                 2019 |                    7 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |                        nan |           nan |       nan |       nan |          nan |                    nan |                    nan |                nan |

---

### Aba: seduc
- **Dimensões (Linhas, Colunas):** (3897, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 3890 | DILMO JESUS SEADE DOURADO |
| MATRICULA_BENEFICIARIO | int64 | 0 | 3897 | 5419034701 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 27 | PROFESSOR CLASSE II |
| ORGAO | str | 0 | 2 | SEDUC |
| DATA_INI | datetime64[us] | 0 | 86 | 2025-06-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 8 | 2025 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 12 | 6 |
| TIPO_BENEFICIO | str | 0 | 5 | APOSENTADORIA POR INVALIDEZ |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                       |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:----------------------------------------|-------------------------:|:------------|:--------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| DILMO JESUS SEADE DOURADO               |               5419034701 | INATIVO     | PROFESSOR CLASSE II       | SEDUC                            | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR INVALIDEZ             | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| WALNISE FEIO COSTA                      |                 31932501 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2025-01-01 00:00:00 |                 2025 |                    1 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| JOSE BRAZ DAVIS SERRAO DA CRUZ          |                 25381202 | INATIVO     | PROFESSOR CLASSE I        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-10-01 00:00:00 |                 2024 |                   10 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| LUIZ FLAVIO GUIMARÃES FERREIRA          |                 59495401 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-11-01 00:00:00 |                 2024 |                   11 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA DE NAZARE CONDE DO ESPIRITO SANTO |                603497703 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-06-01 00:00:00 |                 2024 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: dre
- **Dimensões (Linhas, Colunas):** (7, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 7 | VALTAIR DA COSTA CONCEICAO |
| MATRICULA_BENEFICIARIO | int64 | 0 | 7 | 55648301 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 3 | PROFESSOR CLASSE ESPECIAL |
| ORGAO | str | 0 | 1 | SEDUC |
| DATA_INI | datetime64[us] | 0 | 1 | 2025-06-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2025 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 1 | 6 |
| TIPO_BENEFICIO | str | 0 | 2 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                   |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO   | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:------------------------------------|-------------------------:|:------------|:--------------------------|:--------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| VALTAIR DA COSTA CONCEICAO          |                 55648301 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| VALDECI MORAES DE MENEZES           |                 97351301 | INATIVO     | PROFESSOR NIVEL MEDIO     | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR INVALIDEZ             | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA CELESTE DEMETRIO DE LEAO      |                 55119801 | INATIVO     | PROFESSOR ASSISTENTE PA-A | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| FRANCISCA ATAIDE PALHETA DE PALHETA |                 22044201 | INATIVO     | PROFESSOR ASSISTENTE PA-A | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| IZABEL PINHEIRO GOMES               |                 60193401 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: escola
- **Dimensões (Linhas, Colunas):** (29, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 29 | NILENE FERREIRA CARDOSO SOUZA |
| MATRICULA_BENEFICIARIO | int64 | 0 | 29 | 95818202 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 4 | PROFESSOR CLASSE I |
| ORGAO | str | 0 | 1 | SEDUC |
| DATA_INI | datetime64[us] | 0 | 2 | 2025-05-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2025 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 2 | 5 |
| TIPO_BENEFICIO | str | 0 | 4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                    |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                 | ORGAO   | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:-------------------------------------|-------------------------:|:------------|:----------------------|:--------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| NILENE FERREIRA CARDOSO SOUZA        |                 95818202 | INATIVO     | PROFESSOR CLASSE I    | SEDUC   | 2025-05-01 00:00:00 |                 2025 |                    5 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| AIRES FRANCISCO MACANS COSTA         |                504426002 | INATIVO     | PROFESSOR NIVEL MEDIO | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| EUNICE LETTIG DE SANTANA             |                 66772201 | INATIVO     | PROFESSOR NIVEL MEDIO | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR INVALIDEZ             | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| AMERICA SARMENTO NUNES               |                630956901 | INATIVO     | PROFESSOR NIVEL MEDIO | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA EMILIA GOMES DE MATOS MILHOMEM |                 78238601 | INATIVO     | PROFESSOR NIVEL MEDIO | SEDUC   | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: 2018
- **Dimensões (Linhas, Colunas):** (311, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 311 | ZILMAR CHAGAS DE LIMA |
| MATRICULA_BENEFICIARIO | int64 | 0 | 311 | 27721501 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 11 | PROFESSOR CLASSE II |
| ORGAO | str | 0 | 1 | SECRETARIA DE ESTADO DE EDUCAÇÃO |
| DATA_INI | datetime64[us] | 0 | 12 | 2018-05-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2018 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 11 | 5 |
| TIPO_BENEFICIO | str | 0 | 4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                 |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                            | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:----------------------------------|-------------------------:|:------------|:---------------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| ZILMAR CHAGAS DE LIMA             |                 27721501 | INATIVO     | PROFESSOR CLASSE II              | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2018-05-01 00:00:00 |                 2018 |                    5 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARLENE MARIA COSTA               |                 35285301 | INATIVO     | PROFESSOR CLASSE ESPECIAL        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2018-08-01 00:00:00 |                 2018 |                    8 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| SILVIA NASCIMENTO DA SILVA        |                 36375801 | INATIVO     | PROFESSOR CLASSE I               | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2018-09-01 00:00:00 |                 2018 |                    9 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| ANTONIA EUFATIMA LOBO DE CARVALHO |                 66838901 | INATIVO     | PROF. COLABORADOR NIVEL SUPERIOR | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2018-09-01 00:00:00 |                 2018 |                    9 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| ADEMAR PESSOA VALENTE             |                 44645901 | INATIVO     | PROF. COLABORADOR NIVEL SUPERIOR | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2018-05-01 00:00:00 |                 2018 |                    5 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: 2019
- **Dimensões (Linhas, Colunas):** (509, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 509 | MARLUCE COLARES MATOS |
| MATRICULA_BENEFICIARIO | int64 | 0 | 509 | 53797701 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 11 | PROFESSOR CLASSE ESPECIAL |
| ORGAO | str | 0 | 1 | SECRETARIA DE ESTADO DE EDUCAÇÃO |
| DATA_INI | datetime64[us] | 0 | 12 | 2019-02-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2019 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 9 | 2 |
| TIPO_BENEFICIO | str | 0 | 4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                         |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                            | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:------------------------------------------|-------------------------:|:------------|:---------------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| MARLUCE COLARES MATOS                     |                 53797701 | INATIVO     | PROFESSOR CLASSE ESPECIAL        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2019-02-01 00:00:00 |                 2019 |                    2 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| DEUSDEDIT OTAVIANO SILVA                  |                 53807802 | INATIVO     | PROFESSOR CLASSE I               | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2019-01-01 00:00:00 |                 2019 |                    1 | APOSENTADORIA POR INVALIDEZ             | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA LUCIA SILVA NASCIMENTO              |                 71590503 | INATIVO     | PROF. COLABORADOR NIVEL SUPERIOR | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2019-01-01 00:00:00 |                 2019 |                    1 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| JOSE AUGUSTO DUARTE DAMASCENO             |                569281402 | INATIVO     | PROFESSOR CLASSE I               | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2019-05-01 00:00:00 |                 2019 |                    5 | APOSENTADORIA POR INVALIDEZ             | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA DO PERPETUO SOCORRO SOUZA DE CASTRO |                 75819101 | INATIVO     | PROFESSOR CLASSE I               | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2019-02-01 00:00:00 |                 2019 |                    2 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: 2020
- **Dimensões (Linhas, Colunas):** (635, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 635 | FRANCISCA MARIA NUNES DAMASCENA |
| MATRICULA_BENEFICIARIO | int64 | 0 | 635 | 601660002 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 13 | PROFESSOR CLASSE II |
| ORGAO | str | 0 | 1 | SECRETARIA DE ESTADO DE EDUCAÇÃO |
| DATA_INI | datetime64[us] | 0 | 11 | 2020-10-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2020 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 10 | 9 |
| TIPO_BENEFICIO | str | 0 | 4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO               |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:--------------------------------|-------------------------:|:------------|:--------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| FRANCISCA MARIA NUNES DAMASCENA |                601660002 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2020-10-01 00:00:00 |                 2020 |                    9 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA SUELY SOUSA MONTEIRO      |                505177001 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2020-10-01 00:00:00 |                 2020 |                    9 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA DE NAZARE RODRIGUES LOBAO |                 38458501 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2020-01-01 00:00:00 |                 2020 |                    1 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA JOSEVETT ALMEIDA MIRANDA  |                 19594401 | INATIVO     | PROFESSOR CLASSE III      | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2020-10-01 00:00:00 |                 2020 |                    9 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| DEUZA MARIA LOPES DE BRITO      |                 45480001 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2020-09-01 00:00:00 |                 2020 |                    9 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: 2021
- **Dimensões (Linhas, Colunas):** (393, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 392 | JOSE MATEUS BRITO DA SILVA |
| MATRICULA_BENEFICIARIO | int64 | 0 | 393 | 67845701 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 11 | PROF. ASSISTENTE PA-A |
| ORGAO | str | 0 | 1 | SECRETARIA DE ESTADO DE EDUCAÇÃO |
| DATA_INI | datetime64[us] | 0 | 10 | 2021-08-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2021 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 10 | 8 |
| TIPO_BENEFICIO | str | 0 | 4 | APOSENTADORIA COMPULSÓRIA |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                  |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:-----------------------------------|-------------------------:|:------------|:--------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| JOSE MATEUS BRITO DA SILVA         |                 67845701 | INATIVO     | PROF. ASSISTENTE PA-A     | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2021-08-01 00:00:00 |                 2021 |                    8 | APOSENTADORIA COMPULSÓRIA               | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| SANDRA LUCIA PARIS                 |                 49262002 | INATIVO     | PROFESSOR CLASSE IV       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2021-02-01 00:00:00 |                 2021 |                    2 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA EROTILDES RAMOS LOUREIRO     |                 37716301 | INATIVO     | PROFESSOR CLASSE I        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2021-10-01 00:00:00 |                 2021 |                   10 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| FRANCISCO DE PAULA DA SILVA SOARES |               5418834401 | INATIVO     | PROFESSOR CLASSE I        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2021-01-01 00:00:00 |                 2021 |                    1 | APOSENTADORIA POR INVALIDEZ             | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA AMELIA ARAUJO DA SILVA       |                 45413301 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2021-03-01 00:00:00 |                 2021 |                    3 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: 2022
- **Dimensões (Linhas, Colunas):** (638, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 638 | TEREZINHA ALVES DA SILVA |
| MATRICULA_BENEFICIARIO | int64 | 0 | 638 | 26951401 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 13 | PROFESSOR CLASSE I |
| ORGAO | str | 0 | 1 | SECRETARIA DE ESTADO DE EDUCAÇÃO |
| DATA_INI | datetime64[us] | 0 | 12 | 2022-06-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2022 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 11 | 6 |
| TIPO_BENEFICIO | str | 0 | 4 | APOSENTADORIA COMPULSÓRIA |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO             |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:------------------------------|-------------------------:|:------------|:--------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| TEREZINHA ALVES DA SILVA      |                 26951401 | INATIVO     | PROFESSOR CLASSE I        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2022-06-01 00:00:00 |                 2022 |                    6 | APOSENTADORIA COMPULSÓRIA               | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| SUELY BEZERRA DE FREITAS LIMA |                 24476701 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2022-06-01 00:00:00 |                 2022 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| ANGELA MARIA SILVA DAMASCENO  |                569328401 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2022-07-01 00:00:00 |                 2022 |                    7 | APOSENTADORIA POR INVALIDEZ             | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARINA COSTA RIBEIRO          |                602556002 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2022-06-01 00:00:00 |                 2022 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| ELIETE MARIA GURJAO FARIAS    |                 46192001 | INATIVO     | PROFESSOR CLASSE I        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2022-01-01 00:00:00 |                 2022 |                    1 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: 2023
- **Dimensões (Linhas, Colunas):** (283, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 283 | ARLETE ARAUJO DO NASCIMENTO |
| MATRICULA_BENEFICIARIO | int64 | 0 | 283 | 600507103 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 13 | PROFESSOR CLASSE ESPECIAL |
| ORGAO | str | 0 | 1 | SECRETARIA DE ESTADO DE EDUCAÇÃO |
| DATA_INI | datetime64[us] | 0 | 11 | 2023-06-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2023 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 11 | 6 |
| TIPO_BENEFICIO | str | 0 | 5 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                          |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:-------------------------------------------|-------------------------:|:------------|:--------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| ARLETE ARAUJO DO NASCIMENTO                |                600507103 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2023-06-01 00:00:00 |                 2023 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| VERA LUCIA MOURA SOUZA                     |                 28811001 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2023-03-01 00:00:00 |                 2023 |                    3 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| NINA SEBASTIANA REIS DA SILVA              |                 45741801 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2023-10-01 00:00:00 |                 2023 |                   10 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA DO PERPETUO SOCORRO DE OLIVEIRA MELO |                506248902 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2023-10-01 00:00:00 |                 2023 |                   10 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| ARMELINDA TEIXEIRA MAGALHAES CARVALHO      |                 60563802 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2023-06-01 00:00:00 |                 2023 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: 2024
- **Dimensões (Linhas, Colunas):** (883, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 883 | JOSE BRAZ DAVIS SERRAO DA CRUZ |
| MATRICULA_BENEFICIARIO | int64 | 0 | 883 | 25381202 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 19 | PROFESSOR CLASSE I |
| ORGAO | str | 0 | 1 | SECRETARIA DE ESTADO DE EDUCAÇÃO |
| DATA_INI | datetime64[us] | 0 | 12 | 2024-10-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2024 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 11 | 10 |
| TIPO_BENEFICIO | str | 0 | 5 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                       |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:----------------------------------------|-------------------------:|:------------|:--------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| JOSE BRAZ DAVIS SERRAO DA CRUZ          |                 25381202 | INATIVO     | PROFESSOR CLASSE I        | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-10-01 00:00:00 |                 2024 |                   10 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| LUIZ FLAVIO GUIMARÃES FERREIRA          |                 59495401 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-11-01 00:00:00 |                 2024 |                   11 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA DE NAZARE CONDE DO ESPIRITO SANTO |                603497703 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-06-01 00:00:00 |                 2024 |                    6 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA DE BELEM SILVA DO NASCIMENTO      |                 53069701 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-08-01 00:00:00 |                 2024 |                    8 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| SIMONE DE LA ROCQUE CARDOSO             |                531295703 | INATIVO     | PROFESSOR CLASSE III      | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2024-08-01 00:00:00 |                 2024 |                    8 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

### Aba: 2025
- **Dimensões (Linhas, Colunas):** (289, 10)

#### Colunas e Tipos de Dados:
| Coluna | Tipo | Valores Nulos | Valores Únicos | Exemplo (1ª linha) |
|---|---|---|---|---|
| NOME_BENEFICIARIO | str | 0 | 288 | DILMO JESUS SEADE DOURADO |
| MATRICULA_BENEFICIARIO | int64 | 0 | 289 | 5419034701 |
| CATEGORIA | str | 0 | 1 | INATIVO |
| CARGO | str | 0 | 16 | PROFESSOR CLASSE II |
| ORGAO | str | 0 | 2 | SEDUC |
| DATA_INI | datetime64[us] | 0 | 7 | 2025-06-01 00:00:00 |
| ANO_PRIMEIRA_FOLHA | int64 | 0 | 1 | 2025 |
| MES_PRIMEIRA_FOLHA | int64 | 0 | 7 | 6 |
| TIPO_BENEFICIO | str | 0 | 5 | APOSENTADORIA POR INVALIDEZ |
| EQUIPE DADOS | str | 0 | 1 | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

#### Primeiras 5 linhas:
| NOME_BENEFICIARIO                     |   MATRICULA_BENEFICIARIO | CATEGORIA   | CARGO                     | ORGAO                            | DATA_INI            |   ANO_PRIMEIRA_FOLHA |   MES_PRIMEIRA_FOLHA | TIPO_BENEFICIO                          | EQUIPE DADOS                                 |
|:--------------------------------------|-------------------------:|:------------|:--------------------------|:---------------------------------|:--------------------|---------------------:|---------------------:|:----------------------------------------|:---------------------------------------------|
| DILMO JESUS SEADE DOURADO             |               5419034701 | INATIVO     | PROFESSOR CLASSE II       | SEDUC                            | 2025-06-01 00:00:00 |                 2025 |                    6 | APOSENTADORIA POR INVALIDEZ             | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| WALNISE FEIO COSTA                    |                 31932501 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2025-01-01 00:00:00 |                 2025 |                    1 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| JOSE CARLOS DE LIMA PINHEIRO          |                632097002 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2025-01-01 00:00:00 |                 2025 |                    1 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARIA DO CARMO CARVALHO COSTA PEREIRA |                 26718001 | INATIVO     | PROFESSOR CLASSE ESPECIAL | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2025-04-01 00:00:00 |                 2025 |                    4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |
| MARILDA DAS GRACAS AQUINO DE LEAO     |                 55306902 | INATIVO     | PROFESSOR CLASSE II       | SECRETARIA DE ESTADO DE EDUCAÇÃO | 2025-04-01 00:00:00 |                 2025 |                    4 | APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO | GIOVANA FERNANDA DA SILVA MERCES - 5984463/1 |

---

