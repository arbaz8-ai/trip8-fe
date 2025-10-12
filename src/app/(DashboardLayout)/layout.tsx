"use client";

import { Box, CircularProgress, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

// import { usePathname, useRouter } from "next/navigation";

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
  const [loader, setLoader] = useState<boolean>(true);
  const router = useRouter();

  // const PUBLIC_ROUTES = [
  //   "/authentication/login",
  //   "/authentication/register",
  //   "/authentication/otp",
  // ];

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        // const isPublicRoute = PUBLIC_ROUTES.some((route) =>
        //   pathname.startsWith(route)
        // );

        if (!token) {
          console.log("No token found, redirecting to login");
          router.push("/authentication/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/authentication/login");
      } finally {
        setLoader(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loader) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return <MainWrapper>{children}</MainWrapper>;
}
