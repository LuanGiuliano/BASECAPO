import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Landmark, User, Lock, AlertCircle, CheckCircle2, FileText, PieChart } from 'lucide-react';

const Cadastro = ({ onVoltar }) => {
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [cadastroAberto, setCadastroAberto] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', 'cadastro_aberto')
          .single();
          
        if (data && String(data.value) === 'true') {
          setCadastroAberto(true);
        } else {
          setCadastroAberto(false);
        }
      } catch (err) {
        // Fallback: se a tabela não existir, podemos assumir fechado ou abrir temporariamente
        console.error('Erro ao verificar status do cadastro', err);
        setCadastroAberto(false);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkStatus();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!cadastroAberto) return;
    
    setLoading(true);
    setError('');

    try {
      const email = `${matricula}@seduc.pa.gov.br`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome: nome,
            cargo: 'Analista',
            matricula: matricula
          }
        }
      });

      if (error) throw error;
      
      setSuccess(true);
      
    } catch (err) {
      if (err.message.includes('User already registered')) {
         setError('Esta matrícula já possui cadastro no sistema.');
      } else {
         setError(err.message || 'Erro ao realizar o cadastro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', zIndex: 1 }}>
         <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <span style={{color: 'var(--text-secondary)'}}>Verificando disponibilidade de vagas...</span>
         </div>
      </div>
    );
  }

  return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center', zIndex: 1 }}>
        <div className="glass-panel" style={{
          width: '100%',
          maxWidth: '420px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ 
            width: '64px', height: '64px', 
            background: 'linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 100%)', 
            borderRadius: '16px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            <Landmark size={36} />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>CADASTRO DE ANALISTA</h1>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>SISTEMA CAPO GESTÃO</span>
          </div>
        </div>

        {!cadastroAberto ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
             <AlertCircle size={48} color="var(--danger-color)" style={{marginBottom: '16px', opacity: 0.8}} />
             <h3 style={{color: 'var(--text-primary)', marginBottom: '8px'}}>Cadastro Encerrado</h3>
             <p style={{fontSize: '14px', lineHeight: '1.5'}}>
               O período de inscrições para Analistas foi fechado pelo Gestor do Sistema. 
               Se você precisa de acesso, entre em contato com a administração.
             </p>
             <button 
                onClick={onVoltar}
                style={{
                  background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--panel-border)', 
                  padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginTop: '24px', width: '100%', fontWeight: 600
                }}>
                Voltar para Login
             </button>
          </div>
        ) : success ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
             <CheckCircle2 size={48} color="var(--success-color)" style={{marginBottom: '16px'}} />
             <h3 style={{color: 'var(--text-primary)', marginBottom: '8px'}}>Cadastro Realizado!</h3>
             <p style={{fontSize: '14px', lineHeight: '1.5'}}>
               Sua conta foi criada com sucesso. Você já pode fazer login no sistema com sua matrícula e senha.
             </p>
             <button 
                onClick={onVoltar}
                style={{
                  background: 'var(--success-color)', color: '#fff', border: 'none', 
                  padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', marginTop: '24px', width: '100%', fontWeight: 600
                }}>
                Ir para o Login
             </button>
          </div>
        ) : (
          <>
            {error && (
              <div style={{ 
                width: '100%', padding: '12px', 
                background: 'rgba(255, 59, 48, 0.1)', 
                border: '1px solid rgba(255, 59, 48, 0.2)',
                borderRadius: '8px',
                color: 'var(--danger-color)',
                fontSize: '13px',
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '20px'
              }}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Nome Completo
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="text" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'var(--background-color)',
                      border: '1px solid var(--panel-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#1c1c1e'}
                    onBlur={e => e.target.style.borderColor = 'var(--panel-border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Sua Matrícula <span style={{ color: 'var(--danger-color)', fontSize: '11px', fontWeight: 600 }}>(Sem o vínculo)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <FileText size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="text" 
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Ex: 5123456 (Somente números)"
                    required
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'var(--background-color)',
                      border: '1px solid var(--panel-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#1c1c1e'}
                    onBlur={e => e.target.style.borderColor = 'var(--panel-border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Senha de Acesso
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crie uma senha forte"
                    required
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'var(--background-color)',
                      border: '1px solid var(--panel-border)',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#1c1c1e'}
                    onBlur={e => e.target.style.borderColor = 'var(--panel-border)'}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '8px',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background 0.2s'
                }}
              >
                {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
              </button>
            </form>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }} 
                onMouseOver={e => e.target.style.color = '#1c1c1e'}
                onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}
                onClick={onVoltar}>
                Já possuo conta (Voltar)
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cadastro;
