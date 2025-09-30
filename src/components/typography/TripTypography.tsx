import { Typography, styled } from "@mui/material";

export const SubHeader = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  fontWeight: 400,
  margin: 0,
}));

export const TripStyledText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  fontWeight: 400,
  margin: 0,
}));

export const TripStyledSubText = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  fontWeight: 400,
  margin: 0,
}));
