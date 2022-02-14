import sprint from '../assets/sprint.jpg';
import audiocall from '../assets/audiocall.jpg';
import { Box, Typography } from '@mui/material';
import { Pages } from '../../../app/constants';

export const TextbookGames = ({ color }: TextbookColorProp) => {
  const games = [Pages.mgSprint, Pages.mgAudioCall].map((item) => {
    let gameName = item;
    let gameText;
    let gameImg;

    switch (item) {
      case Pages.mgSprint:
        gameText = 'Как можно быстрее определи верный перевод слова или нет.';
        gameImg = (
          <img
            className="textbook_games__image"
            src={sprint}
            alt="mini-game sprint"
          ></img>
        );
        break;
      case Pages.mgAudioCall:
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
