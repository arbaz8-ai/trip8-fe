"use client";

import React, { useEffect } from "react";

import BottomNavTab from "@/components/BottomNavTab";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Protectedlayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found, redirecting to login");
          router.push("/authentication/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        router.push("/authentication/login");
      } finally {
        //
      }
    };
    isLoggedIn();
  }, []);

  return (
    <Box sx={{ width: "100%", mb: 10 }}>
      {children}
      <BottomNavTab />
    </Box>
  );
};

export default Protectedlayout;
