import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

const FAQs = {
  image: '',
  content:
    [
      {
        question: 'culpa harum laboriosam dolorem magni quas distinctio odio tempora, nostrum facilis nisi quos?',
        answers: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.'
      },
      {
        question: 'culpa harum laboriosam dolorem magni quas distinctio odio tempora, nostrum facilis nisi quos?',
        answers: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.'
      },
      {
        question: 'culpa harum laboriosam dolorem magni quas distinctio odio tempora, nostrum facilis nisi quos?',
        answers: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.'
      },
      {
        question: 'culpa harum laboriosam dolorem magni quas distinctio odio tempora, nostrum facilis nisi quos?',
        answers: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, quidem tenetur? Magni doloribus nesciunt atque, id dolorem hic expedita doloremque laudantium sequi iusto unde ex cum error. Quasi, voluptate numquam.'
      },

    ]

}




const FAQSection = () => {
  const [isExpanded, setIsExpanded] = useState({})
  const [isExpandedContainer, setIsExpandedContainer] = useState(false)
  const toggleExpanded = (index) => {
    setIsExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const theme = useTheme()
  return (
    <Stack
      sx={{
        width: "100vw",
        padding: "3rem 10rem",
        bgcolor: theme.palette.background.section,
      }}>
      <Typography
        variant="h3"
        mb={4}
        sx={{
          mx: "auto",
        }}
      >
        FAQs
      </Typography>
      {/* -------------------------An image [optional] */}
      <Box sx={{
        width: '40%',
        mx: 'auto',
        mb: 4,

      }}>
        <img src='/heroImage.jpg' alt='faq-img' style={{
          width: "100%",
          aspectRatio: '1',
          objectFit: "cover",
         borderRadius: "30px",

        }} />

      </Box>


      {/* ------------------------- FAQ Row -------------------------------- */}

      <Box
        sx={{
          mt: 2,
          borderRadius: "8px",
          backgroundColor: theme.palette.background.section,
          height: isExpandedContainer ? FAQs.content.length >3 && FAQs.content.length <=8? `${FAQs.content.length * 11}vh`:'90vh'  : '35vh',
          transition: 'height 0.3s ease-in-out',
          overflow: 'scroll',
          paddingY: 2,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '0.2rem',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#fa7d26',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#757575',
          },


        }}

      >



        {FAQs.content.map((ele, index) =>
          <Box
            key={index}
            sx={{
              my: 2,
              borderRadius: "8px",
              backgroundColor: theme.palette.background.paper,
              height: isExpanded[index] ? '10rem' : '4rem',
              transition: 'height 0.3s ease-in-out',
              overflow: isExpanded[index] ? 'scroll' : 'hidden',
              paddingY: 1,
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                width: '0.2rem',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#fa7d26',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#757575',
              },
            }}

          >
            {/* --------------------------------- Question--------------------------------------- */}
            <Stack direction={'row'} sx={{
              width: '100%',
              gap: '0.56rem'

            }} >

              <Box sx={{
                width: "90%",
                padding: "0.5rem 1rem"
              }}>
                <Typography variant='h6' >
                  {ele.question}
                </Typography>
              </Box>

              <Stack variant='center' sx={{
                flex: 1
              }}>

                <IconButton sx={{
                  bgcolor: '#f1f5ff'
                }}
                  onClick={() => toggleExpanded(index)}

                >
                  {isExpanded[index] ? <ExpandLess /> : <ExpandMore />}

                </IconButton>
              </Stack>

            </Stack>
            {/* --------------------------------Answer--------------------------------- */}


            <Box mt={2} sx={{
              padding: "0.5rem 1rem"
            }}>
              <Typography variant='subtitle1'>
                {ele.answers}
              </Typography>
            </Box>

          </Box>

        )}




      </Box>

      {FAQs.content.length > 3 && <Stack variant='center'>
        <Button
          onClick={() => setIsExpandedContainer((pre) => !pre)}
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            fontSize: "0.9rem",
            color: "primary.main",
            placeSelf: "end",
            mt: 1
          }}
        >
          {isExpandedContainer ? "See Less" : "See More"}
        </Button>

      </Stack>}



    </Stack>
  )
}

export default FAQSection
