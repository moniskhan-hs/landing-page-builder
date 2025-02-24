/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react';
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';




const AboutImage = ({ image }) => {
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
        width: "30rem",
        // height: "100%",
        aspectRatio:"1",
        objectFit: "fill",
        borderRadius:"12px"
      }}
    />
  );
};


const AboutUsSection = ({id,data}) => {
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const {theme: selectedTheme } = componentsValue;
  const theme = useTheme()


  return (
    <Stack
      sx={{
        width: "100vw",
        padding: "3rem 10rem",
        bgcolor:
        selectedTheme.background.section || theme.palette.background.section,
  
      }}
    >
      <Typography
        variant="h3"
        mb={7}
        color={selectedTheme.typography.subTitleColor}
        sx={{
          mx: "auto",
        }}
      >
       { data?.content?.title || 'Some Title'}
      </Typography>

      {/* -----------------------------------main content----------------------------------------- */}
      <Stack 
        sx={
          data?.content?.abouts?.length ==1?{
            display: 'flex',
            justifyContent: "center"
          }:
          
          {
          display: 'grid',
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "2rem",
          justifyContent: "center"
        }
      
      
      
      }
      >

        {


          data?.content?.abouts?.map((ele, index) =>
            <Stack key={index}>
              {/* ------------------------------------------- image-------------------------------- */}
              <Stack variant='center' width={'100%'}>
              <AboutImage image={ele.image} />
              </Stack>

              {/* -------------------------------- Heading + description----------------------------------------- */}

              <Stack textAlign={'center'} gap={1} mt={3}>
                <Typography variant='h4'>{ele.heading || "heading"}</Typography>
                <Typography variant='subtitle1'> {ele.description || "description"} </Typography>

              </Stack>

            </Stack>

          )
        }


      </Stack>



    </Stack>
  )
}

export default AboutUsSection
