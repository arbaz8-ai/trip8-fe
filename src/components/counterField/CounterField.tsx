import {
  BaseTextFieldProps,
  Box,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { FieldProps } from "formik";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";

interface CounterFieldProps extends Partial<FieldProps>, BaseTextFieldProps {
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const CounterField = ({
  field,
  form,
  label,
  min = 0,
  max = 99,
  step = 1,
  onChange,
}: CounterFieldProps) => {
  const theme = useTheme();

  const { name = "", value: fieldValue = 0 } = field ?? {};
  const { setFieldValue } = form ?? {};
  const value =
    typeof fieldValue === "number" ? fieldValue : Number(fieldValue) || 0;
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    updateValue(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    updateValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      updateValue(min);
      return;
    }
    if (+inputValue > 99) {
      return;
    }

    const numericValue = Number(inputValue);

    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(max, Math.max(min, numericValue));
      updateValue(clampedValue);
    }
  };

  const updateValue = (newValue: number) => {
    if (setFieldValue) {
      setFieldValue(name, newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const isMin = value <= min;
  const isMax = value >= max;

  return (
    <Box sx={{}}>
      <Typography sx={{ mb: 2, fontWeight: 700, color: "#000" }}>
        {label ?? ""}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: theme.palette.grey[300],
          width: "fit-content",
        }}
      >
        <IconButton
          onClick={handleDecrement}
          disabled={isMin}
          sx={{
            borderRadius: 99,
            border: "2px solid",
            height: 24,
            width: 24,
          }}
        >
          <RemoveIcon />
        </IconButton>

        <TextField
          value={value}
          onChange={handleInputChange}
          inputProps={{
            style: {
              textAlign: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
            },
            min,
            max,
            step,
          }}
          sx={{
            width: 40,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "& input": {
                p: 0,
              },
            },
          }}
        />

        <IconButton
          onClick={handleIncrement}
          disabled={isMax}
          sx={{
            borderRadius: 99,
            border: "2px solid",
            height: 24,
            width: 24,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CounterField;
