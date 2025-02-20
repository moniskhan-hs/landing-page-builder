import { useTheme } from '@emotion/react'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const AboutUsSection = () => {
  const theme = useTheme()

  const aboutus = [
    {
      image: '/userImage.jpg',
      heading: 'Some heading',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab fugiat, ratione et doloremque ad mollitia inventore sunt saepe, voluptas consequuntur omnis, dolor ea unde dolorum molestias praesentium cum magni veniam.'
    },
    {
      image: '/userImage.jpg',
      heading: 'Some heading',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab fugiat, ratione et doloremque ad mollitia inventore sunt saepe, voluptas consequuntur omnis, dolor ea unde dolorum molestias praesentium cum magni veniam.'
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
        mb={7}
        sx={{
          mx: "auto",
        }}
      >
        Some Title
      </Typography>

      {/* -----------------------------------main content----------------------------------------- */}
      <Stack 
        sx={
          aboutus.length ==1?{
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


          aboutus.map((ele, index) =>
            <Stack key={index}>
              {/* ------------------------------------------- image-------------------------------- */}
              <Stack variant='center' width={'100%'}>
                <img src={ele.image} alt='about-img' style={{
                  height: "15rem",
                  objectFit: 'contain',
                  mx: "auto",
                  borderRadius: "12px"
                }} />
              </Stack>

              {/* -------------------------------- Heading + description----------------------------------------- */}

              <Stack textAlign={'center'} gap={1} mt={3}>
                <Typography variant='h4'>{ele.heading}</Typography>
                <Typography variant='subtitle1'> {ele.description} </Typography>

              </Stack>

            </Stack>

          )
        }


      </Stack>



    </Stack>
  )
}

export default AboutUsSection
