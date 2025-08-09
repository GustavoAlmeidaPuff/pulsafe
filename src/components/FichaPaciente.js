import React, { useState, useEffect } from 'react';

const FichaPaciente = () => {
  const [dadosVitais, setDadosVitais] = useState({
    pressao: '11/7',
    bpm: '90',
    saturacao: '98',
    temperatura: '36.5'
  });
  const [tempoRestante, setTempoRestante] = useState(0); // em segundos

  useEffect(() => {
    // Recupera dados da triagem
    const triagemData = localStorage.getItem('triagemData');
    if (triagemData) {
      const dados = JSON.parse(triagemData);
      
      // Define um tempo padrão de 40 minutos
      const tempoTotalSegundos = 40 * 60; // 40 minutos em segundos
      setTempoRestante(tempoTotalSegundos);
    }

    // Simula dados vitais da pulseira (em um caso real, viriam da API)
    const gerarDadosVitais = () => {
      // Gera valores aleatórios dentro de faixas normais
      const pressaoSist = Math.floor(Math.random() * 25) + 115; // 115-140
      const pressaoDias = Math.floor(Math.random() * 15) + 75; // 75-90
      const bpm = Math.floor(Math.random() * 20) + 70; // 70-90
      const saturacao = Math.floor(Math.random() * 3) + 96; // 96-99
      const temperatura = (Math.random() * 1 + 36.2).toFixed(1); // 36.2-37.2

      setDadosVitais({
        pressao: `${pressaoSist}/${pressaoDias}`,
        bpm: bpm.toString(),
        saturacao: saturacao.toString(),
        temperatura: temperatura
      });
    };

    gerarDadosVitais();
  }, []);

  // Cronômetro regressivo
  useEffect(() => {
    if (tempoRestante <= 0) return;

    const timer = setInterval(() => {
      setTempoRestante((prevTempo) => {
        if (prevTempo <= 1) {
          return 0;
        }
        return prevTempo - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tempoRestante]);

  // Oscilação realista dos dados vitais
  useEffect(() => {
    const oscilarDados = setInterval(() => {
      setDadosVitais(prevDados => {
        // Valores base normais
        const baseBpm = 80;
        const baseSaturacao = 97;
        const baseTemperatura = 36.7;
        const basePressaoSist = 127;
        const basePressaoDias = 82;

        // Pequenas variações aleatórias para simular oscilação real
        const bpmVariacao = Math.floor(Math.random() * 6) - 3; // ±3
        const saturacaoVariacao = Math.floor(Math.random() * 3) - 1; // ±1
        const temperaturaVariacao = (Math.random() * 0.4) - 0.2; // ±0.2
        const pressaoSistVariacao = Math.floor(Math.random() * 8) - 4; // ±4
        const pressaoDiasVariacao = Math.floor(Math.random() * 6) - 3; // ±3

        const novoBpm = Math.max(65, Math.min(95, baseBpm + bpmVariacao));
        const novaSaturacao = Math.max(95, Math.min(100, baseSaturacao + saturacaoVariacao));
        const novaTemperatura = Math.max(36, Math.min(37.5, baseTemperatura + temperaturaVariacao));
        const novaPressaoSist = Math.max(110, Math.min(140, basePressaoSist + pressaoSistVariacao));
        const novaPressaoDias = Math.max(70, Math.min(90, basePressaoDias + pressaoDiasVariacao));

        return {
          pressao: `${novaPressaoSist}/${novaPressaoDias}`,
          bpm: novoBpm.toString(),
          saturacao: novaSaturacao.toString(),
          temperatura: novaTemperatura.toFixed(1)
        };
      });
    }, 3000); // Atualiza a cada 3 segundos

    return () => clearInterval(oscilarDados);
  }, []);

  // Formatar tempo para MM:SS
  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
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
        ficha do paciente
      </div>

      <div className="divider"></div>

      <div className={`data-card ${tempoRestante <= 300 && tempoRestante > 0 ? 'countdown-urgent' : ''}`} style={{ 
        background: tempoRestante <= 300 ? 'linear-gradient(135deg, #ffebee 0%, #ffffff 100%)' : 'linear-gradient(135deg, #f8f9fc 0%, #ffffff 100%)', 
        border: `2px solid ${tempoRestante <= 300 ? '#ffcdd2' : '#e3f2fd'}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>
          {tempoRestante <= 0 ? '✅' : tempoRestante <= 300 ? '⚠️' : '⏰'}
        </div>
        <div className="data-label">tempo médio</div>
        <div className="data-label">para o atendimento</div>
        <div className="data-value" style={{ 
          color: tempoRestante <= 0 ? '#28a745' : tempoRestante <= 300 ? '#ff6b35' : '#d13636',
          fontSize: '36px',
          fontWeight: '900'
        }}>
          {tempoRestante <= 0 ? 'PRÓXIMO!' : formatarTempo(tempoRestante)}
        </div>
        {tempoRestante > 0 && tempoRestante <= 300 && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            color: '#ff6b35',
            fontWeight: '600',
            animation: 'pulse 1s infinite'
          }}>
            QUASE SUA VEZ!
          </div>
        )}
        {tempoRestante > 0 && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #d13636 0%, #ff4757 100%)',
            width: `${100 - (tempoRestante / (40 * 60)) * 100}%`,
            transition: 'width 1s ease'
          }} />
        )}
      </div>

      <div className="vitals-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        <div className="data-card" style={{ margin: 0, position: 'relative' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🩸</div>
          <div className="data-label">pressão</div>
          <div className="data-value" style={{ fontSize: '24px' }}>{dadosVitais.pressao}</div>
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            backgroundColor: '#28a745',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
        </div>

        <div className="data-card" style={{ margin: 0, position: 'relative' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px', animation: 'pulse 1.5s infinite' }}>💓</div>
          <div className="data-label">batimentos</div>
          <div className="data-value" style={{ fontSize: '24px' }}>{dadosVitais.bpm}</div>
          <div style={{ fontSize: '12px', color: '#6c757d', fontWeight: '500' }}>BPM</div>
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            backgroundColor: '#28a745',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
        </div>

        <div className="data-card" style={{ margin: 0, position: 'relative' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🫁</div>
          <div className="data-label">saturação</div>
          <div className="data-value" style={{ fontSize: '24px' }}>{dadosVitais.saturacao}%</div>
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            backgroundColor: '#28a745',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
        </div>

        <div className="data-card" style={{ margin: 0, position: 'relative' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌡️</div>
          <div className="data-label">temperatura</div>
          <div className="data-value" style={{ fontSize: '24px' }}>{dadosVitais.temperatura}°C</div>
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '8px',
            height: '8px',
            backgroundColor: '#28a745',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      </div>


    </div>
  );
};

export default FichaPaciente;