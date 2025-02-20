import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScheduleComponent from "../ScheduleComponent";

const HeroSection = () => {
  const theme = useTheme();
  const [previewUrl, setPreviewUrl] = useState(null);
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const { hero, theme: selectedTheme } = componentsValue;

  useEffect(() => {
    if (hero.file) {
      const url = URL.createObjectURL(hero.file);
      setPreviewUrl(url);

      // Cleanup the object URL when the component unmounts or the file changes
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [hero.file]);
  return (
    <Stack
      direction={"row"}
      gap={2}
      sx={{
        width: "100vw",
        padding: "3rem 10rem",
        height: "85vh",
        //  ----------------------- Background value is Dynamic---
        bgcolor: selectedTheme.background.default,
      }}
    >
      {/* ----------------------------- Left Cotents------------------------------ */}

      <Stack
        sx={{
          width: "50%",
        }}
      >
        {/* ---------------------Contents Box-------------------- */}
        <Stack direction={"column"} gap={1} mt={5}>
          {/* ---------------------Title-------------------------- */}
          <Typography variant="h2" color={selectedTheme.typography?.titleColor}>
            {hero?.title || "Title here"}
          </Typography>

          {/* ---------------------paragraph-------------------------- */}
          <Typography
            variant="subtitle1"
            color={selectedTheme.typography?.paragraphColor}
          >
            {hero?.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quisquam fugit nam sequi ex iste ratione, quaerat, architecto sit facilis maxime adipisci obcaecati suscipit amet, temporibus iusto accusantium eligendi impedit!"}
          </Typography>

          {/* ---------------------Button [optional]-------------------------- */}
          <Box>
            <Button
              variant="customButton"
              sx={{
                color: selectedTheme.button?.buttonTextColor,
                bgcolor: selectedTheme.button?.buttonBackground,
                fontWeight:"bold"
              }}
            >
              {hero?.buttonText || "Click me"}
            </Button>
          </Box>
          {/*    text [optional] */}
          <Typography
            variant="body2"
            ml={2}
            mt={1}
            color={selectedTheme.typography?.paragraphColor}
          >
            {hero?.infoText || "some info text here..."}
          </Typography>

<Box sx={{
    padding:"1rem 1.5rem"
}}>

{
    hero.scheduleAdded && <ScheduleComponent iconBackground={selectedTheme.icon?.iconBackground} iconColor={selectedTheme.icon?.iconColor} paperColor={selectedTheme.background?.paper} iconType={selectedTheme.icon?.selectedIconType} />
}
    </Box>


        </Stack>
      </Stack>

      {/* ----------------------------- Rigth Image------------------------------ */}

      <Stack
        variant="center"
        sx={{
          width: "50%",
        }}
      >
        {/* ------------------- Image or Embeded-------------------- */}

        {hero.value == "image" ? (
          <img
            src={previewUrl || "/heroImage.jpg"}
            alt="hero-img"
            style={{
              height: "80%",
              width: "80%",
              objectFit: "cover",
              borderRadius: "30px",
              marginBottom: "1rem",
            }}
          />
        ) : (
          <Box
            sx={{
              height: "60%",
              width: "100%",
              objectFit: "cover",
              borderRadius: "30px",
              //  marginBottom: "1rem"
            }}
          >
            {hero.embededLink ? (
              <iframe
                width="100%"
                height="100%"
                style={{
                  borderRadius: "30px",
                }}
                src={hero?.embededLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            ) : (
              <Stack
                variant="center"
                sx={{
                  width: "100%",
                  height: "100%",
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "30px",
                }}
              >
                <Typography variant="subtitle1"> Your video </Typography>
              </Stack>
            )}
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default HeroSection;
