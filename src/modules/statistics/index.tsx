import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Container } from "@mui/material";
import { LongStats } from "./components/long-stats";
import { TodayStats } from "./components/today-stats";
import { GuestAlert } from "./components/guest-alert";
import { RootState } from "../../store";
import { GetUserStats } from "../../api/get-user_stats";
import { UpdateUserStats } from "../../api/update-user_stats";

const Statistics = () => {

  const [stats, setStats] = useState<DayStats[]>([]);
  const [gamesStats, setGamesStats] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const { userId, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      UpdateUserStats(userId, token).then(() => {
        GetUserStats(userId, token).then((response: any) => {
          setIsLoading(false);
          if (response.optional) {
            if (response.optional.stats) {
              setStats(Object.values(response.optional.stats));
            }
            if (response.optional.today) {
              setGamesStats(response.optional.today);
            }
          }
        }).catch((error) => console.log(error));
      });
    }
  }, [userId, token]);

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  return (
    < Container > {
      userId.length ?
        <Container>
          <TodayStats
            stats={stats}
            today={gamesStats}
          />
          <LongStats stats={stats} />
        </Container> :
        <GuestAlert />}
    </Container >
  );
};

export { Statistics };
