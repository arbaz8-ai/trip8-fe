"use client";

import React from "react";
import { styled } from "@mui/material";

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
  return <MainWrapper>{children}</MainWrapper>;
}
