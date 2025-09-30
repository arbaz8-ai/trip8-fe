"use client";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import OTPInput from "./Otp";
import { useRouter } from "next/navigation";

const OtpPage = () => {
  const theme = useTheme();
  const [number, setNumber] = useState<string | null>(null);
  useEffect(() => {
    const number = localStorage.getItem("number");
    setNumber(number);
  }, []);

  const router = useRouter();

  const onSubmit = async () => {};
  return (
    <Container
      maxWidth={"sm"}
      sx={{
        p: { xs: 3, sm: 4 },
        background: theme.palette.background.default,
        height: { xs: "100%", md: "fit-content" },
      }}
    >
      <Box>
        <Typography variant="h3">OTP Verification</Typography>
        <Typography sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          A 4 digit code has been sent to your WhatsApp.
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary, mb: 2 }}>
          OTP Sent to {number}
          <Link
            href={{
              pathname: "login",
            }}
          >
            Edit
          </Link>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mb: 3,
          }}
        >
          <OTPInput
            onComplete={(value) => {
              if (value === "1234") {
                router.push("/authentication/register");
              }
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ borderRadius: 2, py: 1.2, fontWeight: "bold", mb: 1 }}
          onClick={onSubmit}
        >
          Continue
        </Button>
        <Typography
          sx={{ color: theme.palette.text.secondary, textAlign: "center" }}
        >
          Didn’t receive OTP? Resend
        </Typography>
      </Box>
    </Container>
  );
};

export default OtpPage;
