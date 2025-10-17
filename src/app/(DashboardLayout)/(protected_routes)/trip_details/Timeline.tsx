import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";

import React from "react";

interface TimelineProps {
  time: string;
  title: string;
  desc: string;
  isLast: boolean;
}

const Timeline = ({ time, title, desc, isLast }: TimelineProps) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center" position="relative">
      <Box
        sx={{
          border: "1px solid",
          py: 2,
          borderRadius: 2,
          borderColor: theme.palette.grey[300],
          maxWidth: 50,
          background: theme.palette.common.white,
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            lineHeight: 1,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          {time}
        </Typography>
      </Box>
      {!isLast && (
        <Box
          sx={{
            width: "2px",
            background:
              "repeating-linear-gradient(transparent, transparent 8px, #ccc 8px, #ccc 12px)",
            height: "100%",
            position: "absolute",
            left: 25,
            top: 50,
            zIndex: 0,
          }}
        />
      )}

      <Card
        sx={{
          flex: 1,
          ml: 4,
          borderRadius: 3,
          border: "1px solid #eee",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <CardContent sx={{ background: theme.palette.common.white }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Timeline;
