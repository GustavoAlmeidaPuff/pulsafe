import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Triagem = () => {
  const [sintomas, setSintomas] = useState('');
  const [tempoSintomas, setTempoSintomas] = useState('');
  const [alergias, setAlergias] = useState('');
  const [intolerancia, setIntolerancia] = useState('');
  const [temAlergias, setTemAlergias] = useState(false);
  const [temIntolerancia, setTemIntolerancia] = useState(false);
  const [doencasPreExistentes, setDoencasPreExistentes] = useState('');
  const [temDoencasPreExistentes, setTemDoencasPreExistentes] = useState(false);
  const [contatoEmergencia, setContatoEmergencia] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [showAudioOption, setShowAudioOption] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // Funções de gravação de áudio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
      
      // Escolhe o melhor formato disponível
      let options = {};
      if (MediaRecorder.isTypeSupported('audio/webm')) {
        options = { mimeType: 'audio/webm' };
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        options = { mimeType: 'audio/mp4' };
      } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
        options = { mimeType: 'audio/ogg' };
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        // Usa o tipo MIME que o MediaRecorder realmente suporta
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const blob = new Blob(chunks, { type: mimeType });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        
        // Para o stream para liberar o microfone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erro ao acessar microfone:', error);
      alert('Erro ao acessar o microfone. Verifique as permissões.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = async () => {
    if (audioRef.current && audioUrl) {
      try {
        // Para garantir que o áudio seja carregado
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (error) {
        console.error('Erro ao reproduzir áudio:', error);
        alert('Erro ao reproduzir o áudio. Tente gravar novamente.');
      }
    }
  };

  const cancelAudio = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  // Função para formatar o número de telefone
  const formatarTelefone = (valor) => {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Se não tem números, retorna vazio
    if (apenasNumeros.length === 0) return '';
    
    // Aplica a formatação gradual conforme digita
    if (apenasNumeros.length <= 2) {
      return `(${apenasNumeros}`;
    } else if (apenasNumeros.length <= 7) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
    } else {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
    }
  };

  const handleContatoChange = (e) => {
    const valorFormatado = formatarTelefone(e.target.value);
    setContatoEmergencia(valorFormatado);
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    
    // Valida se há sintomas (texto ou áudio)
    if (!sintomas && !audioBlob) {
      alert('Por favor, descreva seus sintomas por texto ou áudio.');
      return;
    }

    // Salva os dados da triagem
    const dadosTriagem = {
      sintomas,
      tempoSintomas,
      sintomasAudio: audioBlob ? 'Áudio gravado' : null,
      alergias,
      intolerancia,
      doencasPreExistentes,
      contatoEmergencia,
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

          {/* Opções de input */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <button
              type="button"
              onClick={() => setShowAudioOption(false)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: !showAudioOption ? '#d13636' : '#e8ecef',
                color: !showAudioOption ? 'white' : '#6c757d',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              ✏️ Texto
            </button>
            <button
              type="button"
              onClick={() => setShowAudioOption(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: showAudioOption ? '#d13636' : '#e8ecef',
                color: showAudioOption ? 'white' : '#6c757d',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🎤 Áudio
            </button>
          </div>

          {!showAudioOption ? (
            <textarea
              className="form-input"
              placeholder="Descreva seus sintomas detalhadamente..."
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
              rows="3"
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          ) : (
            <div style={{
              border: '2px solid #e8ecef',
              borderRadius: '16px',
              padding: '20px',
              background: '#f8f9fa',
              textAlign: 'center'
            }}>
              {!audioBlob ? (
                <div>
                  {!isRecording ? (
                    <div>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎤</div>
                      <p style={{ color: '#6c757d', marginBottom: '16px', fontSize: '14px' }}>
                        Toque para gravar seus sintomas
                      </p>
                      <button
                        type="button"
                        onClick={startRecording}
                        style={{
                          padding: '12px 24px',
                          background: 'linear-gradient(135deg, #d13636 0%, #ff4757 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        🔴 Iniciar Gravação
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ 
                        fontSize: '48px', 
                        marginBottom: '16px',
                        animation: 'pulse 1s infinite',
                        color: '#d13636'
                      }}>
                        🔴
                      </div>
                      <p style={{ color: '#d13636', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
                        Gravando... Fale agora!
                      </p>
                      <button
                        type="button"
                        onClick={stopRecording}
                        style={{
                          padding: '12px 24px',
                          background: '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        ⏹️ Parar Gravação
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '48px', marginBottom: '16px', color: '#28a745' }}>✅</div>
                  <p style={{ color: '#28a745', marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
                    Áudio gravado com sucesso!
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={playAudio}
                      style={{
                        padding: '10px 20px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      ▶️ Escutar
                    </button>
                    <button
                      type="button"
                      onClick={cancelAudio}
                      style={{
                        padding: '10px 20px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        cancelAudio();
                        startRecording();
                      }}
                      style={{
                        padding: '10px 20px',
                        background: '#ffc107',
                        color: '#212529',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      🔄 Gravar Novo
                    </button>
                  </div>
                  <audio 
                    ref={audioRef} 
                    src={audioUrl} 
                    preload="auto"
                    controls={false}
                    style={{ display: 'none' }}
                    onError={(e) => {
                      console.error('Erro no elemento de áudio:', e);
                      alert('Erro ao carregar o áudio. Tente gravar novamente.');
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="form-group">
          <div className="question-text">
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '24px',
                background: 'linear-gradient(135deg, #6c63ff 0%, #5a52d5 100%)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ⏰
              </div>
              Há quanto tempo você está sentindo isso?
            </span>
          </div>
          
          <input
            type="text"
            className="form-input"
            placeholder="Ex: 2 dias, 1 semana, algumas horas..."
            value={tempoSintomas}
            onChange={(e) => setTempoSintomas(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '2px solid #e8ecef',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#6c63ff'}
            onBlur={(e) => e.target.style.borderColor = '#e8ecef'}
          />
        </div>

        <div className="form-group">
          <div className="question-text">
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '24px',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📞
              </div>
              Contato de emergência
            </span>
          </div>
          
          <input
            type="tel"
            className="form-input"
            placeholder="(99) 99999-9999"
            value={contatoEmergencia}
            onChange={handleContatoChange}
            maxLength="15"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '2px solid #e8ecef',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
            onBlur={(e) => e.target.style.borderColor = '#e8ecef'}
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
              Tem alergias à algum medicamento?
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              background: temAlergias ? '#e8f5e8' : 'transparent',
              border: `2px solid ${temAlergias ? '#28a745' : '#e8ecef'}`,
              transition: 'all 0.3s ease'
            }}>
              <input
                type="checkbox"
                checked={temAlergias}
                onChange={(e) => {
                  setTemAlergias(e.target.checked);
                  if (!e.target.checked) {
                    setAlergias('');
                  }
                }}
                style={{ 
                  width: '18px', 
                  height: '18px',
                  accentColor: '#28a745'
                }}
              />
              <span style={{ fontWeight: '500', color: temAlergias ? '#28a745' : '#6c757d' }}>
                ✅ Sim, tenho alergias
              </span>
            </label>
          </div>

          {temAlergias && (
            <textarea
              className="form-input"
              placeholder="Ex: Penicilina, Aspirina, Dipirona..."
              value={alergias}
              onChange={(e) => setAlergias(e.target.value)}
              rows="2"
              style={{ 
                resize: 'vertical', 
                minHeight: '60px',
                animation: 'fadeIn 0.3s ease',
                border: '2px solid #ff6b6b'
              }}
            />
          )}
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
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              background: temIntolerancia ? '#e8f5e8' : 'transparent',
              border: `2px solid ${temIntolerancia ? '#28a745' : '#e8ecef'}`,
              transition: 'all 0.3s ease'
            }}>
              <input
                type="checkbox"
                checked={temIntolerancia}
                onChange={(e) => {
                  setTemIntolerancia(e.target.checked);
                  if (!e.target.checked) {
                    setIntolerancia('');
                  }
                }}
                style={{ 
                  width: '18px', 
                  height: '18px',
                  accentColor: '#28a745'
                }}
              />
              <span style={{ fontWeight: '500', color: temIntolerancia ? '#28a745' : '#6c757d' }}>
                ✅ Sim, tenho intolerâncias
              </span>
            </label>
          </div>

          {temIntolerancia && (
            <textarea
              className="form-input"
              placeholder="Ex: lactose, glúten, nozes, frutos do mar..."
              value={intolerancia}
              onChange={(e) => setIntolerancia(e.target.value)}
              rows="2"
              style={{ 
                resize: 'vertical', 
                minHeight: '60px',
                animation: 'fadeIn 0.3s ease',
                border: '2px solid #4ecdc4'
              }}
            />
          )}
        </div>

        <div className="form-group">
          <div className="question-text">
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '24px',
                background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🏥
              </div>
              Tem alguma doença pré-existente?
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              background: temDoencasPreExistentes ? '#e8f5e8' : 'transparent',
              border: `2px solid ${temDoencasPreExistentes ? '#28a745' : '#e8ecef'}`,
              transition: 'all 0.3s ease'
            }}>
              <input
                type="checkbox"
                checked={temDoencasPreExistentes}
                onChange={(e) => {
                  setTemDoencasPreExistentes(e.target.checked);
                  if (!e.target.checked) {
                    setDoencasPreExistentes('');
                  }
                }}
                style={{ 
                  width: '18px', 
                  height: '18px',
                  accentColor: '#28a745'
                }}
              />
              <span style={{ fontWeight: '500', color: temDoencasPreExistentes ? '#28a745' : '#6c757d' }}>
                ✅ Sim, tenho doenças pré-existentes
              </span>
            </label>
          </div>

          {temDoencasPreExistentes && (
            <textarea
              className="form-input"
              placeholder="Ex: diabetes, hipertensão, asma, problemas cardíacos..."
              value={doencasPreExistentes}
              onChange={(e) => setDoencasPreExistentes(e.target.value)}
              rows="2"
              style={{ 
                resize: 'vertical', 
                minHeight: '60px',
                animation: 'fadeIn 0.3s ease',
                border: '2px solid #9b59b6'
              }}
            />
          )}
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