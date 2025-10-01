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
// import AuthLogin from "../auth/AuthLogin";
// import Link from "next/link";
// import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
// import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import React, { useEffect, useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import TextField from "@/components/textField/TextField";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

enum fieldNames {
  number = "number",
}

interface FieldValueType {
  [fieldNames.number]: string;
}

const fields = [
  {
    name: fieldNames.number,
    placeholder: "Enter WhatsApp Number",
    component: TextField,
    color: "primary",
    label: "WhatsApp Number",
  },
];

const intialValues: FieldValueType = {
  [fieldNames.number]: "",
};

const validationSchema = Yup.object({
  [fieldNames.number]: Yup.string().required(),
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
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      return response.json();
    },
    onSuccess: (_data, { number }) => {
      router.push(`/authentication/otp`);
      localStorage.setItem("number", number);
    },
  });

  const submitForm = async (values: FieldValueType) => {
    loginForm(values);
  };
  return (
    // <Box
    //   sx={{
    //     height: "100vh",
    //     display: "flex",
    //     flexDirection: "column",
    //   }}
    // >
    //   <Box
    //     minHeight={"30vh"}
    //     width={"100%"}
    //     sx={{
    //       display: "flex",
    //       alignItems: "end",
    //       justifyContent: { xs: "start", md: "center" },
    //     }}
    //   >
    //     <Typography
    //       textAlign="center"
    //       sx={{
    //         fontSize: 34,
    //         textAlign: "start",
    //         lineHeight: 1,
    //         ml: { xs: 2, md: 0 },
    //         color: theme.palette.grey[400],
    //         fontWeight: 700,
    //       }}
    //       gutterBottom
    //     >
    //       TRIP PLANNING SIMPLIFIED
    //     </Typography>
    //   </Box>
    <Box sx={{ flex: 1, width: "100%" }}>
      <Container
        maxWidth={"sm"}
        sx={{
          p: { xs: 3, sm: 4 },
          background: "#fff",
          height: { xs: "100%", md: "fit-content" },
        }}
      >
        <>
          <Typography variant="h3" mb={1}>
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Fill the following to log into your account
          </Typography>

          <Formik
            initialValues={!!number ? { number } : intialValues}
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
        </>
      </Container>
    </Box>
    // </Box>
    // <PageContainer title="Login" description="this is Login page">
    //   <Box
    //     sx={{
    //       position: "relative",
    //       "&:before": {
    //         content: '""',
    //         background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
    //         backgroundSize: "400% 400%",
    //         animation: "gradient 15s ease infinite",
    //         position: "absolute",
    //         height: "100%",
    //         width: "100%",
    //         opacity: "0.3",
    //       },
    //     }}
    //   >
    //     <Grid
    //       container
    //       spacing={0}
    //       justifyContent="center"
    //       sx={{ height: "100vh" }}
    //     >
    //       <Grid
    //         display="flex"
    //         justifyContent="center"
    //         alignItems="center"
    //         size={{
    //           xs: 12,
    //           sm: 12,
    //           lg: 4,
    //           xl: 3,
    //         }}
    //       >
    //         <Card
    //           elevation={9}
    //           sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
    //         >
    //           <Box display="flex" alignItems="center" justifyContent="center">
    //             <Logo />
    //           </Box>
    //           <AuthLogin
    //             subtext={
    //               <Typography
    //                 variant="subtitle1"
    //                 textAlign="center"
    //                 color="textSecondary"
    //                 mb={1}
    //               >
    //                 Your Social Campaigns
    //               </Typography>
    //             }
    //             subtitle={
    //               <Stack
    //                 direction="row"
    //                 spacing={1}
    //                 justifyContent="center"
    //                 mt={3}
    //               >
    //                 <Typography
    //                   color="textSecondary"
    //                   variant="h6"
    //                   fontWeight="500"
    //                 >
    //                   New to Modernize?
    //                 </Typography>
    //                 <Typography
    //                   component={Link}
    //                   href="/authentication/register"
    //                   fontWeight="500"
    //                   sx={{
    //                     textDecoration: "none",
    //                     color: "primary.main",
    //                   }}
    //                 >
    //                   Create an account
    //                 </Typography>
    //               </Stack>
    //             }
    //           />
    //         </Card>
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </PageContainer>
  );
};
export default Login2;
