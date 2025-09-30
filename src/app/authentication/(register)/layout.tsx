"use client";

import { Box, useTheme } from "@mui/material";

import React from "react";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        p: 2,
        height: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

export default Authlayout;
