import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Triagem = () => {
  const [sintomas, setSintomas] = useState('');
  const [alergias, setAlergias] = useState('');
  const [intolerancia, setIntolerancia] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calcula a prioridade baseada nos sintomas informados
    let prioridade = 'verde'; // Baixa prioridade por padrão
    let tempoEstimado = '40:00';
    
    const sintomasTexto = sintomas.toLowerCase();
    
    // Lógica simples de triagem baseada em palavras-chave
    if (sintomasTexto.includes('dor no peito') || 
        sintomasTexto.includes('falta de ar') || 
        sintomasTexto.includes('desmaio') ||
        sintomasTexto.includes('sangramento')) {
      prioridade = 'vermelho';
      tempoEstimado = '05:00';
    } else if (sintomasTexto.includes('febre alta') || 
               sintomasTexto.includes('dor intensa') ||
               sintomasTexto.includes('vomito')) {
      prioridade = 'amarelo';
      tempoEstimado = '20:00';
    } else if (sintomasTexto.includes('febre') || 
               sintomasTexto.includes('dor') ||
               sintomasTexto.includes('tontura')) {
      prioridade = 'azul';
      tempoEstimado = '30:00';
    }

    // Salva os dados da triagem
    const dadosTriagem = {
      sintomas,
      alergias,
      intolerancia,
      prioridade,
      tempoEstimado,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('triagemData', JSON.stringify(dadosTriagem));
    navigate('/ficha');
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <img 
          src="/image.png" 
          alt="PulSafe Logo" 
          style={{
            width: '120px',
            height: 'auto',
            maxWidth: '100%'
          }}
        />
      </div>

      <div className="pulseira-badge">
        pulseira 607B
      </div>
      
      <div className="subtitle">
        triagem automática
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="question-text">
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '24px',
                background: 'linear-gradient(135deg, #d13636 0%, #ff4757 100%)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🤒
              </div>
              O que você está sentindo?
            </span>
          </div>
          <textarea
            className="form-input"
            placeholder="Descreva seus sintomas detalhadamente..."
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            rows="3"
            required
            style={{ resize: 'vertical', minHeight: '80px' }}
          />
        </div>

        <div className="form-group">
          <div className="question-text">
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '24px',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                💊
              </div>
              Tem alergia à algum medicamento?
            </span>
          </div>
          <textarea
            className="form-input"
            placeholder="Ex: Penicilina, Aspirina... ou 'Não tenho'"
            value={alergias}
            onChange={(e) => setAlergias(e.target.value)}
            rows="2"
            style={{ resize: 'vertical', minHeight: '60px' }}
          />
        </div>

        <div className="form-group">
          <div className="question-text">
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '24px',
                background: 'linear-gradient(135deg, #4ecdc4 0%, #26a69a 100%)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🥛
              </div>
              Tem intolerância à algum alimento?
            </span>
          </div>
          <textarea
            className="form-input"
            placeholder="Ex: lactose, glúten, nozes... ou 'Não tenho'"
            value={intolerancia}
            onChange={(e) => setIntolerancia(e.target.value)}
            rows="2"
            style={{ resize: 'vertical', minHeight: '60px' }}
          />
        </div>

        <button type="submit" className="btn-primary">
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            📋 Enviar Triagem
          </span>
        </button>
      </form>
    </div>
  );
};

export default Triagem;