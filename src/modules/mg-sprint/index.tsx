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
  if (user.userId) {
    game.auth = { userId: user.userId, userToken: user.token };
  }

  const isAnonimGame = gameStatus.mode === 'anon';
  if (!isAnonimGame && gameStatus.langLevel && gameStatus.deckPage) {
    game.langLevel = gameStatus.langLevel;
    game.page = gameStatus.deckPage;
  }

  const startGame = (): void => {
    game.start({
      anonGame: isAnonimGame,
      switchMode: () => setGameMode(true),
      timerAction: (val: number) => setSeconds(val),
      endAction: () => endGame(true),
    });
  };

  const reset = (): void => {
    game.reset();
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
