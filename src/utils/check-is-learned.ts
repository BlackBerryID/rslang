const ANSWERS_TO_LEARN = 3;

export function checkIsLearned(answers: string): boolean {
  if (answers.length >= ANSWERS_TO_LEARN && answers.slice(-ANSWERS_TO_LEARN) === '111') {
    return true;
  }
  return false;
};