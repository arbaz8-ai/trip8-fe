import {
  BaseTextFieldProps,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Typography,
  lighten,
  useTheme,
} from "@mui/material";

import { FieldProps } from "formik";
import React from "react";

interface CheckboxFieldProps extends Partial<FieldProps>, BaseTextFieldProps {
  options: { value: string; label: string }[];
  onChange?: (value: string[]) => void;
}

const CheckboxField = ({
  field,
  form,
  options,
  onChange,
  label,
}: CheckboxFieldProps) => {
  const theme = useTheme();

  const { name = "", value: selectedValues = [] } = field ?? {};
  const { setFieldValue } = form ?? {};

  const currentValues = Array.isArray(selectedValues) ? selectedValues : [];

  const handleChange = (value: string) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    if (setFieldValue) {
      setFieldValue(name, newValues);
    }
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <Typography
        id="label"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "#000",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {options?.map(({ label, value }) => {
          const isSelected = currentValues.includes(value);
          return (
            <FormControlLabel
              sx={{
                width: "100%",
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
                  padding: 2,
                  borderRadius: 2,
                  backgroundColor: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.background.paper,
                  color: isSelected
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                },
                "& .MuiCheckbox-root": {
                  color: isSelected
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                },
              }}
              key={value}
              control={
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleChange(value)}
                />
              }
              label={label}
            />
          );
        })}
      </Box>
    </FormControl>
  );
};

export default CheckboxField;
