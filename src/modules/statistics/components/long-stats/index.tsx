import React, { useEffect, useState } from 'react';
import { Container, Grid, Switch, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import './long-stats.scss';


const LongStats = ({ stats }: { stats: DayStats[] }) => {

  const [learned, setLearned] = useState<LearnedStats[]>([]);
  const [learning, setLearning] = useState<LearningStats[]>([]);

  useEffect(() => {
    if (stats.length) {
      setLearned(([...stats].map((day: DayStats) => {
        return {
          date: day.date,
          "Всего изучено": day.totalLearned,
        }
      })));
      setLearning(([...stats].map((day: DayStats) => {
        return {
          date: day.date,
          "Новых слов": day.learningToday,
        }
      })));
    }
  }, [stats]);

  const [graphType, setGraphType] = useState(true);
  return (
    <Container sx={{ textAlign: "center", mt: 10, mb: 5 }}>
      <Typography variant="h2" sx={{ mb: 5 }} >Статистика за всё время</Typography>
      <Grid container alignItems="center" justifyContent="center" sx={{ mb: 5 }}>
        <Grid item>Изученные слова</Grid>
        <Grid item>
          <Switch
            onChange={() => setGraphType(type => !type)}
            color="default"
          />
        </Grid>
        <Grid item>Новые слова</Grid>
      </Grid>
      {graphType ?
        <ResponsiveContainer width="95%" height={400} >
          <LineChart
            width={1000}
            height={300}
            data={learned}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Всего изучено"
              stroke="#8ca9d3"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer> :
        <ResponsiveContainer width="95%" height={400} >
          <BarChart
            width={500}
            height={300}
            data={learning}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Новых слов" fill="#8ca9d3" />
          </BarChart>
        </ResponsiveContainer>
      }
    </Container>
  );
};

export { LongStats };