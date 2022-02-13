import { base } from '.';

export const GetUserWord = async ({
  userId,
  userToken,
  wordId,
}: {
  [prop: string]: string;
}) => {
  const url = `${base}/users/${userId}/words/${wordId}`;
  try {
    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    switch (rawResponse.status) {
      case 400:
        throw new Error(
          'Please, check word ID-pattern, we recommend to try another word ID.'
        );
      case 401:
        throw new Error(
          'Please, check your user-token state, we recommend to relogin.'
        );
      case 404:
        throw new Error(`Word with this id not found in user's colleciton.`);
    }

    return await rawResponse.json();
  } catch (err) {
    if (err instanceof Error)
      console.log(
        `%c Caught >>>> ${err.message}`,
        'font-size: 18px; font-weight: bold; color: orange;'
      );
  }
};
