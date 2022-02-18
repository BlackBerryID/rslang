import { GetWords } from '../../../api';
import { AddUserWord } from '../../../api/add-user_word';
import { GetUserAgrWords } from '../../../api/get-user_words';
import { UpdateUserWord } from '../../../api/update-user_word';
import { checkIsLearnedRed } from '../../../utils/check-is-learned';
import { GetRandomNum } from '../../../utils/get-random-num';
import { ShuffleArray } from '../../../utils/shuffle-array';
import { GAME_TIMER, MAX_PAGES_INDEX, MAX_WORDS_INDEX } from '../constants';
export class MGSprintEngine {
  private game: Game = {
    langLevel: 0,
    bookPage: 0,
    deck: [],
    decksSeq: new Set(),
    score: [],
    timer: undefined,
    currentRound: {
      activeWord: '',
      translation: '',
      giveAnswer: (val: boolean): void => {
        throw new Error('Function not implemented.');
      },
    },
    auth: {
      userId: '',
      userToken: '',
    },
  };

  private _timer = GAME_TIMER;

  get timer() {
    return this._timer;
  }

  get statistic() {
    const wrong = this.game.score.filter((item) => !item.result);
    const right = this.game.score.filter((item) => item.result);
    return { wrong, right };
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
    this.game.deck = arr;
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
    const words: Array<Word> = await GetWords(
      this.game.langLevel,
      this.game.bookPage
    );
    this.game.deck = ShuffleArray(words);
    return new Promise((res) => res(true));
  }

  private sendWordToDB(item: Word, result: boolean): void {
    if (this.game.auth.userId && item._id) {
      const base = {
        userId: this.game.auth.userId,
        userToken: this.game.auth.userToken,
        wordId: item._id,
      };
      if (item.hasOwnProperty('userWord')) {
        const streakResult =
          item.userWord?.optional?.sprintStreak + (result ? '1' : '0');
        const isLearned = checkIsLearnedRed(
          streakResult,
          <string>item.userWord?.difficulty
        );
        UpdateUserWord({
          ...base,
          updateReq: {
            difficulty: isLearned ? 'learned' : 'learning',
            optional: {
              sprintStreak: isLearned ? ' ' : streakResult,
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

  private setScore(round: number, result: boolean): void {
    const item = this.game.deck[round];
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
      this.game.deck[GetRandomNum(0, MAX_WORDS_INDEX)].wordTranslate;
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
    clearInterval(this.game.timer);
    this._timer = GAME_TIMER;
    action();
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
      this.game.decksSeq.add(this.game.bookPage);
      GetUserAgrWords({
        group: 0,
        page: 0,
        userId: this.game.auth.userId,
        userToken: this.game.auth.userToken,
        wpp: 20,
      }).then((data) => {
        this.game.deck = data['0'].paginatedResults;
        switchMode();
        this.startTimer(timerAction, endAction);
      });
    }
  }

  getRound(round: number, action: (val: number) => void): GameRound {
    const word = this.game.deck[round].word;

    if (word === this.game.currentRound.activeWord)
      return this.game.currentRound;

    const switcher = (answer: boolean): void => {
      this.endRound(round, answer, action);
    };

    this.game.currentRound =
      Math.random() > 0.5
        ? {
            activeWord: word,
            translation: this.getRandomWordTranslation(round),
            giveAnswer: (clickedAnswer: boolean) =>
              switcher(clickedAnswer === false),
          }
        : {
            activeWord: word,
            translation: this.game.deck[round].wordTranslate,
            giveAnswer: (clickedAnswer: boolean) =>
              switcher(clickedAnswer === true),
          };

    return this.game.currentRound;
  }

  reset() {
    this.game = {
      langLevel: 0,
      bookPage: 0,
      deck: [],
      decksSeq: new Set(),
      score: [],
      timer: undefined,
      currentRound: {
        activeWord: '',
        translation: '',
        giveAnswer: (val: boolean): void => {
          throw new Error('Function not implemented.');
        },
      },
      auth: {
        userId: '',
        userToken: '',
      },
    };
  }
}
