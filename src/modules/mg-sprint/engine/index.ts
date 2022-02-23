import { GetWords } from '../../../api';
import { AddUserWord } from '../../../api/add-user_word';
import { GetUserAgrWords } from '../../../api/get-user_words';
import { UpdateGameStats } from '../../../api/update-game_stats';
// import { UpdateUserStats } from '../../../api/update-user_stats';
import { UpdateUserWord } from '../../../api/update-user_word';
import { checkIsLearnedRed } from '../../../utils/check-is-learned';
import { formatDate } from '../../../utils/format-date';
import { GetRandomNum } from '../../../utils/get-random-num';
import { ShuffleArray } from '../../../utils/shuffle-array';
import {
  GAME_SCORE_BASE,
  GAME_TIMER,
  MAX_PAGES_INDEX,
  // MAX_WORDS_INDEX,
} from '../constants';

const defaultObj: Game = {
  langLevel: 0,
  bookPage: 0,
  deck: [],
  decksSeq: new Set(),
  wordsSeq: new Set(),
  score: [],
  streaks: [],
  timer: undefined,
  currentRound: {
    activeWord: '',
    translation: '',
    currentStreak: 0,
    currentMultiplier: 1,
    currentScore: 0,
    giveAnswer: (val: boolean): void => {
      throw new Error('Function not implemented.');
    },
  },
  auth: {
    userId: '',
    userToken: '',
  },
};
export class MGSprintEngine {
  private game: Game = { ...defaultObj };

  private _timer = GAME_TIMER;

  get timer() {
    return this._timer;
  }

  get statistic() {
    const wrong = this.game.score.filter((item) => !item.result);
    const right = this.game.score.filter((item) => item.result);

    return { wrong, right, score: this.game.currentRound.currentScore };
  }

  set langLevel(val: number) {
    this.game.langLevel = val;
  }

  set page(val: number) {
    this.game.bookPage = val;
  }

  set auth(user: { userId: string; userToken: string }) {
    this.game.auth = user;
  }

  set deck(arr: Array<Word>) {
    this.game.deck = [...arr];
    arr.forEach((word) => {
      this.game.wordsSeq.add(word._id || word.id);
    });
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
    const words = this.game.auth.userId
      ? await GetUserAgrWords({
          page: this.game.bookPage,
          group: this.game.langLevel,
          userId: this.game.auth.userId,
          userToken: this.game.auth.userToken,
          wpp: 20,
        })
      : await GetWords(this.game.langLevel, this.game.bookPage);
    const prepWords: Array<Word> = this.game.auth.userId
      ? words[0].paginatedResults
      : words;
    const unicWords = prepWords.filter((word) => {
      const id = word.id || word._id;
      return !this.game.wordsSeq.has(id as string);
    });
    this.game.deck = ShuffleArray(unicWords as Array<Word>);
    return new Promise((res) => res(true));
  }

  private sendWordToDB(item: Word, result: boolean): void {
    if (this.game.auth.userId && (item._id || item.id)) {
      const base = {
        userId: this.game.auth.userId,
        userToken: this.game.auth.userToken,
        wordId: item._id || item.id,
      };
      if (item.hasOwnProperty('userWord')) {
        if (item.userWord?.difficulty === 'difficult' && result) return;
        if (item.userWord?.difficulty === 'difficult' && !result) {
          UpdateUserWord({
            ...base,
            updateReq: {
              difficulty: 'learning',
              optional: {
                sprintStreak: '0',
              },
            },
          });
          return;
        }
        const streakResult =
          item.userWord?.optional?.sprintStreak + (result ? '1' : '0');
        const isLearned = checkIsLearnedRed(
          streakResult,
          item.userWord?.difficulty as string
        );
        const optionalLearned = isLearned
          ? {
              date: formatDate(),
              game: 'sprint',
            }
          : {};
        UpdateUserWord({
          ...base,
          updateReq: {
            difficulty: isLearned ? 'learned' : 'learning',
            optional: {
              sprintStreak: isLearned ? ' ' : streakResult,
              learned: optionalLearned,
            },
          },
        });
      } else {
        AddUserWord({
          ...base,
          updateReq: {
            optional: {
              sprintStreak: result ? '1' : '0',
            },
          },
        });
      }
    }
  }

  private setFlowScore(result: boolean): void {
    if (result) {
      this.game.currentRound.currentStreak += 1;
      this.game.currentRound.currentScore +=
        GAME_SCORE_BASE * this.game.currentRound.currentMultiplier;
      this.game.currentRound.currentMultiplier *=
        this.game.currentRound.currentStreak &&
        this.game.currentRound.currentStreak % 3 === 0
          ? 2
          : 1;
      if (this.game.currentRound.currentMultiplier > 8)
        this.game.currentRound.currentMultiplier = 8;
    } else {
      this.game.streaks.push(this.game.currentRound.currentStreak);
      this.game.currentRound.currentMultiplier = 1;
      this.game.currentRound.currentStreak = 0;
    }
  }

  private setScore(round: number, result: boolean): void {
    const item = this.game.deck[round];

    this.setFlowScore(result);
    this.sendWordToDB(item, result);

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
      this.setPage();
      this.getDeck().then(() => {
        action(0);
      });
    } else {
      action(nextRound);
    }
  }

  private startTimer(
    action: (val: number) => void,
    endAction: () => void
  ): void {
    this.game.timer = setInterval(() => {
      this._timer -= 1;
      if (this._timer === 0) {
        this.stopTimer(endAction);
      }
      action(this._timer);
    }, 1000);
  }

  private stopTimer(action: () => void): void {
    action();
    this.updateDBStatistic();
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
    if (anonGame) {
      this.setPage();
      this.getDeck().then(() => {
        switchMode();
        this.startTimer(timerAction, endAction);
      });
    } else {
      this.game.deck = ShuffleArray(this.game.deck);
      switchMode();
      this.startTimer(timerAction, endAction);
    }
  }

  getRound(round: number, action: (val: number) => void): GameRound {
    const word = this.game.deck[round].word;

    if (word === this.game.currentRound.activeWord)
      return this.game.currentRound;

    const switcher = (answer: boolean): void => {
      this.endRound(round, answer, action);
    };

    return (this.game.currentRound =
      Math.random() > 0.5
        ? {
            activeWord: word,
            translation: this.getRandomWordTranslation(round),
            currentMultiplier: this.game.currentRound.currentMultiplier,
            currentScore: this.game.currentRound.currentScore,
            currentStreak: this.game.currentRound.currentStreak,
            giveAnswer: (clickedAnswer: boolean) =>
              switcher(clickedAnswer === false),
          }
        : {
            activeWord: word,
            translation: this.game.deck[round].wordTranslate,
            currentMultiplier: this.game.currentRound.currentMultiplier,
            currentScore: this.game.currentRound.currentScore,
            currentStreak: this.game.currentRound.currentStreak,
            giveAnswer: (clickedAnswer: boolean) =>
              switcher(clickedAnswer === true),
          });
  }

  reset(): void {
    this.game = {
      ...defaultObj,
      score: [],
      decksSeq: new Set(),
      wordsSeq: new Set(),
      deck: [],
      streaks: [],
      // timer: undefined,
      // currentRound: defaultObj.currentRound,
      auth: this.game.auth,
      langLevel: this.game.langLevel,
    };
  }

  updateDBStatistic() {
    if (this.game.auth.userId) {
      this.game.streaks.push(this.game.currentRound.currentStreak);
      const correct = this.game.score.reduce(
        (acc, item) => acc + +item.result,
        0
      );

      UpdateGameStats({
        userId: this.game.auth.userId,
        userToken: this.game.auth.userToken,
        game: 'sprint',
        streak: Math.max(...this.game.streaks),
        correct: correct,
        amount: this.game.score.length,
      });
    }
  }
}
