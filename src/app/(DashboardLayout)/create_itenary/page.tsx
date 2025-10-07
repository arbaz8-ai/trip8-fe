"use client";

import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { fields, intitialValues } from "./fields";

import { TripStyledText } from "@/components/typography/TripTypography";

const steps = ["Step 1", "Step 2", "Step 3"];

const CreateItenary = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const isLastStep = activeStep === steps.length - 1;
  return (
    <Box sx={{ px: 2, mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3">Create Personalised Itinerary </Typography>
        <TripStyledText>AI Power Itinerary Planning</TripStyledText>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "&.MuiStepLabel-alternativeLabel > span > span": {
                    mt: 0,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Formik
        initialValues={intitialValues}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ values, isSubmitting, isValid }) => {
          console.log(values);
          return (
            <Form id="form">
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {fields[activeStep]?.map((item) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={item.name} mb={2}>
                    <Field {...item} />
                  </Grid>
                ))}
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    Back
                  </Button>
                </Grid>
                {!isLastStep && (
                  <Grid size={{ xs: 6 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={isSubmitting || !isValid}
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </Grid>
                )}
                {isLastStep && (
                  <Grid size={{ xs: 6 }}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || !isValid}
                    >
                      {"Create Itinerary"}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default CreateItenary;
