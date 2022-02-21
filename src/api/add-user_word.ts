import { base } from '.';
import { UpdateUserToken } from './update-user_token';

export const AddUserWord = async ({
  userId,
  userToken,
  wordId,
  updateReq,
}: AdditionUserWord) => {
  const url = `${base}/users/${userId}/words/${wordId}`;
  const defCreqationReq = {
    difficulty: 'learning',
    optional: {
      audioStreak: ' ',
      sprintStreak: ' ',
      learned: {
        date: ' ',
        game: ' ',
      },
    },
  };

  if (updateReq.difficulty) {
    defCreqationReq.difficulty = updateReq.difficulty;
  }

  if (updateReq.optional) {
    const patchOptional = {
      ...defCreqationReq.optional,
      ...updateReq.optional,
    };
    defCreqationReq.optional = patchOptional;
  }

  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(defCreqationReq),
  });
  if (rawResponse.status === 401) {
    UpdateUserToken(userId);
  }
};
