import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const navigate = useNavigate();

  const formatCPF = (value) => {
    // Remove tudo que não é dígito
    const cleaned = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (cleaned.length <= 11) {
      const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      return formatted;
    }
    return value;
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cpf && dataNascimento) {
      // Salva os dados no localStorage para usar nas outras telas
      localStorage.setItem('userData', JSON.stringify({
        cpf,
        dataNascimento
      }));
      navigate('/triagem');
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ 
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <img 
            src="/image.png" 
            alt="PulSafe Logo" 
            style={{
              width: '160px',
              height: 'auto',
              maxWidth: '100%'
            }}
          />
        </div>
        <p style={{
          color: '#6c757d',
          fontSize: 'clamp(12px, 3vw, 16px)',
          margin: 0,
          fontWeight: '500',
          lineHeight: 1.3
        }}>
          Pulseira Inteligente de Triagem
        </p>
      </div>

      <div className="pulseira-badge">
        pulseira 607B
      </div>
      
      <div className="subtitle">
        login
      </div>

      <div className="divider"></div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              📋 CPF
            </span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCPFChange}
            maxLength="14"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              📅 Data de nascimento
            </span>
          </label>
          <input
            type="date"
            className="form-input"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            🔐 Acessar Sistema
          </span>
        </button>
      </form>
    </div>
  );
};

export default Login;