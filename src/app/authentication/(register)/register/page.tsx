"use client";

import {
  AlertColor,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import {
  FieldValueType,
  fields,
  intialValues,
  validationSchema,
} from "./fields";
import React, { useState } from "react";
import {
  SubHeader,
  TripStyledText,
} from "@/components/typography/TripTypography";

import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import TripSnackbar from "@/components/tripSnackbar/TripSnackbar";
import { getOTP } from "@/tripAPI/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Register = () => {
  const theme = useTheme();
  const router = useRouter();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity?: AlertColor;
  }>({
    message: "",
    severity: undefined,
  });
  const { mutate: onSignup, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: FieldValueType) => {
      const response = await getOTP({ ...values, role: "USER" });
      return response;
    },
    onSuccess: (data, values) => {
      router.push("/authentication/otp");
      localStorage.setItem("user", JSON.stringify(values));
      localStorage.setItem("otp", data?.otp ?? "");
    },
    onError: () => {
      setSnackbar({ message: "Something went wrong", severity: "error" });
    },
  });

  const submitForm = async (values: FieldValueType) => {
    onSignup(values);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h3">Create New Account</Typography>
      <SubHeader sx={{ mb: 3 }}>
        Fill the following to create an account on Trip8
      </SubHeader>
      <Formik
        onSubmit={submitForm}
        enableReinitialize
        initialValues={intialValues}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form id="form">
              <Grid container spacing={2} mb={2}>
                {fields.map((item) => {
                  return (
                    <Grid size={{ xs: 12 }} key={item.name}>
                      <Field {...item} />
                    </Grid>
                  );
                })}
              </Grid>
              <TripStyledText sx={{ mb: 1 }}>
                By signing in, you agree to the terms and condition
              </TripStyledText>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ borderRadius: 2, py: 1.2, fontWeight: "bold" }}
                disabled={isPending}
              >
                {isPending ? "Signing Up..." : "Sign Up"}
              </Button>
              <Divider sx={{ my: 3 }}>Or sign up with</Divider>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  borderColor: "grey.300",
                  color: "grey.600",
                }}
              >
                Google
              </Button>

              <TripStyledText sx={{ textAlign: "center", mt: 2 }}>
                I already have an account
                <Box
                  component={"span"}
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                    fontWeight: 500,
                    textDecoration: "none",
                    ml: 0.5,
                  }}
                >
                  <Link
                    href={{
                      pathname: "/authentication/login",
                      // query: ,
                    }}
                    style={{
                      textDecoration: "none",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Sign In
                  </Link>
                </Box>
              </TripStyledText>
            </Form>
          );
        }}
      </Formik>
      <TripSnackbar
        open={Boolean(snackbar.message && snackbar.severity)}
        onClose={() => setSnackbar({ message: "", severity: undefined })}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Register;
