import { AnswersToChangeStatus } from '../app/constants';

export function checkIsLearned(answers: string, mode: string): boolean {
  const slice =
    mode === 'difficult'
      ? AnswersToChangeStatus.hard
      : AnswersToChangeStatus.simple;
  return (
    answers
      .split('')
      .slice(-slice)
      .reduce((acc, game) => acc + +game, 0) === slice
  );
}
