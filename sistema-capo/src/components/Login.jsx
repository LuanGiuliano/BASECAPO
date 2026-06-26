import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Landmark, Lock, User, AlertCircle, FileText, PieChart } from 'lucide-react';
import Cadastro from './Cadastro';

const Login = ({ onLogin }) => {
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCadastro, setIsCadastro] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('cadastro') === 'true') {
      setIsCadastro(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Usando e-mail fictício baseado na matrícula para usar o Supabase Auth nativo
      const email = `${matricula}@seduc.pa.gov.br`;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Buscar a role do usuário (gestor ou analisador) no banco, caso exista
      // Por enquanto, podemos simular que admins são específicos, ou recuperar do metadata.
      // Vamos passar o usuário para o App
      if (data.session) {
        onLogin(data.session);
      }
      
    } catch (err) {
      setError('Matrícula ou senha incorretos. Verifique as credenciais.');
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isCadastro) {
    return (
       <div style={{
         display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
         minHeight: '100vh', background: 'var(--background-color)', padding: '40px 20px 30px 20px',
         position: 'relative', overflow: 'hidden'
       }}>
         {/* Background Watermarks */}
         <div style={{ position: 'absolute', right: '-10%', bottom: '-20%', opacity: 0.03, transform: 'rotate(-15deg)', pointerEvents: 'none', zIndex: 0 }}>
           <FileText size={800} color="#1c1c1e" strokeWidth={1} />
         </div>
         <div style={{ position: 'absolute', left: '-5%', top: '-10%', opacity: 0.03, transform: 'rotate(15deg)', pointerEvents: 'none', zIndex: 0 }}>
           <PieChart size={600} color="#1c1c1e" strokeWidth={1} />
         </div>
         
         <Cadastro onVoltar={() => setIsCadastro(false)} />
         
         {/* Footer */}
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '30px', opacity: 0.6, flexWrap: 'wrap', textAlign: 'center', zIndex: 1 }}>
           <img src="/logo_seduc_hori_bc_gray.png" alt="Seduc Logo" style={{ height: '28px', objectFit: 'contain' }} />
           <div style={{ height: '24px', width: '1px', background: 'var(--text-secondary)' }}></div>
           <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.5px' }}>
             Secretaria de Educação © Todos os direitos reservados
           </span>
         </div>
       </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
      background: 'var(--background-color)',
      padding: '40px 20px 30px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Watermark 1: Document */}
      <div style={{ 
        position: 'absolute', 
        right: '-10%', 
        bottom: '-20%', 
        opacity: 0.03, 
        transform: 'rotate(-15deg)', 
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <FileText size={800} color="#1c1c1e" strokeWidth={1} />
      </div>

      {/* Background Watermark 2: Management/Chart */}
      <div style={{ 
        position: 'absolute', 
        left: '-5%', 
        top: '-10%', 
        opacity: 0.03, 
        transform: 'rotate(15deg)', 
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <PieChart size={600} color="#1c1c1e" strokeWidth={1} />
      </div>

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
            <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>CAPO GESTÃO</h1>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Acesso Restrito</span>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', marginTop: '2px' }}>
            powered by SIRA - PAE 4.0
          </span>
        </div>

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

        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Matrícula
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="Digite sua matrícula"
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
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }} 
                onMouseOver={e => e.target.style.color = '#1c1c1e'}
                onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}
                onClick={() => alert('Por favor, contate o Gestor do CAPO para solicitar a redefinição da sua senha.')}>
                Esqueci minha senha
              </span>
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
            {loading ? 'Autenticando...' : 'Entrar no Sistema'}
          </button>
        </form>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
           <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }} 
             onMouseOver={e => e.target.style.color = '#1c1c1e'}
             onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}
             onClick={() => setIsCadastro(true)}>
             Sou Analista e quero me cadastrar
           </span>
        </div>
      </div>
      </div>
      
      {/* Footer SEDUC */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '20px',
        marginTop: '30px',
        opacity: 0.6,
        flexWrap: 'wrap',
        textAlign: 'center'
      }}>
        <img src="/logo_seduc_hori_bc_gray.png" alt="Seduc Logo" style={{ height: '28px', objectFit: 'contain' }} />
        <div style={{ height: '24px', width: '1px', background: 'var(--text-secondary)' }}></div>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.5px' }}>
          Secretaria de Educação © Todos os direitos reservados
        </span>
      </div>
    </div>
  );
};

export default Login;
