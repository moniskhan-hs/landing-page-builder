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

const ServicesOrOfferingSection = () => {
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const { services, theme: selectedTheme } = componentsValue;
  const theme = useTheme();

  return (
    <Stack
      sx={{
        width: "100vw",
        padding: "3rem 10rem",
        height: "85vh",
        //  ----------------------- Background value is Dynamic---
        bgcolor:
          selectedTheme.background.section || theme.palette.background.section,
      }}
    >
      <Typography
        variant="h3"
        color={selectedTheme.typography.subTitleColor}
        mb={4}
      >
        {services.title || "Your services title"}
      </Typography>
      {/* ---------------Tile container---------- */}

      <Box>
        {services.list &&
          services.list.map((ele, index) => (
            <Stack
              key={index}
              direction={"row"}
              sx={{
                width: "100%",
                height: "11rem",
                borderRadius: "12px",
                bgcolor: selectedTheme.background.paper || theme.palette.background.paper,
                my: 1,
              }}
            >
              <Box
                sx={{
                  width: "22%",
                  padding: "1%",
                }}
              >
                <ServiceImage image={ele.image} />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  padding: "1%",
                }}
              >
                <Stack>
                  {/* ------------------heading ---------------
                - */}
                  <Typography
                    variant="h4"
                    color={selectedTheme.typography.headingColor}
                    mb={2}
                  >
                    {ele.heading || "heading"}
                  </Typography>
                  {/* ------------sub heading or paragraph----------------------- */}
                  <Typography
                    variant="subtitle1"
                    color={selectedTheme.typography.paragraphColor}
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
