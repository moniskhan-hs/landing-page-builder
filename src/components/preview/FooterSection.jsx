/* eslint-disable react/prop-types */
import { Stack, Typography, useTheme } from "@mui/material";

const FooterSection = ({footerData}) => {
  const muiTheme = useTheme();
  return (
    <Stack
      sx={{
        width: "100vw",
        padding: { md: "0.6rem 6rem", xs: "1rem" },
        // height: "85vh",
        //  ----------------------- Background value is Dynamic---
        // bgcolor: "red",
        bgcolor:footerData?.backgroundColor ||  muiTheme.palette.background.default,
        // display: "flex",
        // bgcolor:"red",
        // flexDirection: { xs: "column", md: 'row' }
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textTransform: "uppercase",
          fontSize: "1.5rem",
          letterSpacing: "0.5rem",
        }}
      >
        { footerData?.nameText || "HandySolver"}
      </Typography>
      <Typography variant="subtitle1">
      ©{footerData?.copyrigthText|| "2022 HandySolver "}
      </Typography>
    </Stack>
  );
};

export default FooterSection;
