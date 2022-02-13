import { Box } from "@mui/system";
import React from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";

import './today-stats.scss';
import { MgStats } from "../mg-stats-card";

const titles = ['Всего слов изучено:', 'Правильных ответов:'];

const TodayStats = ({ globalStats, sprintStats, audiocallStats }: {
  globalStats: number[],
  sprintStats: GameStats,
  audiocallStats: GameStats
}) => {
  return (
    <Container sx={{ textAlign: "center", mt: 10, display: "flex", flexDirection: "column", rowGap: 5 }}>
      <Typography variant="h2" >Статистика за сегодня</Typography>
      <Box sx={{ display: "flex", columnGap: 5, justifyContent: "center" }}>
        {globalStats.map((stat, idx) => {
          return (<Card
            sx={{ width: 200 }}
            key={idx}
          >
            <CardContent>
              <Typography variant="h5" >
                {titles[idx]}
              </Typography>
              <Typography variant="h2" >
                {idx === 1 ? `${stat}%` : stat}
              </Typography>
            </CardContent>
          </Card>);
        })}
        <MgStats title="Спринт" stats={sprintStats} />
        <MgStats title="Аудиовызов" stats={audiocallStats} />
      </Box >
    </Container>
  );
};

export { TodayStats };
