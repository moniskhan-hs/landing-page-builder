/* eslint-disable react/prop-types */
import { OpenInFull } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

const NoSelectedPreview = ({theme}) => {
  return (
    <Stack variant='center'
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
      No component is selected for preview
    </Typography>

    <Stack variant={'center'}
      sx={{
        color: theme.palette.text.disabled,
      }}
    >
      Click <OpenInFull sx={{
        color: theme.palette.primary.main,
        mx:1
      }}></OpenInFull> to Add
    </Stack>

  </Stack>
  )
}

export default NoSelectedPreview
