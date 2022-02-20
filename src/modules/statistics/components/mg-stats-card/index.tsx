import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { calcPersentage } from "../../helpers/calc-percentage";

const MgStats = ({ title, stats }: { title: string, stats: GameStats }) => {
  return (
    <Card
      sx={{ width: 300 }}
    >
      <CardContent>
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
