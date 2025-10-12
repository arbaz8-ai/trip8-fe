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
import { FieldValueType, fieldNames, fields, intitialValues } from "./fields";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import Places from "./Places";
import { TripStyledText } from "@/components/typography/TripTypography";
import { createItinenary } from "@/tripAPI/itinenary";
import { getSuggestedPlace } from "@/tripAPI/getSuggestedPlace";
import { useRouter } from "next/navigation";

const steps = ["Step 1", "Step 2", "Step 3", "step 4"];

const CreateItenary = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FieldValueType>(intitialValues);

  const handleNext = (values: FieldValueType) => {
    if (activeStep === 3) {
      setFormData(values);
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const { mutate: createItinenaryForm, isPending } = useMutation({
    mutationKey: ["create_itinenary"],
    mutationFn: async (values: FieldValueType) => {
      console.log(values);
      const response = await createItinenary(values);
      return response;
    },
    onSuccess: (data) => {
      const { _id } = data ?? {};
      router.push(`/itinenary_details/${_id}`);
    },
  });

  const {
    data: places,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["places", formData],
    queryFn: async () => {
      const { days, destination, nights, starting, trip_info } = formData ?? {};
      const response = await getSuggestedPlace({
        days,
        destination,
        nights,
        starting,
        trip_info,
      });
      const { places } = response ?? {};
      return places;
    },
    enabled: activeStep === 3,
  });

  const isLastStep = activeStep === steps.length - 1;

  const submitForm = async (values: FieldValueType) => {
    createItinenaryForm(values);
  };

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
        onSubmit={submitForm}
        enableReinitialize
      >
        {({ isSubmitting, isValid, values }) => {
          return (
            <Form id="form">
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {fields[activeStep]?.map((item) => {
                  if (
                    item.name === `${fieldNames.trip_info}.${fieldNames.places}`
                  ) {
                    return (
                      <Grid size={{ xs: 12, sm: 6 }} key={item.name} mb={2}>
                        <Places
                          item={item}
                          options={
                            isError
                              ? [
                                  { name: "arbaz", category: [] },
                                  { name: "alam", category: [] },
                                ]
                              : places
                          }
                          isLoading={isLoading}
                        />
                      </Grid>
                    );
                  }
                  return (
                    <Grid size={{ xs: 12, sm: 6 }} key={item.name} mb={2}>
                      <Field {...item} />
                    </Grid>
                  );
                })}
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
                      onClick={() => handleNext(values)}
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
                      disabled={isSubmitting || !isValid || isPending}
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
