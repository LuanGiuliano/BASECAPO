import { useState, useMemo, useEffect } from 'react';
import { seducLogo, siraLogo, brasaoGreyLogo } from './pdfLogos';
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
  AlertTriangle,
  Building,
  History,
  Folder,
  Edit3,
  Table,
  Info,
  Database,
  Lock
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
  Line,
  AreaChart,
  Area
} from 'recharts';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import './App.css';
import { supabase, supabaseAdminAuth } from './services/supabaseClient';
import Login from './components/Login';

const ACTIVE_ANALYZERS = [
  { name: "ANA LUIZA LIMA DOS SANTOS", matricula: "5890679-1" },
  { name: "ELIELSON ANDRADE PINHEIRO", matricula: "5896651-1" },
  { name: "LICIA DE NAZARÉ COHEN DOS PASSOS", matricula: "941450-1" },
  { name: "LUCIDEIA LIRA DE OLIVEIRA", matricula: "5167027-2" },
  { name: "SÔNIA DO SOCORRO FIGUEIREDO NASCIMENTO", matricula: "6013287-1" },
  { name: "VANESSA ALCÂNTARA CARDOSO MENDES", matricula: "57194853-2" },
  { name: "AMERICA PINHEIRO DOS SANTOS", matricula: "671908-1" },
  { name: "ALDENILZA PROGENIO PANTOJA BAIA", matricula: "5900515-1" },
  { name: "DELMA LÚCIA RODRIGUES MOURA", matricula: "54191108-2" },
  { name: "DENISE DOS SANTOS DE SOUZA", matricula: "5791570-2" },
  { name: "IDAMÍLIA DOS SANTOS", matricula: "5187389-1" },
  { name: "JERACINA OLIVEIRA DA SILVA", matricula: "732818-1" },
  { name: "LOURENÇO SANCHES DE MATOS JUNIOR", matricula: "5791316-2" },
  { name: "MARIA FERNANDA MARTINS DE SOUSA", matricula: "5188903-1" },
  { name: "SILVIO FERREIRA RIBEIRO JUNIOR", matricula: "5891279-1" },
  { name: "LUAN GIULIANO (TESTE)", matricula: "5991332" },
  { name: "VICTOR MATEUS DINIZ PEREIRA", matricula: "57212515-1" },
  { name: "ANTONIO LUIZ LEAL MOREIRA", matricula: "5791430-2" },
  { name: "ANDRÉ PEREIRA CHAVES", matricula: "57210656-1" },
  { name: "DAFNE DA SILVA RODRIGUES", matricula: "55587100-2" },
  { name: "JOE RODRIGUES RIBEIRO", matricula: "5721130-2" },
  { name: "FLAVIO JOSÉ PIMENTEL PENNA", matricula: "3252248-2" },
  { name: "JOÃO JÚNIOR", matricula: "57214603-1" },
  { name: "MARIA HELENA LOPES DE OLIVEIRA", matricula: "452858-1" },
  { name: "MARIA DO ROSÁRIO MONTEIRO SILVA", matricula: "57210664-1" },
  { name: "PAULO ANDRÉ COSTA RIBEIRO", matricula: "5890602-1" }
];

function App() {
  const [session, setSession] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  // User Management State
  const [newUserNome, setNewUserNome] = useState('');
  const [newUserMatricula, setNewUserMatricula] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserSenha, setNewUserSenha] = useState('');
  const [newUserConfirmaSenha, setNewUserConfirmaSenha] = useState('');
  const [newUserCargo, setNewUserCargo] = useState('Analisador');
  const [userCreating, setUserCreating] = useState(false);
  const [userCreateMsg, setUserCreateMsg] = useState({ type: '', text: '' });
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = [
    "Estabelecendo conexão segura com Supabase...",
    "Baixando histórico de processos...",
    "Preparando cenário de análise...",
    "Calculando métricas do volume cirúrgico...",
    "Quase lá, organizando painel gestor..."
  ];

  useEffect(() => {
    if (!dataLoading) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [dataLoading]);

  useEffect(() => {
    if (!session) return;
    
    let isMounted = true;
    const fetchData = async () => {
      setDataLoading(true);
      try {
        let allData = [];
        let from = 0;
        const step = 1000;
        let hasMore = true;
        
        while (hasMore) {
          const { data, error } = await supabase.from('processos').select('dados').range(from, from + step - 1);
          if (error) throw error;
          
          if (data && data.length > 0) {
            allData = allData.concat(data.map(d => d.dados));
            from += step;
          }
          if (!data || data.length < step) {
            hasMore = false;
          }
        }
        
        if (isMounted) {
          setRawData(allData);
        }

        // Fetch Assignments and Updates for RBAC and Tracking
        try {
          const { data: assignments } = await supabase.from('process_assignments').select('*');
          if (assignments && isMounted) {
             setRawAssignments(assignments);
             const map = {};
             assignments.forEach(a => { map[a.process_id] = a.matricula; });
             setAssignedProcesses(map);
             setOriginalAssignedProcesses(map);
          }
        } catch(e) { console.warn("Tabela process_assignments ausente ou falhou"); }

        try {
          const { data: updates } = await supabase.from('process_updates').select('*');
          if (updates && isMounted) {
             setDbProcessUpdates(updates);
          }
        } catch(e) { console.warn("Tabela process_updates ausente ou falhou"); }

        try {
          const { data: config } = await supabase.from('system_settings').select('value').eq('key', 'cadastro_aberto').single();
          if (config && isMounted) {
             setCadastroAberto(String(config.value) === 'true');
          }
        } catch(e) {}

        try {
          const { data: customConfig } = await supabase.from('system_settings').select('value').eq('key', 'custom_analyzers').single();
          if (customConfig && isMounted && Array.isArray(customConfig.value)) {
             setCustomAnalyzers(customConfig.value);
          }
        } catch(e) {}

      } catch (err) {
        console.error("Erro ao buscar dados do Supabase:", err);
      } finally {
        if (isMounted) setDataLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [session]);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [previousTab, setPreviousTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('gestor');

  useEffect(() => {
    if (session) {
      const matricula = session.user.email.split('@')[0];
      const gestor = matricula === 'gestor' || matricula === '5991332' || session.user.user_metadata?.cargo === 'Gestor';
      if (!gestor) {
        setActiveTab('atividades');
      }
    }
  }, [session]);

  useEffect(() => {
    const handlePopState = (e) => {
      if (activeTab === 'processoDetalhe') {
        setActiveTab(previousTab);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTab, previousTab]);
  const [filterGroup, setFilterGroup] = useState('Todos');
  const [filterTipoFluxo, setFilterTipoFluxo] = useState('Todos');
  const [filterStartYear, setFilterStartYear] = useState('');
  const [filterEndYear, setFilterEndYear] = useState('');
  const [searchAtivos, setSearchAtivos] = useState('');
  const [searchPaeAtivos, setSearchPaeAtivos] = useState('');
  const [searchAposentados, setSearchAposentados] = useState('');
  const [pageProcessos, setPageProcessos] = useState(1);
  const [pageAposentados, setPageAposentados] = useState(1);
  const [filterAtivosDre, setFilterAtivosDre] = useState('Todos');
  const [filterAtivosStatus, setFilterAtivosStatus] = useState('Todos');
  const [filterAposentadosStartYear, setFilterAposentadosStartYear] = useState('');
  const [filterAposentadosEndYear, setFilterAposentadosEndYear] = useState('');
  const [selectedProcess, setSelectedProcess] = useState(null);
  
  const [updateStatus, setUpdateStatus] = useState('');
  const [updatePae, setUpdatePae] = useState('');
  const [updateObs, setUpdateObs] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [selectedAnalyzer, setSelectedAnalyzer] = useState(null);
  const [analyzerSearch, setAnalyzerSearch] = useState('');
  const [analyzerStartDate, setAnalyzerStartDate] = useState('');
  const [analyzerEndDate, setAnalyzerEndDate] = useState('');
  const [productivityStartDate, setProductivityStartDate] = useState('');
  const [productivityEndDate, setProductivityEndDate] = useState('');
  const [quickFilter, setQuickFilter] = useState('Limpos');
  const [distGrupo, setDistGrupo] = useState('Todos');
  const [distStartYear, setDistStartYear] = useState('');
  const [distEndYear, setDistEndYear] = useState('');
  const [assignedProcesses, setAssignedProcesses] = useState({});
  const [originalAssignedProcesses, setOriginalAssignedProcesses] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [rawAssignments, setRawAssignments] = useState([]);
  const [showDistributionHistory, setShowDistributionHistory] = useState(false);
  const [distSelectedProcesses, setDistSelectedProcesses] = useState([]);
  const [distAnalyzerSelect, setDistAnalyzerSelect] = useState('');
  const [autoDistributeSelected, setAutoDistributeSelected] = useState([]);
  const [itemsPerPageProcessos, setItemsPerPageProcessos] = useState(20);
  const [itemsPerPageAposentados, setItemsPerPageAposentados] = useState(20);
  const [infoModalContent, setInfoModalContent] = useState(null);
  const [activeChartContext, setActiveChartContext] = useState('ativos');
  const [dbProcessUpdates, setDbProcessUpdates] = useState([]);
  const [cadastroAberto, setCadastroAberto] = useState(false);
  const [customAnalyzers, setCustomAnalyzers] = useState([]);
  const [newAnalyzerName, setNewAnalyzerName] = useState('');
  const [newAnalyzerMat, setNewAnalyzerMat] = useState('');
  const [newAnalyzerType, setNewAnalyzerType] = useState('Servidor');
  const [editingAnalyzer, setEditingAnalyzer] = useState(null);
  
  const combinedAnalyzers = useMemo(() => {
    const customMatriculas = new Set(customAnalyzers.map(a => a.matricula));
    const activeFiltered = ACTIVE_ANALYZERS.filter(a => !customMatriculas.has(a.matricula));
    return [...activeFiltered, ...customAnalyzers];
  }, [customAnalyzers]);

  const matriculaAtual = session ? session.user.email.split('@')[0] : '';
  const isGestor = matriculaAtual === 'gestor' || matriculaAtual === '5991332' || session?.user?.user_metadata?.cargo === 'Gestor' || customAnalyzers.some(a => a.matricula === matriculaAtual && a.tipo === 'Gestor');
  const isActingAsGestor = isGestor && viewMode === 'gestor';

  const toggleViewMode = () => {
    if (viewMode === 'gestor') {
      setViewMode('analista');
      if (activeTab === 'distribuicao' || activeTab === 'configuracoes') {
        setActiveTab('atividades');
      }
    } else {
      setViewMode('gestor');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (newUserSenha !== newUserConfirmaSenha) {
      setUserCreateMsg({ type: 'error', text: 'As senhas não conferem.' });
      return;
    }
    
    const emailPrincipal = `${newUserMatricula}@seduc.pa.gov.br`;
    
    setUserCreating(true);
    setUserCreateMsg({ type: '', text: '' });
    
    try {
      const { data, error } = await supabaseAdminAuth.auth.signUp({
        email: emailPrincipal,
        password: newUserSenha,
        options: {
          data: {
            nome: newUserNome,
            matricula: newUserMatricula,
            cargo: newUserCargo,
            emailContato: newUserEmail.trim()
          }
        }
      });
      
      if (error) throw error;
      
      const newAnalyzer = {
        name: newUserNome.trim().toUpperCase(),
        matricula: newUserMatricula.trim(),
        tipo: newUserCargo
      };
      const updatedCustom = [...customAnalyzers, newAnalyzer];
      await supabase.from('system_settings').upsert({ key: 'custom_analyzers', value: updatedCustom });
      setCustomAnalyzers(updatedCustom);
      
      setUserCreateMsg({ type: 'success', text: `Usuário ${newUserNome} criado com sucesso!` });
      setNewUserNome('');
      setNewUserMatricula('');
      setNewUserEmail('');
      setNewUserSenha('');
      setNewUserConfirmaSenha('');
      setNewUserCargo('Analisador');
    } catch (err) {
      console.error(err);
      setUserCreateMsg({ type: 'error', text: err.message || 'Erro ao criar usuário.' });
    } finally {
      setUserCreating(false);
    }
  };

  const renderInfoModal = () => {
    if (!infoModalContent) return null;
    return (
      <div className="modal-overlay" onClick={(e) => { e.stopPropagation(); setInfoModalContent(null); }} style={{zIndex: 3000}}>
        <div className="modal-content fade-in" style={{width: 500, padding: 0}} onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{infoModalContent.title}</h2>
            <button onClick={(e) => { e.stopPropagation(); setInfoModalContent(null); }}>×</button>
          </div>
          <div className="modal-body">
            <p style={{fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5}}>{infoModalContent.description}</p>
            {infoModalContent.legends && infoModalContent.legends.length > 0 && (
              <div style={{marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <h3 style={{fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px'}}>Detalhes e Legendas</h3>
                {infoModalContent.legends.map((leg, i) => (
                  <div key={i} style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                    <div style={{width: 12, height: 12, borderRadius: 3, background: leg.color || 'var(--panel-border)', marginTop: 4, flexShrink: 0}}></div>
                    <div>
                      <div style={{fontSize: 14, fontWeight: 600, color: 'var(--text-primary)'}}>{leg.label}</div>
                      {leg.desc && <div style={{fontSize: 13, color: 'var(--text-secondary)', marginTop: 2}}>{leg.desc}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Process and clean data using the new standard fields
  const data = useMemo(() => {
    return rawData.filter(item => {
      let rawAno = String(item.ANO_ENTRADA_PADRAO || 'N/I').trim();
      let yearMatches = rawAno.match(/\b(200[3-9]|201[0-9]|202[0-6])\b/g);
      let ano = yearMatches ? yearMatches[yearMatches.length - 1] : 'N/I';
      
      const fallbackFields = ['Nº PAE', '  Nº PROCESSO PAE', 'PROTOCOLO N°PAE', 'PAE', 'APOSENTADORIA', 'DATA ENTRADA NO AGA', 'DATA DA TRAMITAÇÃO', 'Carimbo de data/hora', 'DATA_PUB_PADRAO', 'DATA', 'DTINI_MNEMONICO', 'DATA DA SAÍDA'];
      if (ano === 'N/I') {
        for (let field of fallbackFields) {
          if (item[field]) {
            let matches = String(item[field]).match(/\b(200[3-9]|201[0-9]|202[0-6])\b/g);
            if (matches) {
              ano = matches[matches.length - 1];
              break;
            }
          }
        }
      }
      if (ano === '1993' || String(item.ANO_ENTRADA_PADRAO).includes('1993') || String(item['Nº PAE']).includes('1993')) {
         return false;
      }
      const anoInt = parseInt(ano);
      if (!isNaN(anoInt) && anoInt < 2003) {
         return false; // Processos mais antigos que 2003 não devem aparecer no Volume Cirúrgico
      }
      const statusCheck = String(item.STATUS_PADRAO || '').toUpperCase();
      if (statusCheck.includes('APOSENTADO')) {
         return false; // Ignorar processos já aposentados no cálculo do passivo ativo cirúrgico
      }
      return true;
    }).map((item, idx) => {
      let rawAno = String(item.ANO_ENTRADA_PADRAO || 'N/I').trim();
      let yearMatches = rawAno.match(/\b(200[3-9]|201[0-9]|202[0-6])\b/g);
      let ano_entrada = yearMatches ? yearMatches[yearMatches.length - 1] : 'N/I';

      const fallbackFields = ['Nº PAE', '  Nº PROCESSO PAE', 'PROTOCOLO N°PAE', 'PAE', 'APOSENTADORIA', 'DATA ENTRADA NO AGA', 'DATA DA TRAMITAÇÃO', 'Carimbo de data/hora', 'DATA_PUB_PADRAO', 'DATA', 'DTINI_MNEMONICO', 'DATA DA SAÍDA'];
      if (ano_entrada === 'N/I') {
        for (let field of fallbackFields) {
          if (item[field]) {
            let matches = String(item[field]).match(/\b(200[3-9]|201[0-9]|202[0-6])\b/g);
            if (matches) {
              ano_entrada = matches[matches.length - 1];
              break;
            }
          }
        }
      }

      let status_normal = String(item.STATUS_PADRAO || 'Falta de Informações');
      if (status_normal === 'nan' || status_normal === 'Não Informado' || status_normal === 'N/I' || status_normal.trim() === '') {
        status_normal = 'Falta de Informações';
      }
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
      if (grupo_funcional === 'DADOS') grupo_funcional = 'AGA. POR INVALIDEZ';
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
      let movDateValid = null;
      if (item['Ultima movimentação'] && item['Ultima movimentação'] !== 'nan' && item['Ultima movimentação'] !== 'N/I') {
         const movDate = new Date(item['Ultima movimentação']);
         if (!isNaN(movDate.getTime())) {
            movDateValid = movDate;
            const now = new Date('2026-06-22T13:58:32-03:00');
            const diffTime = now - movDate;
            if (diffTime > 0) {
              dias_parado = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            }
         }
      }

      let ano_publicacao = 'N/I';
      let rawDatePub = String(item.DATA_PUB_PADRAO || '');
      let pubMatches = rawDatePub.match(/\b(200[3-9]|201[0-9]|202[0-6])\b/g);
      if (pubMatches) {
         ano_publicacao = pubMatches[pubMatches.length - 1];
      } else {
         const fallbackPubFields = ['NUMERO DA PORTARIA', 'STATUS_PADRAO', 'OBSERVAÇÃO', 'OBSERVAÇÕES', 'grupo_funcional', 'arquivo_origem', 'MOTIVO_MNEMONICO'];
         for (let field of fallbackPubFields) {
            if (item[field]) {
               let val = String(item[field]).toLowerCase();
               let matches = val.match(/\b(200[3-9]|201[0-9]|202[0-6])\b/g);
               if (matches) {
                  if (field === 'NUMERO DA PORTARIA' || field === 'arquivo_origem' || val.includes('portaria') || val.includes('publica') || val.includes('arquiva') || val.includes('processo de 20')) {
                     ano_publicacao = matches[matches.length - 1];
                     break;
                  }
               }
            }
         }
      }

      let e = parseInt(ano_entrada);
      let p = parseInt(ano_publicacao);
      if (!isNaN(e) && !isNaN(p) && p < e) {
         // Sanity check: O processo não pode ter entrado DEPOIS de ter sido publicado/concluído.
         // A portaria é a fonte mais forte de verdade do ano. Retroagimos a entrada para o mesmo ano.
         ano_entrada = String(p);
      }

      // Aplica as atualizações do banco de dados sem mutar o objeto original (rawData)
      const paeOrIdx = String(item['Nº PAE'] || idx);
      const update = dbProcessUpdates.find(u => u.process_id === paeOrIdx || u.process_id === String(idx));
      
      let currentPae = item['Nº PAE'];
      let currentObs = item._db_observacao;
      let updatedAt = null;

      if (update) {
         if (update.novo_status) {
            status_normal = update.novo_status;
            status_consolidado = update.novo_status;
         }
         if (update.novo_pae !== undefined) {
            currentPae = update.novo_pae;
         }
         if (update.observacao !== undefined) {
            currentObs = update.observacao;
         }
         if (update.created_at) {
            updatedAt = update.created_at;
         }
      }

      return {
        ...item,
        'Nº PAE': currentPae,
        _db_observacao: currentObs,
        _updated_at: updatedAt,
        _row_id: String(idx),
        _original_key: paeOrIdx,
        status_normal,
        status_consolidado,
        grupo_funcional,
        ano_entrada,
        ano_publicacao,
        dias_parado,
        movDateValid,
        'ESTÁ NO AGA': (String(status_normal).toUpperCase().includes('CONCLUIDO') || 
                        String(status_normal).toUpperCase().includes('PUBLICADO') || 
                        String(status_normal).toUpperCase().includes('ARQUIVADO')) ? 'NÃO (Processo Finalizado/Arquivado)' : item['ESTÁ NO AGA']
      };
    });
  }, [rawData, dbProcessUpdates]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (!isGestor) {
        const keyToUse = item._original_key || String(item['Nº PAE'] || item._row_id);
        const assigned = assignedProcesses[keyToUse];
        if (!assigned || String(assigned).split('-')[0] !== String(matriculaAtual).split('-')[0]) {
           return false;
        }
      }

      const matchGroup = filterGroup === 'Todos' || item.grupo_funcional === filterGroup;
      
      let matchDate = true;
      if (filterStartYear || filterEndYear) {
        let processYear = parseInt(item.ano_entrada);
        
        if (!isNaN(processYear)) {
          if (filterStartYear && processYear < parseInt(filterStartYear)) matchDate = false;
          if (filterEndYear && processYear > parseInt(filterEndYear)) matchDate = false;
        } else {
          matchDate = false; // Sem ano válido não exibe no filtro numérico
        }
      }
      
      return matchGroup && matchDate;
    });
  }, [data, filterGroup, filterStartYear, filterEndYear, session, isGestor, assignedProcesses, matriculaAtual]);

  const metrics = useMemo(() => {
    // 1. Definição de Arquivados e Concluídos
    const concluidoKeywords = ['CONCLUIDO', 'PUBLICADO', 'TRAMITADO AO IGEPPS'];
    const arquivadoKeywords = ['ARQUIVADO'];
    
    const concluidos = filteredData.filter(d => concluidoKeywords.some(k => String(d.status_consolidado).toUpperCase().includes(k)));
    const arquivados = filteredData.filter(d => arquivadoKeywords.some(k => String(d.status_consolidado).toUpperCase().includes(k)));
    
    // 2. Base de Ativos (Todos os processos que não estão concluídos ou arquivados)
    const ativosRaw = filteredData.filter(d => 
      !concluidoKeywords.some(k => String(d.status_consolidado).toUpperCase().includes(k)) &&
      !arquivadoKeywords.some(k => String(d.status_consolidado).toUpperCase().includes(k))
    );

    const igeppsList = [];
    const retornosIgeppsList = [];
    const ativosCapo = []; // Ativos que estão estritamente na CAPO
    const ativosNasDres = []; // Ativos que estão nas DREs/UREs

    ativosRaw.forEach(d => {
      const local = String(d.LOCAL_PADRAO).toUpperCase();
      
      const isIgepps = local.includes('IGEPPS') || local.includes('IGEPPS') || local.includes('IGEPREV');
      const isRetornoIgepps = String(d['Processo retornou do IGEPPS?']).toUpperCase() === 'SIM' || String(d['Processo retornou do IGEPPS?']).toUpperCase() === 'SIM' || String(d['Processo retornou do IGEPREV?']).toUpperCase() === 'SIM';
      const isDre = local.includes('DRE') || local.includes('URE');

      if (isRetornoIgepps) {
        retornosIgeppsList.push(d);
        // Se retornou do IGEPPS, está novamente em posse da CAPO
        ativosCapo.push(d);
      } else if (isIgepps) {
        // Se está no IGEPPS e não retornou
        igeppsList.push(d);
      } else if (isDre) {
        // Processos devolvidos às DREs/UREs para acerto
        ativosNasDres.push(d);
      } else {
        // Processos normais em andamento na CAPO
        ativosCapo.push(d);
      }
    });

    // 3. Volume Cirúrgico (Gargalos: DREs, Parados, Pendências, Adequação)
    // A base para o cirúrgico são os ativos na CAPO + DREs.
    const baseParaCirurgico = [...ativosCapo, ...ativosNasDres];
    
    const cirurgicos = baseParaCirurgico.filter(d => {
       const s = String(d.status_consolidado).toLowerCase();
       const local = String(d.LOCAL_PADRAO).toUpperCase();
       
       if (s.includes('pend') || s.includes('parado') || s.includes('atrasado') || s.includes('adequação')) return true;
       if (s === 'falta de informações' || s === 'não informado' || s.includes('aguard')) return true; 
       if (local.includes('dre') || local.includes('ure')) return true; 
       if (d.dias_parado > 30) return true; // Inatividade também é gargalo
       
       return false;
    });

      const capoSagepList = filteredData.filter(d => {
         const foiIgepps = String(d['Processo foi ao IGEPPS?']).trim().toUpperCase() === 'SIM' || String(d['Processo foi ao IGEPREV?']).trim().toUpperCase() === 'SIM';
         const statusUpper = String(d.status_consolidado).toUpperCase();
         const statusOriginalUpper = String(d.STATUS_PADRAO).toUpperCase();
         const obs = String(d['OBSERVAÇÃO'] || d['OBS'] || d['Qual documentação'] || '').toUpperCase();
         const hasIgepStatus = statusUpper.includes('IGEP') || statusOriginalUpper.includes('IGEP') || (obs.includes('ENCAMINHADO') && obs.includes('IGEP'));
         return foiIgepps || hasIgepStatus;
      });

    return {
      totalAtivosBruto: ativosRaw.length,
      totalAtivosCapo: ativosCapo.length,
      totalCirurgico: cirurgicos.length,
      totalArquivados: arquivados.length + concluidos.length,
      totalIgepps: igeppsList.length,
      totalRetornosIgepps: retornosIgeppsList.length,
      totalCapoSagepTramitados: capoSagepList.length,
      totalPublicados: filteredData.filter(d => String(d.status_consolidado).toUpperCase().includes('PUBLICADO') || String(d.status_consolidado).toUpperCase() === 'CONCLUIDO').length,
      capoSagepList,
      ativosList: ativosRaw,
      ativosLimposList: ativosCapo,
      igeppsList,
      retornosIgeppsList,
      concluidosList: [...concluidos, ...arquivados],
      arquivadosList: arquivados,
      cirurgicosList: cirurgicos,
      ativosNasDresList: ativosNasDres,
      pendenciasList: ativosRaw.filter(d => {
         const s = String(d.status_consolidado).toLowerCase();
         return s.includes('pend') || s.includes('adequação') || s === 'falta de informações';
      })
    };
  }, [filteredData]);

  const timelineData = useMemo(() => {
    const filteredCounts = {};
    // Pré-preenche com todos os anos existentes (inclusive N/I) com valor 0
    filteredData.forEach(d => {
      let year = d.ano_entrada;
      if (!year || year === 'nan') year = 'N/I';
      filteredCounts[year] = 0;
    });

    let targetList = [];
    if (activeChartContext === 'ativos') {
      targetList = metrics.ativosList;
    } else if (activeChartContext === 'igeppes') {
      targetList = metrics.igeppsList;
    } else if (activeChartContext === 'capoSagep') {
      targetList = metrics.capoSagepList || [];
    } else {
      targetList = metrics.cirurgicosList;
    }

    targetList.forEach(d => {
      let year = d.ano_entrada;
      if (!year || year === 'nan') year = 'N/I';
      filteredCounts[year] = (filteredCounts[year] || 0) + 1;
    });
    
    return Object.keys(filteredCounts).sort((a, b) => {
      if (a === 'N/I') return -1;
      if (b === 'N/I') return 1;
      return parseInt(a) - parseInt(b);
    }).map(k => ({ name: k, value: filteredCounts[k] }));
  }, [metrics, filteredData, activeChartContext]);

  const timelineAposentadosData = useMemo(() => {
    const counts = {};
    const targetList = activeChartContext === 'capoSagep' ? (metrics.capoSagepList || []) : metrics.concluidosList;
    
    targetList.forEach(d => {
      let year = d.ano_publicacao || d.ano_entrada || 'N/I';
      counts[year] = (counts[year] || 0) + 1;
    });
    return Object.keys(counts).sort((a, b) => {
      if (a === 'N/I') return -1;
      if (b === 'N/I') return 1;
      return parseInt(a) - parseInt(b);
    }).map(k => ({ name: k, value: counts[k] }));
  }, [metrics.concluidosList, metrics.capoSagepList, activeChartContext]);



  const produtividadeData = useMemo(() => {
    const counts = {};
    
    // Inicializar os analisadores ativos para que todos apareçam, mesmo com 0 processos
    combinedAnalyzers.forEach(a => {
      counts[a.name] = { name: a.name, matricula: a.matricula, tipo: a.tipo || a.cargo || 'Servidor', Distribuidos: 0, Entregues: 0 };
    });

    filteredData.forEach(d => {
      if (productivityStartDate || productivityEndDate) {
        const processDate = d._updated_at ? new Date(d._updated_at) : d.movDateValid ? new Date(d.movDateValid) : null;
        if (!processDate) return;
        if (productivityStartDate && processDate < new Date(productivityStartDate)) return;
        if (productivityEndDate && processDate > new Date(productivityEndDate)) return;
      }
      
      const p_key = d._original_key || String(d['Nº PAE'] || d._row_id);
      const assignedMatricula = assignedProcesses[p_key];
      
      let activeMatch = null;
      
      // Tentar associar pela distribuição interna primeiro
      if (assignedMatricula) {
        const targetMatricula = String(assignedMatricula).split(/[-/]/)[0];
        activeMatch = combinedAnalyzers.find(a => a.matricula && String(a.matricula).startsWith(targetMatricula));
      }
      
      if (!activeMatch) return; // Excluir analisadores que não estão mais na CAPO
      
      counts[activeMatch.name].Distribuidos += 1;
      
      const s = String(d.status_consolidado).toUpperCase();
      if (s.includes('CONCLUIDO') || s.includes('PUBLICADO') || s.includes('ARQUIVADO') || s.includes('TRAMITADO AO IGEPPS')) {
        counts[activeMatch.name].Entregues += 1;
      }
    });
    return Object.values(counts).sort((a,b) => b.Distribuidos - a.Distribuidos);
  }, [filteredData, combinedAnalyzers, assignedProcesses, productivityStartDate, productivityEndDate]);

  const uniqueYears = useMemo(() => {
    const years = [...new Set(data.map(d => String(d.ano_entrada)))].filter(y => y !== 'N/I' && y !== 'nan').sort();
    return ['Todos', ...years];
  }, [data]);

  const uniqueGroups = useMemo(() => {
    const groups = [...new Set(data.map(d => d.grupo_funcional))].filter(Boolean).sort();
    return ['Todos', ...groups];
  }, [data]);

  const availableYears = useMemo(() => {
    const years = [...new Set(data.map(d => String(d.ano_entrada)))]
      .filter(y => y !== 'N/I' && y !== 'nan' && y !== '1993' && y !== 'undefined' && y.trim() !== '')
      .sort((a, b) => parseInt(a) - parseInt(b));
    return years;
  }, [data]);

  const uniqueAtivosDre = useMemo(() => {
    let baseList = metrics.ativosLimposList;
    if (quickFilter === 'Todos') baseList = metrics.ativosList;
    else if (quickFilter === 'IGEPPS') baseList = metrics.igeppsList;
    else if (quickFilter === 'Retornos') baseList = metrics.retornosIgeppsList;
    
    const dres = [...new Set(baseList.map(d => String(d.LOCAL_PADRAO)))].filter(x => x !== 'N/I' && x !== 'nan').sort();
    return ['Todos', ...dres];
  }, [metrics, quickFilter]);

  const uniqueAtivosStatus = useMemo(() => {
    let baseList = metrics.ativosLimposList;
    if (quickFilter === 'Todos') baseList = metrics.ativosList;
    else if (quickFilter === 'IGEPPS') baseList = metrics.igeppsList;
    else if (quickFilter === 'Retornos') baseList = metrics.retornosIgeppsList;

    const statuses = [...new Set(baseList.map(d => String(d.status_consolidado)))].filter(x => x !== 'N/I' && x !== 'nan').sort();
    return ['Todos', ...statuses];
  }, [metrics, quickFilter]);

  const processosAtivosSearch = useMemo(() => {
    let result = metrics.ativosLimposList;
    if (quickFilter === 'Todos') result = metrics.ativosList;
    else if (quickFilter === 'IGEPPS') result = metrics.igeppsList;
    else if (quickFilter === 'Retornos') result = metrics.retornosIgeppsList;
    else if (quickFilter === 'Pendências') result = metrics.pendenciasList;
    else if (quickFilter === 'Arquivados') result = metrics.arquivadosList;

    if (filterTipoFluxo === 'Aposentadorias') {
      result = result.filter(d => String(d.ASSUNTO_PADRAO || '').toLowerCase().includes('aposentadoria') || String(d.grupo_funcional || '').toLowerCase().includes('aposentadoria') || String(d['Nº PAE'] || '').toLowerCase().includes('aposentadoria'));
    } else if (filterTipoFluxo === 'Fluxos Menores') {
      result = result.filter(d => !String(d.ASSUNTO_PADRAO || '').toLowerCase().includes('aposentadoria') && !String(d.grupo_funcional || '').toLowerCase().includes('aposentadoria') && !String(d['Nº PAE'] || '').toLowerCase().includes('aposentadoria'));
    }

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
      const cleanSearch = lowerSearch.replace(/[^\d]/g, '');
      result = result.filter(d => {
        const serv = String(d.SERVIDOR_PADRAO).toLowerCase();
        const mat = String(d.MATRICULA_PADRAO).toLowerCase();
        const cpf = String(d.CPF_PADRAO || '').toLowerCase();
        const pae = String(d['Nº PAE/SIIG'] || d['Nº PROCESSO PAE'] || d['  Nº PROCESSO PAE'] || d['Nº PAE'] || d['N° PAE'] || d['PAE'] || d['PROTOCOLO N°PAE'] || d['PROTOCOLO_PADRAO'] || '').toLowerCase();
        
        let matchPae = false;
        if (cleanSearch) {
          matchPae = pae.replace(/[^\d]/g, '').includes(cleanSearch);
        } else {
          matchPae = pae.includes(lowerSearch);
        }
        
        return serv.includes(lowerSearch) || mat.includes(lowerSearch) || cpf.includes(lowerSearch) || matchPae;
      });
    }
    if (searchPaeAtivos) {
      const lowerPae = searchPaeAtivos.toLowerCase();
      const cleanSearch = lowerPae.replace(/[^\d]/g, '');
      result = result.filter(d => {
        const paeStr = String(d['Nº PAE/SIIG'] || d['Nº PROCESSO PAE'] || d['  Nº PROCESSO PAE'] || d['Nº PAE'] || d['N° PAE'] || d['PAE'] || d['PROTOCOLO N°PAE'] || d['PROTOCOLO_PADRAO'] || '').toLowerCase();
        if (cleanSearch) {
           return paeStr.replace(/[^\d]/g, '').includes(cleanSearch);
        }
        return paeStr.includes(lowerPae);
      });
    }
    return result;
  }, [metrics, quickFilter, searchAtivos, searchPaeAtivos, filterAtivosDre, filterAtivosStatus, filterTipoFluxo]);

  const totalPagesProcessos = Math.ceil(processosAtivosSearch.length / itemsPerPageProcessos);
  const paginatedProcessos = processosAtivosSearch.slice((pageProcessos - 1) * itemsPerPageProcessos, pageProcessos * itemsPerPageProcessos);

  const aposentadosSearch = useMemo(() => {
    let base = metrics.concluidosList;
    if (filterAposentadosStartYear || filterAposentadosEndYear) {
      base = base.filter(d => {
         let pYear = parseInt(d.ano_publicacao);
         if (isNaN(pYear)) return false;
         if (filterAposentadosStartYear && pYear < parseInt(filterAposentadosStartYear)) return false;
         if (filterAposentadosEndYear && pYear > parseInt(filterAposentadosEndYear)) return false;
         return true;
      });
    }
    if (!searchAposentados) return base;
    const lowerSearch = searchAposentados.toLowerCase();
    const cleanSearch = lowerSearch.replace(/[^\d]/g, '');
    return base.filter(d => {
      const serv = String(d.SERVIDOR_PADRAO).toLowerCase();
      const mat = String(d.MATRICULA_PADRAO).toLowerCase();
      const pae = String(d['Nº PAE/SIIG'] || d['Nº PROCESSO PAE'] || d['  Nº PROCESSO PAE'] || d['Nº PAE'] || d['N° PAE'] || d['PAE'] || d['PROTOCOLO N°PAE'] || d['PROTOCOLO_PADRAO'] || '').toLowerCase();
      
      let matchPae = false;
      if (cleanSearch) {
        matchPae = pae.replace(/[^\d]/g, '').includes(cleanSearch);
      } else {
        matchPae = pae.includes(lowerSearch);
      }
      
      return serv.includes(lowerSearch) || mat.includes(lowerSearch) || matchPae;
    });
  }, [metrics.concluidosList, searchAposentados, filterAposentadosStartYear, filterAposentadosEndYear]);

  const totalPagesAposentados = Math.ceil(aposentadosSearch.length / itemsPerPageAposentados);
  const paginatedAposentados = aposentadosSearch.slice((pageAposentados - 1) * itemsPerPageAposentados, pageAposentados * itemsPerPageAposentados);

  const distribuicaoSearch = useMemo(() => {
    let base = metrics.cirurgicosList;
    if (distGrupo !== 'Todos') {
       base = base.filter(d => String(d.grupo_funcional) === distGrupo);
    }
    if (distStartYear || distEndYear) {
      base = base.filter(d => {
         let eYear = parseInt(d.ano_entrada);
         if (isNaN(eYear)) return false;
         if (distStartYear && eYear < parseInt(distStartYear)) return false;
         if (distEndYear && eYear > parseInt(distEndYear)) return false;
         return true;
      });
    }
    return base;
  }, [metrics.cirurgicosList, distGrupo, distStartYear, distEndYear]);

  const minhasAtividades = useMemo(() => {
    return data.filter(p => {
      const assigned = assignedProcesses[p._original_key || p['Nº PAE'] || p._row_id];
      if (!assigned) return false;
      return String(assigned).split('-')[0] === String(matriculaAtual).split('-')[0];
    });
  }, [data, assignedProcesses, matriculaAtual]);

  const distributionAnalyzers = useMemo(() => combinedAnalyzers, [combinedAnalyzers]);

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
    setUpdateStatus(''); // Por padrão, não alterar o status
    setUpdatePae(proc['Nº PAE'] || '');
    setUpdateObs(proc._db_observacao || '');
    setPreviousTab(activeTab);
    setActiveTab('processoDetalhe');
    window.history.pushState({ isModal: true }, '');
  };

  const handleTimelineClick = (data) => {
    if (data && data.activeLabel) {
      setFilterStartYear(String(data.activeLabel));
      setFilterEndYear(String(data.activeLabel));
      setActiveTab('processos');
      setPageProcessos(1);
    }
  };

  const handleTimelineAposentadosClick = (data) => {
    if (data && data.activeLabel) {
      const year = String(data.activeLabel);
      if (filterAposentadosStartYear === year && filterAposentadosEndYear === year) {
        setFilterAposentadosStartYear('');
        setFilterAposentadosEndYear('');
      } else {
        setFilterAposentadosStartYear(year);
        setFilterAposentadosEndYear(year);
        setPageAposentados(1);
      }
    }
  };
  const handleAddAnalyzer = async (e) => {
    e.preventDefault();
    if (!newAnalyzerName.trim() || !newAnalyzerMat.trim()) return;
    
    const newAnalyzer = {
      name: newAnalyzerName.trim().toUpperCase(),
      matricula: newAnalyzerMat.trim(),
      tipo: newAnalyzerType
    };
    
    const updatedCustom = [...customAnalyzers, newAnalyzer];
    
    try {
      const { error } = await supabase.from('system_settings').upsert({ key: 'custom_analyzers', value: updatedCustom });
      if (error) throw error;
      setCustomAnalyzers(updatedCustom);
      setNewAnalyzerName('');
      setNewAnalyzerMat('');
      alert('Servidor adicionado com sucesso!');
    } catch(err) {
      console.error(err);
      alert('Erro ao adicionar servidor. Verifique o banco de dados.');
    }
  };

  const handleUpdateProcess = async (e) => {
    e.preventDefault();
    if (!selectedProcess) return;
    if (!window.confirm("Deseja realmente salvar estas alterações no processo?")) return;
    setIsUpdating(true);
    
    const p_key = String(selectedProcess._original_key || selectedProcess['Nº PAE'] || selectedProcess._row_id);
    const payload = {
       process_id: p_key,
       matricula: matriculaAtual,
       novo_status: updateStatus || selectedProcess.status_consolidado,
       novo_pae: updatePae,
       observacao: updateObs
    };

    try {
       const { error } = await supabase.from('process_updates').upsert(payload);
       if (error) throw error;
       
       setDbProcessUpdates(prev => {
          const arr = prev.filter(u => u.process_id !== p_key);
          return [...arr, payload];
       });
       
       alert('Processo atualizado com sucesso!');
       window.history.back();
    } catch(err) {
       console.error("Erro ao atualizar processo:", err);
       alert("Erro ao atualizar processo. Tente novamente.");
    } finally {
       setIsUpdating(false);
    }
  };

  const handleQuickConclude = async (proc) => {
    if (!window.confirm(`Tem certeza que deseja tramitar o processo ${proc['Nº PAE'] || 'S/N'} para o IGEPPS?`)) return;
    
    setIsUpdating(true);
    const p_key = String(proc._original_key || proc['Nº PAE'] || proc._row_id);
    const payload = {
       process_id: p_key,
       matricula: matriculaAtual,
       novo_status: 'Tramitado ao IGEPPS',
       novo_pae: proc['Nº PAE'] || '',
       observacao: proc._db_observacao || 'Tramitado rapidamente via painel'
    };

    try {
       const { error } = await supabase.from('process_updates').upsert(payload);
       if (error) throw error;
       
       setDbProcessUpdates(prev => {
          const arr = prev.filter(u => u.process_id !== p_key);
          return [...arr, payload];
       });
       
       alert('Processo tramitado com sucesso! Contabilizado na sua produção.');
    } catch(err) {
       console.error("Erro ao concluir processo:", err);
       alert("Erro ao concluir. Tente novamente.");
    } finally {
       setIsUpdating(false);
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
      
      if (String(p['Processo foi ao IGEPPS?']).toUpperCase() === 'SIM' || String(p['Processo foi ao IGEPREV?']).toUpperCase() === 'SIM') {
        events.push({
          title: 'Tramitado ao IGEPPS',
          desc: 'O processo foi encaminhado para análise técnica no IGEPPS.',
          type: 'purple',
          icon: <CornerDownRight size={16} />
        });
      }
      
      if (String(p['Processo retornou do IGEPPS?']).toUpperCase() === 'SIM' || String(p['Processo retornou do IGEPREV?']).toUpperCase() === 'SIM') {
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
      
      const realUpdates = dbProcessUpdates.filter(u => String(u.process_id) === String(p['Nº PAE'] || p._row_id)).sort((a,b) => new Date(a.created_at || a.updated_at) - new Date(b.created_at || b.updated_at));
      
      realUpdates.forEach(update => {
        events.push({
          title: `Atualização: ${update.novo_status || 'Modificação de Dados'}`,
          desc: `Atualizado por ${update.matricula}.\n${update.observacao ? `Observação: ${update.observacao}` : ''}\nData: ${new Date(update.created_at || update.updated_at).toLocaleString('pt-BR')}`,
          type: 'green',
          icon: <History size={16} />
        });
      });
      
      const isConcluido = String(p.status_consolidado).toUpperCase().includes('CONCLUIDO') || String(p.status_consolidado).toUpperCase().includes('ARQUIVADO') || String(p.status_consolidado).toUpperCase().includes('TRAMITADO AO IGEPPS');
      
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
          <button type="button" className="btn-back" onClick={() => window.history.back()}>
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
              {(() => {
                let badgeClass = 'status-badge andamento';
                const s = String(proc.status_consolidado).toLowerCase();
                if (s.includes('pend') || s.includes('adequação') || s === 'falta de informações') badgeClass = 'status-badge pendencia';
                if (s.includes('parado') || s.includes('atrasado') || proc.dias_parado > 30) badgeClass = 'status-badge parado';
                if (s.includes('conclu') || s.includes('publicado') || s.includes('arquivado')) badgeClass = 'status-badge concluido';
                return (
                  <div className={badgeClass} style={{ fontSize: '14px', padding: '8px 16px', marginBottom: '10px' }}>
                    {proc.status_consolidado}
                  </div>
                );
              })()}
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
                
                if (key === 'ano_entrada' && (String(proc.status_consolidado).toLowerCase().includes('conclu') || String(proc.status_consolidado).toLowerCase().includes('arquivado') || String(proc.status_consolidado).toLowerCase().includes('publicado'))) {
                   return null;
                }

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

        <div className="glass-panel" style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px', letterSpacing: '-0.3px' }}>
            Atualizar Processo
          </h3>
          <form onSubmit={handleUpdateProcess} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Status Consolidado</label>
               <select value={updateStatus} onChange={e => setUpdateStatus(e.target.value)}
                 style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}>
                 <option value="">-- Manter status atual --</option>
                 <option value="Falta de Informações">Falta de Informações</option>
                 <option value="Em Análise">Em Análise</option>
                 <option value="Adequação Documental">Adequação Documental</option>
                 <option value="Tramitado ao IGEPPS">Tramitado ao IGEPPS</option>
                 <option value="PUBLICADO (Concluído)">Concluído / Publicado</option>
                 <option value="ARQUIVADO">Arquivado</option>
               </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Nº PAE 4</label>
               <input type="text" value={updatePae} onChange={e => setUpdatePae(e.target.value)}
                 style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                 placeholder="Preencher protocolo" />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Observação / Pendência</label>
               <textarea value={updateObs} onChange={e => setUpdateObs(e.target.value)} rows={3}
                 style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px', resize: 'vertical' }}
                 placeholder="Digite os detalhes do que falta, pendências da escola ou observações adicionais..." />
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '8px' }}>
               <button type="submit" disabled={isUpdating}
                 title="Clique aqui para salvar as alterações do processo no banco de dados."
                 style={{ 
                   background: 'linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 100%)', 
                   color: 'white', border: 'none', padding: '14px 28px', borderRadius: '10px', 
                   fontSize: '15px', fontWeight: 600, cursor: isUpdating ? 'not-allowed' : 'pointer',
                   opacity: isUpdating ? 0.7 : 1, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                 }}>
                 {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
               </button>
               <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'right' }}>
                 Ao clicar em Salvar, o status e as observações serão atualizados para todos.
               </span>
            </div>
          </form>
        </div>

      </div>
    );
  };

  const handleSaveEditedAnalyzer = async (e) => {
    e.preventDefault();
    if (!editingAnalyzer.name.trim() || !editingAnalyzer.matricula.trim()) return;

    let updatedCustom = [...customAnalyzers];
    const existingIndex = updatedCustom.findIndex(a => a.matricula === editingAnalyzer.matricula);
    
    if (existingIndex >= 0) {
      updatedCustom[existingIndex] = editingAnalyzer;
    } else {
      updatedCustom.push(editingAnalyzer);
    }
    
    try {
      const { error } = await supabase.from('system_settings').upsert({ key: 'custom_analyzers', value: updatedCustom });
      if (error) throw error;
      setCustomAnalyzers(updatedCustom);
      setEditingAnalyzer(null);
      alert('Dados do servidor atualizados com sucesso!');
    } catch(err) {
      console.error(err);
      alert('Erro ao atualizar servidor. Verifique o banco de dados.');
    }
  };

  const renderEditAnalyzerModal = () => {
    if (!editingAnalyzer) return null;
    return (
      <div className="modal-overlay" onClick={() => setEditingAnalyzer(null)} style={{zIndex: 3000}}>
        <div className="modal-content fade-in" style={{width: 500, padding: 24}} onClick={e => e.stopPropagation()}>
          <div className="modal-header" style={{ marginBottom: 16 }}>
            <h2 style={{margin: 0}}>Editar Analista</h2>
            <button onClick={() => setEditingAnalyzer(null)}>✕</button>
          </div>
          <form onSubmit={handleSaveEditedAnalyzer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Nome Completo</label>
              <input type="text" required value={editingAnalyzer.name} onChange={e => setEditingAnalyzer({...editingAnalyzer, name: e.target.value.toUpperCase()})}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Matrícula</label>
              <input type="text" required value={editingAnalyzer.matricula} onChange={e => setEditingAnalyzer({...editingAnalyzer, matricula: e.target.value})}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                disabled={true}
                title="A matrícula é a chave e não pode ser alterada."
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Tipo / Cargo</label>
              <select value={editingAnalyzer.tipo} onChange={e => setEditingAnalyzer({...editingAnalyzer, tipo: e.target.value})}
                style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}>
                <option value="Servidor">Servidor</option>
                <option value="Estagiário">Estagiário</option>
                <option value="Analista">Analista</option>
                <option value="Gestor">Gestor</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button type="submit"
                style={{
                  background: 'linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 100%)', 
                  color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', 
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderAnalyzerModal = () => {
    if (!selectedAnalyzer) return null;
    
    const analyzerInfo = combinedAnalyzers.find(a => a.name === selectedAnalyzer);
    
    const baseAnalyzerProcesses = filteredData.filter(d => {
      // 1. Verificar se está na distribuição do sistema
      const p_key = d._original_key || String(d['Nº PAE'] || d._row_id);
      if (assignedProcesses[p_key]) {
         const assignedMat = String(assignedProcesses[p_key]).split(/[-/]/)[0];
         if (analyzerInfo && analyzerInfo.matricula) {
             const baseMat = String(analyzerInfo.matricula).split(/[-/]/)[0];
             if (assignedMat === baseMat) return true;
         }
         return false; // Se foi atribuído a outro via sistema, ignorar o INSTRUTOR_PADRAO
      }
      return false;
    });

    const analyzerProcesses = baseAnalyzerProcesses.filter(d => {
      // Aplicar filtro de texto (PAE, Nome do Servidor, Status)
      if (analyzerSearch) {
        const term = analyzerSearch.toLowerCase();
        const cleanSearch = term.replace(/[^\d]/g, '');
        const serv = String(d.SERVIDOR_PADRAO || '').toLowerCase();
        const pae = String(d['Nº PAE/SIIG'] || d['Nº PROCESSO PAE'] || d['  Nº PROCESSO PAE'] || d['Nº PAE'] || d['N° PAE'] || d['PAE'] || d['PROTOCOLO N°PAE'] || d['PROTOCOLO_PADRAO'] || '').toLowerCase();
        const stat = String(d.status_consolidado || '').toLowerCase();
        
        let matchPae = false;
        if (cleanSearch) {
          matchPae = pae.replace(/[^\d]/g, '').includes(cleanSearch);
        } else {
          matchPae = pae.includes(term);
        }
        
        if (!serv.includes(term) && !matchPae && !stat.includes(term)) return false;
      }

      // Aplicar filtro de período (usa _updated_at se houver, senão tenta o ano_publicacao)
      if (analyzerStartDate || analyzerEndDate) {
        let processDateStr = d._updated_at; // ISO date string from Supabase
        let processDate = null;

        if (processDateStr) {
           processDate = new Date(processDateStr);
        } else if (d.DATA_PUB_PADRAO && String(d.DATA_PUB_PADRAO).trim() !== 'nan') {
           let partes = String(d.DATA_PUB_PADRAO).split('/');
           if(partes.length === 3) {
             processDate = new Date(`${partes[2]}-${partes[1]}-${partes[0]}T12:00:00Z`);
           } else if (d.ano_publicacao !== 'N/I') {
             processDate = new Date(`${d.ano_publicacao}-01-01T12:00:00Z`);
           }
        } else if (d.ano_publicacao !== 'N/I') {
           processDate = new Date(`${d.ano_publicacao}-01-01T12:00:00Z`);
        }

        if (processDate && !isNaN(processDate.getTime())) {
          if (analyzerStartDate) {
            const start = new Date(`${analyzerStartDate}T00:00:00`);
            if (processDate < start) return false;
          }
          if (analyzerEndDate) {
            const end = new Date(`${analyzerEndDate}T23:59:59`);
            if (processDate > end) return false;
          }
        } else {
          return false; // Ignora processos sem data válida no filtro
        }
      }

      return true;
    });
    
    const entregues = analyzerProcesses.filter(d => {
      const s = String(d.status_consolidado).toUpperCase();
      return s.includes('CONCLUIDO') || s.includes('PUBLICADO') || s.includes('ARQUIVADO') || s.includes('TRAMITADO AO IGEPPS');
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
      
      let yOffset = 38;
      if (analyzerStartDate || analyzerEndDate) {
          doc.setFontSize(10);
          const s = analyzerStartDate ? new Date(`${analyzerStartDate}T12:00:00Z`).toLocaleDateString('pt-BR') : 'Início';
          const e = analyzerEndDate ? new Date(`${analyzerEndDate}T12:00:00Z`).toLocaleDateString('pt-BR') : 'Fim';
          doc.text(`Período: ${s} até ${e}`, 14, yOffset);
          yOffset += 6;
      }
      if (analyzerSearch) {
          doc.setFontSize(10);
          doc.text(`Pesquisa: ${analyzerSearch}`, 14, yOffset);
          yOffset += 6;
      }

      doc.setFontSize(12);
      doc.text(`Total Mostrado: ${distribuidos} | Tramitados ao IGEPPS: ${entregues}`, 14, yOffset);
      doc.text(`Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}`, 14, yOffset + 6);

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

      autoTable(doc, {
        startY: yOffset + 12,
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
      { name: 'Tramitados ao IGEPPS', value: entregues, fill: 'var(--success-color)' },
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
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'flex-end', background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
              <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Pesquisar Processo</label>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input 
                    type="text" 
                    placeholder="Busque por PAE, Servidor ou Status..." 
                    value={analyzerSearch}
                    onChange={(e) => setAnalyzerSearch(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 36px', borderRadius: '8px', border: '1px solid var(--panel-border)', fontSize: '14px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Data Inicial</label>
                <input 
                  type="date" 
                  value={analyzerStartDate}
                  onChange={(e) => setAnalyzerStartDate(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--panel-border)', fontSize: '14px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Data Final</label>
                <input 
                  type="date" 
                  value={analyzerEndDate}
                  onChange={(e) => setAnalyzerEndDate(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--panel-border)', fontSize: '14px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => { setAnalyzerSearch(''); setAnalyzerStartDate(''); setAnalyzerEndDate(''); }}
                  style={{ padding: '10px 16px', background: 'white', border: '1px solid var(--panel-border)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Limpar
                </button>
              </div>
            </div>

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
                      <span className="stat-label" style={{ fontSize: 12 }}>Tramitados ao IGEPPS</span>
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
  const handleSaveDistribution = async () => {
    const timestamp = new Date().toISOString();
    const changedAssignments = [];
    Object.keys(assignedProcesses).forEach(process_id => {
       if (assignedProcesses[process_id] !== originalAssignedProcesses[process_id]) {
          changedAssignments.push({
             process_id,
             matricula: assignedProcesses[process_id],
             assigned_at: timestamp
          });
       }
    });

    if (changedAssignments.length === 0) {
       setHasUnsavedChanges(false);
       return;
    }

    try {
      const batchSize = 1000;
      let newRawAssignments = [...rawAssignments];
      for (let i = 0; i < changedAssignments.length; i += batchSize) {
         const batch = changedAssignments.slice(i, i + batchSize);
         const { error } = await supabase.from('process_assignments').upsert(batch);
         if (error) {
            console.error("Erro no batch:", error);
            throw error;
         }
         newRawAssignments = [...newRawAssignments, ...batch];
      }
      
      setRawAssignments(newRawAssignments);
      setOriginalAssignedProcesses(assignedProcesses);
      setHasUnsavedChanges(false);
      alert("Distribuição salva e confirmada com sucesso! Os processos já aparecerão no painel da equipe.");
    } catch(e) {
       console.error("Erro ao salvar atribuições:", e);
       alert("Erro ao salvar a distribuição no banco de dados.");
    }
  };

  const handleDeleteBatch = async (timestamp) => {
    if (!window.confirm("ATENÇÃO: Você está prestes a cancelar a distribuição de TODO ESTE LOTE.\\n\\nIsso removerá os processos da fila dos servidores e eles voltarão para o passivo não-distribuído.\\nDeseja realmente excluir este lote?")) return;
    
    try {
      const { error } = await supabase
        .from('process_assignments')
        .delete()
        .eq('assigned_at', timestamp);
        
      if (error) throw error;
      
      // Update local states
      const filteredRaw = rawAssignments.filter(a => a.assigned_at !== timestamp);
      setRawAssignments(filteredRaw);
      
      const newMap = {};
      filteredRaw.forEach(a => { newMap[a.process_id] = a.matricula; });
      setAssignedProcesses(newMap);
      setOriginalAssignedProcesses(newMap);
      
      alert("Lote de distribuição cancelado com sucesso!");
    } catch(err) {
      console.error("Erro ao excluir lote:", err);
      alert("Erro ao excluir o lote do banco de dados.");
    }
  };

  const handleUndoDistribution = () => {
    setAssignedProcesses(originalAssignedProcesses);
    setHasUnsavedChanges(false);
  };
  const handleAutoDistribute = () => {
    const unassigned = distribuicaoSearch.filter(p => !assignedProcesses[p._original_key || String(p['Nº PAE'] || p._row_id)]);
    if (unassigned.length === 0) {
      alert("Todos os processos deste filtro já estão distribuídos.");
      return;
    }
    
    const activeDistributionAnalyzers = distributionAnalyzers.filter(a => autoDistributeSelected.includes(a.matricula));
    const totalAnalyzers = activeDistributionAnalyzers.length;
    
    if (totalAnalyzers === 0) {
      alert("Selecione pelo menos um servidor nos cards para a distribuição automática.");
      return;
    }
    
    if (!window.confirm(`Tem certeza que deseja distribuir os ${unassigned.length} processos pendentes para os analisadores selecionados?`)) return;
    
    const newAssignments = { ...assignedProcesses };
    const dbPayload = [];
    
    unassigned.forEach((proc, idx) => {
       const analyzerIndex = idx % totalAnalyzers;
       const analyzer = activeDistributionAnalyzers[analyzerIndex];
       const p_key = String(proc._original_key || proc['Nº PAE'] || proc._row_id);
       newAssignments[p_key] = analyzer.matricula;
       
       dbPayload.push({ process_id: p_key, matricula: analyzer.matricula });
    });
    
    setAssignedProcesses(newAssignments);
    setDistSelectedProcesses([]);
    setHasUnsavedChanges(true);
  };

  const handleDistributeByName = () => {
    const unassigned = distribuicaoSearch.filter(p => !assignedProcesses[p._original_key || String(p['Nº PAE'] || p._row_id)]);
    if (unassigned.length === 0) {
      alert("Todos os processos deste filtro já estão distribuídos.");
      return;
    }
    
    const activeDistributionAnalyzers = distributionAnalyzers.filter(a => autoDistributeSelected.includes(a.matricula));
    if (activeDistributionAnalyzers.length === 0) {
      alert("Selecione pelo menos um servidor nos cards para a distribuição por nome.");
      return;
    }
    
    if (!window.confirm(`Tem certeza que deseja tentar distribuir os ${unassigned.length} processos baseando-se no nome do analista presente no histórico do processo?`)) return;
    
    const newAssignments = { ...assignedProcesses };
    let matchCount = 0;
    
    unassigned.forEach((proc) => {
       const p_key = String(proc._original_key || proc['Nº PAE'] || proc._row_id);
       
       // Cria um texto com todos os valores do processo, ignorando os campos do servidor requerente
       let procText = '';
       Object.keys(proc).forEach(k => {
           if (!['SERVIDOR_PADRAO', 'NOME DO SERVIDOR', 'CPF', 'SERVIDOR'].includes(k)) {
               procText += ' ' + String(proc[k]).toLowerCase();
           }
       });

       let matchedAnalyzer = null;
       for (let analyzer of activeDistributionAnalyzers) {
           const names = analyzer.name.split(' ');
           const firstName = names[0].toLowerCase();
           const firstTwoNames = names.length > 1 ? `${names[0]} ${names[1]}`.toLowerCase() : firstName;
           
           // Evita falsos positivos verificando o primeiro nome como palavra isolada ou os dois primeiros nomes
           const regex = new RegExp(`\\b${firstName}\\b`, 'i');
           if (procText.includes(firstTwoNames) || regex.test(procText)) {
               matchedAnalyzer = analyzer;
               break; // Atribui ao primeiro analista que der match
           }
       }
       
       if (matchedAnalyzer) {
           newAssignments[p_key] = matchedAnalyzer.matricula;
           matchCount++;
       }
    });
    
    if (matchCount === 0) {
        alert("Nenhum processo pôde ser distribuído pelo nome (não foram encontrados nomes dos analistas na base dos processos pendentes).");
        return;
    }
    
    setAssignedProcesses(newAssignments);
    setDistSelectedProcesses([]);
    setHasUnsavedChanges(true);
    alert(`${matchCount} processos foram distribuídos automaticamente pelo nome do analista! Lembre-se de clicar em "Salvar Distribuição" para persistir.`);
  };

  const handleManualDistribute = () => {
    if (!distAnalyzerSelect) {
      alert("Selecione um analisador primeiro.");
      return;
    }
    if (distSelectedProcesses.length === 0) {
      alert("Selecione pelo menos um processo.");
      return;
    }
    
    const newAssignments = { ...assignedProcesses };
    const dbPayload = [];
    
    distSelectedProcesses.forEach(id => {
       newAssignments[id] = distAnalyzerSelect;
       dbPayload.push({ process_id: id, matricula: distAnalyzerSelect });
    });
    
    setAssignedProcesses(newAssignments);
    setDistSelectedProcesses([]);
    setHasUnsavedChanges(true);
  };

  const toggleDistProcessSelection = (id) => {
    setDistSelectedProcesses(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };
  
  const toggleAllDistProcessSelection = () => {
    if (distSelectedProcesses.length === distribuicaoSearch.length) {
      setDistSelectedProcesses([]);
    } else {
      setDistSelectedProcesses(distribuicaoSearch.map(p => String(p['Nº PAE'] || p._row_id)));
    }
  };

  const generateDistributionPDF = () => {
    if (!window.confirm("Deseja gerar o PDF com as fichas de distribuição atuais?")) return;
    const doc = new jsPDF('p', 'mm', 'a4');
    let firstPage = true;
    
    distributionAnalyzers.forEach(analyzer => {
      const analyzerProcs = distribuicaoSearch.filter(p => assignedProcesses[p._original_key || String(p['Nº PAE'] || p._row_id)] === analyzer.matricula);
      if (analyzerProcs.length === 0) return;
      
      if (!firstPage) {
         doc.addPage();
      }
      firstPage = false;
      
      doc.setFillColor(245, 245, 247);
      doc.rect(0, 0, 210, 40, 'F');
      
      // Images (proportional sizes)
      // Brasão (left) - adjusted for better aspect ratio
      doc.addImage(brasaoGreyLogo, 'PNG', 14, 6, 26, 26);
      
      // SEDUC Logo (right) - adjusted for better aspect ratio
      doc.addImage(seducLogo, 'PNG', 150, 10, 46, 16);
      
      doc.setTextColor(28, 28, 30);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("SISTEMA CAPO GESTÃO", 105, 18, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text("Governo do Estado do Pará - SEDUC", 105, 33, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Ficha de Distribuição - Analisador(a): ${analyzer.name}`, 14, 45);
      
      doc.setFontSize(10);
      doc.text(`Total Alocado: ${analyzerProcs.length}`, 196, 45, { align: 'right' });
      
      const tableData = analyzerProcs.map(p => [
         p.SERVIDOR_PADRAO || 'N/I',
         p.CPF || 'N/I',
         p['Nº PAE'] || p['  Nº PROCESSO PAE'] || p.PROTOCOLO_PADRAO || 'N/I',
         p.ano_entrada || 'N/I',
         p.grupo_funcional || 'N/I',
         p['LOCALIZAÇÃO DO PROCESSO'] || p.LOCAL_PADRAO || 'N/I'
      ]);
      
      autoTable(doc, {
        startY: 50,
        head: [['Nome do Interessado', 'CPF', 'Protocolo/PAE', 'Ano', 'Grupo', 'Localização']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [110, 110, 110] }, // Cinza elegante
        styles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 25 },
          2: { cellWidth: 35 }
        }
      });
    });
    
    if (firstPage) {
      alert("Nenhum processo foi distribuído nesta lista de filtros!");
      return;
    }
    
    doc.save(`Ficha_Distribuicao_Passivo_${new Date().toISOString().split('T')[0]}.pdf`);
  };


  if (!session) {
    return <Login onLogin={setSession} />;
  }

  if (dataLoading) {
    const BackgroundIconRight = [Landmark, FileText, PieChart, Users, Building][loadingMessageIndex % 5];
    const BackgroundIconLeft = [FileText, PieChart, Users, Building, Landmark][loadingMessageIndex % 5];
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--background-color)', color: 'var(--text-secondary)', position: 'relative', overflow: 'hidden'}}>
        
        {/* Animated Background Icon Right */}
        <div key={`bg-r-${loadingMessageIndex}`} className="fade-in-out-bg" style={{ 
          position: 'absolute', 
          right: '-5%', 
          top: '50%', 
          marginTop: '-400px',
          opacity: 0, 
          transform: 'rotate(-10deg)', 
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <BackgroundIconRight size={800} color="#1c1c1e" strokeWidth={1} />
        </div>

        {/* Animated Background Icon Left */}
        <div key={`bg-l-${loadingMessageIndex}`} className="fade-in-out-bg" style={{ 
          position: 'absolute', 
          left: '-5%', 
          top: '50%', 
          marginTop: '-400px',
          opacity: 0, 
          transform: 'rotate(10deg)', 
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <BackgroundIconLeft size={800} color="#1c1c1e" strokeWidth={1} />
        </div>

        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{marginBottom: '24px', color: '#1c1c1e'}} className="pulse-anim"><Clock size={48} /></div>
          <h2 style={{fontSize: '20px', color: 'var(--text-primary)', marginBottom: '12px'}}>Carregando Base de Dados...</h2>
          <div style={{height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p key={loadingMessageIndex} className="fade-message" style={{fontSize: '14px', fontWeight: 500, color: '#1c1c1e'}}>
              {loadingMessages[loadingMessageIndex]}
            </p>
          </div>
        </div>
      </div>
    );
  }

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
              <img src={brasaoGreyLogo} alt="Brasão do Governo" style={{ height: '22px', width: 'auto', objectFit: 'contain' }} />
              <div style={{ height: '18px', width: '1px', background: '#d2d2d7' }}></div>
              <img src="/logo.png" alt="SIRA" style={{ height: '22px', width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
        
        <nav className="nav-menu">
          <div className="nav-section-title" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', paddingLeft: '12px', marginTop: '8px' }}>Espaço de Trabalho</div>
          <a href="#" className={`nav-item ${activeTab === 'atividades' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('atividades'); }}><Edit3 size={20} /> Caixa de Entrada</a>
          <a href="#" className={`nav-item ${activeTab === 'planilhao' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('planilhao'); }}><Table size={20} /> Planilhão Geral</a>
          
          <div style={{ height: '1px', background: 'var(--panel-border)', margin: '16px 0' }}></div>
          
          <div className="nav-section-title" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', paddingLeft: '12px' }}>Indicadores Analíticos</div>
          <a href="#" className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); setActiveChartContext('ativos'); }}><LayoutDashboard size={20} /> Dashboard Geral</a>
          <a href="#" className={`nav-item ${activeTab === 'producao' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('producao'); }}><TrendingUp size={20} /> Analistas e Produtividade</a>
          <a href="#" className={`nav-item ${activeTab === 'processos' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('processos'); setActiveChartContext('ativos'); }}><FileText size={20} /> Processos Ativos</a>
          <a href="#" className={`nav-item ${activeTab === 'aposentados' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('aposentados'); setActiveChartContext('concluidos'); }}><Archive size={20} style={{ minWidth: 20 }} /> Arquivados & Tramitados</a>
          
          <div style={{ height: '1px', background: 'var(--panel-border)', margin: '16px 0' }}></div>

          {isActingAsGestor && (
            <>
              <div className="nav-section-title" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', paddingLeft: '12px' }}>Administração</div>
              <a href="#" className={`nav-item ${activeTab === 'distribuicao' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('distribuicao'); }}><Folder size={20} /> Distribuição de Passivo</a>
              <a href="#" className={`nav-item ${activeTab === 'configuracoes' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('configuracoes'); }}><Settings size={20} /> Configurações</a>
            </>
          )}
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-title">VISÃO GERAL DE PROCESSOS - CAPO</div>
          <div className="header-actions">
            {isGestor && (
              <div className="role-toggle-container" onClick={toggleViewMode} title="Alternar visão entre Gestor e Analista">
                <div className={`role-option ${viewMode === 'gestor' ? 'active' : ''}`}>Gestor</div>
                <div className={`role-option ${viewMode === 'analista' ? 'active' : ''}`}>Analista</div>
              </div>
            )}
            <Bell size={20} color="var(--text-secondary)" />
            <div className="user-profile">
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-color)', 
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontWeight: 600, fontSize: '14px'
              }}>
                {(session?.user?.user_metadata?.nome || session?.user?.email || 'U')[0].toUpperCase()}
              </div>
              <div className="user-info" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span className="user-name" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{session?.user?.user_metadata?.nome || session?.user?.email || 'Usuário'}</span>
                <span className="user-role" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{session?.user?.user_metadata?.cargo || 'Analisador'}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-container fade-in" key={activeTab}>
          
          {(activeTab === 'dashboard' || activeTab === 'producao' || activeTab === 'processos' || activeTab === 'aposentados') && activeTab !== 'processoDetalhe' && (
            <div className="filter-bar" style={{ display: (activeTab === 'dashboard' || activeTab === 'producao') ? 'flex' : 'none', gap: '16px', alignItems: 'center' }}>
              <select 
                className="filter-select" 
                value={filterGroup} 
                onChange={e => setFilterGroup(e.target.value)}
              >
                {uniqueGroups.map(g => <option key={g} value={g}>{g === 'Todos' ? 'Todos os Grupos' : g}</option>)}
              </select>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600}}>Ano Inicial:</span>
                <select 
                  className="filter-select" 
                  value={filterStartYear} 
                  onChange={e => setFilterStartYear(e.target.value)}
                  style={{ minWidth: '150px' }}
                >
                  <option value="">Selecione</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600}}>Ano Final:</span>
                <select 
                  className="filter-select" 
                  value={filterEndYear} 
                  onChange={e => setFilterEndYear(e.target.value)}
                  style={{ minWidth: '150px' }}
                >
                  <option value="">Selecione</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <Info size={16} color="var(--text-secondary)" style={{cursor: 'pointer', marginLeft: '8px'}} onClick={(e) => {
                  e.stopPropagation();
                  setInfoModalContent({
                    title: 'Como os indicadores são calculados?',
                    description: 'O sistema utiliza regras específicas para classificar o momento de cada processo:',
                    legends: [
                      { color: 'var(--accent-color)', label: 'Ativos (Em andamento)', desc: 'Processos em trâmite normal. Inclui todo processo que não esteja concluído nem arquivado.' },
                      { color: 'var(--warning-color)', label: 'Volume Cirúrgico', desc: 'Subconjunto crítico. Reúne processos com qualquer tipo de pendência, atraso, adequação ou inativos por mais de 30 dias.' },
                      { color: 'var(--success-color)', label: 'Arquivados & Tramitados ao IGEPPS', desc: 'Processos finalizados (publicados, cancelados, extintos). Eles NUNCA se misturam com os Ativos.' }
                    ]
                  });
                }} />
              </div>
            </div>
          )}

          {activeTab === 'processoDetalhe' && renderProcessDetails()}
          {renderEditAnalyzerModal()}

          {activeTab === 'dashboard' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div 
                  className="glass-panel stat-card" 
                  style={{cursor: 'pointer', background: 'linear-gradient(135deg, var(--accent-color) 0%, #005bb5 100%)', color: '#fff', border: 'none', padding: '36px', boxShadow: '0 12px 32px rgba(0, 122, 255, 0.2)', position: 'relative', overflow: 'hidden'}} 
                  onClick={() => {
                    setQuickFilter('Todos');
                    setFilterAtivosDre('Todos');
                    setFilterAtivosStatus('Todos');
                    setSearchAtivos('');
                    setPageProcessos(1);
                    setActiveTab('processos');
                    setActiveChartContext('ativos');
                  }}
                >
                  <div style={{ position: 'absolute', top: '15%', right: '5%', opacity: 0.15, transform: 'scale(1.5)' }}>
                    <FileText size={80} color="#fff" />
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px', fontWeight: 600, opacity: 0.9 }}>
                      <FileText size={28} color="#fff" />
                      Total de processos ativos da capo
                    </div>
                    <span style={{ fontSize: '56px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1 }}>{metrics.totalAtivosBruto.toLocaleString('pt-BR')}</span>
                    <span style={{ fontSize: '15px', opacity: 0.85, marginTop: '8px', lineHeight: 1.4 }}>
                      Volume total de processos abertos na Coordenação de Aposentadoria (Sede + DREs). Clique no painel para explorar a base completa.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div 
                    className="glass-panel stat-card" 
                    style={{cursor: 'pointer', background: 'linear-gradient(135deg, #34c759 0%, #248a3d 100%)', color: '#fff', border: 'none', padding: '24px', flex: 1, alignItems: 'center', display: 'flex', gap: '20px', boxShadow: '0 8px 24px rgba(52, 199, 89, 0.2)', position: 'relative', overflow: 'hidden'}}
                    onClick={() => {
                      setQuickFilter('IGEPPS');
                      setFilterAtivosDre('Todos');
                      setFilterAtivosStatus('Todos');
                      setSearchAtivos('');
                      setPageProcessos(1);
                      setActiveTab('processos');
                      setActiveChartContext('igeppes');
                    }}
                  >
                    <div style={{ position: 'absolute', top: '15%', right: '5%', opacity: 0.15, transform: 'scale(1.5)' }}>
                      <Building size={80} color="#fff" />
                    </div>
                    <div className="stat-icon green" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}><Building /></div>
                    <div className="stat-details">
                      <span className="stat-value" style={{ fontSize: '28px', color: '#fff' }}>{metrics.totalIgepps.toLocaleString('pt-BR')}</span>
                      <span className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', fontWeight: 600 }}>IGEPPS (Em Análise)</span>
                    </div>
                  </div>

                  <div 
                    className="glass-panel stat-card" 
                    style={{cursor: 'pointer', background: 'linear-gradient(135deg, #32ade6 0%, #1c7bad 100%)', color: '#fff', border: 'none', padding: '24px', flex: 1, alignItems: 'center', display: 'flex', gap: '20px', boxShadow: '0 8px 24px rgba(50, 173, 230, 0.2)', position: 'relative', overflow: 'hidden'}}
                    onClick={() => {
                      setActiveTab('aposentados');
                      setActiveChartContext('capoSagep');
                    }}
                  >
                    <div style={{ position: 'absolute', top: '15%', right: '5%', opacity: 0.15, transform: 'scale(1.5)' }}>
                      <Archive size={80} color="#fff" />
                    </div>
                    <div className="stat-icon cyan" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}><Archive /></div>
                    <div className="stat-details">
                      <span className="stat-value" style={{ fontSize: '28px', color: '#fff' }}>{metrics.totalCapoSagepTramitados.toLocaleString('pt-BR')}</span>
                      <span className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', fontWeight: 600 }}>CAPO/SAGEP (Processos já tramitados ao IGEPPS)</span>
                    </div>
                  </div>

                  <div 
                    className="glass-panel stat-card" 
                    style={{cursor: 'pointer', background: 'linear-gradient(135deg, #af52de 0%, #7622a8 100%)', color: '#fff', border: 'none', padding: '24px', flex: 1, alignItems: 'center', display: 'flex', gap: '20px', boxShadow: '0 8px 24px rgba(175, 82, 222, 0.2)', position: 'relative', overflow: 'hidden'}}
                    onClick={() => {
                      setActiveTab('aposentados');
                      setActiveChartContext('concluidos');
                    }}
                  >
                    <div style={{ position: 'absolute', top: '15%', right: '5%', opacity: 0.15, transform: 'scale(1.5)' }}>
                      <CheckCircle2 size={80} color="#fff" />
                    </div>
                    <div className="stat-icon purple" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}><CheckCircle2 /></div>
                    <div className="stat-details">
                      <span className="stat-value" style={{ fontSize: '28px', color: '#fff' }}>{metrics.totalPublicados.toLocaleString('pt-BR')}</span>
                      <span className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', fontWeight: 600 }}>Publicados (Finalizados pelo IGEPPS)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                <div className="glass-panel">
                  <div className="chart-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Série Histórica: {
                      activeChartContext === 'ativos' ? 'Total de Ativos da SEDUC' :
                      activeChartContext === 'igeppes' ? 'IGEPPS (Em Análise)' :
                      activeChartContext === 'capoSagep' ? 'CAPO/SAGEP (Tramitados)' :
                      'Volume Cirúrgico'
                    }
                    <Info size={16} color="var(--text-secondary)" style={{cursor: 'pointer'}} onClick={(e) => {
                      e.stopPropagation();
                      setInfoModalContent({
                        title: 'Série Histórica',
                        description: 'Visão cronológica estrita dos processos do indicador selecionado.',
                        legends: [
                          { color: 'var(--accent-color)', label: 'Eixo X (Anos)', desc: 'Ano de entrada do processo.' },
                          { color: 'var(--text-primary)', label: 'Eixo Y (Volume)', desc: 'Soma total exclusiva dos processos daquele ano, no indicador atual.' },
                          { color: 'var(--panel-border)', label: 'Interatividade', desc: 'Você pode clicar em um ano no gráfico para filtrar todo o painel.' }
                        ]
                      });
                    }} />
                  </div>
                  <div className="chart-description">
                    Este gráfico soma <strong>EXCLUSIVAMENTE</strong> os processos do indicador <strong>{
                      activeChartContext === 'ativos' ? 'Ativos da SEDUC' :
                      activeChartContext === 'igeppes' ? 'IGEPPS' :
                      activeChartContext === 'capoSagep' ? 'CAPO/SAGEP' :
                      'Volume Cirúrgico'
                    }</strong> agrupados por ano de entrada. 
                    Clique em um ano na linha do tempo para filtrar e visualizar os processos correspondentes.
                  </div>
                  <div style={{ width: '100%', height: 380, marginTop: '20px' }}>
                    <ResponsiveContainer>
                      <AreaChart data={timelineData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }} onClick={handleTimelineClick} style={{cursor: 'pointer'}}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={activeChartContext === 'ativos' ? 'var(--accent-color)' : activeChartContext === 'igeppes' ? 'var(--success-color)' : activeChartContext === 'capoSagep' ? 'rgb(50, 173, 230)' : 'var(--danger-color)'} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={activeChartContext === 'ativos' ? 'var(--accent-color)' : activeChartContext === 'igeppes' ? 'var(--success-color)' : activeChartContext === 'capoSagep' ? 'rgb(50, 173, 230)' : 'var(--danger-color)'} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" vertical={false} />
                        <XAxis dataKey="name" stroke="#86868b" fontSize={13} tickMargin={10} />
                        <YAxis stroke="#86868b" fontSize={13} tickMargin={10} />
                        <Tooltip cursor={{stroke: 'rgba(0,0,0,0.05)', strokeWidth: 2}} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e5ea', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontFamily: 'var(--font-main)' }} />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={activeChartContext === 'ativos' ? 'var(--accent-color)' : activeChartContext === 'igeppes' ? 'var(--success-color)' : activeChartContext === 'capoSagep' ? 'rgb(50, 173, 230)' : 'var(--danger-color)'} 
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                          strokeWidth={3} 
                          activeDot={{ r: 8, fill: '#fff', stroke: activeChartContext === 'ativos' ? 'var(--accent-color)' : activeChartContext === 'igeppes' ? 'var(--success-color)' : activeChartContext === 'capoSagep' ? 'rgb(50, 173, 230)' : 'var(--danger-color)', strokeWidth: 2 }} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'producao' && (
            <>
              {isGestor && (
                <div className="glass-panel fade-in" style={{ marginBottom: '24px' }}>
                  <div className="chart-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Adicionar Servidor / Estagiário
                  </div>
                  <p className="chart-description">Adicione um novo membro à equipe para distribuir processos a ele.</p>
                  <form onSubmit={handleAddAnalyzer} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end', marginTop: '16px' }}>
                    <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Nome Completo</label>
                      <input type="text" required value={newAnalyzerName} onChange={e => setNewAnalyzerName(e.target.value)}
                        style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                        placeholder="Ex: MARIA JOAQUINA" />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Matrícula</label>
                      <input type="text" required value={newAnalyzerMat} onChange={e => setNewAnalyzerMat(e.target.value)}
                        style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                        placeholder="Ex: 1234567" />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Tipo</label>
                      <select value={newAnalyzerType} onChange={e => setNewAnalyzerType(e.target.value)}
                        style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}>
                        <option value="Servidor">Servidor</option>
                        <option value="Estagiário">Estagiário</option>
                        <option value="Analista">Analista</option>
                        <option value="Gestor">Gestor</option>
                      </select>
                    </div>
                    <button type="submit"
                      style={{
                        background: 'linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 100%)', 
                        color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', 
                        fontSize: '14px', fontWeight: 600, cursor: 'pointer', height: '45px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                      Adicionar
                    </button>
                  </form>
                </div>
              )}

              <div className="glass-panel table-container fade-in">
                <div className="chart-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Lista Detalhada de Analisadores
                  <Info size={16} color="var(--text-secondary)" style={{cursor: 'pointer'}} onClick={(e) => {
                    e.stopPropagation();
                    setInfoModalContent({
                      title: 'Lista Detalhada de Analisadores',
                      description: 'Métrica de produtividade individual por analisador na coordenação.',
                      legends: [
                        { color: 'var(--text-primary)', label: 'Total Distribuído', desc: 'Soma de todos os processos que em algum momento foram direcionados ou estão em posse do analisador.' },
                        { color: 'var(--success-color)', label: 'Total Tramitado ao IGEPPS', desc: 'Processos que o analisador finalizou (ex: status Tramitado ao IGEPPS, Publicado ou Arquivado).' },
                        { color: 'var(--success-color)', label: 'Taxa de Tramitação', desc: 'O percentual de conclusão baseado na relação entre distribuídos e tramitados.' }
                      ]
                    });
                  }} />
                </div>
                <div style={{display: 'flex', gap: '16px', margin: '16px 0', flexWrap: 'wrap'}}>
                  <div>
                    <label style={{fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px'}}>Filtrar Produtividade (Data Início)</label>
                    <input type="date" className="filter-select" value={productivityStartDate} onChange={e => setProductivityStartDate(e.target.value)} />
                  </div>
                  <div>
                    <label style={{fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px'}}>Filtrar Produtividade (Data Fim)</label>
                    <input type="date" className="filter-select" value={productivityEndDate} onChange={e => setProductivityEndDate(e.target.value)} />
                  </div>
                </div>
                <div className="chart-description">Clique sobre um analisador para abrir o seu histórico de processos e emitir o relatório em PDF.</div>
                
                <table className="data-table" style={{ marginTop: '16px' }}>
                  <thead>
                    <tr>
                      <th>Nome do Analisador</th>
                      <th>Matrícula</th>
                      <th>Tipo / Cargo</th>
                      <th>Total Distribuído</th>
                      <th>Total Tramitado ao IGEPPS</th>
                      <th>Progresso / Taxa de Tramitação</th>
                      {isGestor && <th>Ações</th>}
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
                          <td style={{color: 'var(--text-secondary)', fontSize: '14px'}}>
                            {analisador.matricula || 'N/I'}
                          </td>
                          <td>
                            <span style={{
                              padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                              background: analisador.tipo === 'Estagiário' ? 'rgba(52, 199, 89, 0.1)' : 'rgba(0, 122, 255, 0.1)',
                              color: analisador.tipo === 'Estagiário' ? 'var(--success-color)' : '#007aff'
                            }}>
                              {analisador.tipo || 'Servidor'}
                            </span>
                          </td>
                          <td style={{fontWeight: 500, color: 'var(--text-secondary)'}}>{analisador.Distribuidos} processos</td>
                          <td style={{fontWeight: 500, color: 'var(--success-color)'}}>{analisador.Entregues} tramitados</td>
                          <td>
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                              <div style={{width: '120px', height: '8px', background: '#e5e5ea', borderRadius: '4px'}}>
                                <div style={{width: `${Math.min(perc, 100)}%`, height: '100%', background: 'var(--success-color)', borderRadius: '4px'}}></div>
                              </div>
                              <span style={{fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)'}}>{perc}%</span>
                            </div>
                          </td>
                          {isGestor && (
                            <td>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingAnalyzer(analisador);
                                }}
                                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--panel-border)', background: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}
                              >
                                Editar
                              </button>
                            </td>
                          )}
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
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                <div className="chart-header" style={{marginBottom: 0}}>
                  Processos: {quickFilter === 'Limpos' ? 'Ativos CAPO' : quickFilter === 'IGEPPS' ? 'Enviados IGEPPS' : quickFilter === 'Retornos' ? 'Retornaram do IGEPPS' : quickFilter === 'Pendências' ? 'Pendências' : quickFilter === 'Arquivados' ? 'Arquivados' : 'Todos'}
                </div>
                
                <div className="quick-filters" style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                  <button className={`btn-quick-filter ${quickFilter === 'Limpos' ? 'active' : ''}`} onClick={() => { setQuickFilter('Limpos'); setPageProcessos(1); }}>Ativos CAPO</button>
                  <button className={`btn-quick-filter ${quickFilter === 'IGEPPS' ? 'active' : ''}`} onClick={() => { setQuickFilter('IGEPPS'); setPageProcessos(1); }}>Enviados IGEPPS</button>
                  <button className={`btn-quick-filter ${quickFilter === 'Retornos' ? 'active' : ''}`} onClick={() => { setQuickFilter('Retornos'); setPageProcessos(1); }}>Retornos IGEPPS</button>
                  <button className={`btn-quick-filter ${quickFilter === 'Pendências' ? 'active' : ''}`} onClick={() => { setQuickFilter('Pendências'); setPageProcessos(1); }} style={{borderColor: 'var(--warning-color)', color: quickFilter === 'Pendências' ? '#fff' : 'var(--warning-color)', backgroundColor: quickFilter === 'Pendências' ? 'var(--warning-color)' : 'transparent'}}>Pendências</button>
                  <button className={`btn-quick-filter ${quickFilter === 'Arquivados' ? 'active' : ''}`} onClick={() => { setQuickFilter('Arquivados'); setPageProcessos(1); }} style={{borderColor: 'var(--border-color)', color: quickFilter === 'Arquivados' ? '#fff' : 'var(--text-secondary)', backgroundColor: quickFilter === 'Arquivados' ? 'var(--text-secondary)' : 'transparent'}}>Arquivados</button>
                  <button className={`btn-quick-filter ${quickFilter === 'Todos' ? 'active' : ''}`} onClick={() => { setQuickFilter('Todos'); setPageProcessos(1); }}>Ver Todos</button>
                </div>
              </div>

              <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '24px'}}>
                  <select 
                    className="filter-select" 
                    value={filterTipoFluxo} 
                    onChange={e => { setFilterTipoFluxo(e.target.value); setPageProcessos(1); }}
                    style={{maxWidth: '220px'}}
                  >
                    <option value="Todos">Todos os Fluxos</option>
                    <option value="Aposentadorias">Apenas Aposentadorias</option>
                    <option value="Fluxos Menores">Fluxos Menores</option>
                  </select>
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
                  
                  <div className="search-wrapper" style={{width: 'auto'}}>
                    <Search size={18} color="var(--text-secondary)" />
                    <input 
                      type="text" 
                      className="search-input" 
                      placeholder="Nº Processo..." 
                      value={searchPaeAtivos}
                      onChange={e => {
                        let val = e.target.value.replace(/\//g, '');
                        if (val.length > 4) val = val.substring(0, 4) + '/' + val.substring(4);
                        setSearchPaeAtivos(val);
                        setPageProcessos(1);
                      }}
                      style={{width: '130px'}}
                    />
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
                    if (s.includes('pend') || s.includes('adequação') || s === 'falta de informações') badgeClass = 'status-badge pendencia';
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
                            {(String(proc.status_normal).toLowerCase().includes('óbito') || String(proc.status_normal).toLowerCase().includes('obito') || String(proc.status_normal).toLowerCase().includes('falecid') || String(proc._db_observacao || '').toLowerCase().includes('óbito') || String(proc._db_observacao || '').toLowerCase().includes('obito') || String(proc._db_observacao || '').toLowerCase().includes('falecid')) && (
                              <div style={{display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffebee', color: '#c62828', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', width: 'fit-content'}}>
                                ⚠ Possível Óbito
                              </div>
                            )}
                          </div>
                        </td>
                        <td>{proc.INSTRUTOR_PADRAO}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Exibir:</span>
                  <select 
                    className="filter-select" 
                    value={itemsPerPageProcessos}
                    onChange={(e) => { setItemsPerPageProcessos(Number(e.target.value)); setPageProcessos(1); }}
                    style={{padding: '4px 8px', fontSize: '13px', minWidth: '70px'}}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>processos por página</span>
                </div>
                <div className="pagination" style={{marginTop: 0}}>
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
            </div>
          )}

          {activeTab === 'aposentados' && (
            <div className="glass-panel table-container">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
                <div className="chart-header" style={{marginBottom: 0}}>Servidores Aposentados e Arquivados</div>
                <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                  <div className="filter-wrapper" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Ano Início:</span>
                    <input 
                      type="number" 
                      className="search-input" 
                      style={{width: '90px'}} 
                      placeholder="Ex: 2023"
                      value={filterAposentadosStartYear}
                      onChange={e => { setFilterAposentadosStartYear(e.target.value); setPageAposentados(1); }}
                    />
                  </div>
                  <div className="filter-wrapper" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                    <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Ano Fim:</span>
                    <input 
                      type="number" 
                      className="search-input" 
                      style={{width: '90px'}} 
                      placeholder="Ex: 2025"
                      value={filterAposentadosEndYear}
                      onChange={e => { setFilterAposentadosEndYear(e.target.value); setPageAposentados(1); }}
                    />
                  </div>
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
              </div>

              <div className="charts-grid" style={{ gridTemplateColumns: '1fr', marginBottom: '32px' }}>
                <div className="glass-panel" style={{ background: 'var(--background-color)', border: '1px solid var(--panel-border)', boxShadow: 'none' }}>
                  <div className="chart-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {activeChartContext === 'capoSagep' ? 'Série Histórica: CAPO/SAGEP (Tramitados)' : 'Série Histórica de Conclusões (Por Ano de Publicação)'}
                    <Info size={16} color="var(--text-secondary)" style={{cursor: 'pointer'}} onClick={(e) => {
                      e.stopPropagation();
                      setInfoModalContent({
                        title: 'Série Histórica',
                        description: 'Visão cronológica dos processos finalizados ou tramitados. Clique nos pontos para filtrar a tabela.',
                        legends: [
                          { color: activeChartContext === 'capoSagep' ? 'rgb(50, 173, 230)' : 'var(--success-color)', label: 'Eixo Y (Volume)', desc: 'Quantidade de processos naquele ano.' }
                        ]
                      });
                    }} />
                    {(filterAposentadosStartYear || filterAposentadosEndYear) && (
                       <span style={{ fontSize: '13px', color: 'var(--accent-color)', marginLeft: 'auto', fontWeight: 600 }}>
                          Filtro Ativo: {filterAposentadosStartYear || 'Início'} a {filterAposentadosEndYear || 'Fim'}
                       </span>
                    )}
                  </div>
                  <div className="chart-description">
                    Este gráfico agrupa os processos {activeChartContext === 'capoSagep' ? 'tramitados ao IGEPPS' : 'arquivados'} por <strong>Ano</strong>. Clique num ano para filtrar a tabela abaixo.
                  </div>
                  <div style={{ width: '100%', height: 320, marginTop: '20px' }}>
                    <ResponsiveContainer>
                      <LineChart data={timelineAposentadosData} onClick={handleTimelineAposentadosClick} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5ea" vertical={false} />
                        <XAxis dataKey="name" stroke="#86868b" fontSize={13} tickMargin={10} />
                        <YAxis stroke="#86868b" fontSize={13} tickMargin={10} />
                        <Tooltip cursor={{stroke: 'rgba(0,0,0,0.05)', strokeWidth: 2}} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e5ea', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontFamily: 'var(--font-main)' }} />
                        <Line type="monotone" dataKey="value" stroke={activeChartContext === 'capoSagep' ? 'rgb(50, 173, 230)' : 'var(--success-color)'} strokeWidth={3} activeDot={{ r: 8, fill: '#fff', stroke: activeChartContext === 'capoSagep' ? 'rgb(50, 173, 230)' : 'var(--success-color)', strokeWidth: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <table className="data-table">
                <thead>
                  <tr>
                    <th>Servidor</th>
                    <th>Grupo</th>
                    <th>Cargo</th>
                    <th>Data Conclusão</th>
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
                      <td>{proc.ano_publicacao !== 'N/I' ? proc.ano_publicacao : (proc.DATA_PUB_PADRAO && proc.DATA_PUB_PADRAO !== 'nan' ? proc.DATA_PUB_PADRAO : 'N/I')}</td>
                      <td>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                          <span className="status-badge concluido">{proc.status_consolidado}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Exibir:</span>
                  <select 
                    className="filter-select" 
                    value={itemsPerPageAposentados}
                    onChange={(e) => { setItemsPerPageAposentados(Number(e.target.value)); setPageAposentados(1); }}
                    style={{padding: '4px 8px', fontSize: '13px', minWidth: '70px'}}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>processos por página</span>
                </div>
                <div className="pagination" style={{marginTop: 0}}>
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
            </div>
          )}

          {activeTab === 'atividades' && (
             <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0 40px' }}>
               <div className="chart-header" style={{ marginBottom: '8px' }}>Caixa de Entrada</div>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                 Processos atribuídos a você organizados por status. Clique no processo para ver os detalhes ou use as ações rápidas.
               </p>
               
               <div className="kanban-board">
                 {/* Pendentes */}
                 <div className="kanban-column">
                   <div className="kanban-column-header">
                     <span>Pendentes</span>
                     <span className="kanban-column-count">
                       {minhasAtividades.filter(p => !['em análise', 'tramitado ao igepps', 'concluído', 'publicado', 'arquivado'].some(k => String(p.status_consolidado).toLowerCase().includes(k))).length}
                     </span>
                   </div>
                   <div className="kanban-cards">
                     {minhasAtividades.filter(p => !['em análise', 'tramitado ao igepps', 'concluído', 'publicado', 'arquivado'].some(k => String(p.status_consolidado).toLowerCase().includes(k))).map(p => (
                       <div className="kanban-card" key={p._row_id} onClick={() => handleRowClick(p)}>
                         <div className="kanban-card-title">{p.SERVIDOR_PADRAO}</div>
                         <div className="kanban-card-info">
                           <span><strong>PAE:</strong> {p['Nº PAE'] || 'N/I'}</span>
                           <span><strong>Grupo:</strong> {p.grupo_funcional}</span>
                         </div>
                         <div className="kanban-card-actions">
                           <span className="status-badge pendencia">{p.status_consolidado}</span>
                           <button 
                             className="btn-kanban-action primary"
                             title="Clique aqui para mover este processo para a coluna Em Análise"
                             onClick={async (e) => { 
                               e.stopPropagation(); 
                               if (!window.confirm("Tem certeza que deseja iniciar a análise deste processo? Ele sairá da fila de pendentes.")) return;
                               const payload = { process_id: String(p._original_key || p['Nº PAE'] || p._row_id), matricula: matriculaAtual, novo_status: 'Em Análise', novo_pae: p['Nº PAE'] || '', observacao: p._db_observacao || '' };
                               setIsUpdating(true);
                               const { error } = await supabase.from('process_updates').upsert(payload);
                               if(!error) setDbProcessUpdates(prev => [...prev.filter(u => u.process_id !== payload.process_id), payload]);
                               setIsUpdating(false);
                             }}
                           >
                             Iniciar Análise
                           </button>
                         </div>
                       </div>
                     ))}
                     {minhasAtividades.filter(p => !['em análise', 'tramitado ao igepps', 'concluído', 'publicado', 'arquivado'].some(k => String(p.status_consolidado).toLowerCase().includes(k))).length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>Nenhum processo pendente.</div>
                     )}
                   </div>
                 </div>

                 {/* Em Análise */}
                 <div className="kanban-column">
                   <div className="kanban-column-header">
                     <span>Em Análise</span>
                     <span className="kanban-column-count">
                       {minhasAtividades.filter(p => String(p.status_consolidado).toLowerCase() === 'em análise').length}
                     </span>
                   </div>
                   <div className="kanban-cards">
                     {minhasAtividades.filter(p => String(p.status_consolidado).toLowerCase() === 'em análise').map(p => (
                       <div className="kanban-card" key={p._row_id} onClick={() => handleRowClick(p)}>
                         <div className="kanban-card-title">{p.SERVIDOR_PADRAO}</div>
                         <div className="kanban-card-info">
                           <span><strong>PAE:</strong> {p['Nº PAE'] || 'N/I'}</span>
                           <span><strong>Grupo:</strong> {p.grupo_funcional}</span>
                         </div>
                          <div className="kanban-card-actions">
                            <span className="status-badge andamento">{p.status_consolidado}</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button 
                                className="btn-kanban-action"
                                style={{ background: '#f5f5f7', color: 'var(--text-secondary)' }}
                                title="Desfazer e voltar para Pendentes"
                                onClick={async (e) => { 
                                  e.stopPropagation(); 
                                 if (!window.confirm("Deseja voltar este processo para a fila de Pendentes?")) return;
                                 const p_key = String(p._original_key || p['Nº PAE'] || p._row_id);
                                 const payload = { process_id: p_key, matricula: matriculaAtual, novo_status: 'Pendente Retorno', novo_pae: p['Nº PAE'] || '', observacao: p._db_observacao || '' };
                                  try {
                                    const { error } = await supabase.from('process_updates').upsert(payload);
                                    if(!error) setDbProcessUpdates(prev => [...prev.filter(u => u.process_id !== p_key), payload]);
                                  } catch (err) { console.error(err); }
                                }}
                              >
                                Voltar
                              </button>
                              <button 
                                className="btn-kanban-action success"
                                title="Clique aqui para finalizar e encaminhar o processo para o IGEPPS"
                                onClick={(e) => { 
                                  e.stopPropagation(); handleQuickConclude(p); 
                                }}
                              >
                                Tramitar IGEPPS
                              </button>
                            </div>
                          </div>
                       </div>
                     ))}
                     {minhasAtividades.filter(p => String(p.status_consolidado).toLowerCase() === 'em análise').length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>Nenhum processo em análise.</div>
                     )}
                   </div>
                 </div>

                 {/* Tramitados ao IGEPPS */}
                 <div className="kanban-column" style={{ opacity: 0.9 }}>
                   <div className="kanban-column-header">
                     <span>Tramitados ao IGEPPS</span>
                     <span className="kanban-column-count">
                       {minhasAtividades.filter(p => ['tramitado ao igepps', 'concluído', 'publicado'].some(k => String(p.status_consolidado).toLowerCase().includes(k))).length}
                     </span>
                   </div>
                   <div className="kanban-cards">
                     {minhasAtividades.filter(p => ['tramitado ao igepps', 'concluído', 'publicado'].some(k => String(p.status_consolidado).toLowerCase().includes(k))).map(p => (
                       <div className="kanban-card" key={p._row_id} onClick={() => handleRowClick(p)}>
                         <div className="kanban-card-title">{p.SERVIDOR_PADRAO}</div>
                         <div className="kanban-card-info">
                           <span><strong>PAE:</strong> {p['Nº PAE'] || 'N/I'}</span>
                           <span><strong>Grupo:</strong> {p.grupo_funcional}</span>
                         </div>
                         <div className="kanban-card-actions">
                           <span className="status-badge concluido">{p.status_consolidado}</span>
                         </div>
                       </div>
                     ))}
                     {minhasAtividades.filter(p => ['tramitado ao igepps', 'concluído', 'publicado'].some(k => String(p.status_consolidado).toLowerCase().includes(k))).length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>Nenhum processo concluído recentemente.</div>
                     )}
                   </div>
                 </div>

               </div>
             </div>
          )}

          {activeTab === 'distribuicao' && isGestor && (
            <div className="glass-panel table-container fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div className="chart-header">Distribuição de Passivo</div>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Filtre o Volume Cirúrgico e atribua os processos aos Analisadores. <strong>Total na fila: {distribuicaoSearch.length}</strong>
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'right' }}>
                    Pendentes: <strong>{distribuicaoSearch.filter(p => !assignedProcesses[p._original_key || String(p['Nº PAE'] || p._row_id)]).length}</strong><br/>
                    Rateio Est.: <strong>~{Math.floor(distribuicaoSearch.filter(p => !assignedProcesses[p._original_key || String(p['Nº PAE'] || p._row_id)]).length / (autoDistributeSelected.length || 1))} p/ cada</strong>
                  </div>
                  <button onClick={handleAutoDistribute} style={{
                    background: 'var(--success-color)', color: '#fff', border: 'none', 
                    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                    fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    <Users size={18} /> Distribuição Proporcional
                  </button>
                  <button onClick={handleDistributeByName} style={{
                    background: '#5e5ce6', color: '#fff', border: 'none', 
                    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                    fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    <Users size={18} /> Distribuir p/ Nome
                  </button>
                  <button onClick={generateDistributionPDF} style={{
                    background: 'var(--accent-color)', color: '#fff', border: 'none', 
                    padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                    fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    <Download size={18} /> Gerar PDF de Fichas
                  </button>
                </div>
              </div>

              {hasUnsavedChanges && (
                <div style={{ background: '#fff9e6', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ffd54f' }}>
                  <div style={{ color: '#856404', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info size={20} color="#856404" />
                    Você possui alterações na distribuição que ainda não foram salvas.
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={handleUndoDistribution} style={{ background: 'transparent', border: '1px solid #856404', color: '#856404', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                      Desfazer
                    </button>
                    <button onClick={handleSaveDistribution} style={{ background: '#28a745', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="filter-wrapper" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                  <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Grupo:</span>
                  <select 
                    className="filter-select" 
                    value={distGrupo} 
                    onChange={e => setDistGrupo(e.target.value)}
                  >
                    {uniqueGroups.map(g => <option key={g} value={g}>{g === 'Todos' ? 'Todos os Grupos' : g}</option>)}
                  </select>
                </div>
                
                <div className="filter-wrapper" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                  <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Ano Início:</span>
                  <input 
                    type="number" 
                    className="search-input" 
                    style={{width: '90px'}} 
                    placeholder="Ex: 2004"
                    value={distStartYear}
                    onChange={e => setDistStartYear(e.target.value)}
                  />
                </div>
                
                <div className="filter-wrapper" style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                  <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>Ano Fim:</span>
                  <input 
                    type="number" 
                    className="search-input" 
                    style={{width: '90px'}} 
                    placeholder="Ex: 2018"
                    value={distEndYear}
                    onChange={e => setDistEndYear(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ padding: '16px', background: '#f5f5f7', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)' }}>Participantes da Distribuição</h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Selecione os servidores que irão receber processos nesta remessa automática.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setAutoDistributeSelected(distributionAnalyzers.map(a => a.matricula))} style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--panel-border)', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Selecionar Todos</button>
                    <button onClick={() => setAutoDistributeSelected([])} style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--panel-border)', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Limpar</button>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                  {distributionAnalyzers.map(a => {
                    const isSelected = autoDistributeSelected.includes(a.matricula);
                    return (
                      <div 
                        key={a.matricula}
                        onClick={() => {
                          if (isSelected) setAutoDistributeSelected(autoDistributeSelected.filter(m => m !== a.matricula));
                          else setAutoDistributeSelected([...autoDistributeSelected, a.matricula]);
                        }}
                        style={{
                          padding: '10px 12px', borderRadius: '8px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '10px',
                          border: isSelected ? '1px solid var(--accent-color)' : '1px solid var(--panel-border)',
                          background: isSelected ? 'rgba(0, 122, 255, 0.05)' : '#fff',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '4px',
                          border: isSelected ? 'none' : '1px solid #c7c7cc',
                          background: isSelected ? 'var(--accent-color)' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {isSelected && <CheckCircle2 size={14} color="#fff" />}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{a.tipo || 'Servidor'} • Mat: {a.matricula || 'N/I'}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div style={{ height: '1px', background: 'var(--panel-border)', margin: '24px 0' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Atribuição Manual ({distSelectedProcesses.length} selecionados)
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select 
                    className="filter-select" 
                    style={{ minWidth: '250px' }}
                    value={distAnalyzerSelect}
                    onChange={e => setDistAnalyzerSelect(e.target.value)}
                  >
                    <option value="">Selecione o Analisador...</option>
                    {distributionAnalyzers.map(a => (
                      <option key={a.matricula} value={a.matricula}>{a.name}</option>
                    ))}
                  </select>
                  <button onClick={handleManualDistribute} style={{
                    background: 'var(--text-primary)', color: '#fff', border: 'none', 
                    padding: '8px 16px', borderRadius: '8px', cursor: 'pointer',
                    fontWeight: 600, fontSize: '13px'
                  }}>
                    Atribuir Marcados
                  </button>
                </div>
              </div>

              <div style={{ maxHeight: '600px', overflowY: 'auto', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
                <table className="data-table" style={{ margin: 0 }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: '#f5f5f7' }}>
                    <tr>
                      <th style={{ width: '40px', textAlign: 'center' }}>
                        <input 
                          type="checkbox" 
                          checked={distribuicaoSearch.length > 0 && distSelectedProcesses.length === distribuicaoSearch.length}
                          onChange={toggleAllDistProcessSelection}
                        />
                      </th>
                      <th>Servidor / PAE</th>
                      <th>Ano Entrada</th>
                      <th>Grupo</th>
                      <th>Atribuído Para</th>
                    </tr>
                  </thead>
                  <tbody>
                    {distribuicaoSearch.length === 0 ? (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '32px' }}>Nenhum processo encontrado no filtro.</td></tr>
                    ) : (
                      distribuicaoSearch.map((proc) => {
                        const p_key = proc._original_key || String(proc['Nº PAE'] || proc._row_id);
                        const assignedMatricula = assignedProcesses[p_key];
                        const analyzerObj = distributionAnalyzers.find(a => a.matricula === assignedMatricula);
                        
                        return (
                          <tr key={proc._row_id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(proc)}>
                            <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                              <input 
                                type="checkbox" 
                                checked={distSelectedProcesses.includes(p_key)}
                                onChange={() => toggleDistProcessSelection(p_key)}
                              />
                            </td>
                            <td>
                              <div style={{fontWeight: 600, color: 'var(--text-primary)'}}>{proc.SERVIDOR_PADRAO}</div>
                              <div style={{fontSize: 13, color: 'var(--text-secondary)', marginTop: '4px'}}>PAE: {proc['Nº PAE'] || 'N/I'}</div>
                            </td>
                            <td>{proc.ano_entrada}</td>
                            <td>{proc.grupo_funcional}</td>
                            <td onClick={(e) => {
                               if (analyzerObj) {
                                  e.stopPropagation();
                                  setSelectedAnalyzer(analyzerObj.name);
                                  setActiveTab('producao');
                               }
                            }}>
                              {analyzerObj ? (
                                <span className="status-badge" style={{ background: 'var(--success-color)', color: '#fff', cursor: 'pointer' }}>
                                  {analyzerObj.name}
                                </span>
                              ) : (
                                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '13px' }}>Sem Atribuição</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              
              <div style={{ marginTop: '24px' }}>
                <div 
                  onClick={() => setShowDistributionHistory(!showDistributionHistory)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: '#f5f5f7', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--panel-border)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <History size={18} color="var(--text-primary)" />
                    <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)' }}>Histórico de Lotes de Distribuição</h3>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--accent-color)', fontWeight: 600 }}>
                    {showDistributionHistory ? 'Ocultar Histórico' : 'Ver Histórico'}
                  </span>
                </div>
                
                {showDistributionHistory && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(() => {
                      const batches = {};
                      rawAssignments.forEach(a => {
                         if (!a.assigned_at) return;
                         if (!batches[a.assigned_at]) batches[a.assigned_at] = { count: 0, matriculas: new Set() };
                         batches[a.assigned_at].count++;
                         batches[a.assigned_at].matriculas.add(a.matricula);
                      });
                      
                      const sortedBatches = Object.keys(batches).sort((a,b) => new Date(b) - new Date(a));
                      
                      if (sortedBatches.length === 0) {
                         return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Nenhum histórico de lote encontrado.</div>;
                      }
                      
                      return sortedBatches.map(timestamp => {
                         const dateObj = new Date(timestamp);
                         const dateStr = dateObj.toLocaleDateString('pt-BR');
                         const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                         
                         return (
                           <div key={timestamp} style={{ padding: '16px', border: '1px solid var(--panel-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <div>
                               <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Lote distribuído em {dateStr} às {timeStr}</div>
                               <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                 {batches[timestamp].count} processos • {batches[timestamp].matriculas.size} servidores envolvidos
                               </div>
                             </div>
                             <button 
                               onClick={() => handleDeleteBatch(timestamp)}
                               style={{ background: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                             >
                               Cancelar Lote
                             </button>
                           </div>
                         );
                      });
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'registrar' && (
            <div className="glass-panel fade-in">
              <div className="chart-header">Registrar Atividade</div>
              <p style={{ color: 'var(--text-secondary)' }}>Módulo de registro de atividades em desenvolvimento.</p>
            </div>
          )}

          {activeTab === 'planilhao' && (
            <div className="glass-panel fade-in">
              <div className="chart-header">Planilhão Painel Gerencial</div>
              <p style={{ color: 'var(--text-secondary)' }}>Módulo de painel gerencial em desenvolvimento.</p>
            </div>
          )}

          {activeTab === 'configuracoes' && isGestor && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Controle de Cadastros */}
              <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <div>
                    <div className="chart-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: 'var(--accent-glow)', color: 'var(--accent-color)', padding: '8px', borderRadius: '8px' }}>
                        <Lock size={20} />
                      </div>
                      Controle de Inscrições
                    </div>
                    <p className="chart-description">Permita que os Analistas criem suas próprias contas através do link especial de cadastro.</p>
                 </div>
                 <div>
                    <button 
                       onClick={async () => {
                          const novoStatus = !cadastroAberto;
                          try {
                             const { error } = await supabase.from('system_settings').upsert({ key: 'cadastro_aberto', value: novoStatus ? 'true' : 'false' });
                             if (error) {
                               alert('Erro ao salvar no banco: ' + error.message + '\n\nCertifique-se de que você rodou o código do arquivo supabase_schema.sql no SQL Editor do Supabase.');
                               return;
                             }
                             setCadastroAberto(novoStatus);
                          } catch(e) { console.error(e) }
                       }}
                       style={{
                         padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                         background: cadastroAberto ? 'var(--danger-color)' : 'var(--success-color)', color: '#fff',
                         boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                       }}>
                       {cadastroAberto ? 'Fechar Vagas' : 'Abrir Vagas de Cadastro'}
                    </button>
                    {cadastroAberto && <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px', textAlign: 'center' }}>Link: /?cadastro=true</div>}
                 </div>
              </div>

              <div className="glass-panel">
                <div className="chart-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: 'var(--accent-glow)', color: 'var(--accent-color)', padding: '8px', borderRadius: '8px' }}>
                    <Users size={20} />
                  </div>
                  Cadastrar Novo Usuário (Manual)
                </div>
                <p className="chart-description">Crie acessos para Analisadores ou novos Gestores do sistema. A sessão atual não será interrompida.</p>
                
                {userCreateMsg.text && (
                  <div style={{ 
                    padding: '16px', borderRadius: '12px', marginBottom: '24px',
                    background: userCreateMsg.type === 'success' ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)',
                    color: userCreateMsg.type === 'success' ? 'var(--success-color)' : 'var(--danger-color)',
                    border: `1px solid ${userCreateMsg.type === 'success' ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255, 59, 48, 0.2)'}`,
                    display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, fontSize: '14px'
                  }}>
                    {userCreateMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {userCreateMsg.text}
                  </div>
                )}
                
                <form onSubmit={handleCreateUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Nome Completo</label>
                    <input type="text" required value={newUserNome} onChange={e => setNewUserNome(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                      placeholder="Ex: João da Silva" />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Matrícula</label>
                    <input type="text" required value={newUserMatricula} onChange={e => setNewUserMatricula(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                      placeholder="Ex: 5991332" />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>E-mail (Opcional)</label>
                    <input type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                      placeholder="Será gerado pela matrícula se vazio" />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Cargo / Nível de Acesso</label>
                    <select value={newUserCargo} onChange={e => setNewUserCargo(e.target.value)}
                      style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}>
                      <option value="Analisador">Analisador (Restrito à própria matrícula)</option>
                      <option value="Gestor">Gestor (Acesso Total)</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Senha</label>
                    <input type="password" required value={newUserSenha} onChange={e => setNewUserSenha(e.target.value)} minLength={6}
                      style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                      placeholder="Mínimo 6 caracteres" />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Confirmar Senha</label>
                    <input type="password" required value={newUserConfirmaSenha} onChange={e => setNewUserConfirmaSenha(e.target.value)} minLength={6}
                      style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--panel-border)', outline: 'none', background: '#fbfbfd', fontSize: '14px' }}
                      placeholder="Digite a senha novamente" />
                  </div>
                  
                  <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <button type="submit" disabled={userCreating}
                      style={{ 
                        background: 'linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 100%)', 
                        color: 'white', border: 'none', padding: '14px 28px', borderRadius: '10px', 
                        fontSize: '15px', fontWeight: 600, cursor: userCreating ? 'not-allowed' : 'pointer',
                        opacity: userCreating ? 0.7 : 1, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}>
                      {userCreating ? 'Cadastrando...' : 'Criar Usuário'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        {renderAnalyzerModal()}
        {renderInfoModal()}
      </main>
    </div>
  );
}

export default App;
