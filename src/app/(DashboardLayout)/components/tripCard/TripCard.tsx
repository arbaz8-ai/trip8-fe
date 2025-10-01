import { Box, Card, CardContent, Typography } from "@mui/material";
import Image, { StaticImageData } from "next/image";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import React from "react";
import { TripStyledText } from "@/components/typography/TripTypography";
import imageSrc1 from "../../../../../public/images/products/s11.jpg";
import imageSrc2 from "../../../../../public/images/products/s4.jpg";
import imageSrc3 from "../../../../../public/images/products/s5.jpg";
import imageSrc4 from "../../../../../public/images/products/s7.jpg";
import { numberToINR } from "@/utils/format/numberToMoney";

interface ImageItem {
  imgSrc: StaticImageData;
  label: string;
  text: string;
  id?: number;
  price: number;
}

const imageData: ImageItem[] = [
  {
    id: 1,
    imgSrc: imageSrc1,
    label: "Assam Trip",
    text: "Peaceful trip to Assam",
    price: 40000,
  },
  {
    id: 2,
    imgSrc: imageSrc2,
    label: "Kerala Backwaters",
    text: "Experience the serene backwaters",
    price: 20000,
  },
  {
    id: 3,
    imgSrc: imageSrc3,
    label: "Himalayan Trek",
    text: "Adventure in the mighty Himalayas",
    price: 12000,
  },
  {
    id: 4,
    imgSrc: imageSrc4,
    label: "Goa Beach",
    text: "Relaxing beach vacation in Goa",
    price: 23000,
  },
];

export const getRandomImageItem = (index: number): ImageItem => {
  //   const randomIndex = Math.floor(Math.random() * imageData.length);
  return { ...imageData[index] }; // Return copy to avoid mutation
};

const CardTag = ({ label, Icon }: { label: React.ReactNode; Icon: any }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: 99,
        background: ({ palette }) => palette.common.white,
        px: 0.5,
      }}
    >
      <Icon sx={{ height: 16, width: 16, color: "primary.main" }} />
      <TripStyledText sx={{ fontSize: 10, lineHeight: 1 }}>
        {label}
      </TripStyledText>
    </Box>
  );
};

const TripCard = () => {
  const { imgSrc, label, price } = getRandomImageItem(0);
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid",
        borderColor: "divider",
        maxWidth: "100%",
        height: 230,
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: 0,
          height: "100%",
          "&:last-child": {
            pb: 0,
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: 160,
              width: "100%",
              flexShrink: 0,
            }}
          >
            <Image
              src={imgSrc}
              alt="Assam trip"
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 0.5,
              }}
            >
              <Box>
                <CardTag label="Assam" Icon={LocationOnOutlinedIcon} />
              </Box>
              <Box>
                <CardTag label="6N/5D" Icon={LocationOnOutlinedIcon} />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <CardTag label="10 Dec 24" Icon={LocationOnOutlinedIcon} />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: 2,
              gap: 0.5,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
              }}
            >
              {numberToINR(price)}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "text.primary",
                lineHeight: 1.4,
                fontWeight: 700,
              }}
            >
              {label}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard;
