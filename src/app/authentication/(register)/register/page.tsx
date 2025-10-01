"use client";

import {
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
  SubHeader,
  TripStyledText,
} from "@/components/typography/TripTypography";
import { fields, intialValues, validationSchema } from "./fields";

import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
// import AuthRegister from "../../auth/AuthRegister";
// import Link from "next/link";
// import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
// import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import React from "react";

const Register = () => {
  const isPending = false;
  const theme = useTheme();
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h3">Create New Account</Typography>
      <SubHeader sx={{ mb: 3 }}>
        Fill the following to create an account on Trip8
      </SubHeader>
      <Formik
        onSubmit={() => {}}
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
    </Container>
  );
};

// <PageContainer title="Register" description="this is Register page">
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
//           <AuthRegister
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
//                 justifyContent="center"
//                 spacing={1}
//                 mt={3}
//               >
//                 <Typography
//                   color="textSecondary"
//                   variant="h6"
//                   fontWeight="400"
//                 >
//                   Already have an Account?
//                 </Typography>
//                 <Typography
//                   component={Link}
//                   href="/authentication/login"
//                   fontWeight="500"
//                   sx={{
//                     textDecoration: "none",
//                     color: "primary.main",
//                   }}
//                 >
//                   Sign In
//                 </Typography>
//               </Stack>
//             }
//           />
//         </Card>
//       </Grid>
//     </Grid>
//   </Box>
// </PageContainer>
// );

export default Register;
