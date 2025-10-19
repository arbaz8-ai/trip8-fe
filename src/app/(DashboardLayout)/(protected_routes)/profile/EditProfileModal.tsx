import {
  AlertColor,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import {
  FieldValueType,
  fields,
  initialValues,
  validationSchema,
} from "./fields";
import React, { forwardRef, useRef, useState } from "react";

import { CameraAlt } from "@mui/icons-material";
import TripSnackbar from "@/components/tripSnackbar/TripSnackbar";
import theme from "@/utils/theme";
import { updateUser } from "@/tripAPI/user";
import { useMutation } from "@tanstack/react-query";

interface EditProfileModalProps {
  modalOpen: boolean;
  handleClose: (event: any) => void;
  onUpdateCallback?: () => void;
  apiInitialValues?: FieldValueType;
}

const MODAL_SPACING = 0;
const HEADER_HEIGHT = 0;

const EditProfileModal = forwardRef(
  (
    {
      handleClose,
      modalOpen,
      apiInitialValues = initialValues,
      onUpdateCallback,
    }: EditProfileModalProps,
    ref
  ) => {
    const formRef = useRef<FormikProps<FieldValueType>>(null);
    const [snackbar, setSnackbar] = useState<{
      message: string;
      severity?: AlertColor;
    }>({
      message: "",
      severity: undefined,
    });

    // const { data: userDetails } = useQuery({
    //   queryKey: ["user_details"],
    //   queryFn: async () => {
    //     const response = await getUser();
    //     return response;
    //   },
    // });

    const { mutateAsync: updateProfile } = useMutation({
      mutationKey: ["update_user"],
      mutationFn: async (values: FieldValueType) => {
        const response = await updateUser(values);
        return response;
      },
      onSuccess: () => {
        if (onUpdateCallback) {
          onUpdateCallback();
        }
      },
    });

    const onFormSubmit = async (values: FieldValueType) => {
      await updateProfile(values);
    };
    return (
      <Slide in={modalOpen} direction="up" ref={ref} tabIndex={-1}>
        <Container
          disableGutters={true}
          component="main"
          maxWidth="md"
          sx={{
            outline: "none",
            position: "absolute",
            top: MODAL_SPACING,
            left: 0,
            right: 0,
            bottom: MODAL_SPACING,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              background: theme.palette.background.paper,
              color: theme.palette.getContrastText(
                theme.palette.background.paper
              ),
              boxShadow: theme.shadows[1],
              overflow: "hidden",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ flex: 1 }} variant="h6">
                Edit Profile
              </Typography>

              <IconButton color="inherit" size="small" onClick={handleClose}>
                Close
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
                mt: 5,
              }}
            >
              <Box sx={{ position: "relative", display: "flex" }}>
                <Avatar
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  sx={{ width: 90, height: 90, border: "3px solid white" }}
                />
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: "white",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    boxShadow: 1,
                  }}
                >
                  <CameraAlt fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                maxHeight: `calc(100vh - ${
                  HEADER_HEIGHT + 2 * MODAL_SPACING
                }px)`,
                overflowY: "auto",
              }}
            >
              <Box>
                <Formik
                  innerRef={formRef}
                  initialValues={apiInitialValues}
                  validationSchema={validationSchema}
                  onSubmit={onFormSubmit}
                  enableReinitialize
                >
                  {({ status, isSubmitting }) => {
                    return (
                      <Form id={"form_id"}>
                        <Grid container spacing={2} px={2} py={2} mb={2}>
                          {fields.map((item) => {
                            const { colCount, ...fieldProps } = item || {};

                            return (
                              <Grid size={{ xs: colCount }} key={item.name}>
                                <Field
                                  {...fieldProps}
                                  required={
                                    !(validationSchema.fields as any)[item.name]
                                      ?.spec?.optional
                                  }
                                />
                              </Grid>
                            );
                          })}
                          <Typography>{status}</Typography>

                          <Grid size={{ xs: 12 }}>
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              variant="contained"
                              fullWidth
                              sx={{
                                height: 48,
                                mt: 2,
                                fontWeight: 700,
                                borderRadius: 2,
                              }}
                              aria-label="Submit"
                            >
                              Save Details
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          </Paper>
          <TripSnackbar
            open={Boolean(snackbar.message && snackbar.severity)}
            onClose={() => setSnackbar({ message: "", severity: undefined })}
            severity={snackbar.severity}
            message={snackbar.message}
          />
        </Container>
      </Slide>
    );
  }
);

EditProfileModal.displayName = "EditProfileModal";

export default EditProfileModal;
