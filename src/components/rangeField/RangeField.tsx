import { Box, Slider, Typography } from "@mui/material";
import React, { FC } from "react";

import { getIn } from "formik";
import { numberToINR } from "@/utils/format/numberToMoney";
import { useTheme } from "@mui/material/styles";

interface RangeFieldType {
  field: any;
  form: any;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  color?: "primary" | "secondary";
  onChange?: (value: number) => void;
}

const RangeField: FC<RangeFieldType> = ({
  field,
  form,
  label = "Price Range",
  min = 2000,
  max = 20000,
  step = 500,
  disabled = false,
  color = "secondary",
  onChange = () => {},
}) => {
  const theme = useTheme();

  const { name, value } = field;
  const { setFieldValue, setFieldTouched, errors, touched } = form;
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const errorMsg = touch && error;

  const handleChange = (event: Event, newValue: number) => {
    const val = newValue;
    setFieldValue(name, val);
    onChange(val);
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        border: "1px solid",
        borderColor: theme.palette.grey[300],
        p: 2,
        borderRadius: 2,
      }}
    >
      {label && (
        <Typography sx={{ fontWeight: 700, fontSize: 12 }}>{label}</Typography>
      )}

      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
        ₹{value?.[0] || min} - ₹{value?.[1] || max}
      </Typography>

      <Slider
        value={value}
        onChange={handleChange}
        onBlur={() => setFieldTouched(name, true)}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={step}
        color={color}
        valueLabelFormat={(value) => {
          return `${numberToINR(value)}`;
        }}
        disabled={disabled}
        // marks={[
        //   { value: min, label: `` },
        //   { value: max, label: `` },
        // ]}
        sx={{
          //   "& .MuiSlider-thumb": { borderRadius: 99 },
          "& .MuiSlider-root": {
            p: 0,
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            transform: "translateY(120%) !important",
            top: "unset",
            fontWeight: 500,
          },
        }}
      />

      {errorMsg && (
        <Typography variant="caption" color="error">
          {errorMsg}
        </Typography>
      )}
    </Box>
  );
};

export default RangeField;
