/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { useSelector } from "react-redux";
const CallToActionSection = ({data}) => {
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const {theme: selectedTheme } = componentsValue;
  const theme = useTheme();




  return (
    <Stack
      sx={{
        width: "35vh",
        padding: 2,
        bgcolor:
        selectedTheme.background.paper || theme.palette.background.paper,
           gap: '0.2rem',
        borderRadius: "12px"
      }}
    >
      <Typography   color={selectedTheme.typography.subTitleColor} variant="h5" mb = {3}>{data?.content?.title  || 'Some title here'}</Typography>

      {/* ----------------------------------- Information----------------------------------- */}
      {
        data?.content?.information.map((ele, index) =>
          <Box key={index} variant="subtitle1" sx={{
            display: 'flex',
            gap: "1rem",
            // justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* ----------------------- Icon [in-future] */}

            {/* <img src={ele.logoImage} alt='logo-img' style={{
              width: "2rem",
              height: "2rem",
              objectFit: 'contain'

            }} /> */}
            <Typography variant='subtitle1'>

              {ele.text || 'some information'}
            </Typography>
          </Box>


        )
      }



      <Button variant='customButton' sx={{
        width: "100%",
        mx: 'auto',
        my:"0.6rem",
        fontWeight:"bold",
        bgcolor:selectedTheme.button.buttonBackground,
        color:selectedTheme.button.buttonTextColor
      }}> {data?.content?.buttonText || 'Register'} </Button>
{/* ------------------------------------ A D V A N T A G E S -------------------------------------- */}
{
        data?.content?.advantages.map((ele, index) =>
          <Box key={index} variant="subtitle1" sx={{
            display: 'flex',
            gap: "1rem",
            // justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* ----------------------- Icon [in-future] */}
            {/* <img src={ele.logoImage} alt='logo-img' style={{
              width: "2rem",
              height: "2rem",
              objectFit: 'contain'

            }} /> */}
            <Typography variant='subtitle1'>

              {ele.text || 'some advantage'}
            </Typography>
          </Box>


        )
      }
      
      <Typography  sx={{
        textAlign:'center',
        bgcolor:selectedTheme.background.section,
        borderRadius:"8px",
        mt:2
      }} color={selectedTheme.typography.subTitleColor} variant="subtitle1" mb = {3}>{data?.content?.infoText  || ' 6985+ lorem ipsune'}</Typography>

    
    </Stack>
  );
};

export default CallToActionSection;
