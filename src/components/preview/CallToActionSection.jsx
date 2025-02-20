import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
const CallToActionSection = () => {
  const theme = useTheme();


  const callToAction = {

    information: [
      {
         logoImage: 'userImage.jpg',
        content: 'lorem lorem lorem lorem'
      },
      {
         logoImage: 'userImage.jpg',
        content: 'lorem lorem lorem lorem'
      },


    ],
    services: [
      {
        logoImage: 'userImage.jpg',
        content: 'lorem lorem lorem lorem'
      },
      {
        logoImage: 'userImage.jpg',
        content: 'lorem lorem lorem lorem'
      },

    ]


  }




  return (
    <Stack
      sx={{
        width: "35vh",
        padding: 2,
        bgcolor: theme.palette.background.paper,
        gap: '0.2rem',
        borderRadius: "12px"
      }}
    >
      <Typography variant="h5" mb = {3}>Some title here</Typography>

      {/* ----------------------------------- Information----------------------------------- */}
      {
        callToAction.information.map((ele, index) =>
          <Box key={index} variant="subtitle1" sx={{
            display: 'flex',
            gap: "1rem",
            // justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img src={ele.logoImage} alt='logo-img' style={{
              width: "2rem",
              height: "2rem",
              objectFit: 'contain'

            }} />
            <Typography variant='subtitle1'>

              {ele.content}
            </Typography>
          </Box>


        )
      }



      <Button variant='customButton' sx={{
        width: "100%",
        mx: 'auto',
        my:"0.6rem"
      }}> Call to Action </Button>

{
        callToAction.services.map((ele, index) =>
          <Box key={index} variant="subtitle1" sx={{
            display: 'flex',
            gap: "1rem",
            // justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img src={ele.logoImage} alt='logo-img' style={{
              width: "2rem",
              height: "2rem",
              objectFit: 'contain'

            }} />
            <Typography variant='subtitle1'>

              {ele.content}
            </Typography>
          </Box>


        )
      }

    
    </Stack>
  );
};

export default CallToActionSection;
