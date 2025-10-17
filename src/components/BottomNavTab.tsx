"use client";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import ProfileIcon from "@/assets/icons/home.svg";
import UserIcon from "@/assets/icons/user.svg";
import WishlistIcon from "@/assets/icons/heart.svg";

const BottomNavTab = () => {
  const router = useRouter();
  const path = usePathname();
  const [value, setValue] = useState(path);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<ProfileIcon color="currentColor" stroke="currentColor" />}
          onClick={() => {
            router.push("/");
          }}
        />
        <BottomNavigationAction
          label="Wishlist"
          value="/wishlist"
          icon={<WishlistIcon color="currentColor" fill="currentColor" />}
          onClick={() => {
            router.push("/wishlist");
          }}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<UserIcon color="currentColor" fill="currentColor" />}
          onClick={() => {
            router.push("/profile");
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavTab;
