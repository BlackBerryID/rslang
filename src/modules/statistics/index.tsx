import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { LongStats } from "./components/long-stats";
import { TodayStats } from "./components/today-stats";
import { GuestAlert } from "./components/guest-alert";
import { RootState } from "../../store";
import { GetUserStats } from "../../api/get-user_stats";

const Statistics = () => {

  const [stats, setStats] = useState<any[]>();
  const { userId, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userId) {
      GetUserStats(userId, token).then((response: any) => {
        if (response.optional) {
          if (response.optional.stats) {
            setStats(Object.values(response.optional.stats));
          }
        }
      }).catch((error) => console.log(error));
    }
  }, [userId, token]);

  return (
    <Container>
      <TodayStats
        data={stats as any[]}
      />
      {userId.length ? <LongStats data={stats} /> : <GuestAlert />}
    </Container>
  );
};

export { Statistics };
