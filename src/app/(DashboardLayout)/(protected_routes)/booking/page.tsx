"use client";

import React, { useState } from "react";
import {
  ArrowBack,
  Cancel,
  CheckCircle,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  useTheme,
  Collapse,
} from "@mui/material";

const FinalCheckPage: React.FC = () => {
  const theme = useTheme();
  const [discountCode, setDiscountCode] = useState("DISCOUNT20OFF");
  const [openPricing, setOpenPricing] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f8f9fb",
        minHeight: "100vh",
        py: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 3,
          p: 2,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton sx={{ color: "black" }}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flex: 1, textAlign: "center", fontWeight: 600 }}
          >
            Final Check Before You Book
          </Typography>
        </Box>

        {/* Route */}
        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            textAlign: "center",
            mb: 2,
            backgroundColor: "#f4f6f8",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              mb: 0.5,
            }}
          >
            <Typography fontWeight={600}>Assam</Typography>

            {/* Dotted line between Assam and Guwahati */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "25%",
                right: "25%",
                height: "1px",
                borderTop: "2px dotted #9ca3af",
                transform: "translateY(-50%)",
              }}
            ></Box>

            <Typography fontWeight={600}>Guwahati</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            06.00 hrs
          </Typography>
        </Box>

        {/* Number of Person & Trip Type */}
        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            mb: 2,
            backgroundColor: "#f4f6f8",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Left Section */}
            <Box sx={{ flex: 0.9 }}>
              <Typography fontWeight={600}>8 Person</Typography>
              <Typography variant="body2" color="text.secondary">
                (4) Adult | (4) Children
              </Typography>
            </Box>

            {/* Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, borderColor: "#d1d5db" }}
            />

            {/* Right Section */}
            <Box sx={{ flex: 1.3, textAlign: "right" }}>
              <Typography fontWeight={600}>Trip Type</Typography>
              <Typography variant="body2" color="text.secondary">
                Adventure, Romantic
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Inclusion */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            p: 2.5,
            mb: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            fontWeight={600}
            fontSize="1rem"
            mb={1.5}
            sx={{ color: "#0f172a" }}
          >
            Inclusion
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            {[
              "Food",
              "Pickup Service(if you included in Pack.)",
              "Tour Guide",
              "Lunch",
              "Breakfast",
              "Dinner",
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  color: "#1f2937",
                  fontSize: "0.9rem",
                }}
              >
                <CheckCircle
                  sx={{
                    fontSize: 20,
                    color: "#9ca3af",
                    backgroundColor: "#e8f5e9",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#1e293b",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Exclusion */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            p: 2.5,
            mb: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            fontWeight={600}
            fontSize="1rem"
            mb={1.5}
            sx={{ color: "#0f172a" }}
          >
            Exclusion
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            {["Wi-fi", "Airport Tickets", "TV", "Smoking"].map(
              (item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                    color: "#1f2937",
                    fontSize: "0.9rem",
                  }}
                >
                  <Cancel
                    sx={{
                      fontSize: 20,
                      color: "#9ca3af",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#1e293b",
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              )
            )}
          </Box>
        </Box>

        {/* Discount Code */}
        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            mb: 2,
            backgroundColor: "#f4f6f8",
          }}
        >
          <Typography fontWeight={600} mb={1.5}>
            Discount Code
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  bgcolor: "white",
                  width: 244,
                  height: 42,
                  fontSize: 14,
                  fontWeight: 600,
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                px: 2,
                fontSize: 14,
                fontWeight: 600,
                height: 42,
                width: 92,
              }}
            >
              Remove
            </Button>
          </Box>
        </Box>

        {/* Pricing Details */}
        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            backgroundColor: "#f4f6f8",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setOpenPricing(!openPricing)}
          >
            <Typography fontWeight={600}>Pricing Details</Typography>
            {openPricing ? (
              <ExpandLess sx={{ color: "#374151" }} />
            ) : (
              <ExpandMore sx={{ color: "#374151" }} />
            )}
          </Box>

          <Collapse in={openPricing} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Trip Charges</Typography>
                <Typography>₹ 20,000</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Tax</Typography>
                <Typography>₹ 2,000</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Discount</Typography>
                <Typography>₹ 2,000</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontWeight={600}>Total</Typography>
                <Typography fontWeight={600}>₹ 22,000</Typography>
              </Box>
            </Box>
          </Collapse>
        </Box>

        {/* Action Buttons (Below Pricing Details) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* Need Help Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: "12px",
              px: 2.5,
              py: 1,
              fontSize: "0.95rem",
              alignSelf: "flex-end",
              display: "flex",
              alignItems: "center",
              gap: 1,
              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              "&:hover": { backgroundColor: "#006ae6" },
            }}
          >
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              sx={{ width: 20, height: 20 }}
            />
            Need Help?
          </Button>

          {/* Pay & Reserve Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "12px",
              py: 1.3,
              fontSize: "1rem",
              boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
              "&:hover": { backgroundColor: "#006ae6" },
            }}
          >
            Pay Rs.500 & Reserve (100% Refundable)
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FinalCheckPage;
