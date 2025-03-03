/* eslint-disable react/prop-types */
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as ScrollLink } from "react-scroll";
const CallToActionSection = ({
  data,
  formID,
  isFetchedTheme,
  fetchingThemeData,
}) => {
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const { theme: selectedTheme } = componentsValue;
  const theme = useTheme();
  return (
    <Stack
      sx={{
        width: "35vh",
        padding: 2,
        bgcolor: isFetchedTheme
          ? fetchingThemeData?.background.paper
          : selectedTheme?.background.paper || theme.palette.background.paper,
        gap: "0.2rem",
        borderRadius: "12px",
      }}
    >
      <Typography
        color={
          isFetchedTheme
            ? fetchingThemeData?.typography.subTitleColor
            : selectedTheme?.typography.subTitleColor
        }
        variant="h5"
        mb={3}
      >
        {data?.content?.title || "Some title here"}
      </Typography>

      {/* ----------------------------------- Information----------------------------------- */}
      {data?.content?.information.map((ele, index) => (
        <Box
          key={index}
          variant="subtitle1"
          sx={{
            display: "flex",
            gap: "1rem",
            // justifyContent: 'center',
            alignItems: "center",
          }}
        >
          {/* ----------------------- Icon [in-future] */}

          {/* <img src={ele.logoImage} alt='logo-img' style={{
              width: "2rem",
              height: "2rem",
              objectFit: 'contain'

            }} /> */}
          <Typography
            variant="subtitle1"
            color={
              isFetchedTheme
                ? fetchingThemeData?.typography.paragraphColor
                : selectedTheme?.typography.paragraphColor
            }
          >
            {ele.text || "some information"}
          </Typography>
        </Box>
      ))}

      <ScrollLink
        to={formID}
        smooth={true}
        duration={500}
        offset={-70}
        style={{ cursor: "pointer", textDecoration: "none" }}
      >
        <Button
          sx={{
            width: "100%",
            mx: "auto",
            my: "0.6rem",
            fontWeight: "bold",
            bgcolor: isFetchedTheme
              ? fetchingThemeData?.button.buttonBackground
              : selectedTheme?.button.buttonBackground,
            color: isFetchedTheme
              ? fetchingThemeData?.button.buttonTextColor
              : selectedTheme?.button.buttonTextColor,
          }}
          variant="customButton"
        >
          {" "}
          {data?.content?.buttonText || "Register"}{" "}
        </Button>
      </ScrollLink>

      {/* ------------------------------------ A D V A N T A G E S -------------------------------------- */}
      {data?.content?.advantages.map((ele, index) => (
        <Box
          key={index}
          variant="subtitle1"
          sx={{
            display: "flex",
            gap: "1rem",
            // justifyContent: 'center',
            alignItems: "center",
          }}
        >
          {/* ----------------------- Icon [in-future] */}
          {/* <img src={ele.logoImage} alt='logo-img' style={{
              width: "2rem",
              height: "2rem",
              objectFit: 'contain'

            }} /> */}
          <Typography
            variant="subtitle1"
            color={
              isFetchedTheme
                ? fetchingThemeData?.typography.paragraphColor
                : selectedTheme?.typography.paragraphColor
            }
          >
            {ele.text || "some advantage"}
          </Typography>
        </Box>
      ))}

      <Typography
        sx={{
          textAlign: "center",
          bgcolor: isFetchedTheme
            ? fetchingThemeData?.background.section
            : selectedTheme?.background.section,
          borderRadius: "8px",
          mt: 2,
        }}
        color={
          isFetchedTheme
            ? fetchingThemeData?.typography.paragraphColor
            : selectedTheme?.typography.paragraphColor
        }
        variant="subtitle1"
        mb={3}
      >
        {data?.content?.infoText || " 6985+ lorem ipsune"}
      </Typography>
    </Stack>
  );
};

export default CallToActionSection;
