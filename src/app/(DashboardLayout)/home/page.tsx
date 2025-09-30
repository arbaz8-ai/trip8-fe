"use client";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import TripCard from "../components/tripCard/TripCard";
import { TripStyledSubText } from "@/components/typography/TripTypography";

const HomePage = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="xl"
      sx={{ py: 2, background: theme.palette.background.paper }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="h6">Good Morning, Deepak</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon sx={{ height: 24, width: 24 }} color="primary" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontSize: 14 }}>
                Where are you going next?
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.secondary",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  maxWidth: "240px",
                  lineHeight: 1,
                }}
              >
                Sector 71, Sabsaiza ajat singh nagar, Moha...
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <NotificationsIcon sx={{ height: 24, width: 24 }} />
          <AccountCircleIcon sx={{ height: 28, width: 28 }} />
        </Box>
      </Box>

      <Box sx={{ p: 2, background: theme.palette.background.default }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            background: theme.palette.primary.main,
            borderRadius: 2,
            p: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            Get travel operator quotes in 2 mins
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{
              background: theme.palette.common.white,
              color: theme.palette.common.black,
              fontWeight: 500,
              borderRadius: 99,
              px: 2,
              py: 1,
              minWidth: "auto",
            }}
          >
            Create itinerary quickly
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Upcoming trips
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Box key={index} sx={{ minWidth: 240, flexShrink: 0 }}>
              <TripCard />
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recently Viewed Itineraries
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Box key={index} sx={{ minWidth: 240, flexShrink: 0 }}>
              <TripCard />
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Trending Itineraries
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            pb: 2,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Box key={index} sx={{ minWidth: 240, flexShrink: 0 }}>
              <TripCard />
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          background: theme.palette.secondary.main,
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          We help you with your trips in North-East India
        </Typography>
        <TripStyledSubText>
          From the serenity of Tawang to the adventure of Meghalaya — Trip8
          gives you access to the most authentic and affordable trips in this
          magical region.
        </TripStyledSubText>
      </Box>
    </Container>
  );
};

export default HomePage;
