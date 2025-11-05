"use client";

import {
  Avatar,
  Box,
  Container,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import React, { use } from "react";
import {
  TripStyledSubText,
  TripStyledText,
} from "@/components/typography/TripTypography";

import ChatIcon from "@/assets/icons/chat-icon.svg";
import CheckIcon from "@/assets/icons/circle-check.svg";
import ClockIcon from "@/assets/icons/clock.svg";
import CrossIcon from "@/assets/icons/circle-cross.svg";
import LocationIcon from "@/assets/icons/location.svg";
import StarIcon from "@/assets/icons/single-star.svg";
import { numberToINR } from "@/utils/format/numberToMoney";

const inclusionList = [
  "Food",
  "Pickup Service(if you included in Pack.)",
  "lunch",
  "Tour Guide",
  "Breakfast",
  "Dinner",
];

type Props = {
  params: Promise<{ id: string }>;
};
const page = ({ params }: Props) => {
  const { id } = use(params) ?? {};
  console.log({ id });
  const theme = useTheme();
  return (
    <Container maxWidth="xl" sx={{ px: 2 }}>
      <Box
        sx={{
          borderRadius: 2,
          p: 2,
          mt: 4,
          mb: 2,
          boxShadow: `0 0 10px ${theme.palette.grey[300]}`,
        }}
      >
        <Box sx={{ display: "flex", mb: 1, gap: 1, alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "red", height: 40, width: 40 }}>A</Avatar>
          <Box sx={{ maxWidth: "fit-content" }}>
            <Typography sx={{ fontWeight: 700 }}>User Name</Typography>
            <TripStyledSubText>Travel Expert</TripStyledSubText>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography>Total Trips Conducted</Typography>
            <Typography sx={{ fontWeight: 700 }}>0</Typography>
          </Box>
        </Box>
        <Divider sx={{ background: "grey.300" }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 700, lineHeight: 0.8 }}>-</Typography>
            <TripStyledText>Reviews</TripStyledText>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarIcon fill="currentColor" style={{ height: 20, width: 20 }} />
            <Box>
              <Typography sx={{ fontWeight: 700, lineHeight: 0.8 }}>
                -
              </Typography>
              <TripStyledText>Rating</TripStyledText>
            </Box>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box>
            <Typography sx={{ fontWeight: 700, lineHeight: 0.8 }}>-</Typography>
            <TripStyledText>Experience</TripStyledText>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: `0 0 10px ${theme.palette.grey[300]}`,
          p: 2,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          -
        </Typography>
        <TripStyledText>-</TripStyledText>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, py: 1 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <ClockIcon fill="currentColor" />
          <Typography>I spend too much time: -</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <LocationIcon fill="currentColor" />
          <Typography>Live In : -</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <ChatIcon fill="currentColor" />
          <Typography>-</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          boxShadow: `0 0 10px ${theme.palette.grey[300]}`,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>Inclusion</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {inclusionList.map((item) => {
              return (
                <Box key={item} sx={{ display: "flex", gap: 1 }}>
                  <CheckIcon fill={"currentColor"} />
                  <TripStyledSubText sx={{ lineHeight: 0.8 }}>
                    {item}
                  </TripStyledSubText>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>Exclusion</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {inclusionList.map((item) => {
              return (
                <Box key={item} sx={{ display: "flex", gap: 1 }}>
                  <CrossIcon fill={"currentColor"} />
                  <TripStyledSubText sx={{ lineHeight: 0.8 }}>
                    {item}
                  </TripStyledSubText>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, mb: 1 }}>
            Payment Schedule
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <TripStyledText>Reservation Amount</TripStyledText>
              <Typography sx={{ fontWeight: 700 }}>{numberToINR(0)}</Typography>
            </Box>
            <Box>
              <TripStyledText>Balance Amount</TripStyledText>
              <Typography sx={{ fontWeight: 700 }}>{numberToINR(0)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default page;
