import {
  amberPalette,
  blueGreyPalette,
  bluePalette,
  commonColor,
  greyPalette,
  skyPalette,
  tripImerialRed,
} from "./tripColor";

import { Plus_Jakarta_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    mode: "light",
    primary: {
      main: bluePalette.A400,
      light: bluePalette.A400,
      contrastText: commonColor.white,
    },
    secondary: {
      main: skyPalette[500],
      light: skyPalette[500],
      contrastText: commonColor.black,
    },
    // success: {
    //   main: "#13DEB9",
    //   light: "#E6FFFA",
    //   contrastText: "#ffffff",
    // },
    // info: {
    //   main: "#539BFF",
    //   light: "#EBF3FE",
    //   contrastText: "#ffffff",
    // },
    error: {
      main: tripImerialRed[300],
      light: tripImerialRed[300],
      contrastText: commonColor.black,
    },
    warning: {
      main: amberPalette[300],
      light: amberPalette[300],
      contrastText: commonColor.black,
    },
    grey: {
      ...greyPalette,
    },
    text: {
      primary: blueGreyPalette[900],
      secondary: greyPalette[700],
    },
    background: { paper: "#FAFAFA", default: commonColor.white },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#f6f9fc",
    },
    divider: "#e5eaef",
  },
  typography: {
    fontFamily: plus.style.fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: plus.style.fontFamily,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: plus.style.fontFamily,
    },
    h3: {
      fontWeight: 700,
      fontSize: 20,
      color: blueGreyPalette[900],
      lineHeight: 1.2,
      fontFamily: plus.style.fontFamily,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
    //       boxShadow:
    //         "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
    //     },
    //   },
    // },

    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
        },
      },
    },
  },
});

export { baselightTheme };
