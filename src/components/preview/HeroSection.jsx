/* eslint-disable react/prop-types */
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScheduleComponent from "../ScheduleComponent";

const HeroSection = ({ id,data={} }) => {
  console.log('herosection id:', id)
  const theme = useTheme();
  const [previewUrl, setPreviewUrl] = useState(null);
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const {theme: selectedTheme } = componentsValue;
  //  const [herodata.content,setHerodata.content] = useState(data.content)





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
            {data?.content?.title || "Title here"}
          </Typography>
    

          {/* ---------------------paragraph-------------------------- */}
          <Typography
            variant="subtitle1"
            color={selectedTheme.typography?.paragraphColor}
          >
            {data?.content?.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quisquam fugit nam sequi ex iste ratione, quaerat, architecto sit facilis maxime adipisci obcaecati suscipit amet, temporibus iusto accusantium eligendi impedit!"}
          </Typography>

          {/* ---------------------Button [optional]-------------------------- */}
          <Box>
            <Button
              variant="customButton"
              sx={{
                color: selectedTheme.button?.buttonTextColor,
                bgcolor: selectedTheme.button?.buttonBackground,
                fontWeight: "bold"
              }}
            >
              {data?.content?.buttonText || "Click me"}
            </Button>
          </Box>
          {/*    text [optional] */}
          <Typography
            variant="body2"
            ml={2}
            mt={1}
            color={selectedTheme.typography?.paragraphColor}
          >
            {data?.content?.infoText || "some info text here..."}
          </Typography>

          <Box sx={{
            padding: "1rem 1.5rem"
          }}>

            {
              data?.content?.scheduleAdded && <ScheduleComponent iconBackground={selectedTheme.icon?.iconBackground} iconColor={selectedTheme.icon?.iconColor} paperColor={selectedTheme.background?.paper} iconType={selectedTheme.icon?.selectedIconType} />
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

        {data?.content?.value == "image" ? (
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
            {data?.content?.embededLink ? (
              <iframe
                width="100%"
                height="100%"
                style={{
                  borderRadius: "30px",
                }}
                src={data?.content?.embededLink}
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
