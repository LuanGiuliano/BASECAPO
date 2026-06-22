import { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  Landmark,
  Archive,
  TrendingUp,
  Download,
  ArrowLeft,
  Play,
  CornerDownRight,
  CircleUserRound,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import './App.css';
import rawData from './data/db.json';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [previousTab, setPreviousTab] = useState('dashboard');
  const [filterGroup, setFilterGroup] = useState('Todos');
  const [filterYear, setFilterYear] = useState('Todos');
  const [searchAtivos, setSearchAtivos] = useState('');
  const [searchAposentados, setSearchAposentados] = useState('');
  const [pageProcessos, setPageProcessos] = useState(1);
  const [pageAposentados, setPageAposentados] = useState(1);
  const [filterAtivosDre, setFilterAtivosDre] = useState('Todos');
  const [filterAtivosStatus, setFilterAtivosStatus] = useState('Todos');
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [selectedAnalyzer, setSelectedAnalyzer] = useState(null);
  
  const ITEMS_PER_PAGE = 20;

  // Process and clean data using the new standard fields
  const data = useMemo(() => {
    return rawData.map(item => {
      let rawAno = String(item.ANO_ENTRADA_PADRAO || 'N/I').trim();
      let yearMatch = rawAno.match(/\b(19|20)\d{2}\b/);
      let ano_entrada = yearMatch ? yearMatch[0] : 'N/I';

      if (ano_entrada === 'N/I' && item['Nº PAE']) {
        const paeMatch = String(item['Nº PAE']).match(/\b(19|20)\d{2}\b/);
        if (paeMatch) ano_entrada = paeMatch[0];
      }

      let status_normal = String(item.STATUS_PADRAO || 'Não Informado');
      let status_consolidado = status_normal;
      const lowerStatus = status_normal.toLowerCase();
      
      // Limpeza minuciosa de Status / Categorização de "Lixo" como Arquivado
      if (lowerStatus.includes('adequação documental') || lowerStatus.includes('adequacao documental')) {
        status_consolidado = 'Adequação Documental';
      }
      
      // Força a classificação de processos extintos/finalizados para status "ARQUIVADO"
      const deadKeywords = ['perda de objeto', 'cancelado', 'falecida', 'falecido', 'obito', 'óbito', 'indeferimento', 'nunca passou pela capo'];
      if (deadKeywords.some(k => lowerStatus.includes(k))) {
        status_consolidado = 'ARQUIVADO (Extinto/Cancelado)';
      }

      // Limpeza de Grupos Funcionais
      let grupo_funcional = String(item.grupo_funcional || 'N/I').toUpperCase().trim();
      if (['DOSCENTE', 'DOCENTES', 'DOSCENTES'].includes(grupo_funcional)) grupo_funcional = 'DOCENTE';
      if (['APOIOS'].includes(grupo_funcional)) grupo_funcional = 'APOIO';
      if (['TÉCNICOS', 'TECNICOS'].includes(grupo_funcional)) grupo_funcional = 'TECNICO';
      
      // Alguns grupos vieram preenchidos com "PUBLICADO X", os alocamos num grupo de publicações 
      if (grupo_funcional.includes('PUBLICADO') || grupo_funcional.includes('PUBLICAÇÕES')) {
        grupo_funcional = 'PUBLICAÇÕES/CONCLUÍDOS';
        // E garantimos que o status seja concluído caso a base esteja mal formatada
        if (!status_consolidado.toUpperCase().includes('CONCLUIDO') && !status_consolidado.toUpperCase().includes('ARQUIVADO')) {
           status_consolidado = 'PUBLICADO (Concluído)';
        }
      }

      let dias_parado = 0;
      if (item['Ultima movimentação'] && item['Ultima movimentação'] !== 'nan' && item['Ultima movimentação'] !== 'N/I') {
         const movDate = new Date(item['Ultima movimentação']);
         if (!isNaN(movDate.getTime())) {
            const now = new Date('2026-06-22T13:58:32-03:00');
            const diffTime = now - movDate;
            if (diffTime > 0) {
              dias_parado = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            }
         }
      }

      return {
        ...item,
        status_normal,
        status_consolidado,
        grupo_funcional,
        ano_entrada,
        dias_parado,
        'ESTÁ NO AGA': (String(item.STATUS_PADRAO).toUpperCase().includes('CONCLUIDO') || 
                        String(item.STATUS_PADRAO).toUpperCase().includes('PUBLICADO') || 
                        String(item.STATUS_PADRAO).toUpperCase().includes('ARQUIVADO')) ? 'NÃO (Processo Finalizado/Arquivado)' : item['ESTÁ NO AGA']
      };
    });
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchGroup = filterGroup === 'Todos' || item.grupo_funcional === filterGroup;
      const matchYear = filterYear === 'Todos' || String(item.ano_entrada) === String(filterYear);
      return matchGroup && matchYear;
    });
  }, [data, filterGroup, filterYear]);

  const metrics = useMemo(() => {
    const concluidoKeywords = ['CONCLUIDO', 'PUBLICADO'];
    const arquivadoKeywords = ['ARQUIVADO'];
    
    const concluidos = filteredData.filter(d => concluidoKeywords.some(k => String(d.status_consolidado).toUpperCase().includes(k)));
    const arquivados = filteredData.filter(d => arquivadoKeywords.some(k => String(d.status_consolidado).toUpperCase().includes(k)));
    
    const ativos = filteredData.filter(d => 
      !concluidoKeywords.some(k => String(d.status_consolidado).toUpperCase().includes(k)) &&
      !arquivadoKeywords.some(k => String(d.status_consolidado).toUpperCase().includes(k))
    );
    
    const cirurgicos = ativos.filter(d => {
       const s = String(d.status_consolidado).toLowerCase();
       if (s.includes('pend') || s.includes('parado') || s.includes('atrasado') || s.includes('adequação')) return true;
       if (d.dias_parado > 30) return true;
       if (s === 'não informado' || s.includes('aguard')) return true; 
       return false;
    });
    
    return {
      totalAtivos: ativos.length,
      totalCirurgico: cirurgicos.length,
      totalArquivados: arquivados.length + concluidos.length, // Unificamos Concluidos e Arquivados no mesmo card para melhor clareza
      ativosList: ativos,
      concluidosList: [...concluidos, ...arquivados],
      arquivadosList: arquivados,
      cirurgicosList: cirurgicos
    };
  }, [filteredData]);

  const timelineData = useMemo(() => {
    const filteredCounts = {};
    filteredData.forEach(d => {
      const year = d.ano_entrada;
      if (year !== 'N/I') {
        filteredCounts[year] = (filteredCounts[year] || 0) + 1;
      }
    });
    return Object.keys(filteredCounts).sort().map(k => ({ name: k, value: filteredCounts[k] }));
  }, [filteredData]);

  const setorData = useMemo(() => {
    const counts = {};
    metrics.ativosList.forEach(d => {
      let setor = String(d.LOCAL_PADRAO).trim();
      if (!setor || setor === 'N/I' || setor === 'nan') setor = 'Outros/Não Informado';
      if (setor.length > 25) setor = setor.substring(0, 25) + '...';
      counts[setor] = (counts[setor] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] })).sort((a,b) => b.value - a.value).slice(0, 10);
  }, [metrics.ativosList]);

  const produtividadeData = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      let instrutor = String(d.INSTRUTOR_PADRAO).trim();
      if (!instrutor || instrutor === 'N/I' || instrutor === 'nan') return; 
      
      if (!counts[instrutor]) counts[instrutor] = { name: instrutor, Entregues: 0, Distribuidos: 0 };
      
      counts[instrutor].Distribuidos += 1;
      
      const s = String(d.status_consolidado).toUpperCase();
      if (s.includes('CONCLUIDO') || s.includes('PUBLICADO') || s.includes('ARQUIVADO')) {
        counts[instrutor].Entregues += 1;
      }
    });
    return Object.values(counts).sort((a,b) => b.Distribuidos - a.Distribuidos);
  }, [filteredData]);

  const uniqueYears = useMemo(() => {
    const years = [...new Set(data.map(d => String(d.ano_entrada)))].filter(y => y !== 'N/I' && y !== 'nan').sort();
    return ['Todos', ...years];
  }, [data]);

  const uniqueGroups = useMemo(() => {
    const groups = [...new Set(data.map(d => d.grupo_funcional))].filter(Boolean).sort();
    return ['Todos', ...groups];
  }, [data]);

  const uniqueAtivosDre = useMemo(() => {
    const dres = [...new Set(metrics.ativosList.map(d => String(d.LOCAL_PADRAO)))].filter(x => x !== 'N/I' && x !== 'nan').sort();
    return ['Todos', ...dres];
  }, [metrics.ativosList]);

  const uniqueAtivosStatus = useMemo(() => {
    const statuses = [...new Set(metrics.ativosList.map(d => String(d.status_consolidado)))].filter(x => x !== 'N/I' && x !== 'nan').sort();
    return ['Todos', ...statuses];
  }, [metrics.ativosList]);

  const processosAtivosSearch = useMemo(() => {
    let result = metrics.ativosList;
    if (filterAtivosDre !== 'Todos') {
      result = result.filter(d => String(d.LOCAL_PADRAO) === filterAtivosDre);
    }
    if (filterAtivosStatus !== 'Todos') {
      if (filterAtivosStatus === '__CIRURGICOS__') {
        result = result.filter(d => metrics.cirurgicosList.includes(d));
      } else {
        result = result.filter(d => String(d.status_consolidado) === filterAtivosStatus);
      }
    }
    if (searchAtivos) {
      const lowerSearch = searchAtivos.toLowerCase();
      result = result.filter(d => 
        String(d.SERVIDOR_PADRAO).toLowerCase().includes(lowerSearch) || 
        String(d.MATRICULA_PADRAO).toLowerCase().includes(lowerSearch)
      );
    }
    return result;
  }, [metrics.ativosList, metrics.cirurgicosList, searchAtivos, filterAtivosDre, filterAtivosStatus]);

  const totalPagesProcessos = Math.ceil(processosAtivosSearch.length / ITEMS_PER_PAGE);
  const paginatedProcessos = processosAtivosSearch.slice((pageProcessos - 1) * ITEMS_PER_PAGE, pageProcessos * ITEMS_PER_PAGE);

  const aposentadosSearch = useMemo(() => {
    if (!searchAposentados) return metrics.concluidosList;
    const lowerSearch = searchAposentados.toLowerCase();
    return metrics.concluidosList.filter(d => 
      String(d.SERVIDOR_PADRAO).toLowerCase().includes(lowerSearch) || 
      String(d.MATRICULA_PADRAO).toLowerCase().includes(lowerSearch)
    );
  }, [metrics.concluidosList, searchAposentados]);

  const totalPagesAposentados = Math.ceil(aposentadosSearch.length / ITEMS_PER_PAGE);
  const paginatedAposentados = aposentadosSearch.slice((pageAposentados - 1) * ITEMS_PER_PAGE, pageAposentados * ITEMS_PER_PAGE);

  const formatLabel = (key) => {
    const mappings = {
      'DT_EXERCICIO': 'Data de Exercício',
      'DT_INICIO_LOTACAO': 'Data de Início da Lotação',
      'DT_FIM_LOTACAO': 'Data de Fim da Lotação',
      'Nº PAE': 'Número PAE',
      'PROTOCOLO N°PAE': 'Protocolo N° PAE',
      'CPF': 'CPF',
      'DRE': 'DRE',
      'MUNICIPIO': 'Município',
      'ESCOLA': 'Escola',
      'VINCULO': 'Vínculo',
      'SERVIDOR': 'Servidor',
      'CARGO': 'Cargo',
      'ATIVIDADE': 'Atividade',
      'MODALIDADE': 'Modalidade',
      'ESTÁ NO AGA': 'Está no AGA',
      'STATUS DO PROCESSO': 'Status do Processo',
      'SITUAÇÃO': 'Situação',
      'SETOR ATUAL': 'Setor Atual',
      'LOCALIZAÇÃO DO PROCESSO': 'Localização do Processo',
      'PENDÊNCIAS': 'Pendências',
      'ÚLTIMA MOVIMENTAÇÃO': 'Última Movimentação',
      'Ultima movimentação': 'Última Movimentação',
      'INSTRUTOR PROCESSUAL': 'Instrutor Processual',
      'INTRUTOR(A) PROCESSUAL': 'Instrutor Processual',
      'OBS': 'Observação',
      'OBSERVAÇÃO': 'Observação',
      'ANO DE ENTRADA': 'Ano de Entrada',
      'grupo_funcional': 'Grupo Funcional',
      'MATRICULA': 'Matrícula',
      'matricula': 'Matrícula'
    };
    if (mappings[key]) return mappings[key];
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatValue = (val) => {
    let strVal = String(val);
    if (strVal.includes('00:00:00')) {
       const match = strVal.match(/(\d{4})-(\d{2})-(\d{2}) 00:00:00/);
       if (match) {
         return `${match[3]}/${match[2]}/${match[1]}`;
       }
    }
    return strVal;
  };

  const handleRowClick = (proc) => {
    setSelectedProcess(proc);
    setPreviousTab(activeTab);
    setActiveTab('processoDetalhe');
  };

  const handleTimelineClick = (data) => {
    if (data && data.activeLabel) {
      setFilterYear(data.activeLabel);
      setActiveTab('processos');
      setPageProcessos(1);
    }
  };

  const renderProcessDetails = () => {
    if (!selectedProcess) return null;
    const proc = selectedProcess;

    const buildTimeline = (p) => {
      const events = [];
      
      events.push({
        title: 'Entrada / Abertura do Processo',
        desc: `Ano Base: ${p.ano_entrada !== 'N/I' ? p.ano_entrada : 'Não Informado'}. Protocolo ${p['Nº PAE'] || 'Não Informado'}.`,
        type: 'blue',
        icon: <Play size={16} />
      });
      
      if (String(p['Processo foi ao IGEPPS?']).toUpperCase() === 'SIM') {
        events.push({
          title: 'Tramitado ao IGEPPS',
          desc: 'O processo foi encaminhado para análise técnica no IGEPPS.',
          type: 'purple',
          icon: <CornerDownRight size={16} />
        });
      }
      
      if (String(p['Processo retornou do IGEPPS?']).toUpperCase() === 'SIM') {
        events.push({
          title: 'Retorno do IGEPPS',
          desc: `O processo retornou do órgão estadual. Setor Atual de tramitação: ${p['LOCALIZAÇÃO DO PROCESSO'] || p.LOCAL_PADRAO}.`,
          type: 'purple',
          icon: <CornerDownRight size={16} />
        });
      }
      
      if (p['Pendências'] && p['Pendências'] !== 'N/I' && p['Pendências'] !== 'nan' && p['Pendências'] !== '-') {
        events.push({
          title: 'Pendência Identificada',
          desc: `Motivo: ${p['Pendências']}. ${p['Qual documentação'] && p['Qual documentação'] !== 'nan' ? 'Detalhe: ' + p['Qual documentação'] : ''}`,
          type: 'red',
          icon: <AlertTriangle size={16} />
        });
      }
      
      const isConcluido = String(p.status_consolidado).toUpperCase().includes('CONCLUIDO') || String(p.status_consolidado).toUpperCase().includes('ARQUIVADO');
      
      events.push({
        title: isConcluido ? 'Processo Finalizado / Arquivado' : 'Status Atual / Última Movimentação',
        desc: `Responsável: ${p.INSTRUTOR_PADRAO && p.INSTRUTOR_PADRAO !== 'N/I' ? p.INSTRUTOR_PADRAO : 'Aguardando Atribuição'}.\nStatus Atual: ${p.status_consolidado}.\nLocalização: ${p.LOCAL_PADRAO}.\nData Base da Última Movimentação: ${p['Ultima movimentação'] && p['Ultima movimentação'] !== 'nan' ? formatValue(p['Ultima movimentação']) : 'Não registrada'}.\n${p.dias_parado > 0 && !isConcluido ? `Inativo no momento há ${p.dias_parado} dias.` : ''}`,
        type: isConcluido ? 'green' : 'blue',
        icon: isConcluido ? <CheckCircle2 size={16} /> : <CircleUserRound size={16} />
      });
      
      return events;
    };

    const timelineEvents = buildTimeline(proc);

    return (
      <div className="process-details-container">
        <div className="process-details-header">
          <button className="btn-back" onClick={() => setActiveTab(previousTab)}>
            <ArrowLeft size={18} /> Voltar para a Lista
          </button>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.5px' }}>
            Visão Detalhada do Processo
          </h2>
        </div>

        <div className="glass-panel" style={{ marginBottom: '24px', padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '26px', color: 'var(--text-primary)', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>{proc.SERVIDOR_PADRAO}</h1>
              <div style={{ color: 'var(--text-secondary)', fontSize: '15px', display: 'flex', gap: '20px' }}>
                <span><strong>Matrícula:</strong> {proc.MATRICULA_PADRAO}</span>
                <span><strong>Cargo:</strong> {proc.CARGO_PADRAO}</span>
                <span><strong>Protocolo:</strong> {proc['Nº PAE'] || 'N/I'}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={`status-badge ${String(proc.status_consolidado).toUpperCase().includes('CONCLUIDO') || String(proc.status_consolidado).toUpperCase().includes('ARQUIVADO') ? 'concluido' : 'andamento'}`} style={{ fontSize: '14px', padding: '8px 16px', marginBottom: '10px' }}>
                {proc.status_consolidado}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                <strong>Analisador:</strong> {proc.INSTRUTOR_PADRAO}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="glass-panel">
            <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px', letterSpacing: '-0.3px' }}>
              Linha do Tempo (Histórico)
            </h3>
            <div className="timeline-container">
              <div className="timeline">
                {timelineEvents.map((evt, idx) => (
                  <div className="timeline-item" key={idx}>
                    <div className={`timeline-marker ${evt.type}`}>
                      {evt.icon}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">{evt.title}</div>
                      <div className="timeline-desc" style={{ whiteSpace: 'pre-line' }}>{evt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel">
            <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px', letterSpacing: '-0.3px' }}>
              Dados Técnicos e Cadastrais
            </h3>
            <div className="details-grid">
              {Object.entries(proc).map(([key, val]) => {
                if (val === null || val === undefined || val === 'nan' || val === 'N/I' || val === 'NaT') return null;
                if (key.includes('_PADRAO') || key.includes('Unnamed') || key === 'status_consolidado' || key === 'dias_parado') return null;
                if (['SERVIDOR', 'MATRICULA', 'matricula', 'CARGO', 'Nº PAE'].includes(key)) return null;

                return (
                  <div className="detail-row" key={key}>
                    <span className="detail-label">{formatLabel(key)}</span>
                    <span className="detail-value">{formatValue(val)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalyzerModal = () => {
    if (!selectedAnalyzer) return null;
    
    const analyzerProcesses = filteredData.filter(d => d.INSTRUTOR_PADRAO === selectedAnalyzer);
    
    const entregues = analyzerProcesses.filter(d => {
      const s = String(d.status_consolidado).toUpperCase();
      return s.includes('CONCLUIDO') || s.includes('PUBLICADO') || s.includes('ARQUIVADO');
    }).length;
    
    const distribuidos = analyzerProcesses.length;

    const generatePDF = () => {
      const doc = new jsPDF();
      
      doc.setFontSize(18);
      doc.setTextColor(29, 29, 31); 
      doc.text("CAPO GESTÃO - Relatório de Produtividade", 14, 22);
      
      doc.setFontSize(12);
      doc.setTextColor(134, 134, 139);
      doc.text(`Analisador: ${selectedAnalyzer}`, 14, 32);
      doc.text(`Total Distribuído: ${distribuidos}`, 14, 38);
      doc.text(`Total Entregue: ${entregues}`, 14, 44);
      doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}`, 14, 50);

      const tableColumn = ["Servidor", "Protocolo/PAE", "Status", "Dias Parado"];
      const tableRows = [];

      analyzerProcesses.forEach(proc => {
        const procData = [
          proc.SERVIDOR_PADRAO || 'N/I',
          proc['Nº PAE'] || 'N/I',
          proc.status_consolidado || 'N/I',
          proc.dias_parado > 0 ? `${proc.dias_parado} dias` : 'Recente'
        ];
        tableRows.push(procData);
      });

      doc.autoTable({
        startY: 55,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [0, 113, 227] },
        styles: { fontSize: 9 }
      });

      doc.save(`Relatorio_Analisador_${selectedAnalyzer.replace(/\s+/g, '_')}.pdf`);
    };

    const perc = distribuidos > 0 ? Math.round((entregues / distribuidos) * 100) : 0;
    const pieData = [
      { name: 'Entregues', value: entregues, fill: 'var(--success-color)' },
      { name: 'Pendentes', value: distribuidos - entregues, fill: '#e5e5ea' }
    ];

    return (
      <div className="modal-overlay" onClick={() => setSelectedAnalyzer(null)}>
        <div className="modal-content" style={{ width: '840px', maxWidth: '95%', maxHeight: '85vh' }} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 style={{margin: 0}}>Histórico de Produtividade: {selectedAnalyzer}</h2>
            <button onClick={() => setSelectedAnalyzer(null)}>✕</button>
          </div>
          
          <div className="modal-body" style={{ maxHeight: 'calc(85vh - 75px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ width: '120px', height: '120px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={55}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>{perc}%</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="glass-panel" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'none' }}>
                    <div className="stat-icon blue" style={{ width: 40, height: 40, fontSize: 18 }}><FileText /></div>
                    <div className="stat-details">
                      <span className="stat-value" style={{ fontSize: 20 }}>{distribuidos}</span>
                      <span className="stat-label" style={{ fontSize: 12 }}>Distribuídos</span>
                    </div>
                  </div>
                  <div className="glass-panel" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'none' }}>
                    <div className="stat-icon green" style={{ width: 40, height: 40, fontSize: 18 }}><CheckCircle2 /></div>
                    <div className="stat-details">
                      <span className="stat-value" style={{ fontSize: 20 }}>{entregues}</span>
                      <span className="stat-label" style={{ fontSize: 12 }}>Entregues</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={generatePDF}
                style={{
                  background: 'var(--accent-color)', color: '#fff', border: 'none', 
                  padding: '12px 24px', borderRadius: '10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, fontSize: '15px',
                  transition: 'background 0.2s, transform 0.1s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#005bb5'}
                onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent-color)'}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Download size={18} /> Emitir Relatório PDF
              </button>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Servidor</th>
                  <th>Nº PAE / Protocolo</th>
                  <th>Status Consolidado</th>
                  <th>Dias Parado</th>
                </tr>
              </thead>
              <tbody>
                {analyzerProcesses.map((proc, idx) => (
                  <tr key={idx} onClick={() => handleRowClick(proc)}>
                    <td>
                      <div style={{fontWeight: 500, color: 'var(--text-primary)'}}>{proc.SERVIDOR_PADRAO}</div>
                      <div style={{fontSize: 12, color: 'var(--text-secondary)', marginTop: '4px'}}>Mat: {proc.MATRICULA_PADRAO}</div>
                    </td>
                    <td style={{ color: 'var(--text-primary)' }}>{proc['Nº PAE']}</td>
                    <td>
                      <span className="status-badge" style={{ background: '#f5f5f7', color: 'var(--text-primary)' }}>
                        {proc.status_consolidado}
                      </span>
                    </td>
                    <td>
                      {proc.dias_parado > 30 ? (
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--danger-color)', fontSize: '13px', fontWeight: 600}}>
                          <Clock size={14} /> {proc.dias_parado} dias
                        </div>
                      ) : proc.dias_parado > 0 ? (
                        <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>{proc.dias_parado} dias</span>
                      ) : (
                        <span style={{fontSize: '13px', color: 'var(--success-color)'}}>Recente</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Landmark className="logo-icon" size={24} />
            <span>CAPO GESTÃO</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              powered by SIRA - PAE 4.0
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px', marginLeft: '-2px' }}>
              <img src="/seduc-logo.png" alt="SEDUC" style={{ height: '22px', width: 'auto', objectFit: 'contain' }} />
              <div style={{ height: '18px', width: '1px', background: '#d2d2d7' }}></div>
              <img src="/logo.png" alt="SIRA" style={{ height: '22px', width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
        
        <nav className="nav-menu">
          <a href="#" className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}><LayoutDashboard size={20} /> Dashboard Geral</a>
          <a href="#" className={`nav-item ${activeTab === 'producao' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('producao'); }}><TrendingUp size={20} /> Produção & Produtividade</a>
          <a href="#" className={`nav-item ${activeTab === 'processos' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('processos'); }}><FileText size={20} /> Processos Ativos</a>
          <a href="#" className={`nav-item ${activeTab === 'aposentados' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('aposentados'); }}><Archive size={20} /> Arquivados & Concluídos</a>
          <a href="#" className={`nav-item ${activeTab === 'configuracoes' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('configuracoes'); }}><Settings size={20} /> Configurações</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-title">Visão Geral dos Processos SEDUC</div>
          <div className="header-actions">
            <Bell size={20} color="var(--text-secondary)" />
            <div className="user-profile">
              <div className="avatar">A</div>
              <span>Administrador</span>
            </div>
          </div>
        </header>

        <div className="dashboard-container fade-in" key={activeTab}>
          
          {(activeTab === 'dashboard' || activeTab === 'producao' || activeTab === 'processos' || activeTab === 'aposentados') && activeTab !== 'processoDetalhe' && (
            <div className="filter-bar" style={{ display: (activeTab === 'dashboard' || activeTab === 'producao') ? 'flex' : 'none' }}>
              <select 
                className="filter-select" 
                value={filterGroup} 
                onChange={e => setFilterGroup(e.target.value)}
              >
                {uniqueGroups.map(g => <option key={g} value={g}>{g === 'Todos' ? 'Todos os Grupos' : g}</option>)}
              </select>
              
              <select 
                className="filter-select" 
                value={filterYear} 
                onChange={e => setFilterYear(e.target.value)}
              >
                {uniqueYears.map(y => <option key={y} value={y}>{y === 'Todos' ? 'Todos os Anos (Linha do Tempo)' : `Ano ${y}`}</option>)}
              </select>
            </div>
          )}

          {activeTab === 'processoDetalhe' && renderProcessDetails()}

          {activeTab === 'dashboard' && (
            <>
              <div className="stats-grid">
                <div 
                  className="glass-panel stat-card" 
                  style={{cursor: 'pointer'}} 
                  onClick={() => {
                    setFilterAtivosDre('Todos');
                    setFilterAtivosStatus('Todos');
                    setSearchAtivos('');
                    setPageProcessos(1);
                    setActiveTab('processos');
                  }}
                >
                  <div className="stat-icon blue"><FileText /></div>
                  <div className="stat-details">
                    <span className="stat-value">{metrics.totalAtivos.toLocaleString('pt-BR')}</span>
                    <span className="stat-label">Total de Ativos</span>
                    <span className="stat-description">Processos correntes em andamento.</span>
                  </div>
                </div>
                
                <div 
                  className="glass-panel stat-card" 
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setFilterAtivosDre('Todos');
                    setFilterAtivosStatus('__CIRURGICOS__');
                    setSearchAtivos('');
                    setPageProcessos(1);
                    setActiveTab('processos');
                  }}
                >
                  <div className="stat-icon red"><AlertCircle /></div>
                  <div className="stat-details">
                    <span className="stat-value">{metrics.totalCirurgico.toLocaleString('pt-BR')}</span>
                    <span className="stat-label">Volume Cirúrgico</span>
                    <span className="stat-description">Gargalos: Pendentes, inativos ou s/ análise.</span>
                  </div>
                </div>

                <div 
                  className="glass-panel stat-card" 
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setActiveTab('aposentados');
                  }}
                >
                  <div className="stat-icon green"><Archive /></div>
                  <div className="stat-details">
                    <span className="stat-value">{metrics.totalArquivados.toLocaleString('pt-BR')}</span>
                    <span className="stat-label">Finalizados / Arquivados</span>
                    <span className="stat-description">Processos concluídos ou extintos.</span>
                  </div>
                </div>
              </div>

              <div className="charts-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="glass-panel">
                  <div className="chart-header">Série Histórica (Linha do Tempo)</div>
                  <div className="chart-description">Clique em um ano na linha do tempo para filtrar e visualizar os processos correspondentes.</div>
                  <div style={{ width: '100%', height: 320, marginTop: '20px' }}>
                    <ResponsiveContainer>
                      <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }} onClick={handleTimelineClick} style={{cursor: 'pointer'}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" vertical={false} />
                        <XAxis dataKey="name" stroke="#86868b" fontSize={13} tickMargin={10} />
                        <YAxis stroke="#86868b" fontSize={13} tickMargin={10} />
                        <Tooltip cursor={{stroke: 'rgba(0,0,0,0.05)', strokeWidth: 2}} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e5ea', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontFamily: 'var(--font-main)' }} />
                        <Line type="monotone" dataKey="value" stroke="var(--accent-color)" strokeWidth={3} activeDot={{ r: 8, fill: '#fff', stroke: 'var(--accent-color)', strokeWidth: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="charts-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div className="glass-panel">
                  <div className="chart-header">Volume de Processos por Setor (DREs/CAPO)</div>
                  <div className="chart-description">Distribuição de processos ativos agrupados por sua localização física/sistema atual.</div>
                  <div style={{ width: '100%', height: 320, marginTop: '20px' }}>
                    <ResponsiveContainer>
                      <BarChart data={setorData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" horizontal={false} />
                        <XAxis type="number" stroke="#86868b" fontSize={13} />
                        <YAxis dataKey="name" type="category" stroke="#86868b" fontSize={12} width={220} />
                        <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e5ea', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                        <Bar dataKey="value" fill="var(--accent-color)" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'producao' && (
            <>
              <div className="glass-panel table-container">
                <div className="chart-header">Lista Detalhada de Analisadores</div>
                <div className="chart-description">Clique sobre um analisador para abrir o seu histórico de processos e emitir o relatório em PDF.</div>
                
                <table className="data-table" style={{ marginTop: '16px' }}>
                  <thead>
                    <tr>
                      <th>Nome do Analisador</th>
                      <th>Total Distribuído</th>
                      <th>Total Entregue</th>
                      <th>Progresso / Taxa de Entrega</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtividadeData.map((analisador, idx) => {
                      const perc = analisador.Distribuidos > 0 
                        ? Math.round((analisador.Entregues / analisador.Distribuidos) * 100) 
                        : 0;
                        
                      return (
                        <tr key={idx} onClick={() => setSelectedAnalyzer(analisador.name)} style={{cursor: 'pointer'}}>
                          <td>
                            <div style={{fontWeight: 600, color: 'var(--text-primary)'}}>{analisador.name}</div>
                          </td>
                          <td style={{fontWeight: 500, color: 'var(--text-secondary)'}}>{analisador.Distribuidos} processos</td>
                          <td style={{fontWeight: 500, color: 'var(--success-color)'}}>{analisador.Entregues} concluídos</td>
                          <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                              <div style={{width: '120px', height: '8px', background: '#e5e5ea', borderRadius: '4px'}}>
                                <div style={{width: `${Math.min(perc, 100)}%`, height: '100%', background: 'var(--success-color)', borderRadius: '4px'}}></div>
                              </div>
                              <span style={{fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)'}}>{perc}%</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'processos' && (
            <div className="glass-panel table-container">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div className="chart-header" style={{marginBottom: 0}}>Processos Ativos</div>
                <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
                  <select 
                    className="filter-select" 
                    value={filterAtivosDre} 
                    onChange={e => { setFilterAtivosDre(e.target.value); setPageProcessos(1); }}
                    style={{maxWidth: '220px'}}
                  >
                    {uniqueAtivosDre.map(d => <option key={d} value={d}>{d === 'Todos' ? 'Todas DREs/Locais' : d.substring(0,30)}</option>)}
                  </select>
                  
                  <select 
                    className="filter-select" 
                    value={filterAtivosStatus} 
                    onChange={e => { setFilterAtivosStatus(e.target.value); setPageProcessos(1); }}
                    style={{maxWidth: '220px'}}
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="__CIRURGICOS__">⚠ Apenas Volume Cirúrgico</option>
                    {uniqueAtivosStatus.filter(s => s !== 'Todos').map(s => <option key={s} value={s}>{s.substring(0,30)}</option>)}
                  </select>

                  <div className="search-wrapper" style={{width: 'auto'}}>
                    <Search size={18} color="var(--text-secondary)" />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Buscar Servidor ou Matrícula..." 
                      value={searchAtivos}
                      onChange={e => { setSearchAtivos(e.target.value); setPageProcessos(1); }}
                    />
                  </div>
                </div>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Servidor</th>
                    <th>Grupo</th>
                    <th>Tempo Parado</th>
                    <th>Status / Local</th>
                    <th>Analisador</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProcessos.map((proc, idx) => {
                    let badgeClass = 'status-badge andamento';
                    const s = String(proc.status_consolidado).toLowerCase();
                    if (s.includes('pend') || s.includes('adequação')) badgeClass = 'status-badge pendencia';
                    if (s.includes('parado') || s.includes('atrasado') || proc.dias_parado > 30) badgeClass = 'status-badge parado';
                    if (s.includes('conclu') || s.includes('publicado')) badgeClass = 'status-badge concluido';
                    
                    return (
                      <tr key={idx} onClick={() => handleRowClick(proc)}>
                        <td>
                          <div style={{fontWeight: 600, color: 'var(--text-primary)'}}>{proc.SERVIDOR_PADRAO}</div>
                          <div style={{fontSize: 13, color: 'var(--text-secondary)', marginTop: '4px'}}>Mat: {proc.MATRICULA_PADRAO}</div>
                        </td>
                        <td>{proc.grupo_funcional}</td>
                        <td>
                          {proc.dias_parado > 30 ? (
                            <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--danger-color)', fontSize: '13px', fontWeight: 600}}>
                              <Clock size={16} /> {proc.dias_parado} dias
                            </div>
                          ) : proc.dias_parado > 0 ? (
                            <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>{proc.dias_parado} dias</span>
                          ) : (
                            <span style={{fontSize: '13px', color: 'var(--success-color)'}}>Recente</span>
                          )}
                        </td>
                        <td>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                            <span className={badgeClass} title={proc.status_normal}>{proc.status_consolidado}</span>
                            <span style={{fontSize: 13, color: 'var(--text-secondary)'}}>{proc.LOCAL_PADRAO}</span>
                          </div>
                        </td>
                        <td>{proc.INSTRUTOR_PADRAO}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="pagination">
                <button 
                  disabled={pageProcessos === 1} 
                  onClick={() => setPageProcessos(p => p - 1)}
                >
                  Anterior
                </button>
                <span>Página {pageProcessos} de {totalPagesProcessos || 1}</span>
                <button 
                  disabled={pageProcessos >= totalPagesProcessos || totalPagesProcessos === 0} 
                  onClick={() => setPageProcessos(p => p + 1)}
                >
                  Próxima
                </button>
              </div>
            </div>
          )}

          {activeTab === 'aposentados' && (
            <div className="glass-panel table-container">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div className="chart-header" style={{marginBottom: 0}}>Servidores Aposentados e Arquivados</div>
                <div className="search-wrapper">
                  <Search size={18} color="var(--text-secondary)" />
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Buscar Servidor ou Matrícula..." 
                    value={searchAposentados}
                    onChange={e => { setSearchAposentados(e.target.value); setPageAposentados(1); }}
                  />
                </div>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Servidor</th>
                    <th>Grupo</th>
                    <th>Cargo</th>
                    <th>Ano Nascimento</th>
                    <th>Status Final</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAposentados.map((proc, idx) => (
                    <tr key={idx} onClick={() => handleRowClick(proc)}>
                      <td>
                        <div style={{fontWeight: 600, color: 'var(--text-primary)'}}>{proc.SERVIDOR_PADRAO}</div>
                        <div style={{fontSize: 13, color: 'var(--text-secondary)', marginTop: '4px'}}>Mat: {proc.MATRICULA_PADRAO}</div>
                      </td>
                      <td>{proc.grupo_funcional}</td>
                      <td>{proc.CARGO_PADRAO}</td>
                      <td>{proc.ano_entrada}</td>
                      <td>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                          <span className="status-badge concluido">{proc.status_consolidado}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <button 
                  disabled={pageAposentados === 1} 
                  onClick={() => setPageAposentados(p => p - 1)}
                >
                  Anterior
                </button>
                <span>Página {pageAposentados} de {totalPagesAposentados || 1}</span>
                <button 
                  disabled={pageAposentados >= totalPagesAposentados || totalPagesAposentados === 0} 
                  onClick={() => setPageAposentados(p => p + 1)}
                >
                  Próxima
                </button>
              </div>
            </div>
          )}

          {activeTab === 'configuracoes' && (
            <div className="glass-panel">
              <div className="chart-header">Configurações Gerais</div>
              <p style={{ color: 'var(--text-secondary)' }}>Módulo de configurações em desenvolvimento.</p>
            </div>
          )}
        </div>
        {renderAnalyzerModal()}
      </main>
    </div>
  );
}

export default App;
