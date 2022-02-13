import React from "react";
import { Container } from "@mui/material";
import { LongStats } from "./components/long-stats";
import { TodayStats } from "./components/today-stats";
import { GuestAlert } from "./components/guest-alert";

const isLoggedIn = false;

const globalStats = [25, 50];
const sprintStats = { wordsAmount: 5, percentage: 35, streak: 2 };
const audiocallStats = { wordsAmount: 2, percentage: 10, streak: 1 };

// TODO: add correct structure of this array @saratovkin
const longStats = [{
  date: "0",
  words: 1,
}, {
  date: "1",
  words: 5,
}, {
  date: "7",
  words: 3,
}, {
  date: "12",
  words: 5,
}, {
  date: "13",
  words: 25,
}];

const Statistics = () => {

  return (
    <Container>
      <TodayStats
        globalStats={globalStats}
        sprintStats={sprintStats}
        audiocallStats={audiocallStats}
      />
      {isLoggedIn ? <LongStats data={longStats} /> : <GuestAlert />}
    </Container>
  );
};

export { Statistics };
