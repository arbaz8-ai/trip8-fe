"use client";

import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";

import CreatedTrips from "./CreatedTrips";
import SavedrTrips from "./SavedTrips";

const TabSwitcher = ({ index }: { index: number }) => {
  switch (index) {
    case 1:
      return <CreatedTrips />;
    case 0:
      return <SavedrTrips />;
  }
};

const page = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={{ my: 2 }}>
        Wishlist
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6 }}>
          <Button
            variant={selectedTab === 0 ? "contained" : "outlined"}
            fullWidth
            sx={{
              borderRadius: 2,
              height: 48,
              fontWeight: 500,
            }}
            onClick={() => setSelectedTab(0)}
          >
            Saved
          </Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Button
            variant={selectedTab === 1 ? "contained" : "outlined"}
            fullWidth
            sx={{
              borderRadius: 2,
              height: 48,
              fontWeight: 500,
            }}
            onClick={() => setSelectedTab(1)}
          >
            Creates
          </Button>
        </Grid>
      </Grid>
      <TabSwitcher index={selectedTab} />
    </Container>
  );
};

export default page;
