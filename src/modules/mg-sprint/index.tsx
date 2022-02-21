import { useEffect, useState } from 'react';
import { MGSprintEngine } from './engine';
import { MGSprintStart } from './components/start';
import { MGSprintRound } from './components/round';
import { MGSprintEnd } from './components/end';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const game = new MGSprintEngine();

export function MiniGameSprint() {
  const [gameMode, setGameMode] = useState<boolean>(false);
  const [gameRound, setGameRound] = useState<number>(0);
  const [gameOver, endGame] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(game.timer);

  const gameStatus = useSelector((state: RootState) => state.appStatus);
  const user = useSelector((state: RootState) => state.user);
  const isAnonimGame = gameStatus.mode === 'anon';

  if (user.userId !== undefined) {
    game.auth = { userId: user.userId, userToken: user.token };
  }

  useEffect(() => {
    if (
      !isAnonimGame &&
      gameStatus.langLevel !== undefined &&
      gameStatus.deck !== undefined
    ) {
      game.langLevel = gameStatus.langLevel;
      game.deck = gameStatus.deck;
    }
  }, [gameStatus, isAnonimGame]);

  const startGame = (): void => {
    game.reset();
    if (gameStatus.deck !== undefined) {
      game.deck = gameStatus.deck;
    }
    game.start({
      anonGame: isAnonimGame,
      switchMode: () => setGameMode(true),
      timerAction: (val: number) => setSeconds(val),
      endAction: () => endGame(true),
    });
  };

  const reset = (): void => {
    game.reset();
    if (!isAnonimGame) {
      game.deck = gameStatus.deck!;
    }
    setGameMode(false);
    endGame(false);
  };

  const setLevel = (val: number) => {
    game.langLevel = val;
  };

  useEffect(() => {
    if (gameOver) setGameRound(0);
  }, [gameOver]);

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
    <MGSprintStart
      anonGame={isAnonimGame}
      selectLangAction={setLevel}
      onStartAction={startGame}
    />
  );
}
