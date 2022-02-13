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
} from '@mui/material';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CallIcon from '@mui/icons-material/Call';

export const TextbookCard = () => {
  return (
    <Card className="textbook_card" sx={{ ml: '10px' }}>
      <CardMedia
        component="img"
        image="https://images.unsplash.com/photo-1527685609591-44b0aef2400b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80"
        alt="image of active card"
      />
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ fontWeight: '700' }}>
          biodegradable
        </Typography>
        <Typography variant="h6" component="h3">
          биоразлагаемый
        </Typography>
        <Typography variant="h6" component="span" sx={{ fontWeight: '400' }}>
          [bàioudigréidəbl]
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
          <Typography variant="body2" component="p">
            Materials that are biodegradable break down naturally into
            substances that do not harm the environment.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mt: '5px' }}>
            Биоразлагаемые материалы естественным образом распадаются на
            вещества, которые не наносят вреда окружающей среде
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            sx={{ m: '10px 0', fontSize: '18px' }}
          >
            Пример
          </Typography>
          <Typography variant="body2" component="p">
            I use biodegradable compost to feed my garden.
          </Typography>
          <Typography variant="body2" component="p" sx={{ mt: '5px' }}>
            Я использую биоразлагаемый компост, чтобы кормить свой сад
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
};
