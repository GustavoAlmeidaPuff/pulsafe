import React, { useState, useEffect } from 'react';

const FichaPaciente = () => {
  const [dadosVitais, setDadosVitais] = useState({
    pressao: '11/7',
    bpm: '90',
    saturacao: '98',
    temperatura: '36.5'
  });
  const [tempoRestante, setTempoRestante] = useState(0); // em segundos
  const [prioridade, setPrioridade] = useState('verde');

  useEffect(() => {
    // Recupera dados da triagem
    const triagemData = localStorage.getItem('triagemData');
    if (triagemData) {
      const dados = JSON.parse(triagemData);
      setPrioridade(dados.prioridade);
      
      // Converte tempo estimado para segundos
      const [minutos, segundos] = dados.tempoEstimado.split(':').map(Number);
      const tempoTotalSegundos = (minutos * 60) + segundos;
      setTempoRestante(tempoTotalSegundos);
    }

    // Simula dados vitais da pulseira (em um caso real, viriam da API)
    const gerarDadosVitais = () => {
      // Gera valores aleatórios dentro de faixas normais/alteradas baseado na prioridade
      let pressaoSist, pressaoDias, bpm, saturacao, temperatura;
      
      if (prioridade === 'vermelho') {
        pressaoSist = Math.floor(Math.random() * 40) + 160; // 160-200
        pressaoDias = Math.floor(Math.random() * 20) + 100; // 100-120
        bpm = Math.floor(Math.random() * 40) + 120; // 120-160
        saturacao = Math.floor(Math.random() * 5) + 85; // 85-90
        temperatura = (Math.random() * 3 + 38).toFixed(1); // 38-41
      } else if (prioridade === 'amarelo') {
        pressaoSist = Math.floor(Math.random() * 30) + 140; // 140-170
        pressaoDias = Math.floor(Math.random() * 15) + 90; // 90-105
        bpm = Math.floor(Math.random() * 30) + 100; // 100-130
        saturacao = Math.floor(Math.random() * 5) + 92; // 92-97
        temperatura = (Math.random() * 2 + 37).toFixed(1); // 37-39
      } else {
        pressaoSist = Math.floor(Math.random() * 30) + 110; // 110-140
        pressaoDias = Math.floor(Math.random() * 20) + 70; // 70-90
        bpm = Math.floor(Math.random() * 20) + 60; // 60-80
        saturacao = Math.floor(Math.random() * 3) + 97; // 97-100
        temperatura = (Math.random() * 1 + 36).toFixed(1); // 36-37
      }

      setDadosVitais({
        pressao: `${pressaoSist}/${pressaoDias}`,
        bpm: bpm.toString(),
        saturacao: saturacao.toString(),
        temperatura: temperatura
      });
    };

    gerarDadosVitais();
  }, [prioridade]);

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
        // Oscilações baseadas em valores normais para cada prioridade
        let baseBpm, baseSaturacao, baseTemperatura, basePressaoSist, basePressaoDias;
        
        if (prioridade === 'vermelho') {
          baseBpm = 140;
          baseSaturacao = 87;
          baseTemperatura = 39.5;
          basePressaoSist = 180;
          basePressaoDias = 110;
        } else if (prioridade === 'amarelo') {
          baseBpm = 115;
          baseSaturacao = 94;
          baseTemperatura = 38.2;
          basePressaoSist = 155;
          basePressaoDias = 95;
        } else if (prioridade === 'azul') {
          baseBpm = 85;
          baseSaturacao = 97;
          baseTemperatura = 36.8;
          basePressaoSist = 125;
          basePressaoDias = 80;
        } else {
          baseBpm = 72;
          baseSaturacao = 98;
          baseTemperatura = 36.5;
          basePressaoSist = 120;
          basePressaoDias = 75;
        }

        // Pequenas variações aleatórias para simular oscilação real
        const bpmVariacao = Math.floor(Math.random() * 6) - 3; // ±3
        const saturacaoVariacao = Math.floor(Math.random() * 3) - 1; // ±1
        const temperaturaVariacao = (Math.random() * 0.4) - 0.2; // ±0.2
        const pressaoSistVariacao = Math.floor(Math.random() * 8) - 4; // ±4
        const pressaoDiasVariacao = Math.floor(Math.random() * 6) - 3; // ±3

        const novoBpm = Math.max(50, Math.min(200, baseBpm + bpmVariacao));
        const novaSaturacao = Math.max(80, Math.min(100, baseSaturacao + saturacaoVariacao));
        const novaTemperatura = Math.max(35, Math.min(42, baseTemperatura + temperaturaVariacao));
        const novaPressaoSist = Math.max(80, Math.min(220, basePressaoSist + pressaoSistVariacao));
        const novaPressaoDias = Math.max(40, Math.min(130, basePressaoDias + pressaoDiasVariacao));

        return {
          pressao: `${novaPressaoSist}/${novaPressaoDias}`,
          bpm: novoBpm.toString(),
          saturacao: novaSaturacao.toString(),
          temperatura: novaTemperatura.toFixed(1)
        };
      });
    }, 3000); // Atualiza a cada 3 segundos

    return () => clearInterval(oscilarDados);
  }, [prioridade]);

  // Formatar tempo para MM:SS
  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  const getPrioridadeCor = () => {
    switch (prioridade) {
      case 'vermelho': return '#d13636';
      case 'amarelo': return '#ffa500';
      case 'azul': return '#3a7bc8';
      default: return '#28a745';
    }
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