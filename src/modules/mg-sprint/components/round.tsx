import { KeyboardEvent } from 'react';

export const MGSprintRound = ({ attempt }: { attempt: GameRound }) => {
  const keyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    switch (event.code) {
      case 'ArrowLeft':
        console.log('left');
        attempt.giveAnswer(true);
        break;
      case 'ArrowRight':
        console.log('right');
        attempt.giveAnswer(false);
        break;
    }
  };

  return (
    <>
      <div>
        {attempt.activeWord} это {attempt.translation} ?
      </div>
      <div onKeyDown={keyDownHandler}>
        <button onClick={() => attempt.giveAnswer(true)} autoFocus>
          Верно
        </button>
        <button onClick={() => attempt.giveAnswer(false)}>Неверно</button>
      </div>
    </>
  );
};
