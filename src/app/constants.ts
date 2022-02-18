import {
  deepOrange,
  indigo,
  lightBlue,
  lime,
  purple,
  yellow,
  teal,
} from '@mui/material/colors';

const enum Pages {
  home = 'Главная',
  textBook = 'Учебник',
  mgSprint = 'Спринт',
  mgAudioCall = 'Аудиовызов',
  statistic = 'Статистика',
  team = 'О команде',
  games = 'Игры',
}

const enum Paths {
  home = '/',
  textBook = '/textbook',
  mgSprint = '/sprint',
  mgAudioCall = '/audio-call',
  statistic = '/statistic',
  team = '/team',
}

enum CEFR {
  a1 = 'A1',
  a2 = 'A2',
  b1 = 'B1',
  b2 = 'B2',
  c1 = 'C1',
  c2 = 'C2',
}

const colors = [
  yellow['600'],
  lightBlue['400'],
  lime['A400'],
  deepOrange['400'],
  indigo['500'],
  purple['500'],
  teal['300'],
];

const AnswersToChangeStatus = {
  simple: 3,
  hard: 5,
};

export { Pages, Paths, CEFR, colors, AnswersToChangeStatus };
