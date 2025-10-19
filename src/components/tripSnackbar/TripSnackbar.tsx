import {
  Alert,
  AlertProps,
  Snackbar,
  SnackbarProps,
  useTheme,
} from "@mui/material";

import React from "react";

interface TripSnackbarType extends SnackbarProps {
  severity: AlertProps["severity"];
}

const TripSnackbar: React.FC<TripSnackbarType> = ({
  autoHideDuration = null,
  message,
  severity,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        top: 80,
        boxShadow: theme.shadows[1],
        borderRadius: 2,
        ...props.sx,
      }}
      autoHideDuration={autoHideDuration}
      {...props}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default TripSnackbar;
