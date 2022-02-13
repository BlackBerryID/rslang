import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const MgStats = ({ title, stats }: { title: string, stats: GameStats }) => {

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">
          {title}
        </Typography>
        <Typography variant="subtitle1">
          {`Изучено слов: ${stats.wordsAmount}`}
        </Typography>
        <Typography variant="subtitle1">
          {`Правильных ответов: ${stats.percentage}`}
        </Typography>
        <Typography variant="subtitle1">
          {`Самая длинная серия: ${stats.streak}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { MgStats };
