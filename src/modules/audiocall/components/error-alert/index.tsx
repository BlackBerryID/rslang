import React from "react";
import { Alert, Box, Button, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Paths } from "../../../../app/constants";

const ErrorAlert = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      rowGap="2em"
    >
      <Alert
        severity="error"
      >
        Что-то пошло не так. Пожалуйста, перезагрузите страницу.
      </Alert>
      <Button
        variant="outlined"
        size="large"
        endIcon={<HomeIcon />}
      >
        <Link
          component={RouterLink}
          to={Paths.home}
          sx={{ textDecoration: 'none', width: '100%' }}
        >
          На главную
        </Link>
      </Button>
    </Box>
  );
};

export { ErrorAlert };
