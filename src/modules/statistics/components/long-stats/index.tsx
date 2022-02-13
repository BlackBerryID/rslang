import { Container, Typography } from "@mui/material";
import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import './long-stats.scss';

// TODO: add correct type of data @saratovkin
const LongStats = ({ data }: { data: any }) => {
  return (
    <Container sx={{ textAlign: "center", mt: 10, mb: 5 }}>
      <Typography variant="h2" sx={{ mb: 5 }} >Статистика за всё время</Typography>
      <ResponsiveContainer width="95%" height={400} >
        <LineChart
          width={1000}
          height={300}
          data={data}
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
            dataKey="words"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export { LongStats };
