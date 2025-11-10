"use client";

import React, { useState } from "react";
import {
  ArrowBack,
  CheckCircle,
  ExpandLess,
  ExpandMore,
  Cancel
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  useTheme,
  Collapse,
} from "@mui/material";

const BookingDetailsPage: React.FC = () => {
  const theme = useTheme();
  const [openOverview, setOpenOverview] = useState(true);
  const [selectedDay, setSelectedDay] = useState(1);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Sample day-wise itinerary data
  const itineraryData = {
    1: [
      "Arrival in Guwahati and drive to Bhalukpong",
      "Travel from Bhalukpong to Dirang",
      "Journey through Bomdila and Sela Pass to Tawang",
      "Explore the local sights of Tawang",
      "Travel from Bhalukpong to Dirang",
      "Drive From Bomdila to Guwahati Airport",
    ],
    2: [
      "Visit Tawang Monastery",
      "Drive to PTSO Lake",
      "Evening free at leisure",
    ],
    3: ["Explore Dirang Valley", "Visit Sangti Valley", "Drive to Bomdila"],
    4: ["Return journey to Guwahati", "End of tour"],
  };

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
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton sx={{ color: "black" }}>
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flex: 1,
              textAlign: "left",
              fontWeight: 700,
              color: "#111827",
              ml: 1,
            }}
          >
            Booking Details
          </Typography>
        </Box>

        {/* Booking Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            p: 2,
            backgroundColor: "#f9fafb",
            mb: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#6b7280", mb: 0.3 }}>
              Booking ID
            </Typography>
            <Typography
              sx={{ fontSize: "0.95rem", fontWeight: 600, color: "#111827" }}
            >
              9006-57854-547
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "#d1d5db", mx: 2, height: "40px" }}
          />

          <Box sx={{ flex: 1, textAlign: "right" }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#6b7280", mb: 0.3 }}>
              Trip Starting Date
            </Typography>
            <Typography
              sx={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}
            >
              12-09-2025
            </Typography>
          </Box>
        </Box>

        {/* Trip Overview */}
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
            onClick={() => setOpenOverview(!openOverview)}
          >
            <Typography fontWeight={600}>Trip Overview</Typography>
            {openOverview ? (
              <ExpandLess sx={{ color: "#374151" }} />
            ) : (
              <ExpandMore sx={{ color: "#374151" }} />
            )}
          </Box>

          <Collapse in={openOverview} timeout="auto" unmountOnExit>
            <Box
              sx={{
                mt: 2,
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                mb: 2,
              }}
            >
              <Typography fontWeight={600} mb={1} textAlign="left">
                Destination
              </Typography>
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
          </Collapse>
        </Box>

        {/* Payment Status */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            p: 2.5,
            mb: 2,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            fontWeight={600}
            mb={1.5}
            sx={{ color: "#111827", fontSize: "1rem" }}
          >
            Payment Status
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Typography color="#6b7280" fontSize="0.9rem">
                Advance Payment
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#111827",
                  mt: 0.3,
                }}
              >
                ₹ 500.00
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, borderColor: "#d1d5db", height: "40px" }}
            />

            <Box sx={{ flex: 1, textAlign: "right" }}>
              <Typography color="#6b7280" fontSize="0.9rem">
                Pending Payment
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#111827",
                  mt: 0.3,
                }}
              >
                ₹ 19,500
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Vendor Offer */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(147,197,253,0.15))",
            borderRadius: "12px",
            textAlign: "center",
            p: 2,
            fontWeight: 700,
            color: "#111827",
            fontSize: "1.1rem",
            mb: 3,
          }}
        >
          Vendor has send the offer
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.3rem",
              color: "#111827",
              mt: 0.3,
            }}
          >
            ₹ 25,000
          </Typography>
        </Box>

        

        {/* Itinerary Details Section */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            p: 2.5,
            boxShadow: "0px 3px 10px rgba(0,0,0,0.05)",
            mb: 3,
            transition: "all 0.3s ease",
          }}
        >
          {/* Header */}
          <Typography
            fontWeight={700}
            fontSize={18}
            sx={{ color: "#111827", mb: 1 }}
          >
            Itinerary Details{" "}
            <Typography
              component="span"
              fontWeight={400}
              sx={{ color: "#6b7280", fontSize: "0.9rem" }}
            >
              (Day wise summary)
            </Typography>
          </Typography>

          {/* Day Tabs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 0.5,
              mt: 2,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            {[1, 2, 3, 4].map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "contained" : "outlined"}
                onClick={() => setSelectedDay(day)}
                sx={{
                  borderRadius: "40px",
                  textTransform: "none",
                  minWidth: 74,
                  px: 2,
                  height: 36,
                  fontWeight: 500,
                  fontSize: 14,
                  bgcolor: selectedDay === day ? "#111827" : "#fff",
                  color: selectedDay === day ? "#fff" : "#111827",
                  borderColor: selectedDay === day ? "#111827" : "#d1d5db",
                  boxShadow:
                    selectedDay === day
                      ? "0px 2px 6px rgba(0,0,0,0.1)"
                      : "0px 1px 3px rgba(0,0,0,0.05)",
                  "&:hover": {
                    bgcolor: selectedDay === day ? "#111827" : "#f3f4f6",
                  },
                }}
              >
                Day {day}
              </Button>
            ))}
          </Box>

          {/* Day Content */}
          <Box sx={{ mb: 2 }}>
            <Typography
              fontWeight={700}
              sx={{ mb: 0.5, fontSize: 16, color: "#0f172a" }}
            >
              Arrival & Transfer to Shillong
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontSize: 12,
                lineHeight: 1.5,
                color: "#6b7280",
              }}
            >
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered from injected humour or randomised
              words.
            </Typography>
          </Box>

          {/* Quick Overview Title */}
          <Typography
            fontWeight={700}
            mb={1.5}
            fontSize={16}
            sx={{ color: "#111827" }}
          >
            Quick Day-wise Overview
          </Typography>

          {/* Overview Cards */}
          <Box
            sx={{
              backgroundColor: "#f9fafb",
              borderRadius: "16px",
              p: 2,
              boxShadow: "inset 0 0 4px rgba(0,0,0,0.04)",
            }}
          >
            {itineraryData[selectedDay].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: "14px",
                  p: 1.5,
                  mb: 1.2,
                  boxShadow: "0px 1px 6px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* Number box (consistent size for all days) */}
                <Box
                  sx={{
                    backgroundColor: "#007bff",
                    color: "#ffffff",
                    fontWeight: 700,
                    borderRadius: "10px",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0, // prevents resizing
                    mr: 2,
                  }}
                >
                  {index + 1}
                </Box>

                {/* Text aligned perfectly */}
                <Typography
                  sx={{
                    fontSize: "0.92rem",
                    color: "#111827",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    flex: 1, // ensures consistent spacing
                    wordWrap: "break-word",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        {/* Traveler Info & FAQ Section */}
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            p: 2.5,
            boxShadow: "0px 3px 10px rgba(0,0,0,0.05)",
            mb: 3,
          }}
        >
          {/* Traveler Info */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Traveler"
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                mr: 2,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={700} fontSize={15}>
                Deepak
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 12 }}
              >
                Traveler Expert
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                backgroundColor: "#16a34a",
                color: "#fff",
                px: 1.2,
                py: 0.4,
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: 12,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <Typography component="span"> 4.6</Typography>
            </Box>
          </Box>

          {/* Tags */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              overflowX: "auto",
              whiteSpace: "nowrap",
              pb: 1,
              mb: 2,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {["Bag packer", "Camper", "Traveler", "Solo Traveler"].map(
              (tag, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.6,
                    px: 1.8,
                    py: 0.7,
                    borderRadius: "40px",
                    backgroundColor: "#f9fafb",
                    color: "#111827",
                    fontSize: 12.5,
                    fontWeight: 500,
                    boxShadow: "0px 1px 4px rgba(0,0,0,0.05)",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle
                    sx={{
                      fontSize: 16,
                      color: "#00000033", // faint, elegant tick
                    }}
                  />

                  {tag}
                </Box>
              )
            )}
          </Box>

          {/* Cancellation Policy */}
          <Box
            sx={{
              backgroundColor: "#f4f6f8",
              borderRadius: "10px",
              p: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              mb: 2,
            }}
          >
            <Typography fontWeight={600} fontSize={14}>
              Cancellation Policy
            </Typography>
            <Typography
              fontWeight={700}
              sx={{ color: "#111827", fontSize: 20, lineHeight: 1 }}
            >
              →
            </Typography>
          </Box>

          {/* FAQ Section */}
          <Typography
            fontWeight={700}
            fontSize={16}
            sx={{ color: "#111827", mb: 2 }}
          >
            Frequently Asked Questions
          </Typography>

          {[
            {
              question: "Contrary to popular belief, Lorem Ipsum",
              answer:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            },
            {
              question: "There are many variations of passages",
              answer:
                "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
            },
            {
              question: "There are many variations of passages",
              answer:
                "Different versions have evolved over the years, sometimes by accident, sometimes on purpose.",
            },
          ].map((faq, index) => (
            <Box
              key={index}
              sx={{
                mb: 1.5,
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0px 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                onClick={() =>
                  setOpenFAQ((prev: any) => (prev === index ? null : index))
                }
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.8,
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  fontWeight={600}
                  sx={{ fontSize: 14, color: "#111827" }}
                >
                  {faq.question}
                </Typography>
                <Typography sx={{ fontSize: 22, color: "#111827" }}>
                  {openFAQ === index ? "−" : "+"}
                </Typography>
              </Box>

              {openFAQ === index && (
                <Box
                  sx={{
                    backgroundColor: "#f9fafb",
                    p: 1.8,
                    pt: 0,
                    fontSize: 13,
                    color: "#6b7280",
                  }}
                >
                  {faq.answer}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetailsPage;
