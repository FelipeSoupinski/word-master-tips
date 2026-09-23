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

const ATTEMPTS_KEY = 'dicaDeMestreAttempts';

export function getAllAttempts() {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Erro ao ler tentativas do localStorage:', error);
    return {};
  }
}

export function getAttempts(levelId) {
  const attempts = getAllAttempts();
  return attempts[levelId] || 0;
}

export function incrementAttempt(levelId) {
  try {
    const attempts = getAllAttempts();
    const current = attempts[levelId] || 0;
    attempts[levelId] = current + 1;
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (error) {
    console.error('Erro ao salvar tentativas no localStorage:', error);
  }
}

const BEST_TIMES_KEY = 'dicaDeMestreBestTimes';

export function getBestTime(levelId) {
  try {
    const data = localStorage.getItem(BEST_TIMES_KEY);
    const times = data ? JSON.parse(data) : {};
    return times[levelId] || null;
  } catch (error) {
    console.error('Erro ao ler best times do localStorage:', error);
    return null;
  }
}

export function saveBestTime(levelId, timeInSeconds) {
  try {
    const data = localStorage.getItem(BEST_TIMES_KEY);
    const times = data ? JSON.parse(data) : {};
    const currentBest = times[levelId];

    if (currentBest === undefined || currentBest === null || timeInSeconds < currentBest) {
      times[levelId] = timeInSeconds;
      localStorage.setItem(BEST_TIMES_KEY, JSON.stringify(times));
    }
  } catch (error) {
    console.error('Erro ao salvar best time no localStorage:', error);
  }
}

export function getAllBestTimes() {
  try {
    const data = localStorage.getItem(BEST_TIMES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Erro ao ler best times do localStorage:', error);
    return {};
  }
}
