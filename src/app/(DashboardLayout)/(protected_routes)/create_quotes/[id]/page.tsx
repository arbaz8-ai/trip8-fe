"use client";

import {
  AlertColor,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { FieldValueType, fields, initialValues, reviewFields } from "../fields";
import React, { createContext, use, useRef, useState } from "react";
import { bluePalette, skyPalette } from "@/utils/theme/tripColor";

import FamilyIcon from "@/assets/icons/human-male-child.svg";
import TripSnackbar from "@/components/tripSnackbar/TripSnackbar";
import { TripStyledText } from "@/components/typography/TripTypography";
import { useRouter } from "next/navigation";

const steps = ["Step 1", "Step 2", "Step 3"];

interface ReviewContextType {
  reviewData: FieldValueType;
  setReviewData?: (data: FieldValueType) => void;
}

export const ReviewContext = createContext<ReviewContextType | undefined>(
  undefined
);

type Props = {
  params: Promise<{ id: string }>;
};
const page = ({ params }: Props) => {
  const { id } = use(params);
  const theme = useTheme();
  const router = useRouter();
  console.log({ id });
  const [activeStep, setActiveStep] = useState(0);
  const formRef = useRef<FormikProps<FieldValueType>>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity?: AlertColor;
  }>({
    message: "",
    severity: undefined,
  });

  const isLastStep = activeStep === steps.length - 1;

  // const refirectToQuoteReview = () => {
  //   router.push(`/create_quotes/${id}/review`);
  // };

  const handleNext = (values?: FieldValueType) => {
    setActiveStep((prevStep) => prevStep + 1);
    console.log({ values });
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const submitForm = async (values: FieldValueType) => {
    console.log({ values });
  };

  return (
    <ReviewContext.Provider
      value={{
        reviewData: formRef.current?.values ?? {
          children: 0,
          adults: 0,
          requirement: "",
          stay: "",
          car_type: "",
          car_budget_range: "",
          quote_source: "",
        },
      }}
    >
      <Box sx={{ px: 2, mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h3">Create Personalised Itinerary </Typography>
          <TripStyledText>AI Power Itinerary Planning</TripStyledText>
        </Box>
        {activeStep < steps.length && (
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
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={submitForm}
          enableReinitialize
          innerRef={formRef}
        >
          {({ isSubmitting, isValid, values }) => {
            console.log({ values });
            return (
              <Form id="form">
                {activeStep < steps.length && (
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {fields[activeStep]?.map((item) => {
                      const { colCount, ...fieldProps } = item ?? {};
                      return (
                        <Grid
                          size={{ xs: colCount, sm: 6 }}
                          key={item.name}
                          mb={2}
                        >
                          <Field {...fieldProps} />
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
                          // type="submit"
                          variant="contained"
                          disabled={isSubmitting || !isValid}
                          onClick={() => {
                            handleNext();
                          }}
                        >
                          {"Review"}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                )}
                {activeStep === steps.length && (
                  <Container maxWidth="xl" sx={{ py: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Let’s review your request
                    </Typography>
                    <Box
                      sx={{
                        borderRadius: 4,
                        p: 2,
                        background: skyPalette[100],
                        mb: 2,
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 3,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: skyPalette[800],
                              fontWeight: 500,
                            }}
                          >
                            Total Price Estimate(₹)
                          </Typography>
                          <Typography
                            sx={{
                              color: bluePalette[900],
                              fontWeight: 700,
                              fontSize: 16,
                            }}
                          >
                            20,000 - 30,000
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: 12, color: skyPalette[800] }}
                          >
                            Hotel Budget
                          </Typography>
                          <Typography
                            sx={{
                              color: bluePalette[900],
                              fontWeight: 700,
                              fontSize: 16,
                            }}
                          >
                            3,000
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          justifyContent: "flex-end",
                          position: "absolute",
                          width: "100%",
                          left: "-30px",
                          top: "72px",
                        }}
                      >
                        <Chip
                          label="4D/5D"
                          icon={
                            <FamilyIcon fill={theme.palette.success.light} />
                          }
                          sx={{
                            border: "2px solid",
                            borderColor: theme.palette.success.light,
                            background: "#b9f6ca",
                            color: theme.palette.success.light,
                            fontWeight: 700,
                            fontSize: 12,
                            height: 24,
                          }}
                        />
                        <Chip
                          label="4D/5D"
                          sx={{
                            border: "2px solid",
                            borderColor: "#6750A4",
                            background: "#ede7f6",
                            color: "#6750A4",
                            fontWeight: 700,
                            fontSize: 12,
                            height: 24,
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: theme.palette.common.white,
                          p: 2,
                          borderRadius: 4,
                        }}
                      >
                        <Box>
                          <TripStyledText>From 12th Jan</TripStyledText>
                          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                            Guwahati
                          </Typography>
                        </Box>
                        <Box>
                          <TripStyledText>To 19th Jan</TripStyledText>
                          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                            Shillong
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography>
                      Please feel free to change your preferences to update the
                      estimate before requesting quotes
                    </Typography>
                    <Grid container>
                      {reviewFields.map((item) => {
                        const { colCount, ...fieldProps } = item ?? {};
                        return (
                          <Grid key={item.name} size={{ xs: colCount }} mb={2}>
                            <Field {...fieldProps} />
                          </Grid>
                        );
                      })}
                    </Grid>
                    {activeStep === steps.length && (
                      <Box>
                        <Button
                          fullWidth
                          // disabled={activeStep === 0}
                          onClick={handleBack}
                          variant="outlined"
                          sx={{ mb: 2 }}
                        >
                          Back
                        </Button>
                        <Button
                          fullWidth
                          // disabled={activeStep === 0}
                          onClick={() => {
                            router.push(`/quotation_list`);
                          }}
                          variant="contained"
                        >
                          Request Quotes
                        </Button>
                      </Box>
                    )}
                  </Container>
                )}
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
    </ReviewContext.Provider>
  );
};

export default page;
