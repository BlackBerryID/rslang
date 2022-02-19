import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { calcPersentage } from "../../helpers/calc-percentage";

const MgStats = ({ title, stats }: { title: string, stats: GameStats }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {title}
        </Typography>
        <Typography variant="subtitle1">
          {`Изучено: ${stats.learned}`}
        </Typography>
        <Typography variant="subtitle1">
          {`Процент ответов: ${calcPersentage(stats.correct, stats.amount)}`}
        </Typography>
        <Typography variant="subtitle1">
          {`Cерия: ${stats.streak}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { MgStats };
