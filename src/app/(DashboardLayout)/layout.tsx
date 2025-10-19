"use client";

import { Box, styled } from "@mui/material";

import BottomNavTab from "@/components/BottomNavTab";
import React from "react";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (loader) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       minHeight="100vh"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }
  return (
    <MainWrapper>
      <Box sx={{ width: "100%" }}>{children}</Box>
      <BottomNavTab />
    </MainWrapper>
  );
}
