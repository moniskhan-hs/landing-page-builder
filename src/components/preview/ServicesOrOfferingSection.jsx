/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ServiceImage = ({ image }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // If image is a File instance, create an object URL
    if (image && image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);

      // Cleanup: revoke the URL on unmount or if image changes
      return () => URL.revokeObjectURL(url);
    } else {
      // If image is a URL or null, use it directly
      setPreviewUrl(image);
    }
  }, [image]);

  return (
    <img
      src={previewUrl || "/heroImage.jpg"}
      alt="services-img"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "fill",
        borderRadius:"12px"
      }}
    />
  );
};

const ServicesOrOfferingSection = ({id,data={},isFetchedTheme,fetchingThemeData}) => {
  console.log('data in services and offering:', data)
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const {theme: selectedTheme } = componentsValue;
  const theme = useTheme();

  return (
    <Stack
      sx={{
        width: isFetchedTheme? "100%":"100vw",
        borderRadius:"12px",
        padding: { md: isFetchedTheme?"3rem 2rem":"3rem 10rem", xs: "1rem" },
        height: {md:"'auto'",xs:'auto'},
        //  ----------------------- Background value is Dynamic---
        bgcolor: isFetchedTheme ? fetchingThemeData?.background.section :selectedTheme?.background.section || theme.palette.background.section,
        mt:5,

      }}
    >
      <Typography
        variant="h3"
        color={isFetchedTheme? fetchingThemeData?.typography.subTitleColor: selectedTheme.typography.subTitleColor}
        mb={4}
      >
        {data?.content?.title || "Your services title"}
      </Typography>
      {/* ---------------Tile container---------- */}

      <Box >
        {data?.content &&
          data?.content?.services?.map((ele, index) => (
            <Stack
              key={index}
              direction={{md:"row",xs:'column'}}
              sx={{
                width: "100%",
                height: {md:"11rem",xs:"auto"},
                borderRadius: "12px",
                bgcolor: isFetchedTheme? fetchingThemeData?.background.paper: selectedTheme?.background.paper || theme.palette.background.paper,
                my: 3,
              
             
              }}
            >
              <Box
                sx={{
                  width: {md:"22%",xs:'100%'},
                  padding: "1%",
                }}
              >
                <ServiceImage image={ele.image} />
              </Box>
              <Box
                sx={{
                  flex: 1,
             padding:"1rem"
                }}
              >
                <Stack>
                  {/* ------------------heading ---------------
                - */}
                  <Typography
                    variant="h4"
                    color={isFetchedTheme? fetchingThemeData?.typography.headingColor: selectedTheme?.typography.headingColor}
                    mb={2}
                  >
                    {ele.heading || "heading"}
                  </Typography>
                  {/* ------------sub heading or paragraph----------------------- */}
                  <Typography
                    variant="subtitle1"
                    color={ isFetchedTheme? fetchingThemeData?.typography.paragraphColor: selectedTheme?.typography.paragraphColor}
                  >
                    {ele.description || "description"}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          ))}
      </Box>
    </Stack>
  );
};

export default ServicesOrOfferingSection;
