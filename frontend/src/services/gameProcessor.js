import defaultGames from '../games/default-games.json';
import themedGames from '../games/themed-games.json';

// In-memory static database
const ALL_GAMES = [defaultGames, themedGames];

class GameProcessor {
  constructor() {
    this.matchState = null;
  }

  getAvailableGames() {
    return ALL_GAMES.map((game, index) => ({
      id: index,
      name: game.gameName
    }));
  }

  getLevelsForGame(gameId) {
    const game = ALL_GAMES[gameId];
    if (!game) return [];
    
    return game.levels.map(level => ({
      id: level.id,
      name: level.subject || `Fase ${level.id}`
    }));
  }

  // Starts a level and generates the initial Match state
  startGame(gameId, levelId) {
    const game = ALL_GAMES[gameId];
    if (!game) throw new Error("Game not found");

    const levelData = game.levels.find(l => l.id === levelId);
    if (!levelData) throw new Error("Level not found");

    // Deep copy to prevent mutating the imported JSON
    const level = JSON.parse(JSON.stringify(levelData));

    // Shuffle words
    const shuffledWords = [...level.words];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }

    this.matchState = {
      state: 'master_turn',
      words: shuffledWords,
      hints: level.hints, // Precomputed hints
      guessedWords: [],
      correctGuesses: [],
      wrongGuesses: [],
      lives: 3,
      currentHint: null,
      currentTargets: 0,
      targetWords: [],
      result: null
    };

    this.executeMasterTurn();
    return this.getState();
  }

  executeMasterTurn() {
    if (this.matchState.state !== 'master_turn') return;
    
    // Find the next valid hint from the precomputed list
    while (this.matchState.hints.length > 0) {
      const nextHint = this.matchState.hints.shift();
      
      // Filter out targets that are already guessed/removed
      const remainingBoardWords = this.matchState.words.filter(w => !this.matchState.guessedWords.includes(w) && !this.matchState.wrongGuesses.includes(w));
      const validTargets = nextHint.targets.filter(w => remainingBoardWords.includes(w));
      
      if (validTargets.length > 0) {
        this.matchState.currentHint = nextHint.hint;
        this.matchState.currentTargets = validTargets.length;
        this.matchState.targetWords = validTargets;
        this.matchState.state = 'guesser_turn';
        return;
      }
    }

    // If we run out of hints, the game is broken (shouldn't happen with good AI)
    if (this.matchState.result === null) {
      this.matchState.state = 'finished';
      this.matchState.result = 'defeat';
    }
  }

  guessWord(word) {
    if (this.matchState.state !== 'guesser_turn') return this.getState();
    if (this.matchState.guessedWords.includes(word) || this.matchState.wrongGuesses.includes(word)) return this.getState();

    let correct = false;

    if (this.matchState.targetWords.includes(word)) {
      // Correct guess
      correct = true;
      this.matchState.guessedWords.push(word);
      this.matchState.correctGuesses.push(word);
      this.matchState.currentTargets--;

      // Check win condition
      if (this.matchState.correctGuesses.length === this.matchState.words.length) {
        this.matchState.state = 'finished';
        this.matchState.result = 'victory';
      } else if (this.matchState.currentTargets <= 0) {
        // Hint completed, master's turn
        this.matchState.state = 'master_turn';
        this.executeMasterTurn();
      }
    } else {
      // Wrong guess
      correct = false;
      this.matchState.lives--;
      this.matchState.wrongGuesses.push(word);

      if (this.matchState.lives <= 0) {
        this.matchState.state = 'finished';
        this.matchState.result = 'defeat';
      }
    }

    return {
      correct,
      ...this.getState()
    };
  }

  getState() {
    return {
      state: this.matchState.state,
      words: this.matchState.words,
      guessedWords: this.matchState.guessedWords,
      correctGuesses: this.matchState.correctGuesses,
      wrongGuesses: this.matchState.wrongGuesses,
      currentHint: this.matchState.currentHint,
      currentTargets: this.matchState.currentTargets,
      targetWords: this.matchState.targetWords,
      lives: this.matchState.lives,
      result: this.matchState.result
    };
  }
}

// Singleton instance
export const processor = new GameProcessor();
