import {
  BaseTextFieldProps,
  InputAdornment,
  InputBaseProps,
  TextField as MTextField,
  MenuItem,
  alpha,
  useTheme,
} from "@mui/material";
import { FieldProps, getIn } from "formik";
import React, { FC } from "react";

// import { TripIconButton } from "../tripButtons/TripIconButton";

// import VisibilityIcon from "@assets/materialIcons/visibility.svg?react";
// import VisibilityOffIcon from "@assets/materialIcons/visibility_off.svg?react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface TextFieldType extends Partial<FieldProps>, BaseTextFieldProps {
  disabled?: boolean;
  variant?: "outlined" | "filled" | "standard";
  prefix?: string;
  suffix?: string | React.ReactNode;
  options?: Array<SelectOption>;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  InputProps?: Partial<InputBaseProps>;
  textTransform?: "uppercase" | "lowercase" | "";
  maxLength?: number;
}

const TextField: FC<TextFieldType> = ({
  field,
  form,
  disabled = false,
  prefix,
  suffix,
  onBlur = () => {},
  onChange = () => {},
  options,
  textTransform = "",
  variant = "outlined",
  color = "secondary",
  maxLength,
  InputProps,
  ...mTextFieldProps
}) => {
  const { name = "", value } = field || {};
  const { setFieldValue, touched, errors, setFieldTouched } = form || {};
  //   const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useTheme();

  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const errorMsg = touch && error;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let finalValue = event.target.value;
    switch (textTransform) {
      case "uppercase":
        finalValue = finalValue.toUpperCase();
        break;
      case "lowercase":
        finalValue = finalValue.toLowerCase();
        break;
      default:
        break;
    }
    if (setFieldValue) {
      setFieldValue(name, finalValue);
    }
    onChange(finalValue);
  };

  //   const handleTogglePasswordShow = () => {
  //     setShowPassword((prevValue) => !prevValue);
  //   };

  return (
    <MTextField
      fullWidth={true}
      id={name}
      disabled={disabled}
      error={Boolean(errorMsg)}
      helperText={errorMsg ? String(errorMsg) : ""}
      color={color}
      value={value}
      variant={variant}
      onChange={handleChange}
      sx={{
        "& .MuiOutlinedInput-root": {
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 100px ${alpha(
                theme.palette.primary.main,
                0.1
              )} inset`,
            },
          },
          "&:has(> input:-webkit-autofill)": {
            backgroundColor: "#D5E0ED",
          },
        },
        ...mTextFieldProps.sx,
      }}
      InputProps={{
        sx: {
          borderRadius: 2,
        },
        inputProps: {
          maxLength: maxLength,
        },
        ...(prefix
          ? {
              startAdornment: (
                <InputAdornment position="start">{prefix}</InputAdornment>
              ),
            }
          : {}),
        ...(suffix
          ? {
              endAdornment: (
                <InputAdornment position="end">{suffix}</InputAdornment>
              ),
            }
          : {}),
        ...(mTextFieldProps.type === "number"
          ? {
              sx: {
                borderRadius: 2,
                "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
                "input[type=number]": {
                  MozAppearance: "textfield",
                },
              },
            }
          : {}),
        // ...(mTextFieldProps.type === "password"
        //   ? {
        //       endAdornment: (
        //         <InputAdornment position="end">
        //           <TripIconButton
        //             color="inherit"
        //             onClick={handleTogglePasswordShow}
        //           >
        //             {!showPassword ? (
        //               <VisibilityIcon
        //                 width={"1em"}
        //                 height={"1em"}
        //                 fill="currentColor"
        //               />
        //             ) : (
        //               <VisibilityOffIcon
        //                 width={"1em"}
        //                 height={"1em"}
        //                 fill="currentColor"
        //               />
        //             )}
        //           </TripIconButton>
        //         </InputAdornment>
        //       ),
        //     }
        //   : {}),
        ...InputProps,
      }}
      {...mTextFieldProps}
      //   {...(mTextFieldProps.type === "password"
      //     ? {
      //         type: showPassword ? "text" : "password",
      //       }
      //     : {})}
      {...(mTextFieldProps.select
        ? {
            SelectProps: {
              autoWidth: false,
              MenuProps: {
                sx: (theme) => ({
                  "& .MuiPaper-root": {
                    mt: 0.5,
                    borderRadius: 2,
                    boxShadow: theme.shadows[1],
                    "& .MuiMenuItem-root": {
                      color: theme.palette.text.primary,
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette[color]?.main ||
                            theme.palette.primary.main,
                          theme.palette.action.selectedOpacity
                        ),
                      },
                      "&.Mui-selected": {
                        backgroundColor: alpha(
                          theme.palette[color]?.main ||
                            theme.palette.primary.main,
                          theme.palette.action.selectedOpacity
                        ),
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette[color]?.main ||
                              theme.palette.primary.main,
                            theme.palette.action.selectedOpacity + 0.02
                          ),
                        },
                      },
                    },
                  },
                }),
              },
            },
          }
        : {})}
      onBlur={(event) => {
        if (setFieldTouched) {
          setFieldTouched(name, true);
        }
        onBlur(event);
      }}
    >
      {!!mTextFieldProps.select &&
        (options && Array.isArray(options) && options.length ? (
          options.map((opt: SelectOption) => {
            const { value, label } = opt || ({} as SelectOption);
            return (
              <MenuItem key={value} value={value || ""}>
                {label}
              </MenuItem>
            );
          })
        ) : (
          <MenuItem value={""}>No Items</MenuItem>
        ))}
    </MTextField>
  );
};

export default TextField;
