import { GetWords } from '../../../api';
import { GetUserAgrWords } from '../../../api/get-user_words';
import { GetRandomNum } from '../../../utils/get-random-num';
import { ShuffleArray } from '../../../utils/shuffle-array';
import {
  GAME_SCORE_BASE,
  GAME_TIMER,
  MAX_PAGES_INDEX,
  // MAX_WORDS_INDEX,
} from '../constants';
import { DBActions } from './db-actions';

const defaultGameParts = {
  langLevel: 0,
  bookPage: 0,
  deck: [],
  score: [],
  streaks: [],
  timer: undefined,
  fromBook: false,
  endGame: () => {},
};

const defaultGameRound: GameRound = {
  activeWord: '',
  translation: '',
  currentStreak: 0,
  currentMultiplier: 1,
  currentScore: 0,
  giveAnswer: (val: boolean): void => {
    throw new Error('Function not implemented.');
  },
};

export class MGSprintEngine {
  private game: Game = {
    ...defaultGameParts,
    decksSeq: new Set(),
    wordsSeq: new Set(),
  };
  private currentRound: GameRound = { ...defaultGameRound };
  private gameAuth: GameAuth = { userId: '', userToken: '' };
  private dbConnector: undefined | DBActions;

  private _timer = GAME_TIMER;

  get timer() {
    return this._timer;
  }

  get statistic() {
    const wrong = this.game.score.filter((item) => !item.result);
    const right = this.game.score.filter((item) => item.result);

    return { wrong, right, score: this.currentRound.currentScore };
  }

  set langLevel(val: number) {
    this.game.langLevel = val;
  }

  set page(val: number) {
    this.game.bookPage = val;
  }

  set deck(arr: Array<Word>) {
    this.game.deck = [...arr];
    arr.forEach((word) => {
      this.game.wordsSeq.add(word._id || word.id);
    });
  }

  set auth(user: GameAuth) {
    this.gameAuth = { ...user };
    this.dbConnector = new DBActions();
    this.dbConnector.setAuth = { ...user };
  }

  private setPage(): void {
    const num = GetRandomNum(0, MAX_PAGES_INDEX);
    if (this.game.decksSeq.has(num)) {
      this.setPage();
    } else {
      this.game.bookPage = num;
      this.game.decksSeq.add(num);
    }
  }

  private async getDeck(): Promise<boolean> {
    const words = this.gameAuth.userId
      ? await GetUserAgrWords({
          page: this.game.bookPage,
          group: this.game.langLevel,
          userId: this.gameAuth.userId,
          userToken: this.gameAuth.userToken,
          wpp: 20,
        })
      : await GetWords(this.game.langLevel, this.game.bookPage);
    const prepWords: Array<Word> = this.gameAuth.userId
      ? words[0].paginatedResults
      : words;
    const unicWords = prepWords.filter((word) => {
      const id = word.id || word._id;
      return !this.game.wordsSeq.has(id as string);
    });
    this.game.deck = ShuffleArray(unicWords as Array<Word>);
    return new Promise((res) => res(true));
  }

  private setFlowScore(result: boolean): void {
    if (result) {
      this.currentRound.currentStreak += 1;
      this.currentRound.currentScore +=
        GAME_SCORE_BASE * this.currentRound.currentMultiplier;
      this.currentRound.currentMultiplier *=
        this.currentRound.currentStreak &&
        this.currentRound.currentStreak % 3 === 0
          ? 2
          : 1;
      if (this.currentRound.currentMultiplier > 8)
        this.currentRound.currentMultiplier = 8;
    } else {
      this.game.streaks.push(this.currentRound.currentStreak);
      this.currentRound.currentMultiplier = 1;
      this.currentRound.currentStreak = 0;
    }
  }

  private setScore(round: number, result: boolean): void {
    const item = this.game.deck[round];

    this.setFlowScore(result);
    if (this.dbConnector) {
      this.dbConnector.sendWordToDB(item, result);
    }

    this.game.score.push({
      id: item._id || item.id,
      word: item.word,
      translate: item.wordTranslate,
      audio: item.audio,
      result: result,
    });
  }

  private getRandomWordTranslation(round: number): string {
    const variant =
      this.game.deck[GetRandomNum(0, this.game.deck.length - 1)].wordTranslate;
    return variant !== this.game.deck[round].wordTranslate
      ? variant
      : this.getRandomWordTranslation(round);
  }

  private endRound(
    round: number,
    result: boolean,
    action: (val: number) => void
  ): void {
    this.setScore(round, result);
    const nextRound = round + 1;
    if (nextRound === this.game.deck.length) {
      if (this.game.fromBook) {
        this.stopTimer();
      } else {
        this.setPage();
        this.getDeck().then((res) => {
          if (res) action(0);
        });
      }
    } else {
      action(nextRound);
    }
  }

  private startTimer(action: (val: number) => void): void {
    this.game.timer = window.setInterval(() => {
      this._timer -= 1;
      if (this._timer === 0) {
        this.stopTimer();
      }
      action(this._timer);
    }, 1000);
  }

  private stopTimer(): void {
    this.game.endGame();
    if (this.dbConnector) {
      this.dbConnector.updateDBStatistic(
        this.game.score,
        this.game.streaks,
        this.currentRound.currentStreak
      );
    }
    clearInterval(this.game.timer);
    this._timer = GAME_TIMER;
  }

  start({
    anonGame,
    switchMode,
    timerAction,
    endAction,
  }: {
    anonGame: boolean;
    switchMode: () => void;
    timerAction: (val: number) => void;
    endAction: () => void;
  }): void {
    this.game.endGame = endAction;
    if (anonGame) {
      this.game.fromBook = false;
      this.setPage();
      this.getDeck().then(() => {
        switchMode();
        this.startTimer(timerAction);
      });
    } else {
      this.game.fromBook = true;
      this.game.deck = ShuffleArray(this.game.deck);
      switchMode();
      this.startTimer(timerAction);
    }
  }

  getRound(round: number, action: (val: number) => void): GameRound {
    const word = this.game.deck[round].word;

    if (word === this.currentRound.activeWord) return this.currentRound;

    const switcher = (answer: boolean): void => {
      this.endRound(round, answer, action);
    };

    const base = {
      activeWord: word,
      currentMultiplier: this.currentRound.currentMultiplier,
      currentScore: this.currentRound.currentScore,
      currentStreak: this.currentRound.currentStreak,
    };

    return (this.currentRound =
      Math.random() > 0.5
        ? {
            ...base,
            translation: this.getRandomWordTranslation(round),
            giveAnswer: (selectedAnswer: boolean) =>
              switcher(selectedAnswer === false),
          }
        : {
            ...base,
            translation: this.game.deck[round].wordTranslate,
            giveAnswer: (selectedAnswer: boolean) =>
              switcher(selectedAnswer === true),
          });
  }

  reset(): void {
    this.game = {
      ...defaultGameParts,
      deck: [],
      score: [],
      streaks: [],
      decksSeq: new Set(),
      wordsSeq: new Set(),
    };
    this.currentRound = { ...defaultGameRound };
  }

  emergencyShutdown(): void {
    clearInterval(this.game.timer);
    this._timer = GAME_TIMER;
  }
}
