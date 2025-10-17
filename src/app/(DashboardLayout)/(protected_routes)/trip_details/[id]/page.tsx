"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { use } from "react";

import ItineraryDetails from "../ItinenaryDetails";
import { TripStyledSubText } from "@/components/typography/TripTypography";
import { getItinenaryById } from "@/tripAPI/itinenary";
import { useQuery } from "@tanstack/react-query";

const fakeDays = [
  {
    day: 1,
    total_distance_covered: "24 km",
    date: "2023-11-01",
    activities: [
      {
        time: "09:00 AM",
        title: "Explore Bodh Gaya",
        location: "Bodh Gaya",
        description:
          "Start your trip by visiting the Mahabodhi Temple, a UNESCO World Heritage Site, where Buddha attained enlightenment.",
        duration: "2 hours",
        tags: ["culture", "history"],
        distance_from_previous: "0 km",
      },
      {
        time: "11:30 AM",
        title: "Lunch at a Local Diner",
        location: "Bodh Gaya",
        description:
          "Enjoy delicious non-veg dishes at a mid-range local diner. Taste authentic Bihari cuisine.",
        duration: "1 hour",
        tags: ["food", "local cuisine"],
        distance_from_previous: "2 km",
      },
      {
        time: "12:30 PM",
        title: "Visit the Bodhi Tree",
        location: "Bodh Gaya",
        description:
          "Spend some time meditating and appreciating the sacred Bodhi Tree, connected to Buddha's life.",
        duration: "1 hour",
        tags: ["spiritual", "nature"],
        distance_from_previous: "0 km",
      },
      {
        time: "01:30 PM",
        title: "Visit Dungeshwari Cave Temples",
        location: "Dungeshwari",
        description:
          "Explore these ancient caves where Buddha meditated before reaching Bodh Gaya.",
        duration: "2 hours",
        tags: ["history", "adventure"],
        distance_from_previous: "12 km",
      },
      {
        time: "04:00 PM",
        title: "Return to Bodh Gaya",
        location: "Bodh Gaya",
        description: "Relax and enjoy some tea or coffee at a local café.",
        duration: "1 hour",
        tags: ["relaxation", "café"],
        distance_from_previous: "12 km",
      },
    ],
  },
  {
    day: 2,
    total_distance_covered: "165 km",
    date: "2023-11-02",
    activities: [
      {
        time: "08:00 AM",
        title: "Travel to Nalanda",
        location: "Nalanda",
        description:
          "Drive to the ancient university town of Nalanda, known for its rich academic history.",
        duration: "2 hours",
        tags: ["history", "culture"],
        distance_from_previous: "0 km",
      },
      {
        time: "10:00 AM",
        title: "Explore Nalanda Archaeological Site",
        location: "Nalanda",
        description:
          "Visit the ruins of the world's first residential university, including the stupas and monasteries.",
        duration: "2 hours",
        tags: ["history", "education"],
        distance_from_previous: "0 km",
      },
      {
        time: "12:00 PM",
        title: "Lunch at a Local Restaurant",
        location: "Nalanda",
        description:
          "Savor a mid-range meal featuring local non-veg specialties.",
        duration: "1 hour",
        tags: ["food", "local cuisine"],
        distance_from_previous: "2 km",
      },
      {
        time: "01:30 PM",
        title: "Visit Nalanda Museum",
        location: "Nalanda",
        description:
          "Learn more about the history of Nalanda through artifacts and exhibits.",
        duration: "1.5 hours",
        tags: ["museum", "culture"],
        distance_from_previous: "1 km",
      },
      {
        time: "03:30 PM",
        title: "Travel to Rajgir",
        location: "Rajgir",
        description:
          "Head to Rajgir, famous for its historical and spiritual significance.",
        duration: "30 mins",
        tags: ["travel"],
        distance_from_previous: "25 km",
      },
      {
        time: "04:00 PM",
        title: "Visit Vishwa Shanti Stupa",
        location: "Rajgir",
        description:
          "Climb or take a cable car to this peace pagoda that offers stunning views.",
        duration: "1.5 hours",
        tags: ["nature", "views"],
        distance_from_previous: "1 km",
      },
      {
        time: "06:00 PM",
        title: "Dinner at a Local Eatery",
        location: "Rajgir",
        description: "Enjoy a delicious dinner featuring local non-veg dishes.",
        duration: "1 hour",
        tags: ["food", "local cuisine"],
        distance_from_previous: "1 km",
      },
    ],
  },
];

type Props = {
  params: Promise<{ id: string }>;
};

const page = ({ params }: Props) => {
  const { id } = use(params) ?? {};

  const { data: itinenaryDetails, isError } = useQuery({
    queryKey: ["itinenary_details", id],
    queryFn: async () => {
      const response = await getItinenaryById({ id });
      console.log({ response });
      const { data } = response ?? {};
      return data;
    },
  });

  const { days = [], location } = itinenaryDetails ?? {};

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
          {location ?? "Kerala"}
        </Typography>
        <TripStyledSubText>
          {days?.length}D/{days?.length + 1}N Itinenary
        </TripStyledSubText>
      </Box>
      {!isError ? (
        <ItineraryDetails days={days} />
      ) : (
        <ItineraryDetails days={fakeDays} />
      )}
      <Box sx={{ px: 2, mb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Request Quote
        </Button>
      </Box>
    </Box>
  );
};

export default page;
