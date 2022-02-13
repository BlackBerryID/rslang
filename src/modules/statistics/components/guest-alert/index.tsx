import { Box, Typography } from "@mui/material";
import React from "react";

const GuestAlert = () => {
  return <Box sx={{ mt: 10, textAlign: "center" }}>
    <Typography variant="subtitle1">
      Войдите, чтобы сохранять и просматривать статистику обучения.
    </Typography>
  </Box >
};

export { GuestAlert };
