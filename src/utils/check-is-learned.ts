const IS_LEARNED_REGULAR = 3;
const IS_LEARNED_DIFFICULT = 5;

export function checkIsLearned(answers: string, status: string): boolean {
  if (status === 'learned') {
    return false;
  }
  const count = status === 'learning' ? IS_LEARNED_REGULAR : IS_LEARNED_DIFFICULT;
  if (answers.length < count) {
    return false;
  }
  const checkSum = +answers.slice(-count).split('').reduce((a, b) => String(Number.parseInt(a) + Number.parseInt(b)));
  if (checkSum === count) {
    return true;
  }
  return false;
};