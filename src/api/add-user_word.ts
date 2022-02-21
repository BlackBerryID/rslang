import { base } from '.';

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

  try {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(defCreqationReq),
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
      case 417:
        throw new Error(`Sorry, but such user word already exists.`);
    }
  } catch (err) {
    if (err instanceof Error)
      console.log(
        `%c Caught >>>> ${err.message}`,
        'font-size: 18px; font-weight: bold; color: orange;'
      );
  }
};
