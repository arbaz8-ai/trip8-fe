"use client";

import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import { ItineraryType } from "@/types/APIResponse/Itinenary";
import Timeline from "./Timeline";

const ItineraryDetails = ({ days }: { days: ItineraryType["days"] }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const handleDayChange = (_event: any, newValue: number) => {
    setSelectedDay(newValue);
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
          mb: 2,
        }}
      >
        {days.map((day, index) => {
          const isActive = selectedDay === index;
          return (
            <Button
              key={day.day}
              variant="outlined"
              onClick={(e) => handleDayChange(e, index)}
              sx={{
                borderRadius: 99,
                height: 32,
                px: 2,
                ...(isActive && {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }),
              }}
            >
              Day {index + 1}
            </Button>
          );
        })}
      </Box>

      {days[selectedDay] && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {days[selectedDay].activities.map((activity, index) => {
            const isLast = index === days[selectedDay].activities.length - 1;
            return (
              <Timeline
                key={activity.time}
                desc={activity.description}
                time={activity.time}
                title={activity.title}
                isLast={isLast}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ItineraryDetails;
