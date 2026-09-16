# Dica de Mestre

Um jogo de dedução de palavras (estilo Codenames) focado em uma experiência Single-Player ágil e desafiadora. O jogo é **100% Frontend (Client-Side)**.

## 🎮 Visão Geral

No "Dica de Mestre", você assume o papel de **Cabeça Oca** (Adivinhador) enquanto uma "IA Mestre" pré-computada fornece dicas que conectam múltiplas palavras do tabuleiro. O objetivo é acertar todas as 25 palavras da fase antes de perder suas 3 vidas.

**Destaques:**
- **Zero Backend**: Todo o processamento de regras, vidas e turnos ocorre no navegador.
- **Carregamento Instantâneo**: Fases geradas offline por IA e embutidas estaticamente no app (via JSON).
- **Ajuste Dinâmico**: O motor (`gameProcessor.js`) recalcula alvos em tempo real caso o jogador já tenha revelado cartas que fariam parte da próxima dica.

## 🛠️ Tecnologias

- **Frontend**: React, Vite
- **Roteamento**: React Router
- **Estilização**: CSS Modules / CSS Nativo + FontAwesome
- **Engine**: Lógica pura em JavaScript para o motor de jogo.

## 🚀 Como Rodar Localmente

### Via Docker
O projeto conta com um `docker-compose.yml` já configurado.

```bash
# Na raiz do projeto:
docker-compose up --build -d
```
Acesse `http://localhost:3000` no seu navegador.

### Via NPM (Node.js)
Caso prefira rodar sem o Docker:

```bash
cd frontend
npm install
npm run dev
```
Acesse o link local (geralmente `http://localhost:5173`) gerado pelo Vite.

## 🏗️ Estrutura do Projeto

```text
dica_de_mestre/
├── frontend/                 # Todo o código-fonte da aplicação React
│   ├── src/
│   │   ├── components/       # Componentes de UI
│   │   ├── games/            # Fases e pacotes de palavras (.json)
│   │   └── services/         # Lógica do jogo (gameProcessor.js)
├── requirements-dica-de-mestre/  # Documentação de Requisitos
├── docker-compose.yml        # Setup Docker
└── .agent/ & openspec/       # Ferramentas de IA / Arquitetura OpenSpec
```
