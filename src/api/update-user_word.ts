import { base } from '.';
import { GetUserWord } from './get-user_word';
import { UpdateUserToken } from './update-user_token';

export const UpdateUserWord = async ({
  userId,
  userToken,
  wordId,
  updateReq,
}: AdditionUserWord) => {
  const url = `${base}/users/${userId}/words/${wordId}`;
  try {
    const currentWordState = await GetUserWord({ userId, userToken, wordId });
    const patch = {
      difficulty: currentWordState.difficulty,
      optional: currentWordState.optional,
    };

    if (updateReq.difficulty) {
      patch.difficulty = updateReq.difficulty;
    }

    if (updateReq.optional) {
      const patchOptional = {
        ...currentWordState.optional,
        ...updateReq.optional,
      };
      patch.optional = patchOptional;
    }

    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patch),
    });

    switch (rawResponse.status) {
      case 400:
        throw new Error(
          'Please, check word ID-pattern, we recommend to try another word ID.'
        );
      case 404:
        throw new Error(`Word with this id not found in user's colleciton.`);
      case 401:
        UpdateUserToken(userId);
        throw new Error('Access token is missing or invalid');
    }
  } catch (err) {
    if (err instanceof Error)
      console.log(
        `%c Caught >>>> ${err.message}`,
        'font-size: 18px; font-weight: bold; color: orange;'
      );
  }
};
