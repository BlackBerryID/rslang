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
  if (rawResponse.status === 401) {
    UpdateUserToken(userId);
  }
};
