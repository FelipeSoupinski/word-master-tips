const STORAGE_KEY = 'dicaDeMestreProgress';

/**
 * Recupera todo o progresso armazenado.
 * @returns {Object} Um objeto com os IDs das fases como chave e o número de estrelas (1-3) como valor.
 */
export function getAllProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Erro ao ler progresso do localStorage:', error);
    return {};
  }
}

/**
 * Salva a pontuação (estrelas) de uma fase.
 * Apenas atualiza se a nova pontuação for maior que a salva anteriormente.
 * @param {string} levelId - ID da fase (ex: 'default-fase1').
 * @param {number} stars - Número de estrelas (1 a 3).
 */
export function saveLevelProgress(levelId, stars) {
  try {
    const progress = getAllProgress();
    const currentStars = progress[levelId] || 0;

    // Só atualiza se for maior
    if (stars > currentStars) {
      progress[levelId] = stars;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  } catch (error) {
    console.error('Erro ao salvar progresso no localStorage:', error);
  }
}
