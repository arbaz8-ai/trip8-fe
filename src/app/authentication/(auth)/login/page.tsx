"use client";

import * as Yup from "yup";

import {
  Box,
  Button,
  Container,
  TextField as CountryCodeText,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import TextField from "@/components/textField/TextField";
import { getOTP } from "@/tripAPI/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

enum fieldNames {
  mobile_email = "mobile_email",
}

interface FieldValueType {
  [fieldNames.mobile_email]: string;
}

const fields = [
  {
    name: fieldNames.mobile_email,
    placeholder: "Enter WhatsApp Number",
    component: TextField,
    color: "primary",
    label: "WhatsApp Number",
  },
];

const intialValues: FieldValueType = {
  [fieldNames.mobile_email]: "",
};

const validationSchema = Yup.object({
  [fieldNames.mobile_email]: Yup.string().required(),
});

const Login2 = () => {
  const theme = useTheme();
  const router = useRouter();

  const [number, setNumber] = useState<string | null>(null);

  useEffect(() => {
    const number = localStorage.getItem("number");
    setNumber(number);
  }, []);

  const { mutate: loginForm, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (values: FieldValueType) => {
      const response = await getOTP(values);

      return response;
    },
    onSuccess: (data, values) => {
      router.push(`/authentication/otp`);
      localStorage.setItem("user", JSON.stringify(values));
      localStorage.setItem("otp", data?.otp ?? "");
    },
  });
  const submitForm = async (values: FieldValueType) => {
    loginForm(values);
  };
  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Container
        maxWidth={"sm"}
        sx={{
          p: { xs: 3, sm: 4 },
          background: "#fff",
          height: { xs: "100%", md: "fit-content" },
        }}
      >
        <Typography variant="h3" mb={1}>
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Fill the following to log into your account
        </Typography>

        <Formik
          initialValues={!!number ? { mobile_email: number } : intialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
          enableReinitialize
        >
          {() => (
            <Form id="form">
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ width: 60 }}>
                  <CountryCodeText value={"+91"} />
                </Box>
                {fields.map((item) => {
                  const { name } = item ?? {};
                  return (
                    <Box key={name} mb={2} sx={{ flex: 1 }}>
                      <Field {...item} />{" "}
                    </Box>
                  );
                })}
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ borderRadius: 2, py: 1.2, fontWeight: "bold" }}
                disabled={isPending}
              >
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>

        <Divider sx={{ my: 3 }}>Or Login with</Divider>

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

        <Typography
          variant="body2"
          mt={2}
          textAlign="center"
          color="text.secondary"
        >
          Don’t have an account ?
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
                pathname: "/authentication/register",
                // query: ,
              }}
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              Sign Up
            </Link>
          </Box>
        </Typography>
      </Container>
    </Box>
  );
};
export default Login2;
