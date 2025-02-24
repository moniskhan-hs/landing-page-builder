/* eslint-disable react/prop-types */
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const FAQImages = ({ image }) => {
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


const FAQSection = ({data}) => {
  const [isExpanded, setIsExpanded] = useState({})
  const [isExpandedContainer, setIsExpandedContainer] = useState(false)
  const theme = useTheme()
  const componentsValue = useSelector((state) => state.universalThemeReducer);
    const { theme: selectedTheme } = componentsValue;


  const toggleExpanded = (index) => {
    setIsExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Stack
      sx={{
        width: "100vw",
        padding: "3rem 10rem",
        bgcolor:
        selectedTheme.background.section || theme.palette.background.section,
    }}>
      <Typography
        variant="h3"
        mb={4}
        sx={{
          mx: "auto",
          color: selectedTheme.typography.subTitleColor,

        }}
      >
        {data?.content?.title || ' FAQs Title'}
      </Typography>
      {/* -------------------------An image [optional] */}
      <Box sx={{
        width: '40%',
        mx: 'auto',
        mb: 4,

      }}>
      <FAQImages image={ data?.content?.image}/>

      </Box>


      {/* ------------------------- FAQ Row -------------------------------- */}

      <Box
        sx={{
          mt: 2,
          borderRadius: "8px",
          backgroundColor: theme.palette.background.section,
          height: isExpandedContainer ? data?.content.fAndq.length >3 && data?.content.fAndq.length<=8? `${data?.content.fAndq.length* 11}vh`:'90vh'  : '35vh',
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



        {data?.content?.fAndq?.map((ele, index) =>
          <Box
            key={index}
            sx={{
             m:2,
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
              gap: '0.56rem',
              

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
                {ele.answer}
              </Typography>
            </Box>

          </Box>

        )}




      </Box>

      {data?.content.fAndq.length> 3 && <Stack variant='center'>
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
