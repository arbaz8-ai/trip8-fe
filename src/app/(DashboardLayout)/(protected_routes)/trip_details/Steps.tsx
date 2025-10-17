import { Box, Grid, Paper, Typography } from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import React from "react";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";

const steps = [
  {
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 48, color: "#4A73FF" }} />,
    title: "Get quotation",
    text: `Once you're happy with the itinerary, you can request quotes and you'll get quotes from multiple verified Vendors.`,
  },
  {
    icon: <GroupsOutlinedIcon sx={{ fontSize: 48, color: "#4A73FF" }} />,
    title: "Compare Quotes",
    text: `You can compare the quotes across various factors like price, rating, reviews, experience of vendor, quality of vendor and so on.`,
  },
  {
    icon: <ViewListOutlinedIcon sx={{ fontSize: 48, color: "#4A73FF" }} />,
    title: "Select and Book",
    text: `You can select the vendor that you like the most and reserve by paying just Rs.500, which is 100% refundable if you change your mind in the next 24 hours.`,
  },
];

export default function StepsSection() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "24px",
        p: { xs: 3, md: 6 },
        boxShadow: "0px 2px 12px rgba(0,0,0,0.08)",
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        {steps.map((step, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              textAlign: "center",
              position: "relative",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "20px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  border: "2px solid #4A73FF",
                  borderRadius: "16px",
                  p: 2,
                  mb: 2,
                  display: "inline-flex",
                }}
              >
                {step.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{ color: "#4A73FF", fontWeight: 600, mb: 1 }}
              >
                {step.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "grey.700", fontSize: "0.95rem", lineHeight: 1.6 }}
              >
                {step.text}
              </Typography>
            </Paper>

            {/* Dotted Arrow between cards (except last) */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: { xs: "auto", md: "-50px" },
                  left: { xs: "auto", md: "auto" },
                  transform: "translateY(-50%)",
                  display: { xs: "none", md: "block" },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    borderBottom: "2px dashed #ccc",
                    width: "80px",
                    display: "inline-block",
                  }}
                />
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
