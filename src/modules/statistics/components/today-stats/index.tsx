import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";

import './today-stats.scss';
import { MgStats } from "../mg-stats-card";

const sprintStats = { wordsAmount: 0, percentage: 0, streak: 0 };
const audiocallStats = { wordsAmount: 0, percentage: 0, streak: 0 };

const TodayStats = ({ data }: {
  data: any[],
}) => {
  const [answersCount, setAnswersCount] = useState<string>();
  useEffect(() => {
    if (data) {
      setAnswersCount(data[data.length - 1].learnedToday);
    }
  }, [data]);
  return (
    <Container sx={{ textAlign: "center", mt: 10, display: "flex", flexDirection: "column", rowGap: 5 }}>
      <Typography variant="h2" >Статистика за сегодня</Typography>
      <Box sx={{ display: "flex", columnGap: 5, justifyContent: "center" }}>
        <Card
          sx={{ width: 200 }}
        >
          <CardContent>
            <Typography variant="h5" >
              Слов за сегодня:
            </Typography>
            <Typography variant="h2" >
              {answersCount}
            </Typography>
          </CardContent>
        </Card>
        <MgStats title="Спринт" stats={sprintStats} />
        <MgStats title="Аудиовызов" stats={audiocallStats} />
      </Box >
    </Container>
  );
};

export { TodayStats };
