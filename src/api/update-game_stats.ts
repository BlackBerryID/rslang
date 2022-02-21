import { base } from '.';
import { formatDate } from '../utils/format-date';
import { GetUserStats } from './get-user_stats';
import { GetUserAgrWords } from './get-user_words';
import { UpdateUserToken } from './update-user_token';

type GameTypes = 'audiocall' | 'sprint';

type newStats = {
  userId: string;
  userToken: string;
  game: GameTypes;
  streak: number;
  correct: number;
  amount: number;
}

export const UpdateGameStats = async ({
  userId,
  userToken,
  game,
  streak,
  correct,
  amount,
}: newStats
) => {
  const today = formatDate();
  const stats = await GetUserStats(userId, userToken);
  const gameStats = await GetUserAgrWords({
    userId: userId,
    userToken: userToken,
    wpp: 20,
    filter: {
      "$and": [
        { "userWord.optional.learned.game": `${game}` },
        { "userWord.optional.learned.date": `${today}` },
        { "userWord.difficulty": "learned" }
      ]
    }
  });
  const gameLearned = gameStats[0].totalCount.length ?
    gameStats[0].totalCount[0].count :
    0;
  const body = {
    learnedWords: stats.learnedWords,
    optional: { ...stats.optional }
  };
  if (!body.optional.today || body.optional.today.date !== today) {
    body.optional.today = {
      date: today,
      [game]: {
        streak: streak,
        correct: correct,
        amount: amount,
      }
    }
  } else {
    if (!body.optional.today[game]) {
      body.optional.today[game] = {
        streak: streak,
        correct: correct,
        amount: amount,
      };
    } else {
      body.optional.today[game].streak =
        Math.max(body.optional.today[game].streak, streak);
      body.optional.today[game].correct += correct;
      body.optional.today[game].amount += amount;
    }
  }
  body.optional.today[game].learned = gameLearned;
  const url = `${base}/users/${userId}/statistics`;
  const rawResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (rawResponse.status === 401) {
    UpdateUserToken(userId);
  }
};
