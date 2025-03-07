/* eslint-disable react/prop-types */
import { Stack, Typography, useTheme } from "@mui/material";

const FooterSection = ({footerData,isFetchedTheme}) => {
  const muiTheme = useTheme();
  return (
    <Stack
      sx={{
        width: isFetchedTheme?'100%':"100vw",
        padding: { md: "0.6rem 6rem", xs: "1rem" },
        // height: "85vh",
        mt:5,
     
        //  ----------------------- Background value is Dynamic---
        // bgcolor: "red",
        bgcolor:footerData?.backgroundColor ||  muiTheme.palette.background.default,
        // display: "flex",
        // bgcolor:"red",
        // flexDirection: { xs: "column", md: 'row' }
        // position:"fixed"
        textAlign:"center"
        
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textTransform: "uppercase",
          fontSize: {md:"1rem",xs:'0.85rem'},
          letterSpacing: "0.5rem",
        }}
      >
        { footerData?.nameText || "HandySolver"}
      </Typography>
      <Typography variant="subtitle1" sx={{
          fontSize: {md:"1rem",xs:'0.7rem'},
      }}>
      ©{footerData?.copyrigthText|| "2022 HandySolver "}
      </Typography>
    </Stack>
  );
};

export default FooterSection;
