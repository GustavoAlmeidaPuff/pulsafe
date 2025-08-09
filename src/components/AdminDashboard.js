import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Dados de demonstração das pulseiras ativas
  const [pulseiras] = useState([
    {
      id: 'PUL001',
      paciente: 'Maria Silva Santos',
      idade: 45,
      sexo: 'F',
      prioridade: 'ALTA',
      cor: '#ff6b35', // Laranja-vermelho - alta prioridade
      entrada: '2024-01-15 08:30',
      sintomas: 'Tô com dor no peito e falta de ar',
              alergias: [],
        intolerancia: [],
        temAlergias: false,
        temIntolerancia: false,
      status: 'Aguardando consulta',
      medico: 'Dr. João Cardiologista',
      setor: 'Cardiologia'
    },
    {
      id: 'PUL002',
      paciente: 'José Carlos Oliveira',
      idade: 62,
      sexo: 'M',
      prioridade: 'CRÍTICA',
      cor: '#ff3838', // Vermelho escuro - crítica
      entrada: '2024-01-15 09:15',
      sintomas: 'Dor muito forte no peito que não passa',
              alergias: ['Amendoim'],
        intolerancia: [],
        temAlergias: true,
        temIntolerancia: false,
      status: 'Em atendimento',
      medico: 'Dr. Ana Emergencista',
      setor: 'UTI'
    },
    {
      id: 'PUL003',
      paciente: 'Ana Paula Costa',
      idade: 28,
      sexo: 'F',
      prioridade: 'MÉDIA',
      cor: '#ffa502', // Laranja - média prioridade
      entrada: '2024-01-15 10:00',
      sintomas: 'Tô com febre e uma tosse seca que não para',
              alergias: [],
        intolerancia: [],
        temAlergias: false,
        temIntolerancia: false,
      status: 'Aguardando exames',
      medico: 'Dr. Pedro Clínico',
      setor: 'Clínica Médica'
    },
    {
      id: 'PUL004',
      paciente: 'Roberto Mendes',
      idade: 35,
      sexo: 'M',
      prioridade: 'BAIXA',
      cor: '#2ed573', // Verde - baixa prioridade
      entrada: '2024-01-15 10:30',
      sintomas: 'Dor de cabeça que não passa com remédio',
      alergias: [],
      intolerancia: [],
      temAlergias: false,
      temIntolerancia: false,
      status: 'Aguardando consulta',
      medico: 'Dra. Mariana Neurologista',
      setor: 'Neurologia'
    },
    {
      id: 'PUL005',
      paciente: 'Francisca Souza',
      idade: 78,
      sexo: 'F',
      prioridade: 'ALTA',
      cor: '#ff6b35',
      entrada: '2024-01-15 11:00',
      sintomas: 'Tô meio confusa e com tontura',
              alergias: [],
        intolerancia: ['Lactose'],
        temAlergias: false,
        temIntolerancia: true,
      status: 'Em atendimento',
      medico: 'Dr. Carlos Geriatra',
      setor: 'Geriatria'
    },
    {
      id: 'PUL006',
      paciente: 'Lucas Ferreira',
      idade: 22,
      sexo: 'M',
      prioridade: 'MÉDIA',
      cor: '#ffa502',
      entrada: '2024-01-15 11:30',
      sintomas: 'Quebrei o braço, tá doendo muito',
              alergias: [],
        intolerancia: [],
        temAlergias: false,
        temIntolerancia: false,
      status: 'Aguardando cirurgia',
      medico: 'Dr. Rafael Ortopedista',
      setor: 'Ortopedia'
    },
    {
      id: 'PUL007',
      paciente: 'Carmen Rodriguez',
      idade: 41,
      sexo: 'F',
      prioridade: 'BAIXA',
      cor: '#2ed573',
      entrada: '2024-01-15 12:00',
      sintomas: 'Vim fazer os exames de rotina, pressão alta',
              alergias: [],
        intolerancia: [],
        temAlergias: false,
        temIntolerancia: false,
      status: 'Aguardando consulta',
      medico: 'Dra. Isabel Cardiologista',
      setor: 'Cardiologia'
    },
    {
      id: 'PUL008',
      paciente: 'Eduardo Santos',
      idade: 55,
      sexo: 'M',
      prioridade: 'CRÍTICA',
      cor: '#ff3838',
      entrada: '2024-01-15 12:30',
      sintomas: 'Não consigo mover o lado direito do corpo',
              alergias: ['Picada de abelha'],
        intolerancia: [],
        temAlergias: true,
        temIntolerancia: false,
      status: 'Em cirurgia',
      medico: 'Dr. Marcos Neurocirurgião',
      setor: 'Neurocirurgia'
    },
    {
      id: 'PUL009',
      paciente: 'Sandra Lima',
      idade: 33,
      sexo: 'F',
      prioridade: 'MÉDIA',
      cor: '#ffa502',
      entrada: '2024-01-15 13:00',
      sintomas: 'Tô vomitando muito e com dor na barriga',
              alergias: [],
        intolerancia: [],
        temAlergias: false,
        temIntolerancia: false,
      status: 'Aguardando consulta',
      medico: 'Dr. Felipe Gastro',
      setor: 'Gastroenterologia'
    },
    {
      id: 'PUL010',
      paciente: 'Antônio Silva',
      idade: 67,
      sexo: 'M',
      prioridade: 'BAIXA',
      cor: '#2ed573',
      entrada: '2024-01-15 13:30',
      sintomas: 'Dor nas costas que começou ontem',
              alergias: [],
        intolerancia: ['Glúten'],
        temAlergias: false,
        temIntolerancia: true,
      status: 'Aguardando consulta',
      medico: 'Dra. Rita Ortopedista',
      setor: 'Ortopedia'
    },
    {
      id: 'PUL011',
      paciente: 'Juliana Santos',
      idade: 19,
      sexo: 'F',
      prioridade: 'ALTA',
      cor: '#ff6b35',
      entrada: '2024-01-15 14:00',
      sintomas: 'Não consigo respirar direito, parece que vai dar ataque',
      alergias: [],
      intolerancia: [],
      temAlergias: false,
      temIntolerancia: false,
      status: 'Em atendimento',
      medico: 'Dr. Luis Pneumologista',
      setor: 'Pneumologia'
    },
    {
      id: 'PUL012',
      paciente: 'Carlos Eduardo',
      idade: 44,
      sexo: 'M',
      prioridade: 'BAIXA',
      cor: '#2ed573',
      entrada: '2024-01-15 14:30',
      sintomas: 'Machucei o pé jogando bola, tá inchado',
      alergias: [],
      intolerancia: [],
      temAlergias: false,
      temIntolerancia: false,
      status: 'Aguardando exames',
      medico: 'Dr. Marcelo Ortopedista',
      setor: 'Ortopedia'
    }
  ]);

  const [filtros, setFiltros] = useState({
    prioridade: '',
    temAlergias: '',
    temIntolerancia: '',
    busca: ''
  });

  const [ordenacao, setOrdenacao] = useState({
    campo: 'entrada',
    direcao: 'desc'
  });

  // Função para ordenar pulseiras
  const pulseirasOrdenadas = useMemo(() => {
    let resultado = [...pulseiras];

    // Aplicar filtros
    if (filtros.prioridade) {
      resultado = resultado.filter(p => p.prioridade === filtros.prioridade);
    }
    if (filtros.temAlergias !== '') {
      resultado = resultado.filter(p => p.temAlergias === (filtros.temAlergias === 'true'));
    }
    if (filtros.temIntolerancia !== '') {
      resultado = resultado.filter(p => p.temIntolerancia === (filtros.temIntolerancia === 'true'));
    }
    if (filtros.busca) {
      resultado = resultado.filter(p => 
        p.paciente.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        p.id.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        p.sintomas.toLowerCase().includes(filtros.busca.toLowerCase())
      );
    }

    // Aplicar ordenação
    resultado.sort((a, b) => {
      let valorA = a[ordenacao.campo];
      let valorB = b[ordenacao.campo];

      if (ordenacao.campo === 'entrada') {
        valorA = new Date(valorA);
        valorB = new Date(valorB);
      }

      if (valorA < valorB) {
        return ordenacao.direcao === 'asc' ? -1 : 1;
      }
      if (valorA > valorB) {
        return ordenacao.direcao === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return resultado;
  }, [pulseiras, filtros, ordenacao]);

  const handleOrdenacao = (campo) => {
    setOrdenacao(prev => ({
      campo,
      direcao: prev.campo === campo && prev.direcao === 'asc' ? 'desc' : 'asc'
    }));
  };

  const limparFiltros = () => {
    setFiltros({
      prioridade: '',
      temAlergias: '',
      temIntolerancia: '',
      busca: ''
    });
  };

  const formatarHora = (datetime) => {
    return new Date(datetime).toLocaleString('pt-BR');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>🏥 PULSAFE - Painel Administrativo</h1>
          <p style={styles.subtitle}>
            Monitoramento de Pulseiras Ativas - {pulseirasOrdenadas.length} pacientes
          </p>
        </div>
        <button 
          onClick={() => navigate('/')} 
          style={styles.backButton}
        >
          ← Voltar
        </button>
      </div>

      {/* Área de Filtros */}
      <div style={styles.filterArea}>
        <div style={styles.filterRow}>
          <input
            type="text"
            placeholder="🔍 Buscar paciente, ID ou sintomas..."
            value={filtros.busca}
            onChange={(e) => setFiltros(prev => ({...prev, busca: e.target.value}))}
            style={styles.searchInput}
          />
          
          <select
            value={filtros.prioridade}
            onChange={(e) => setFiltros(prev => ({...prev, prioridade: e.target.value}))}
            style={styles.filterSelect}
          >
            <option value="">Todas as Prioridades</option>
            <option value="CRÍTICA">🔴 Crítica</option>
            <option value="ALTA">🟠 Alta</option>
            <option value="MÉDIA">🟡 Média</option>
            <option value="BAIXA">🟢 Baixa</option>
          </select>




        </div>

        <div style={styles.filterRow}>
          <select
            value={filtros.temAlergias}
            onChange={(e) => setFiltros(prev => ({...prev, temAlergias: e.target.value}))}
            style={styles.filterSelect}
          >
            <option value="">Alergias - Todos</option>
            <option value="true">🚨 Com Alergias</option>
            <option value="false">✅ Sem Alergias</option>
          </select>

          <select
            value={filtros.temIntolerancia}
            onChange={(e) => setFiltros(prev => ({...prev, temIntolerancia: e.target.value}))}
            style={styles.filterSelect}
          >
            <option value="">Intolerâncias - Todos</option>
            <option value="true">⚠️ Com Intolerâncias</option>
            <option value="false">✅ Sem Intolerâncias</option>
          </select>

          <button onClick={limparFiltros} style={styles.clearButton}>
            🗑️ Limpar Filtros
          </button>
        </div>
      </div>

      {/* Tabela de Pulseiras */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th} onClick={() => handleOrdenacao('id')}>
                ID Pulseira {ordenacao.campo === 'id' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
              </th>
              <th style={styles.th} onClick={() => handleOrdenacao('paciente')}>
                Paciente {ordenacao.campo === 'paciente' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
              </th>
              <th style={styles.th} onClick={() => handleOrdenacao('prioridade')}>
                Prioridade {ordenacao.campo === 'prioridade' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
              </th>
              <th style={styles.th} onClick={() => handleOrdenacao('entrada')}>
                Entrada {ordenacao.campo === 'entrada' && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
              </th>
              <th style={styles.th}>Sintomas</th>
              <th style={styles.th}>Alergias/Intolerâncias</th>
            </tr>
          </thead>
          <tbody>
            {pulseirasOrdenadas.map((pulseira) => (
              <tr key={pulseira.id} style={{...styles.tableRow, borderLeft: `5px solid ${pulseira.cor}`}}>
                <td style={styles.td}>
                  <div style={{...styles.pulseiraBadge, backgroundColor: pulseira.cor}}>
                    {pulseira.id}
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.patientInfo}>
                    <strong>{pulseira.paciente}</strong>
                    <small>{pulseira.idade} anos, {pulseira.sexo}</small>
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={{...styles.priorityBadge, backgroundColor: pulseira.cor}}>
                    {pulseira.prioridade}
                  </span>
                </td>
                <td style={styles.td}>
                  <small>{formatarHora(pulseira.entrada)}</small>
                </td>
                <td style={styles.td}>
                  <div style={styles.sintomas}>
                    {pulseira.sintomas}
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={styles.allergiesContainer}>
                    {pulseira.temAlergias && (
                      <div style={styles.allergySection}>
                        <span style={styles.allergyLabel}>🚨 Alergias:</span>
                        <div style={styles.allergyList}>
                          {pulseira.alergias.map((alergia, idx) => (
                            <span key={idx} style={styles.allergyItem}>{alergia}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {pulseira.temIntolerancia && (
                      <div style={styles.allergySection}>
                        <span style={styles.intoleranceLabel}>⚠️ Intolerâncias:</span>
                        <div style={styles.allergyList}>
                          {pulseira.intolerancia.map((intol, idx) => (
                            <span key={idx} style={styles.intoleranceItem}>{intol}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {!pulseira.temAlergias && !pulseira.temIntolerancia && (
                      <span style={styles.noAllergies}>✅ Sem restrições</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pulseirasOrdenadas.length === 0 && (
        <div style={styles.noResults}>
          <p>Nenhuma pulseira encontrada com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  headerLeft: {
    flex: 1
  },
  title: {
    color: '#2c3e50',
    margin: '0 0 5px 0',
    fontSize: '28px',
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#7f8c8d',
    margin: 0,
    fontSize: '16px'
  },
  backButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  filterArea: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  filterRow: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    flexWrap: 'wrap'
  },
  searchInput: {
    flex: '2',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px'
  },
  filterSelect: {
    flex: '1',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: 'white'
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#34495e'
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none'
  },
  tableRow: {
    borderBottom: '1px solid #eee',
    '&:hover': {
      backgroundColor: '#f8f9fa'
    }
  },
  td: {
    padding: '15px',
    verticalAlign: 'top'
  },
  pulseiraBadge: {
    color: 'white',
    padding: '8px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  patientInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  priorityBadge: {
    color: 'white',
    padding: '6px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  sintomas: {
    maxWidth: '200px',
    wordWrap: 'break-word'
  },
  allergiesContainer: {
    maxWidth: '250px'
  },
  allergySection: {
    marginBottom: '10px'
  },
  allergyLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#e74c3c',
    display: 'block',
    marginBottom: '5px'
  },
  intoleranceLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#f39c12',
    display: 'block',
    marginBottom: '5px'
  },
  allergyList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px'
  },
  allergyItem: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    border: '1px solid #ffcdd2'
  },
  intoleranceItem: {
    backgroundColor: '#fff3e0',
    color: '#ef6c00',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '11px',
    border: '1px solid #ffcc02'
  },
  noAllergies: {
    color: '#4caf50',
    fontSize: '12px',
    fontWeight: 'bold'
  },


  noResults: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: 'white',
    borderRadius: '10px',
    marginTop: '20px',
    color: '#666'
  }
};

export default AdminDashboard;