/* eslint-disable react/prop-types */
import { Button, Stack, useTheme } from '@mui/material'

const SharableContentbar = ({hanldeFullPreviewed,isFullPreviewed}) => {
    const theme = useTheme()
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
            // borderRadius:"8px",
            padding:"0.4rem  2rem",
            bgcolor:theme.palette.primary.light,
            color:'#ffffff'
            

        }} >Copy URL</Button>
        <Button variant='outlined' sx={{
            backgroundColor:'',
            // borderRadius:"8px",
            padding:"0.4rem  2rem",
            bgcolor:theme.palette.secondary.main,
            color:'#ffffff'
            
        }} >Share URL </Button>
        <Button variant='outlined' sx={{
            backgroundColor:'',
            // borderRadius:"8px",
            padding:"0.4rem  2rem",
            bgcolor:theme.palette.warning.light,
            color:'#ffffff'
            
        }} onClick={hanldeFullPreviewed} >{!isFullPreviewed ? "See Full Preview":"Hide"}</Button>
   
      </Stack>




    </Stack>
  )
}

export default SharableContentbar
