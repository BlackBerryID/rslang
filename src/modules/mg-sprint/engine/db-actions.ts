import { AddUserWord } from '../../../api/add-user_word';
import { UpdateGameStats } from '../../../api/update-game_stats';
import { UpdateUserWord } from '../../../api/update-user_word';
import { checkIsLearnedRed } from '../../../utils/check-is-learned';
import { formatDate } from '../../../utils/format-date';

export class DBActions {
  private auth: GameAuth = {
    userId: '',
    userToken: '',
  };

  set setAuth(user: GameAuth) {
    this.auth = { ...user };
  }

  sendWordToDB(item: Word, result: boolean): void {
    if (this.auth.userId && (item._id || item.id)) {
      const base = {
        ...this.auth,
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

  updateDBStatistic(
    score: Array<GameResult>,
    streaks: Array<number>,
    currentStreak: number
  ): void {
    if (this.auth.userId) {
      const allStreaks = [...streaks, currentStreak];
      const correct = score.reduce((acc, item) => acc + +item.result, 0);

      UpdateGameStats({
        ...this.auth,
        game: 'sprint',
        streak: Math.max(...allStreaks),
        correct: correct,
        amount: score.length,
      });
    }
  }
}
