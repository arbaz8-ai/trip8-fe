import { type IconButtonProps, IconButton as MIconButton } from "@mui/material";

import React, { memo } from "react";

export type TripIconButtonType = IconButtonProps;

const TripIconButton = memo(
  ({ children, ...buttonProps }: TripIconButtonType) => {
    return <MIconButton {...buttonProps}>{children}</MIconButton>;
  }
);

TripIconButton.displayName = "TripIconButton";

export { TripIconButton };
