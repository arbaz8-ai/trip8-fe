import { Box, Button, Collapse, Divider, Typography } from "@mui/material";
import React, { useState } from "react";

import { TripStyledText } from "@/components/typography/TripTypography";

interface TripCollapseProps {
  header: string;
  description: string;
}
const TripCollapse = ({ header, description }: TripCollapseProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">{header}</Typography>
        <Button onClick={() => setOpen((prev) => !prev)}>
          {open ? "-" : "+"}
        </Button>
      </Box>
      <Collapse in={open}>
        <Divider sx={{ background: "grey.300", my: 2 }} />
        <TripStyledText>{description}</TripStyledText>
      </Collapse>
    </Box>
  );
};

export default TripCollapse;
