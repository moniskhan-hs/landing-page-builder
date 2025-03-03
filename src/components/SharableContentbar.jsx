/* eslint-disable react/prop-types */
import { Button, Stack, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'

const SharableContentbar = ({hanldeFullPreviewed,isFullPreviewed}) => {
    const theme = useTheme()
    const {generatedWebsiteId} = useSelector((state)=>state.websiteIdReducer)
  return (
    <Stack direction={'row'}

    sx={{
        display:'flex',
        justifyContent:'end',
        alignItems:'center',
        gap:1, // this is optional 
        p:1
    }}
    >
      <Stack variant="center" gap={1}>
      <Button variant='outlined' sx={{
            backgroundColor:'',
            padding:"0.4rem  2rem",
            bgcolor:theme.palette.primary.light,
            color:'#ffffff'
            

        }}  onClick={() =>
          navigator.clipboard.writeText(`${import.meta.env.VITE_WEBSITE_BASE_URL}/website/${generatedWebsiteId}`)
        }
        
        
        disabled = { generatedWebsiteId == null}
        
        >Copy URL</Button>


{/* 
        <Button variant='outlined' sx={{
            backgroundColor:'',
            // borderRadius:"8px",
            padding:"0.4rem  2rem",
            bgcolor:theme.palette.secondary.main,
            color:'#ffffff'
            
        }} >Share URL </Button> */}
        <Button variant='outlined' sx={{
            backgroundColor:'',
            padding:"0.4rem  2rem",
            bgcolor:theme.palette.secondary.main,
            color:'#ffffff'
            
        }} onClick={hanldeFullPreviewed} >{!isFullPreviewed ? "See Full Preview":"Hide"}</Button>
   
      </Stack>




    </Stack>
  )
}

export default SharableContentbar
