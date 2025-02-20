import { Add } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { chooseRenderComponent } from "../utils/constants";

const PreviewContainer = () => {
  const previewComponents = useSelector((state) => state.sectionStateReducer)
  const theme = useTheme();

  return (
    <Box sx={{
      // width:'100%',
      border: '1px solid red',
      // bgcolor:'red',
      height: "88vh",
      width: "59vw",
      overflow: 'hidden'

    }}>
      <Box sx={{
        width: "100%",
        // height:'50%',
        height: "100%",
        padding: "1rem",
        overflowX: "scroll",
        overflowY: 'scroll',
        scrollBehavior: 'smooth'
      }}>
        {/* -------------------------------- to render based on the state of selection sections------------------------------------------- */}
        {
          previewComponents.length == 0 ? (<Stack variant='center'

            sx={{
              height: "100%",
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >

            <Typography
              sx={{
                color: theme.palette.text.disabled,
                fontSize: "1.6rem"
              }}
            >
              No component is in preview
            </Typography>

            <Stack variant ={'center'}
              sx={{
                color: theme.palette.text.disabled,
              }}
            >
              Click <Add sx={{
                color: theme.palette.primary.main
              }}></Add> to Add
            </Stack>

          </Stack>) : previewComponents.map((ele, index) => {
            const Component = chooseRenderComponent(ele.title);
            return Component ? <Component key={index} /> : null;
          })
        }

      </Box>
    </Box>

  )
}

export default PreviewContainer
