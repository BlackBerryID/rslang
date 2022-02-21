import { base } from '.';
import { UpdateUserToken } from './update-user_token';

export const GetUserWord = async ({
  userId,
  userToken,
  wordId,
}: {
  [prop: string]: string;
}) => {
  const url = `${base}/users/${userId}/words/${wordId}`;
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
