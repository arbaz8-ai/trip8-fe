// export type ApiErrorType = AxiosResponse<
//   | {
//       message?: string;
//       error?: string;
//       errors?: Record<string, string[]>;
//     }
//   | string
// >;

export const getErrorMessage = (
  error: Error | string,
  errorheader: string = ""
): string => {
  let errorMessage = "Something went wrong";
  if (typeof error === "string") {
    errorMessage = error;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error && typeof error === "object" && "data" in error) {
    const { data } = error as { data: unknown };
    if (typeof data === "string") {
      errorMessage = data;
    } else if (data && typeof data === "object") {
      const {
        error: apiError = "",
        message: apiMessage = "",
        errors: apiErrors,
      } = data as {
        error?: string;
        message?: string;
        errors?: Record<string, string[]>;
      };
      errorMessage =
        apiError ||
        apiMessage ||
        (apiErrors && JSON.stringify(apiErrors)) ||
        errorMessage;
    }
  }
  if (process.env.NODE_ENV === "development") {
    console.log("ERROR", errorheader, errorMessage);
  }
  return errorMessage;
};
