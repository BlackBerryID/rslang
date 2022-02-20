import { base } from './api';
import { UpdateUserToken } from './update-user_token';

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
      case 404:
        return {};
      case 401:
        UpdateUserToken(userId);
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
