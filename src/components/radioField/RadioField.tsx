import {
  BaseTextFieldProps,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  lighten,
  useTheme,
} from "@mui/material";

import { FieldProps } from "formik";
import React from "react";

interface RadioFieldProps extends Partial<FieldProps>, BaseTextFieldProps {
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const RadioField = ({
  field,
  form,
  options,
  onChange,
  label,
}: RadioFieldProps) => {
  const theme = useTheme();

  const { name = "", value: selectedValue } = field ?? {};
  const { setFieldValue } = form ?? {};

  const handleChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (setFieldValue) {
      setFieldValue(name, value);
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <Typography
        id="radio-buttons-group-label"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "#000",
        }}
      >
        {label}
      </Typography>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleChange}
        sx={{ display: "flex", gap: 2 }}
      >
        {options.map(({ label, value }) => {
          const isSelected = selectedValue === value;
          return (
            <FormControlLabel
              sx={{
                width: "100%",
                flex: 1,
                "&.MuiFormControlLabel-root": {
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  ml: 0,
                  mr: 0,
                  boxShadow: `2px 2px 16px ${lighten(
                    theme.palette.common.black,
                    0.8
                  )}`,
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.background.paper,
                  color: isSelected
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                },
                "& .MuiRadio-root": {
                  color: isSelected
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                },
              }}
              key={value}
              value={value}
              control={<Radio checked={isSelected} />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioField;
