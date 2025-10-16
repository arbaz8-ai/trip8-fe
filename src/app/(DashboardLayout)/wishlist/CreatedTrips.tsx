import { Box } from "@mui/material";
import React from "react";
import TripCard from "../components/tripCard/TripCard";
import { getCreatedTrips } from "@/tripAPI/trips";
import { useQuery } from "@tanstack/react-query";

const CreatedTrips = () => {
  const { data: createdTrips } = useQuery({
    queryKey: ["created_trips"],
    queryFn: async () => {
      const response = await getCreatedTrips({ limit: 20, page: 1 });
      const { data } = response ?? {};
      return data;
    },
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {createdTrips?.map((trip, index) => {
        const {
          created_at,
          days,
          nights,
          destination,
          _id: tripID,
        } = trip ?? {};
        return (
          <Box key={index} sx={{ minWidth: 240, flexShrink: 0 }}>
            <TripCard
              id={tripID}
              destination={destination}
              date={created_at}
              duration={`${days}D/${nights}N`}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default CreatedTrips;
