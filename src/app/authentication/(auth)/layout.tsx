"use client";

import { Box, Typography, useTheme } from "@mui/material";

import React from "react";
import { usePathname } from "next/navigation";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const path = usePathname();
  return (
    <Box style={{ background: theme.palette.grey[200] }}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          minHeight={"30vh"}
          width={"100%"}
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: { xs: "start", md: "center" },
          }}
        >
          {path.includes("/login") && (
            <Typography
              textAlign="center"
              sx={{
                fontSize: 34,
                textAlign: "start",
                lineHeight: 1,
                ml: { xs: 2, md: 0 },
                color: theme.palette.grey[400],
                fontWeight: 700,
              }}
              gutterBottom
            >
              TRIP PLANNING SIMPLIFIED
            </Typography>
          )}
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default Authlayout;
