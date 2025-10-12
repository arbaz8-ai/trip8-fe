"use client";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import OTPInput from "./Otp";
import { postSignin } from "@/tripAPI/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const OtpPage = () => {
  const theme = useTheme();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    try {
      const ls = localStorage.getItem("user");
      if (ls === null) {
        return;
      }
      const parsedUser = JSON.parse(ls);
      setUser(parsedUser);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const router = useRouter();

  const { mutate: verifyOTP, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (values: Parameters<typeof postSignin>[0]) => {
      const response = await postSignin(values);
      console.log({ response });
      return response;
    },
    onSuccess: (data) => {
      const { access_token } = data ?? {};
      localStorage.setItem("token", access_token);
      localStorage.removeItem("number");
      router.push("/home");
    },
  });

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
          OTP Sent to {user?.number}
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
              verifyOTP({ ...user, otp: value });
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ borderRadius: 2, py: 1.2, fontWeight: "bold", mb: 1 }}
          disabled={isPending}
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
