/* eslint-disable react/prop-types */
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
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
                borderRadius: "12px"
            }}
        />
    );
};




const IncludedOrNotIncludedSection = ({data,isFetchedTheme,fetchingThemeData}) => {
    const theme = useTheme();
    const componentsValue = useSelector((state) => state.universalThemeReducer);
    const { theme: selectedTheme } = componentsValue;


    return (
        <Stack
            sx={{
                width: "100vw",
                padding: { md: "3rem 10rem", xs: "1rem" },
                bgcolor:
                 isFetchedTheme?fetchingThemeData?.background.section:   selectedTheme?.background.section || theme.palette.background.section,


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
                    color: isFetchedTheme? fetchingThemeData?.typography.subTitleColor: selectedTheme?.typography.subTitleColor
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
                    color: isFetchedTheme?fetchingThemeData?.typography.subTitleColor:  selectedTheme?.typography.subTitleColor,
                    fontWeight: "bold"
                }}
            >
                {data?.content?.infoText || 'Lorem ipsum dolor sit amet.'}
            </Typography>


            {/* --------------------------------------- Content Box--------------------------------------------------  */}

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {md:'repeat(2, 1fr)',xs:'repeat(1, 1fr)'},
                    justifyContent: 'center',
                    gap:{md: "2rem",xs:"0.5rem"},
                    padding: {md:'2rem',xs:"0.5rem"}
                }}
            >

                {
                    data?.content?.includes.map((ele, index) =>
                        <Stack
                            sx={{
                                bgcolor: isFetchedTheme? fetchingThemeData?.background.paper: selectedTheme?.background.paper || theme.palette.background.paper,
                                borderRadius: "12px",
                                p: 1
                            }}
                            key={index}>
                            <Stack direction={{md:'row',xs:"column"}} gap={1}>
                                <Box

                                    sx={{
                                        height: {md:'4rem',xs:"100%"}
                                    }}>

                                    <IncludedNotIncludedImage image={ele.image} />

                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin:{xs:'auto',md:"0px"}
                                }}>

                                    <Typography variant='h4'color={isFetchedTheme?selectedTheme.typography.headingColor: selectedTheme?.typography.headingColor}>
                                        {ele.heading}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Typography variant='subtitle1' mt={1} sx={{textAlign:{md:"start",xs:"center"}}}  color={isFetchedTheme?fetchingThemeData?.typography.paragraphColor: selectedTheme?.typography.paragraphColor}>{ele.description}</Typography>

                        </Stack>)
                }

            </Box>




        </Stack>
    )
}

export default IncludedOrNotIncludedSection

