const SarcasticLines = {
  hit: {
    low: [
      "Milagre.",
      "Foi no chute, certeza.",
      "Até que enfim.",
      "Nada mal... pra você.",
      "Aceitável."
    ],
    high: [
      "Não vai se achando, foi sorte.",
      "Tá roubando?",
      "Deixei essa fácil pra você.",
      "Olha só, sabe ler mentes agora?",
      "Impressionante. Deve ter sido sem querer."
    ]
  },
  miss: {
    low: [
      "Tá difícil aí?",
      "Sério? Essa?",
      "Meus olhos doem.",
      "Melhore.",
      "Pensa um pouco antes de clicar."
    ],
    high: [
      "Quer que eu jogue por você?",
      "Tá tentando perder?",
      "Assim fica difícil te defender.",
      "Já desistiu ou só tá clicando aleatório?",
      "Isso é doloroso de assistir."
    ]
  }
};

export function getSarcasticFeedback(streakType, streakCount) {
  const intensity = streakCount >= 3 ? 'high' : 'low';
  const lines = SarcasticLines[streakType][intensity];
  const randomIndex = Math.floor(Math.random() * lines.length);
  return lines[randomIndex];
}
