"use client";

import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";

import EmptyScreen from "./EmptyScreen";
import React from "react";
import TripCollapse from "./TripCollapse";
import { TripStyledText } from "@/components/typography/TripTypography";
import { getQuotations } from "@/tripAPI/quotation";
import { numberToINR } from "@/utils/format/numberToMoney";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface QuotesCardProps extends BoxProps {
  id: string;
  user_name: string;
  price: string | number;
  description: string;
  hotel: string;
  car: string;
  activity: string;
  reserve_price: string | number;
  rating: number;
}

const QuotesCard = ({
  id,
  activity,
  car,
  description,
  hotel,
  price,
  reserve_price = 18000,
  rating = 4,
  user_name = "user name",
}: QuotesCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        boxShadow: `0 0 10px ${theme.palette.grey[300]}`,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", mb: 1, gap: 2, alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "red", height: 50, width: 50 }}>A</Avatar>
        <Box>
          <TripStyledText sx={{ fontWeight: 700 }}>{user_name}</TripStyledText>
          <Rating size="small" name="rating" value={rating} />
        </Box>
      </Box>
      <Box
        sx={{
          p: 1,
          borderRadius: theme.spacing(0, 1, 0, 1),
          position: "absolute",
          top: 0,
          right: 0,
          background: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>
          {numberToINR(price as number)}
        </Typography>
      </Box>
      <Box sx={{ position: "absolute", top: 0, transform: "translateY(-50%)" }}>
        <Chip
          variant="outlined"
          label="Shortlisted"
          color="primary"
          sx={{ fontWeight: 500, background: theme.palette.common.white }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
            color: theme.palette.text.secondary,
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 700 }}>Hotel</Typography>
          <Typography>{hotel}</Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box>
          <Typography sx={{ fontWeight: 700 }}>Car</Typography>
          <Typography>{car}</Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box>
          <Typography sx={{ fontWeight: 700 }}>Activity</Typography>
          <Typography>{activity}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Typography
          sx={{ color: theme.palette.primary.main, fontWeight: 700 }}
          onClick={() => router.push(`/vendor_profile/${id}`)}
        >
          View Details
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        sx={{ borderRadius: 2, fontWeight: 700 }}
      >
        Pay Rs.{reserve_price} & Reserve (100% Refundable)
      </Button>
    </Box>
  );
};

const page = () => {
  const { data: quotationList, isLoading: quotationListLoading } = useQuery({
    queryKey: ["quotation_list"],
    queryFn: async () => {
      const response = await getQuotations();
      return response;
    },
  });
  if (quotationListLoading) {
    return <CircularProgress />;
  }
  if (!quotationList?.length) {
    return <EmptyScreen />;
  }
  return (
    <Container maxWidth="xl" sx={{ px: 2 }}>
      <Typography variant="h6" sx={{ mb: 4, mt: 2 }}>
        - Quotes Recieved
      </Typography>

      {quotationList.map(
        ({
          _id,
          price,
          trip_id,
          user: { name: user_name },
          car: { model: car_model },
          stay: { hotel_name },
        }) => {
          return (
            <QuotesCard
              key={_id}
              price={price ?? 18000}
              rating={4}
              id={trip_id ?? "1"}
              user_name={user_name ?? "-"}
              description="-"
              hotel={hotel_name ?? "-"}
              car={car_model ?? "-"}
              activity="-"
              reserve_price={0}
            />
          );
        }
      )}

      <Box sx={{ my: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TripCollapse
            header="What is trip8"
            description="  It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less"
          />
          <TripCollapse
            header="What is trip8"
            description="  It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less"
          />
          <TripCollapse
            header="What is trip8"
            description="  It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default page;
