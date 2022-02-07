import { useState, useRef } from 'react';
import { MGSprintEnd } from './components/game-end';
import { LangLevelSelector } from './components/level-select';
import { MGSprintRound } from './components/round';
import { MGSprintTimer } from './components/timer';
import { MGSprintEngine } from './engine';

const StartMessage = () => (
  <>
    <h1>Спринт</h1>
    <p>
      Спринт — тренировка на скорость. Попробуй угадать как можно больше слов за
      30 секунд.
    </p>
  </>
);

const game = new MGSprintEngine();

export function MiniGameSprint() {
  const [gameMode, setGameMode] = useState<boolean>(false);
  const [gameRound, setGameRound] = useState<number>(0);
  const [gameOver, endGame] = useState<boolean>(false);

  const [seconds, setSeconds] = useState(30);

  const startGame = () => {
    game.start(
      () => setGameMode(true),
      (val: number) => setSeconds(val),
      () => endGame(true)
    );
  };

  return gameMode ? (
    gameOver ? (
      <MGSprintEnd statistic={game.statistic} />
    ) : (
      <>
        <MGSprintRound
          attempt={game.getRound(gameRound, (val: number) => setGameRound(val))}
        />
        <MGSprintTimer time={seconds} />
      </>
    )
  ) : (
    <>
      <StartMessage />
      <LangLevelSelector
        action={(val: number) => {
          game.langLevel = val;
        }}
      />
      <button className="mg-start-button" onClick={startGame}>
        Начать
      </button>
    </>
  );
}
