import { useState } from 'react';
import { MGSprintEngine } from './engine';
import { MGSprintStart } from './components/start';
import { MGSprintRound } from './components/round';
import { MGSprintEnd } from './components/end';

const game = new MGSprintEngine();

export function MiniGameSprint() {
  const [gameMode, setGameMode] = useState<boolean>(false);
  const [gameRound, setGameRound] = useState<number>(0);
  const [gameOver, endGame] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(game.timer);

  const startGame = (): void => {
    game.start(
      () => setGameMode(true),
      (val: number) => setSeconds(val),
      () => endGame(true)
    );
  };

  const reset = (): void => {
    game.reset();
    setGameMode(false);
    endGame(false);
  };

  const setLevel = (val: number) => {
    game.langLevel = val;
  };

  return gameMode ? (
    gameOver ? (
      <MGSprintEnd statistic={game.statistic} onResetAction={reset} />
    ) : (
      <MGSprintRound
        attempt={game.getRound(gameRound, (val: number) => setGameRound(val))}
        time={seconds}
      />
    )
  ) : (
    <MGSprintStart selectLangAction={setLevel} onStartAction={startGame} />
  );
}
