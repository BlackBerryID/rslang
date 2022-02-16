import { base } from './api';

export const GetUserStats = async (userId: string, userToken: string) => {
  const url = `${base}/users/${userId}/statistics`;
  const rawResponse = await fetch(encodeURI(url), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return rawResponse.status > 299
    ? rawResponse.status
    : { ...(await rawResponse.json()) };
};
