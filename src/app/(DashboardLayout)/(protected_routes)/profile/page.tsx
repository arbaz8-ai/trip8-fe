"use client";

import {
  ArrowBack,
  Book,
  CameraAlt,
  Description,
  Edit,
  Feedback,
  HeadsetMic,
  Lock,
  Logout,
  Notifications,
  Route,
  Star,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

import EditProfileModal from "./EditProfileModal";
import { getUser } from "@/tripAPI/user";
import { useQuery } from "@tanstack/react-query";

const menuItems = [
  { icon: <Lock />, text: "Change Password" },
  { icon: <Book />, text: "My Booking" },
  { icon: <Description />, text: "My Quotations" },
  { icon: <Route />, text: "My Itineraries" },
  { icon: <Star />, text: "Favorites" },
  { icon: <Notifications />, text: "Notifications" },
  { icon: <HeadsetMic />, text: "Help & Support" },
  { icon: <Feedback />, text: "Feedback" },
];

const page = () => {
  const theme = useTheme();
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  const handleCloseProfile = () => {
    setProfileModalOpen(false);
  };
  const handleOpenProfile = () => {
    setProfileModalOpen(true);
  };

  const { data: userDetails, refetch: refetchUser } = useQuery({
    queryKey: ["user_details"],
    queryFn: async () => {
      const response = await getUser();
      return response;
    },
  });

  const onUpdateCallback = () => {
    handleCloseProfile();
    refetchUser();
  };

  const { name = "", email = "", mobile = "" } = userDetails ?? {};
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          width: "100%",
          maxWidth: 400,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton sx={{ color: "white" }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" fontWeight="600">
            Profile
          </Typography>
          <IconButton sx={{ color: "white" }} onClick={handleOpenProfile}>
            <Edit />
          </IconButton>
        </Box>

        {/* Profile Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
            mt: 5,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              src="https://via.placeholder.com/150"
              alt="Profile"
              sx={{ width: 90, height: 90, border: "3px solid white" }}
            />
            <IconButton
              size="small"
              sx={{
                bgcolor: "white",
                position: "absolute",
                bottom: 0,
                right: 0,
                boxShadow: 1,
              }}
            >
              <CameraAlt fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="subtitle1" fontWeight={600} mt={1}>
            {userDetails?.name ?? ""}
          </Typography>
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              px: 1.5,
              py: 0.3,
              fontSize: "12px",
              mt: 0.5,
            }}
          >
            Premium User
          </Box>
        </Box>

        {/* Menu List */}
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index}>
              <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={<Typography fontWeight={500}>{item.text}</Typography>}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ mt: 1 }} />

        {/* Logout */}
        <ListItemButton>
          <ListItemIcon sx={{ color: "error.main" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary={<Typography color="error.main">Logout</Typography>}
          />
        </ListItemButton>

        {/* App Version */}
        <Typography
          variant="caption"
          display="block"
          align="center"
          sx={{ color: "gray", py: 1, position: "relative", bottom: 0 }}
        >
          App Version 1.1
        </Typography>
      </Box>
      <Modal open={profileModalOpen}>
        <EditProfileModal
          modalOpen={profileModalOpen}
          apiInitialValues={{ email, mobile, name }}
          handleClose={handleCloseProfile}
          onUpdateCallback={onUpdateCallback}
        />
      </Modal>
    </Box>
  );
};

export default page;
