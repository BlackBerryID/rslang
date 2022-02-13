import sprint from '../assets/sprint.jpg';
import audiocall from '../assets/audiocall.jpg';
import { Box, Typography } from '@mui/material';

export const TextbookGames = ({ color }: TextbookColorProp) => {
  const games = ['Спринт', 'Аудиовызов'].map((item) => {
    let gameName = item;
    let gameText;
    let gameImg;

    switch (item) {
      case 'Спринт':
        gameText = 'Как можно быстрее определи верный перевод слова или нет.';
        gameImg = (
          <img
            className="textbook_games__image"
            src={sprint}
            alt="mini-game sprint"
          ></img>
        );
        break;
      case 'Аудиовызов':
        gameText = 'Попробуйте понять, какое слово было произнесено.';
        gameImg = (
          <img
            className="textbook_games__image"
            src={audiocall}
            alt="mini-game audiocall"
          ></img>
        );
        break;
    }

    return (
      <Typography
        className="textbook_games__button"
        component="button"
        sx={{
          '&:hover': { color: color, borderColor: color },
        }}
      >
        <Typography variant="h5" component="h3" sx={{ fontWeight: '700' }}>
          {gameName}
        </Typography>
        <Typography variant="body2" component="p">
          {gameText}
        </Typography>
        {gameImg}
      </Typography>
    );
  });

  return <Box className="textbook_games">{games}</Box>;
};
