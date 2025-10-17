"use client";

import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";

import BottomNavTab from "@/components/BottomNavTab";
import { refreshAccessToken } from "@/tripAPI/refreshToken";

export const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const refreshToken = async () => {
    try {
      const rt = localStorage.getItem("refreshToken");
      if (!rt) {
        throw new Error("No Refresh Token Found");
      }
      const response = await refreshAccessToken();
      const { access_token, refresh_token } = response ?? {};
      localStorage.setItem("token", access_token);
      localStorage.setItem("refreshToken", refresh_token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let flag = false;
    const interval = setInterval(() => {
      if (flag) {
        refreshToken();
      }
      flag = true;
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
