import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";

import './today-stats.scss';
import { MgStats } from "../mg-stats-card";
import { calcPersentage } from "../../helpers/calc-percentage";

const TodayStats = ({ stats, today }: {
  stats: DayStats[],
  today: {
    today: string;
    audiocall: GameStats;
    sprint: GameStats;
  },
}) => {

  const [learnedToday, setLearnedToday] = useState(0);
  const [learningToday, setLearningToday] = useState(0);

  const [sprintStats, setSpintStats] = useState({
    learned: 0,
    streak: 0,
    correct: 0,
    amount: 0,
  });
  const [audiocallStats, setAudiocallStats] = useState({
    learned: 0,
    streak: 0,
    correct: 0,
    amount: 0,
  });

  useEffect(() => {
    if (stats) {
      if (stats[stats.length - 1]) {
        setLearnedToday(stats[stats.length - 1].learnedToday);
        setLearningToday(stats[stats.length - 1].learningToday);
      }
    }
  }, [stats]);

  useEffect(() => {
    if (today) {
      if (today.sprint) {
        setSpintStats(today.sprint);
      }
      if (today.audiocall) {
        setAudiocallStats(today.audiocall);
      }
    }
  }, [today]);

  return (
    <Container sx={{ textAlign: "center", mt: 10, display: "flex", flexDirection: "column", rowGap: 5 }}>
      <Typography variant="h2" >Статистика за сегодня</Typography>
      <Box sx={{ display: "flex", columnGap: 5, justifyContent: "center" }}>
        <Card
          sx={{ width: 300 }}
        >
          <CardContent>
            <Typography variant="h5" >
              Изучено слов:
            </Typography>
            <Typography variant="h2" >
              {learnedToday}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{ width: 300 }}
        >
          <CardContent>
            <Typography variant="h5" >
              Новых слов:
            </Typography>
            <Typography variant="h2" >
              {learningToday}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{ width: 300 }}
        >
          <CardContent>
            <Typography variant="h5" >
              Верных ответов:
            </Typography>
            <Typography variant="h2">
              {`${calcPersentage(
                audiocallStats.correct + sprintStats.correct,
                audiocallStats.amount + sprintStats.amount
              )}`}
            </Typography>
          </CardContent>
        </Card>
      </Box >
      <Typography variant="h2" >Игры</Typography>
      <Box sx={{ display: "flex", columnGap: 5, justifyContent: "center" }}>
        <MgStats title="Спринт" stats={sprintStats} />
        <MgStats title="Аудиовызов" stats={audiocallStats} />
      </Box >
    </Container >
  );
};

export { TodayStats };
