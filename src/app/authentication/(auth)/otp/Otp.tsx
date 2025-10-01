import { Box, FormControl, FormHelperText, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface OTPProps {
  length?: number;
  // eslint-disable-next-line no-unused-vars
  onComplete?: (value: string) => void;
  type?: "text" | "password";
  autoFocus?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  resetOnComplete?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  spacing?: number;
}

const OTPInput = ({
  length = 4,
  onComplete = () => {},
  type = "text",
  autoFocus = true,
  disabled = false,
  placeholder = "○",
  error = false,
  errorMessage = "",
  resetOnComplete = false,
  size = "medium",
  variant = "outlined",
  spacing = 1,
}: OTPProps) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
      if (resetOnComplete) {
        setTimeout(() => {
          setOtp(Array(length).fill(""));
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    if (/^[0-9]*$/.test(pasteData)) {
      const newOtp = [...otp];
      pasteData.split("").forEach((digit, index) => {
        if (index < length) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);

      const nextFocusIndex = Math.min(pasteData.length, length - 1);
      inputRefs.current[nextFocusIndex]?.focus();

      if (newOtp.every((digit) => digit !== "")) {
        onComplete(newOtp.join(""));
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <FormControl error={error} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: spacing,
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {otp.map((digit, index) => (
          <TextField
            key={index}
            inputRef={(el: HTMLInputElement) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            type={type}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={handleFocus}
            disabled={disabled}
            placeholder={placeholder}
            error={error}
            size={size}
            variant={variant}
            sx={{
              width: 74,
              "& .MuiInputBase-input": {
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
              },
              "& .MuiOutlinedInput-root > input": {
                height: "57px",
                p: 0,
              },
            }}
          />
        ))}
      </Box>
      {error && errorMessage && (
        <FormHelperText sx={{ textAlign: "center", mt: 1 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default OTPInput;
