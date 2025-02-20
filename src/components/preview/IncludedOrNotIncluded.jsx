import { Cancel } from '@mui/icons-material'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

const IncludedOrNotIncluded = () => {
    const theme = useTheme();
    const [isIncluded,setIsIncluded]= useState(false)

    const included = [

        {
            image: '/userImage.jpg',
            title: 'Those not serious about their health',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, doloribus. Blanditiis, ipsum maxime a illum, perspiciatis nobis ex doloremque voluptatem aliquid in iure tenetur quaerat architecto! Quam quis unde dolore!'
        },
        {
            image: '/userImage.jpg',
            title: 'Those not serious about their health',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, doloribus. Blanditiis, ipsum maxime a illum, perspiciatis nobis ex doloremque voluptatem aliquid in iure tenetur quaerat architecto! Quam quis unde dolore!'
        },
        {
            image: '/userImage.jpg',
            title: 'Those not serious about their health',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, doloribus. Blanditiis, ipsum maxime a illum, perspiciatis nobis ex doloremque voluptatem aliquid in iure tenetur quaerat architecto! Quam quis unde dolore!'
        },
        {
            image: '/userImage.jpg',
            title: 'Those not serious about their health',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, doloribus. Blanditiis, ipsum maxime a illum, perspiciatis nobis ex doloremque voluptatem aliquid in iure tenetur quaerat architecto! Quam quis unde dolore!'
        },

    ]

    return (
        <Stack
            sx={{
                width: "100vw",
                padding: "3rem 10rem",
                bgcolor: theme.palette.background.section,

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
                    gap: 1
                }}
            >

                Some title here
                <span > logo
                    {/* {<Cancel/>  } */}
                </span>

            </Typography>

            <Typography
                variant="subtitle1"
                mb={4}
                sx={{
                    mx: "auto",
                }}
            >
                Lorem ipsum dolor sit amet.
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
                    included.map((ele, index) => <Stack

                        key={index}>
                        <Stack direction={'row'} gap={1}>
                            <Box

                                sx={{
                                    height: '4rem'
                                }}>

                                <img src={ele.image} alt='Icon/Img' style={{
                                    width: '100%',
                                    height: "100%",
                                    objectFit: 'cover'
                                }} />

                            </Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>

                                <Typography variant='h4'>
                                    {ele.title}
                                </Typography>
                            </Box>
                        </Stack>

                        <Typography variant='subtitle1' mt={1}>{ele.description}</Typography>

                    </Stack>)
                }

            </Box>




        </Stack>
    )
}

export default IncludedOrNotIncluded

