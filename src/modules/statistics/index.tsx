import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { LongStats } from "./components/long-stats";
import { TodayStats } from "./components/today-stats";
import { GuestAlert } from "./components/guest-alert";
import { RootState } from "../../store";
import { GetUserStats } from "../../api/get-user_stats";
import { UpdateUserStats } from "../../api/update-user_stats";

const globalStats = [25, 50];
const sprintStats = { wordsAmount: 5, percentage: 35, streak: 2 };
const audiocallStats = { wordsAmount: 2, percentage: 10, streak: 1 };

const Statistics = () => {

  const [stats, setStats] = useState<any[]>();
  const { userId, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userId) {
      GetUserStats(userId, token).then((response: UserStats) => {
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
        globalStats={globalStats}
        sprintStats={sprintStats}
        audiocallStats={audiocallStats}
      />
      {userId.length ? <LongStats data={stats} /> : <GuestAlert />}
    </Container>
  );
};

export { Statistics };
