import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { calcPersentage } from "../../helpers/calc-percentage";
import CallIcon from '@mui/icons-material/Call';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const MgStats = ({ title, stats }: { title: string, stats: GameStats }) => {
  return (
    <Card
      sx={{ width: 300 }}
    >
      <CardContent>
        {title === 'Спринт' ? <DirectionsRunIcon /> : <CallIcon />}
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="subtitle1">
          {`Изучено: ${stats.learned}`}
        </Typography>
        <Typography variant="subtitle1">
          {`Верных ответов: ${calcPersentage(stats.correct, stats.amount)}`}
        </Typography>
        <Typography variant="subtitle1">
          {`Лучшая серия: ${stats.streak}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { MgStats };
