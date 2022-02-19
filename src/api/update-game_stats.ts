import { base } from '.';
import { formatDate } from '../utils/format-date';
import { GetUserStats } from './get-user_stats';
import { GetUserAgrWords } from './get-user_words';

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
  try {
    const stats = await GetUserStats(userId, userToken);
    console.log(stats);
    const body = {
      learnedWords: stats.learnedWords,
      optional: { ...stats.optional }
    };
    const today = formatDate();
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
    console.log(body);
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
    switch (rawResponse.status) {
      case 400:
        throw new Error('Bad request');
      case 401:
        throw new Error('Access token is missing or invalid');
    }
  }
  catch (err) {
    if (err instanceof Error)
      console.log(
        `%c Caught >>>> ${err.message}`,
        'font-size: 18px; font-weight: bold; color: orange;'
      );
  }
};
