import { base } from './api';
import { UpdateUserToken } from './update-user_token';

export const GetUserStats = async (userId: string, userToken: string) => {
  const url = `${base}/users/${userId}/statistics`;
  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.ok) {
    return await rawResponse.json();
  }
  if (rawResponse.status === 401) {
    UpdateUserToken(userId);
  }
};
