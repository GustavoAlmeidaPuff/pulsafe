# PulSafe - Sistema de Triagem Médica Inteligente

## 🏥 Sobre o Projeto

PulSafe é uma solução inovadora para otimizar o processo de triagem médica em hospitais e unidades de saúde. O sistema utiliza uma pulseira inteligente que monitora sinais vitais e gera um QR code para acesso rápido ao sistema de triagem.

## 🚀 Funcionalidades

- **Login Rápido**: Acesso via CPF e data de nascimento
- **Triagem Automática**: Questionário inteligente sobre sintomas, alergias e intolerâncias
- **Monitoramento de Sinais Vitais**: Exibição de pressão arterial, BPM, saturação e temperatura
- **Sistema de Prioridade**: Classificação automática por cores (Verde, Azul, Amarelo, Vermelho)
- **Tempo Estimado**: Cálculo do tempo de espera baseado na prioridade

## 🎨 Design

- Paleta de cores: Branco e vermelho (#d13636)
- Interface mobile-first e responsiva
- Design inspirado na interface da pulseira

## 🛠️ Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm start
   ```

3. **Acessar a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📱 Fluxo de Uso

1. **Escaneie o QR Code** da pulseira 607B
2. **Faça login** com CPF e data de nascimento
3. **Responda** às perguntas de triagem
4. **Visualize** sua ficha com dados vitais e tempo estimado

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── Login.js          # Tela de login
│   ├── Triagem.js        # Questionário de triagem
│   └── FichaPaciente.js  # Ficha com dados vitais
├── App.js                # Roteamento principal
├── App.css               # Estilos globais
└── index.js              # Ponto de entrada
```

## 🚨 Sistema de Prioridade

- **🔴 Vermelho**: Emergência (5 min) - Dor no peito, falta de ar, desmaio
- **🟡 Amarelo**: Urgente (20 min) - Febre alta, dor intensa, vômito
- **🔵 Azul**: Semi-urgente (30 min) - Febre, dor, tontura
- **🟢 Verde**: Não urgente (40 min) - Sintomas leves

## 🔧 Tecnologias

- React 18
- React Router DOM
- CSS3 com design responsivo
- LocalStorage para persistência

## 📝 Licença

Projeto desenvolvido para hackathon - Uso educacional e demonstrativo.