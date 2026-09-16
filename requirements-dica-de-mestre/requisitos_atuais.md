# Documentação de Requisitos - Dica de Mestre

Este documento detalha os requisitos atuais e o funcionamento geral do jogo "Dica de Mestre", focando na arquitetura single-player baseada em fases pré-computadas (geradas por Inteligência Artificial offline).

## 1. Visão Geral do Jogo
"Dica de Mestre" é um jogo de dedução de palavras (inspirado em Codenames). 
No modo Single-Player:
- O **Usuário** assume o papel de **Cabeça Oca** (Guesser/Adivinhador).
- A **Inteligência Artificial (Bot)** assume o papel de **Mestre** (Fornecedor das Dicas).
- O tabuleiro possui **25 cartas (palavras)** visíveis.
- O objetivo é acertar todas as 25 palavras através das dicas do mestre, antes de perder todas as vidas.

## 2. Estrutura de Fases (Campanha)
O jogo abandonou a geração em tempo real (que exigia backend pesado) para utilizar um sistema de fases temáticas pré-computadas. Isso elimina o tempo de carregamento e as falhas de respostas do modelo de IA durante o jogo.

### 2.1 O Modelo de Fases
- O jogo oferece diversas **fases exclusivas** selecionáveis no menu principal (Frontend).
- Cada fase (Level) contém:
  - 25 palavras específicas (com base em um tema ou campanha geral).
  - Uma sequência de "Dicas de Mestre" (clusters) já computada para cobrir exatamente as 25 cartas sem sobreposições indevidas.

## 3. Dinâmica de Gameplay

### 3.1 Vidas e Condições de Vitória/Derrota
- **Vidas:** O jogador inicia com **3 Vidas**.
- **Vitória:** Revelar as 25 cartas da fase corretamente.
- **Derrota:** Errar cartas o suficiente para zerar as vidas.

### 3.2 O Turno do Mestre (Bot)
- O Bot sempre fornece a dica **seguinte** baseando-se no arquivo JSON pré-computado correspondente.
- O Bot verifica as cartas "alvo" daquela dica contra as cartas que *ainda estão no tabuleiro*.
- **Ajuste Dinâmico:** Se a IA planejou uma dica para 4 cartas, mas o jogador (por engano em uma rodada anterior) clicou em 1 dessas cartas e ela já saiu do tabuleiro, o Bot recalcula o número e exibe a dica como sendo para 3 cartas.
- Se todas as cartas alvo já tiverem saído, o Bot descarta essa dica e passa imediatamente para a próxima.

### 3.3 O Turno do Jogador (Adivinhador)
- O jogador recebe a dica do mestre e o número `N` (ex: "ANIMAL x3").
- Ele deve clicar nas cartas do tabuleiro que acredita corresponder à dica e confirmar.
- **Acerto:** A carta é revelada, o contador de alvos da dica atual diminui. Se zerar, o turno volta para o mestre (que dá a próxima dica).
- **Erro:** O jogador perde 1 vida, a carta errada é desativada (sai do *pool*), e o turno permanece com o jogador até ele acertar as cartas restantes da dica atual, ou morrer.

## 4. O Motor de Geração (IA Offline Externa)
O processo de criação de novas fases não faz parte da aplicação do jogo. Ele é feito totalmente à parte (através de prompts no Gemini, por exemplo) para construir e formatar os arquivos JSON, que são então importados estaticamente no código.

## 5. Arquitetura e Comunicação
A aplicação é **encapsulada 100% no Frontend** (Client-Side) com React (Vite).
- **Zero Backend e Zero Bancos de Dados:** Não há necessidade de servidores Node, Python, Ollama ou Postgres. O jogo vive inteiramente no navegador.
- **Processamento de Regras:** A lógica de estado da partida, verificação de vitória, subtração de vidas e transição de turnos vive nativamente no `gameProcessor.js` dentro do React.
- **Data Source:** Os pacotes de jogos são importados estaticamente diretamente no bundle do Frontend (`frontend/src/games/default-games.json` e `frontend/src/games/themed-games.json`). Cada arquivo possui uma estrutura em árvore. O jogador seleciona a Campanha na tela inicial e, em seguida, a Fase desejada.
