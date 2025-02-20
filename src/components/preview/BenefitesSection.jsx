/* eslint-disable react/prop-types */
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BenefitsImages = ({ image }) => {
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
                height: "20rem",
                objectFit: "cover",
                borderRadius: "12px"
            }}
        />
    );
};


const BenefitesSection = () => {
    const theme = useTheme();
    const componentsValue = useSelector((state) => state.universalThemeReducer);
    const { benefits, theme: selectedTheme } = componentsValue;


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
                    color: selectedTheme.typography.subTitleColor,
                }}
            >
                {benefits.title || ' Benefits Title'}
            </Typography>

            <Typography
                variant="subtitle1"
                mb={4}
                sx={{
                    mx: "auto",
                    color: selectedTheme.typography.headingColor,
                    fontWeight: "bold"

                }}
            >
                {benefits.optionalText || '  Lorem ipsum dolor sit amet.'}
            </Typography>

            {/* ------------------------------------- Content Box--------------------------------------------------- */}

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                justifyContent: 'center',
                gap: "2rem",
                padding: '2rem'

            }}>
                {benefits.list?.map((ele, index) =>
                    <Stack
                        sx={{
                            height: "auto",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                            gap: "0.5rem",
                            paddingBottom: "0.5rem"
                        }}
                        direction={'column'}
                        key={index}>
                        <Box sx={{
                            height: "70%",
                            width: "17rem",
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: "center",
                            textAlign: 'center',
                        }}>
                            <BenefitsImages image={ele.image} />

                            <Box sx={{
                                width: '90%',
                                height: "30%",
                                mt: 3
                            }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        textAlign: "center",
                                        // display: "-webkit-box",
                                        // WebkitLineClamp: 2, // Limit to 1 lines
                                        // WebkitBoxOrient: "vertical",
                                        // overflow: "hidden",
                                        // textOverflow: "ellipsis",

                                    }}
                                >
                                    {ele.infoText || 'Lorem ipsum dolor sit amet.'}
                                </Typography>

                            </Box>
                        </Box>






                    </Stack>)}



            </Box>


        </Stack>
    )
}

export default BenefitesSection
