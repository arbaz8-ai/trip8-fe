import { Box } from "@mui/material";
import React from "react";
import TripCard from "../../../../components/tripCard/TripCard";
import { getSavedTrips } from "@/tripAPI/trips";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const SavedrTrips = () => {
  const router = useRouter();
  const { data: savedTrips, refetch: refetchSavedTrips } = useQuery({
    queryKey: ["saved_trips"],
    queryFn: async () => {
      const response = await getSavedTrips({ limit: 20, page: 1 });
      const { data } = response ?? {};
      return data;
    },
  });

  const redirectTotripDetails = (id: string) => {
    router.push(`trip_details/${id}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {savedTrips?.map((trip, index) => {
        const {
          created_at,
          days,
          nights,
          destination,
          _id: tripID,
        } = trip ?? {};
        return (
          <Box
            key={index}
            sx={{ minWidth: 240, flexShrink: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              redirectTotripDetails(tripID);
            }}
          >
            <TripCard
              id={tripID}
              destination={destination}
              date={created_at}
              duration={`${days}D/${nights}N`}
              onHeartClickCallback={() => {
                refetchSavedTrips();
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default SavedrTrips;
