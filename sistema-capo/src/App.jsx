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
  Landmark
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
  Legend
} from 'recharts';

import './App.css';
import rawData from './data/db.json';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterGroup, setFilterGroup] = useState('Todos');
  const [filterYear, setFilterYear] = useState('Todos');
  const [searchAtivos, setSearchAtivos] = useState('');
  const [searchAposentados, setSearchAposentados] = useState('');
  const [pageProcessos, setPageProcessos] = useState(1);
  const [pageAposentados, setPageAposentados] = useState(1);
  const [filterAtivosDre, setFilterAtivosDre] = useState('Todos');
  const [filterAtivosStatus, setFilterAtivosStatus] = useState('Todos');
  const [selectedProcess, setSelectedProcess] = useState(null);
  const ITEMS_PER_PAGE = 20;

  // Process and clean data using the new standard fields
  const data = useMemo(() => {
    return rawData.map(item => {
      let rawAno = String(item.ANO_ENTRADA_PADRAO || 'N/I').trim();
      const yearMatch = rawAno.match(/\b(19|20)\d{2}\b/);
      const ano_entrada = yearMatch ? yearMatch[0] : 'N/I';

      return {
        ...item,
        status_normal: item.STATUS_PADRAO || 'Não Informado',
        ano_entrada,
        'ESTÁ NO AGA': (String(item.STATUS_PADRAO).toUpperCase().includes('CONCLUIDO') || 
                        String(item.STATUS_PADRAO).toUpperCase().includes('PUBLICADO') || 
                        String(item.STATUS_PADRAO).toUpperCase().includes('ARQUIVADO')) ? 'NÃO (Processo Finalizado/Arquivado)' : item['ESTÁ NO AGA']
      };
    });
  }, []);

  // Filter Data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchGroup = filterGroup === 'Todos' || item.grupo_funcional === filterGroup;
      const matchYear = filterYear === 'Todos' || String(item.ano_entrada) === String(filterYear);
      return matchGroup && matchYear;
    });
  }, [data, filterGroup, filterYear]);

  // Metrics
  const metrics = useMemo(() => {
    // Aposentados = Apenas Concluídos e Publicados
    const concluidoKeywords = ['CONCLUIDO', 'PUBLICADO'];
    const arquivadoKeywords = ['ARQUIVADO'];
    
    const concluidos = filteredData.filter(d => concluidoKeywords.some(k => String(d.status_normal).toUpperCase().includes(k)));
    const arquivados = filteredData.filter(d => arquivadoKeywords.some(k => String(d.status_normal).toUpperCase().includes(k)));
    
    // Ativos são aqueles que NÃO estão concluídos e NÃO estão arquivados
    const ativos = filteredData.filter(d => 
      !concluidoKeywords.some(k => String(d.status_normal).toUpperCase().includes(k)) &&
      !arquivadoKeywords.some(k => String(d.status_normal).toUpperCase().includes(k))
    );
    
    const atrasados = ativos.filter(d => String(d.status_normal).toUpperCase().includes('PARADO MAIS'));
    
    return {
      totalAtivos: ativos.length,
      totalConcluidos: concluidos.length,
      totalArquivados: arquivados.length,
      totalAtrasados: atrasados.length,
      ativosList: ativos,
      concluidosList: concluidos,
      arquivadosList: arquivados
    };
  }, [filteredData]);

  // Chart Data: Processes by Group
  const groupData = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      let groupName = d.grupo_funcional;
      if (groupName.length > 25) groupName = groupName.substring(0, 25) + '...';
      counts[groupName] = (counts[groupName] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] })).sort((a,b) => b.value - a.value).slice(0, 10);
  }, [filteredData]);

  // Chart Data: Processes by Status (Pie Chart)
  const statusData = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      let s = String(d.status_normal).toLowerCase();
      let cat = 'Em Andamento';
      if (s.includes('pend')) cat = 'Com Pendência';
      if (s.includes('parado') || s.includes('atrasado')) cat = 'Parado/Atrasado';
      if (s.includes('concluido') || s.includes('publicado')) cat = 'Concluído/Publicado';
      if (s.includes('arquivado')) cat = 'Arquivado';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] }));
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
    const statuses = [...new Set(metrics.ativosList.map(d => String(d.status_normal)))].filter(x => x !== 'N/I' && x !== 'nan').sort();
    return ['Todos', ...statuses];
  }, [metrics.ativosList]);

  // Paginated Processos
  const processosAtivosSearch = useMemo(() => {
    let result = metrics.ativosList;
    if (filterAtivosDre !== 'Todos') {
      result = result.filter(d => String(d.LOCAL_PADRAO) === filterAtivosDre);
    }
    if (filterAtivosStatus !== 'Todos') {
      if (filterAtivosStatus === '__ATRASADOS__') {
        result = result.filter(d => String(d.status_normal).toUpperCase().includes('PARADO MAIS') || String(d.status_normal).toUpperCase().includes('ATRASADO'));
      } else {
        result = result.filter(d => String(d.status_normal) === filterAtivosStatus);
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
  }, [metrics.ativosList, searchAtivos, filterAtivosDre, filterAtivosStatus]);

  const totalPagesProcessos = Math.ceil(processosAtivosSearch.length / ITEMS_PER_PAGE);
  const paginatedProcessos = processosAtivosSearch.slice((pageProcessos - 1) * ITEMS_PER_PAGE, pageProcessos * ITEMS_PER_PAGE);

  // Paginated Aposentados
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
      'DTINI_MNEMONICO': 'Data de Início do Mnemônico',
      'MOTIVO_MNEMONICO': 'Motivo do Mnemônico',
      'LICENCA_MNEMONICO': 'Licença do Mnemônico',
      'DT_VACANCIA': 'Data de Vacância',
      'TIPO_VINCULO': 'Tipo de Vínculo',
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
      'SUBCATEGORIA': 'Subcategoria',
      'DATA DA SAÍDA': 'Data da Saída',
      'ESTÁ NO AGA': 'Está no AGA',
      'DATA ENTRADA NO AGA': 'Data Entrada no AGA',
      'STATUS DO PROCESSO': 'Status do Processo',
      'SITUAÇÃO': 'Situação',
      'SITUAÇÃO ATUAL': 'Situação Atual',
      'JÁ FOI OU RETORNOU DO IGEPPS?': 'Foi ou Retornou do IGEPPS?',
      'RETORNO DO IGEPPS': 'Retorno do IGEPPS',
      'SE VOLTA DO IGEPPS PORQUE?': 'Motivo Retorno IGEPPS',
      'SETOR ATUAL': 'Setor Atual',
      'LOCALIZAÇÃO DO PROCESSO': 'Localização do Processo',
      'LOCAL. GERAL': 'Local Geral',
      'PENDÊNCIA?': 'Possui Pendência?',
      'QUAL DOCUMENTAÇÃO': 'Qual Documentação',
      'PENDÊNCIAS': 'Pendências',
      'ÚLTIMA MOVIMENTAÇÃO': 'Última Movimentação',
      'ULTIMA MOVIMENTACAO': 'Última Movimentação',
      'DATA DA ÚLTIMA VERIFICAÇÃO': 'Data da Última Verificação',
      'SERVIDOR QUE VERIFICOU': 'Servidor que Verificou',
      'INSTRUTOR PROCESSUAL': 'Instrutor Processual',
      'INTRUTOR(A) PROCESSUAL': 'Instrutor Processual',
      'EQUIPE DADOS': 'Equipe de Dados',
      'OBS': 'Observação',
      'OBSERVAÇÃO': 'Observação',
      'ANO DE ENTRADA': 'Ano de Entrada',
      'grupo_funcional': 'Grupo Funcional',
      'arquivo_origem': 'Arquivo de Origem',
      'MATRICULA': 'Matrícula',
      'matricula': 'Matrícula',
      'NOME DO SERVIDOR': 'Servidor',
      'NOME DO SEVIDOR': 'Servidor'
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

  const renderModal = () => {
    if (!selectedProcess) return null;
    return (
      <div className="modal-overlay" onClick={() => setSelectedProcess(null)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 style={{margin: 0}}>Detalhes Completos</h2>
            <button onClick={() => setSelectedProcess(null)}>✕</button>
          </div>
          <div className="modal-body">
            {Object.entries(selectedProcess).map(([key, val]) => {
              if (val === null || val === undefined || val === 'nan' || val === 'N/I' || val === 'NaT') return null;
              if (key.includes('_PADRAO') || key.includes('Unnamed')) return null; // Hide internal standardized keys
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
    );
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Landmark className="logo-icon" size={28} />
          <span>CAPO Análise</span>
        </div>
        
        <nav className="nav-menu">
          <a href="#" className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}><LayoutDashboard size={20} /> Dashboard</a>
          <a href="#" className={`nav-item ${activeTab === 'processos' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('processos'); }}><FileText size={20} /> Processos Ativos</a>
          <a href="#" className={`nav-item ${activeTab === 'aposentados' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('aposentados'); }}><Users size={20} /> Aposentados e Publicados</a>
          <a href="#" className={`nav-item ${activeTab === 'configuracoes' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('configuracoes'); }}><Settings size={20} /> Configurações Gerais</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-title">Visão Geral dos Processos SEDUC</div>
          <div className="header-actions">
            <Bell size={20} color="#ffffff" />
            <div className="user-profile">
              <div className="avatar">A</div>
              <span>Administrador</span>
            </div>
          </div>
        </header>

        <div className="dashboard-container">
          {activeTab === 'dashboard' && (
            <>
              {/* Filters */}
              <div className="filter-bar">
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
                  {uniqueYears.map(y => <option key={y} value={y}>{y === 'Todos' ? 'Todos os Anos' : `Ano ${y}`}</option>)}
                </select>
              </div>

              {/* KPI Cards */}
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
                    <span className="stat-value">{metrics.totalAtivos}</span>
                    <span className="stat-label">Processos Ativos</span>
                    <span className="stat-description">Servidores aguardando a finalização da aposentadoria.</span>
                  </div>
                </div>
                <div 
                  className="glass-panel stat-card" 
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setSearchAposentados('');
                    setPageAposentados(1);
                    setActiveTab('aposentados');
                  }}
                >
                  <div className="stat-icon green"><CheckCircle2 /></div>
                  <div className="stat-details">
                    <span className="stat-value">{metrics.totalConcluidos}</span>
                    <span className="stat-label">Aposentados/Publicados</span>
                    <span className="stat-description">Processos com portaria já publicada/concluída.</span>
                  </div>
                </div>
                <div 
                  className="glass-panel stat-card" 
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setFilterAtivosDre('Todos');
                    setFilterAtivosStatus('__ATRASADOS__');
                    setSearchAtivos('');
                    setPageProcessos(1);
                    setActiveTab('processos');
                  }}
                >
                  <div className="stat-icon red"><AlertCircle /></div>
                  <div className="stat-details">
                    <span className="stat-value">{metrics.totalAtrasados}</span>
                    <span className="stat-label">Atrasados (+6 Meses)</span>
                    <span className="stat-description">Processos que exigem intervenção emergencial.</span>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="charts-grid">
                <div className="glass-panel">
                  <div className="chart-header">Distribuição por Categoria (Top 10)</div>
                  <div className="chart-description">Volume de processos divididos por grupo de atuação profissional ou lote.</div>
                  <div style={{ width: '100%', height: 280, marginTop: '20px' }}>
                    <ResponsiveContainer>
                      <BarChart data={groupData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                        <XAxis dataKey="name" stroke="#6b21a8" fontSize={10} angle={-45} textAnchor="end" />
                        <YAxis stroke="#6b21a8" fontSize={12} />
                        <Tooltip cursor={{fill: 'rgba(0,0,0,0.03)'}} contentStyle={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', color: '#3b0764', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="glass-panel">
                  <div className="chart-header">Saúde da Fila (Status Geral)</div>
                  <div className="chart-description">Proporção dos processos em andamento versus travados ou concluídos.</div>
                  <div style={{ width: '100%', height: 280, marginTop: '20px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="45%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', color: '#3b0764', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
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
                    style={{maxWidth: '200px'}}
                  >
                    {uniqueAtivosDre.map(d => <option key={d} value={d}>{d === 'Todos' ? 'Todas DREs/Locais' : d.substring(0,25)}</option>)}
                  </select>
                  
                  <select 
                    className="filter-select" 
                    value={filterAtivosStatus} 
                    onChange={e => { setFilterAtivosStatus(e.target.value); setPageProcessos(1); }}
                    style={{maxWidth: '200px'}}
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="__ATRASADOS__">⚠ Apenas Atrasados (+6 meses)</option>
                    {uniqueAtivosStatus.filter(s => s !== 'Todos').map(s => <option key={s} value={s}>{s.substring(0,25)}</option>)}
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
                    <th>Grupo/Aba</th>
                    <th>Cargo</th>
                    <th>Status / Local</th>
                    <th>Analisador</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProcessos.map((proc, idx) => {
                    let badgeClass = 'status-badge andamento';
                    const s = String(proc.status_normal).toLowerCase();
                    if (s.includes('pend')) badgeClass = 'status-badge pendencia';
                    if (s.includes('parado') || s.includes('atrasado')) badgeClass = 'status-badge parado';
                    if (s.includes('conclu') || s.includes('publicado')) badgeClass = 'status-badge concluido';
                    
                    return (
                      <tr key={idx} onClick={() => setSelectedProcess(proc)}>
                        <td>
                          <div style={{fontWeight: 500}}>{proc.SERVIDOR_PADRAO}</div>
                          <div style={{fontSize: 12, color: 'var(--text-secondary)'}}>Mat: {proc.MATRICULA_PADRAO}</div>
                        </td>
                        <td>{proc.grupo_funcional}</td>
                        <td>{proc.CARGO_PADRAO}</td>
                        <td>
                          <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                            <span className={badgeClass} title={proc.status_normal}>{proc.status_normal}</span>
                            <span style={{fontSize: 12, color: 'var(--text-secondary)'}}>{proc.LOCAL_PADRAO}</span>
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
                <div className="chart-header" style={{marginBottom: 0}}>Servidores Aposentados (Concluídos)</div>
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
                    <th>Grupo/Aba</th>
                    <th>Cargo</th>
                    <th>Ano de Entrada</th>
                    <th>Data Saída/Pub</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAposentados.map((proc, idx) => (
                    <tr key={idx} onClick={() => setSelectedProcess(proc)}>
                      <td>
                        <div style={{fontWeight: 500}}>{proc.SERVIDOR_PADRAO}</div>
                        <div style={{fontSize: 12, color: 'var(--text-secondary)'}}>Mat: {proc.MATRICULA_PADRAO}</div>
                      </td>
                      <td>{proc.grupo_funcional}</td>
                      <td>{proc.CARGO_PADRAO}</td>
                      <td>{proc.ano_entrada}</td>
                      <td>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                          <span className="status-badge concluido">Aposentado</span>
                          <span style={{fontSize: 12, color: 'var(--text-secondary)'}}>
                            Pub: {proc.DATA_PUB_PADRAO}
                          </span>
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
      </main>

      {renderModal()}
    </div>
  );
}

export default App;
