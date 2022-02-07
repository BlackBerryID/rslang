import { ConstructionOutlined } from '@mui/icons-material';
import { GetWords } from '../../../api';
import { GetRandomNum } from '../../../utils/get-random-num';
import { ShuffleArray } from '../../../utils/shuffle-array';

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
  };

  private highs = {
    words: 19,
    pages: 29,
    timer: 5,
  };

  get timer() {
    return this.highs.timer;
  }

  get statistic() {
    const wrong = this.game.score.filter((item) => !item.result);
    const right = this.game.score.filter((item) => item.result);
    return { wrong, right };
  }

  set langLevel(val: number) {
    this.game.langLevel = val;
  }

  private setPage(): void {
    const num = GetRandomNum(0, this.highs.pages);
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
    this.game.deck.forEach((item) => console.log(item.word));
    return new Promise((res) => res(true));
  }

  private setScore(round: number, result: boolean): void {
    const item = this.game.deck[round];
    this.game.score.push({
      id: item.id,
      word: item.word,
      translate: item.wordTranslate,
      audio: item.audio,
      result: result,
    });
    console.log(this.game.score);
  }

  private getRandomWordTranslation(round: number): string {
    const variant =
      this.game.deck[GetRandomNum(0, this.highs.words)].wordTranslate;
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
      this.highs.timer--;
      if (this.highs.timer === 0) this.stopTimer(endAction);
      action(this.highs.timer);
    }, 1000);
  }

  private stopTimer(action: () => void): void {
    clearInterval(this.game.timer);
    action();
  }

  start(
    switchMode: () => void,
    timerAction: (val: number) => void,
    endAction: () => void
  ): void {
    this.setPage();
    this.getDeck().then(() => {
      switchMode();
      this.startTimer(timerAction, endAction);
    });
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
}
