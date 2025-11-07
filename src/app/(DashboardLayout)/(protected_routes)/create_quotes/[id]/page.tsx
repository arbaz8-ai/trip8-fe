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
import {
  FieldValueType,
  fieldNames,
  fields,
  initialValues,
  reviewFields,
} from "../fields";
import React, { use, useRef, useState } from "react";
import {
  TripStyledSubText,
  TripStyledText,
} from "@/components/typography/TripTypography";
import { bluePalette, skyPalette } from "@/utils/theme/tripColor";
import { useMutation, useQuery } from "@tanstack/react-query";

import FamilyIcon from "@/assets/icons/human-male-child.svg";
import { ReviewContext } from "./review/ReviewContext";
import TripSnackbar from "@/components/tripSnackbar/TripSnackbar";
import { getErrorMessage } from "@/utils/APIInterceptor";
import { getItinenaryById } from "@/tripAPI/itinenary";
import { numberToINR } from "@/utils/format/numberToMoney";
import { postQuotation } from "@/tripAPI/quotation";
import { useRouter } from "next/navigation";

const steps = ["Step 1", "Step 2", "Step 3"];

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

  const { data: trip_details } = useQuery({
    queryKey: ["trip_details", id],
    queryFn: async () => {
      const response = await getItinenaryById({ id });
      const { data } = response ?? {};
      return data;
    },
  });
  const { mutate: createQuotation } = useMutation({
    mutationKey: ["request_quotation"],
    mutationFn: async (payload: Parameters<typeof postQuotation>[0]) => {
      const response = await postQuotation(payload);
      return response;
    },
    onSuccess: () => {
      console.log("redirect to next page");
      router.push(`/quotation_list`);
    },
    onError: (err) => {
      const message = getErrorMessage(err);
      setSnackbar({ message, severity: "error" });
    },
  });

  const submitForm = async (values: FieldValueType) => {
    const {
      adults,
      car_budget_range,
      car_type,
      children,
      quote_source,
      requirement,
      stay_budget_range,
      stay,
    } = values ?? {};

    const payload = {
      trip_id: id,
      transport: {
        type: car_type,
      },
      stay: {
        type: stay,
      },
      price: +car_budget_range + +stay_budget_range,
      people: +adults + +children,
      quote_source,
      requirement,
    };

    createQuotation(payload);
  };
  console.log({ trip_details });
  return (
    <ReviewContext.Provider
      value={{
        reviewData: formRef.current?.values ?? {
          children: 0,
          adults: 0,
          requirement: "",
          stay: "",
          car_type: "",
          car_budget_range: 0,
          stay_budget_range: 0,
          quote_source: "",
        },
      }}
    >
      <Box sx={{ px: 2, mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h3">{trip_details?.location} Trip </Typography>
          <TripStyledSubText>
            {`${trip_details?.days.length}D/${
              (trip_details?.days.length ?? 0) + 1
            }N`}{" "}
            itinerary
          </TripStyledSubText>
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
                            {trip_details?.estimated_trip_cost}
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
                            {numberToINR(values[fieldNames.stay_budget_range])}
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
                          label={`${values[fieldNames.children]} + ${
                            values[fieldNames.adults]
                          }`}
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
                          label={`${trip_details?.days.length}D/${
                            (trip_details?.days.length ?? 0) + 1
                          }N`}
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
                          <TripStyledText>From -</TripStyledText>
                          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                            -
                          </Typography>
                        </Box>
                        <Box>
                          <TripStyledText>To -</TripStyledText>
                          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                            {trip_details?.location}
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
                          // onClick={() => {
                          //   router.push(`/quotation_list`);
                          // }}
                          type="submit"
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
