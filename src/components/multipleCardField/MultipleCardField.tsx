import { BaseTextFieldProps, Box, Typography, useTheme } from "@mui/material";

import { FieldProps } from "formik";
import React from "react";

interface SelectOption {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

interface MultipleCardFieldType
  extends Partial<FieldProps>,
    BaseTextFieldProps {
  disabled?: boolean;
  variant?: "outlined" | "filled" | "standard";
  prefix?: string;
  suffix?: string | React.ReactNode;
  options?: Array<SelectOption>;
  onChange?: (value: string[]) => void;
  textTransform?: "uppercase" | "lowercase" | "";
  maxLength?: number;
}

const MultipleCardField = ({
  field,
  form,
  options,
  label,
  onChange,
}: MultipleCardFieldType) => {
  const theme = useTheme();
  const { name = "", value: selectedValues = [] } = field ?? {};
  const { setFieldValue } = form ?? {};

  const currentValues = Array.isArray(selectedValues) ? selectedValues : [];

  const handleClick = (value: string) => {
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
  const isSelected = (value: string) => currentValues.includes(value);
  return (
    <Box>
      <Typography sx={{ mb: 2 }}>{label}</Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
        }}
      >
        {options?.map(({ Icon, label: cardLabel, value }) => {
          const selected = isSelected(value);
          return (
            <Box
              key={cardLabel}
              sx={{
                width: 100,
                height: 100,
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: selected
                  ? theme.palette.primary.main
                  : theme.palette.common.white,
                border: "1px solid",
                borderColor: theme.palette.primary.main,
                borderRadius: 2,
                "& .active": {
                  background: theme.palette.primary.main,
                },
              }}
              onClick={() => {
                handleClick(value);
              }}
            >
              <Box
                sx={{
                  color: selected
                    ? theme.palette.common.white
                    : theme.palette.primary.main,
                }}
              >
                <Icon fill="currentColor" />
              </Box>
              <Typography
                sx={{
                  color: selected
                    ? theme.palette.common.white
                    : theme.palette.primary.main,
                }}
              >
                {cardLabel}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MultipleCardField;
