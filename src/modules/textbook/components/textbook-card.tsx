import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import { base } from '../../../api';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CallIcon from '@mui/icons-material/Call';

export const TextbookCard = ({ words, activeCardIndex }: TextbookCardProps) => {
  if (!words) {
    return <CircularProgress />;
  } else {
    const wordItem = words[activeCardIndex];
    return (
      <Card className="textbook_card" sx={{ ml: '10px' }}>
        <CardMedia
          component="img"
          image={`${base}/${wordItem?.image}`}
          alt="image of active card"
        />
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ fontWeight: '700' }}>
            {wordItem?.word}
          </Typography>
          <Typography variant="h6" component="h3">
            {wordItem?.wordTranslate}
          </Typography>
          <Typography variant="h6" component="span" sx={{ fontWeight: '400' }}>
            {wordItem?.transcription}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, mt: -1, opacity: '0.5', ml: '5px' }}
          >
            <VolumeUpIcon />
          </IconButton>
          <Stack spacing={1} direction="row">
            <Button variant="contained" sx={{ fontSize: '11px', p: '7px' }}>
              Добавить в сложные
            </Button>
            <Button variant="contained" sx={{ fontSize: '11px', p: '7px' }}>
              Добавить в изученные
            </Button>
          </Stack>
          <Stack>
            <Typography
              variant="h6"
              component="h3"
              sx={{ m: '15px 0 10px', fontSize: '18px' }}
            >
              Значение
            </Typography>
            <Typography
              variant="body2"
              component="p"
              dangerouslySetInnerHTML={{ __html: `${wordItem?.textMeaning}` }}
            />
            <Typography variant="body2" component="p" sx={{ mt: '5px' }}>
              {wordItem?.textMeaningTranslate}
            </Typography>
            <Typography
              variant="h6"
              component="h3"
              sx={{ m: '10px 0', fontSize: '18px' }}
            >
              Пример
            </Typography>
            <Typography
              variant="body2"
              component="p"
              dangerouslySetInnerHTML={{ __html: `${wordItem?.textExample}` }}
            />
            <Typography variant="body2" component="p" sx={{ mt: '5px' }}>
              {wordItem?.textExampleTranslate}
            </Typography>
          </Stack>
          <Typography
            variant="h6"
            component="h3"
            sx={{ m: '15px 0 10px', fontSize: '18px' }}
          >
            Правильные ответы в играх
          </Typography>
          <Box className="card_games">
            <Chip
              icon={<DirectionsRunIcon />}
              label={'1 / 2'}
              variant="outlined"
            />
            <Chip icon={<CallIcon />} label={'1 / 2'} variant="outlined" />
          </Box>
        </CardContent>
      </Card>
    );
  }
};
