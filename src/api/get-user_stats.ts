import { base } from './api';

export const GetUserStats = async (userId: string, userToken: string) => {
  try {
    const url = `${base}/users/${userId}/statistics`;
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    switch (rawResponse.status) {
      case 401:
        throw new Error('Access token is missing or invalid');
      case 404:
        throw new Error('Statistics not found');
    }
    return await rawResponse.json();
  }
  catch (err) {
    if (err instanceof Error)
      console.log(
        `%c Caught >>>> ${err.message}`,
        'font-size: 18px; font-weight: bold; color: orange;'
      );
  }
};
