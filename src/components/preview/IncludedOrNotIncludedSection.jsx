/* eslint-disable react/prop-types */
import { Cancel } from '@mui/icons-material'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const IncludedNotIncludedImage = ({ image }) => {
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

const IncludedOrNotIncludedSection = ({data}) => {
    const theme = useTheme();
    const componentsValue = useSelector((state) => state.universalThemeReducer);
    const {theme: selectedTheme } = componentsValue;
     
   
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
                mb={1}
                sx={{
                    mx: "auto",
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    color:selectedTheme.typography.subTitleColor
                }}
            >

               {data?.content?.title || "Some title here"}
                {/* <span > logo */}
                    {/* {<Cancel/>  } */}
                {/* </span> */}

            </Typography>

            <Typography
                variant="subtitle1"
                mb={4}
                sx={{
                    mx: "auto",
                    color:selectedTheme.typography.subTitleColor,
                    fontWeight: "bold"
                }}
            >
                { data?.content?.infoText|| 'Lorem ipsum dolor sit amet.'}
            </Typography>


            {/* --------------------------------------- Content Box--------------------------------------------------  */}

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    justifyContent: 'center',
                    gap: "2rem",
                    padding: '2rem'
                }}
            >

                {
                    data?.content?.includes.map((ele, index) => 
                    <Stack
sx={{
    bgcolor: selectedTheme.background.paper || theme.palette.background.paper,
    borderRadius: "12px",
    p:1
}}
                        key={index}>
                        <Stack direction={'row'} gap={1}>
                            <Box

                                sx={{
                                    height: '4rem'
                                }}>

                                <IncludedNotIncludedImage image={ele.image}/>

                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>

                                <Typography variant='h4'  color={selectedTheme.typography.headingColor}>
                                    {ele.heading}
                                </Typography>
                            </Box>
                        </Stack>

                        <Typography variant='subtitle1' mt={1} color={selectedTheme.typography.paragraphColor}>{ele.description}</Typography>

                    </Stack>)
                }

            </Box>




        </Stack>
    )
}

export default IncludedOrNotIncludedSection

