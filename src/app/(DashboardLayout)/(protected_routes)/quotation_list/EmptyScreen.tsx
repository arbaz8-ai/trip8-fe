import { Box, Container, Typography, styled } from "@mui/material";

import Image from "next/image";
import React from "react";
import { TripStyledSubText } from "@/components/typography/TripTypography";
import emptyImage from "@/assets/empty-list-icon.png";
import { skyPalette } from "@/utils/theme/tripColor";

const StepBoxStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  background: theme.palette.common.white,
  boxShadow: `0 0 6px 6px ${theme.palette.grey[200]}`,
  borderRadius: theme.spacing(1),
}));
const StepBox = ({
  boxNumber,
  label,
  text,
}: {
  boxNumber: number;
  label: string;
  text: string;
}) => {
  return (
    <StepBoxStyled>
      <Box sx={{ flexBasis: "25%", maxWidth: "15%" }}>
        <Box
          sx={{
            height: 40,
            width: 40,
            background: skyPalette[100],
            fontSize: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 99,
          }}
        >
          {boxNumber}
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" mb={0.5}>
          {label}
        </Typography>
        <TripStyledSubText sx={{ lineHeight: 1.2 }}>{text}</TripStyledSubText>
      </Box>
    </StepBoxStyled>
  );
};

const EmptyScreen = () => {
  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Image src={emptyImage} alt="empty-data" />
      </Box>
      <Typography sx={{ fontSize: 10, textAlign: "center", px: 2 }}>
        Still back and relax while we bring the quotations for you, You’ll start
        receiving Quotations With in 30 - 60 Minutes{" "}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" mb={2}>
          Next Steps
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <StepBox
            boxNumber={1}
            label="Get Quotations"
            text="We’ve sent your itinerary to trusted travel agencies, you’ll start getting quotes"
          />
          <StepBox
            boxNumber={2}
            label="Compare Offer"
            text="Review and compare multiple quotations"
          />
          <StepBox
            boxNumber={3}
            label="Book Your Trip"
            text="Choose the best offer and confirm your booking"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default EmptyScreen;
