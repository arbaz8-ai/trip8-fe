"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";

import CounterField from "@/components/counterField/CounterField";
import React from "react";
import TripCard from "../components/tripCard/TripCard";

const page = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={{ my: 2 }}>
        Wishlist
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 2,
              height: 48,
              fontWeight: 500,
            }}
          >
            Saved
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: 2,
              height: 48,
              fontWeight: 500,
            }}
          >
            Creates
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Box key={index} sx={{ minWidth: 240, flexShrink: 0 }}>
            <TripCard />
          </Box>
        ))}
      </Box>

      <Formik initialValues={{ gender: "" }} onSubmit={() => {}}>
        {({ values }) => {
          console.log({ values });
          return (
            <Form id="form">
              <Field name={"gender"} component={CounterField} />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default page;
