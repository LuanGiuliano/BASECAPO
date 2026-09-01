# Análise de Números de Processo

Fizemos a extração dos números de processo da coluna `OBSERVACAO` do SAS e comparamos com a nossa base consolidada (`Nº PAE`).

- Servidores cruzados com sucesso: 2886
- Processos IGUAIS: 16
- Processos DIFERENTES: 2408
- SAS não informou número do processo: 462

### Alguns Servidores com Processos Diferentes (Top 10)
Abaixo estão casos onde o servidor tem um número de processo na base CAPO, mas a observação do SAS cita outro número de processo.

| Servidor | Mat/Vinc | Nº PAE (Base CAPO) | Observação (SAS) | Nº Processo Extraído (SAS) |
|----------|----------|--------------------|------------------|-----------------------------|
| IVANILDA GONCALVES SENA | 603708/1 | 2021/928053 | INCLUSÃO DA GRATIFICAÇÃO DO MAGISTÉRIO CONFORME DECISÃO JUDICIAL ATRAVÉS DO PROCESSO Nº 2025/3324439 - MANUTEÇÃO EM 11/12/2025 | 2025/3324439 |
| IVANILDA GONCALVES SENA | 603708/1 | 2021/928053 | Ajuste no atributo por causa da nova tabela GDSEDUC. Em 13/05/2008 | 13052008 |
| IVANILDA GONCALVES SENA | 603708/1 | 2021/928053 | Aributo para elevar em 5% a margem consignável do servidor por novas consignações no periodo de jun/2021 a jan/2022 | 520212022 |
| WALDIMEIA SOARES DA SILVA | 244228/1 | 2021/553565 | Inclusão do Atribtuo conforme relação enviada pela Seduc por e-mail. Em 12/03/2012 | 12032012 |
| WALDIMEIA SOARES DA SILVA | 244228/1 | 2021/553565 | Implantação do ATS Automático. Em 27/07/2011. Percentual do Ats anterior (55.00%) | 270720115500 |
| MARIA DE JESUS GUIMARAES | 242772/1 | - | INCLUSAO DO ATS AUTOMATICO CONFORME SOLICITACAO AO PROCESSO 2013/469168 EM 27/05/2014, RESPEITANDO A PRESCRICAO BIENAL CONFORME MANIFESTACAO 001/2012 PGE. | 2013/469168 |
| MARIA DE JESUS GUIMARAES | 242772/1 | - | Procedido em 22/02/2018, conf. proc. nº 2006/382262, observado evento de cargo e prescrição quinquenal.(CALC.). | 2006/382262 |
| MARIA DE NAZARE DA SILVA | 278947/1 | 2023/745388 | Valor da Rubrica 035-Grat Magistério nas Folhas 01 e 11 de Set/2021 | 03501112021 |
| ELIETE RIBEIRO TRINDADE | 432490/1 | 2021/144932 | Ajuste no atributo por causa da nova tabela GDSEDUC. Em 13/05/2008 | 13052008 |
| ELIETE RIBEIRO TRINDADE | 432490/1 | 2021/144932 | INCLUSAO DO ATS AUTOMATICO CONFORME SOLICITACAO AO PROCESSO 2019/5293, RESPEITANDO A PRESCRICAO QUINQUENAL 109/2014 PGE | 2019/5293 |
