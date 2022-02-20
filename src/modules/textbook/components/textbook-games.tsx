import sprint from '../assets/sprint.jpg';
import audiocall from '../assets/audiocall.jpg';
import { Box, Typography } from '@mui/material';
import { Pages } from '../../../app/constants';
import { colors } from '../../../app/constants';
import { Link } from 'react-router-dom';
import { Paths } from '../../../app/constants';

export const TextbookGames = ({
  group,
  words,
  prepareGameData,
  isVocabularyActive,
  vocabularyGroup,
  vocabularyWords,
}: TextbookGamesProp) => {
  const games = [Pages.mgSprint, Pages.mgAudioCall].map((item) => {
    let gameName = item;
    let gameText;
    let gameImg;
    let path;

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
        path = Paths.mgSprint;
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
        path = Paths.mgAudioCall;
        break;
    }

    const localWords = isVocabularyActive
      ? vocabularyWords[vocabularyGroup]
      : words;

    return (
      localWords?.length !== 0 && (
        <Link
          to={path || '/'}
          className="textbook_games__button"
          key={gameName}
          onClick={prepareGameData}
        >
          <Typography
            component="button"
            className="textbook_games__title"
            sx={{ '&:hover': { color: colors[group] } }}
          >
            <Typography variant="h5" component="h3" sx={{ fontWeight: '700' }}>
              {gameName}
            </Typography>
            <Typography variant="body2" component="p">
              {gameText}
            </Typography>
            {gameImg}
          </Typography>
        </Link>
      )
    );
  });

  return <Box className="textbook_games">{games}</Box>;
};
