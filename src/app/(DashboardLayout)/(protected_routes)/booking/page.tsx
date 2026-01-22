"use client";

import { ArrowBack, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const FinalCheckPage: React.FC = () => {
  const theme = useTheme();
  const [discountCode, setDiscountCode] = useState("");
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

        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            textAlign: "center",
            mb: 2,
            backgroundColor: "grey.100",
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
            <Typography fontWeight={600}>-</Typography>

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

            <Typography fontWeight={600}>-</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            -- hrs
          </Typography>
        </Box>

        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            mb: 2,
            backgroundColor: "#f4f6f8",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 0.9 }}>
              <Typography fontWeight={600}>- Person</Typography>
              <Typography variant="body2" color="text.secondary">
                (-) Adult | (-) Children
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, borderColor: "#d1d5db" }}
            />

            <Box sx={{ flex: 1.3, textAlign: "right" }}>
              <Typography fontWeight={600}>Trip Type</Typography>
              <Typography variant="body2" color="text.secondary">
                -, -
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "common.white",
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
            sx={{ color: theme.palette.text.primary }}
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
            {/* {[
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
            ))} */}
            --
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.common.white,
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
            sx={{ color: theme.palette.text.primary }}
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
            {/* {["Wi-fi", "Airport Tickets", "TV", "Smoking"].map(
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
            )} */}
            --
          </Box>
        </Box>

        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            mb: 2,
            backgroundColor: "grey.100",
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

        <Box
          sx={{
            borderRadius: 2,
            p: 2,
            backgroundColor: "grey.100",
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
                <Typography>--</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Tax</Typography>
                <Typography>--</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Discount</Typography>
                <Typography>--</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography fontWeight={600}>Total</Typography>
                <Typography fontWeight={600}>--</Typography>
              </Box>
            </Box>
          </Collapse>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            alignItems: "center",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
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
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "12px",
              py: 1.3,
              fontSize: "1rem",
              boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
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
