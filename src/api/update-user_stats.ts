import { base } from '.';
import { formatDate } from '../utils/format-date';
import { GetUserStats } from './get-user_stats';
import { GetUserAgrWords } from './get-user_words';


    // uncomment for testing
    // const totalLearned = 26;
    // const today = '03.02.22';


export const UpdateUserStats = async (
  userId: string,
  userToken: string) => {
  try {
    const stats = await GetUserStats(userId, userToken);
    const userWords = await GetUserAgrWords({
      userId: userId,
      userToken: userToken,
      wpp: 20,
      filter: { "$or": [{ "userWord.difficulty": "learning" }, { "userWord.difficulty": "learned" }] }
    });
    const today = formatDate(new Date());
    const totalLearned = userWords[0].totalCount[0].count;
    const body = {
      learnedWords: totalLearned,
      optional: stats.optional,
    };
    if (!body.optional) {
      body.optional = {
        stats: {
          0: {
            date: today,
            learnedToday: totalLearned,
            totalLearned: totalLearned,
          }
        }
      }
    } else {
      const days: any[] = Object.values(body.optional.stats);
      if (days.length === 1) {
        if (days[0].date === today) {
          days[0].learnedToday = totalLearned;
          days[0].totalLearned = totalLearned;
        } else {
          days.push({
            date: today,
            learnedToday: totalLearned - days[0].totalLearned,
            totalLearned: totalLearned,
          });
        }
      } else {
        const lastDay = days[days.length - 1];
        if (lastDay.date === today) {
          days[days.length - 1].learnedToday = totalLearned - days[days.length - 2].totalLearned;
          days[days.length - 1].totalLearned = totalLearned;
        } else {
          days.push({
            date: today,
            learnedToday: totalLearned - days[days.length - 1].totalLearned,
            totalLearned: totalLearned,
          });
        }
      }
      body.optional.stats = { ...days };
    }
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
