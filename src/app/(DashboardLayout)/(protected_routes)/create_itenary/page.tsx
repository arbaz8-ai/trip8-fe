"use client";

import {
  AlertColor,
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { FieldValueType, fieldNames, fields, intitialValues } from "./fields";
import React, { useRef, useState } from "react";

import Places from "./Places";
import TripSnackbar from "@/components/tripSnackbar/TripSnackbar";
import { TripStyledText } from "@/components/typography/TripTypography";
import { createItinenary } from "@/tripAPI/itinenary";
import { getSuggestedPlace } from "@/tripAPI/getSuggestedPlace";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const steps = ["Step 1", "Step 2", "Step 3", "step 4"];

const CreateItenary = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const formRef = useRef<FormikProps<FieldValueType>>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity?: AlertColor;
  }>({
    message: "",
    severity: undefined,
  });

  const { mutate: createItinenaryForm, isPending } = useMutation({
    mutationKey: ["create_itinenary"],
    mutationFn: async (values: FieldValueType) => {
      const response = await createItinenary(values);
      return response;
    },
    onSuccess: (data) => {
      const { _id } = data ?? {};
      router.push(`/trip_details/${_id}`);
    },
    onError: () => {
      setSnackbar({ message: "Something went wrong", severity: "error" });
    },
  });

  const {
    mutate: getSuggestedPLaces,
    data: places,
    isError,
    isPending: placesPending,
  } = useMutation({
    mutationKey: ["places"],
    mutationFn: async ({ values }: { values: FieldValueType }) => {
      const { days, destination, nights, starting, trip_info } = values ?? {};
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
    onError: () => {
      setSnackbar({ message: "Something went wrong", severity: "error" });
    },
  });

  const isLastStep = activeStep === steps.length - 1;
  console.log({ places });
  const submitForm = async (values: FieldValueType) => {
    createItinenaryForm(values);
  };

  const handleNext = (values: FieldValueType) => {
    setActiveStep((prevStep) => prevStep + 1);
    if (activeStep === 2) {
      getSuggestedPLaces({ values });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
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
        innerRef={formRef}
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
                          isLoading={placesPending}
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
      <TripSnackbar
        open={Boolean(snackbar.message && snackbar.severity)}
        onClose={() => setSnackbar({ message: "", severity: undefined })}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
};

export default CreateItenary;
