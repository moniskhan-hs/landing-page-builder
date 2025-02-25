/* eslint-disable react/prop-types */
import { Box, Stack, TextField, Typography, useTheme } from '@mui/material'
import { SliderPicker } from 'react-color'

const CustColorPickerWithElement = ({ componentColor, HanldeToPickColor, componentName, variantName }) => {

    const theme = useTheme()
    const handleChange = (color) => {
        console.log('color:', color)
        HanldeToPickColor(color.hex)
    }
    return (
        <Box sx={{
            width: "100%",
            mt: 2
        }}>
            {/* ---------------------------------- input + label---------------------------------- */}
            <Stack direction={'row'} sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"



            }}
            >
                <Typography variant={variantName} sx={{
                    color: componentColor,
                    marginRight: 'auto',
                    flex: 1
                }}>
                    {componentName}
                </Typography>


                <Stack sx={{
                    width: "30%"
                }}>
                    <Typography variant='subtitle1'>HEX / RGB</Typography>
                    <TextField placeholder='color' size='small' value={componentColor} onChange={(e) => HanldeToPickColor(e.target.value)} sx={{


                        "& .MuiOutlinedInput-root": {
                            bgcolor: "#f9f9f9",
                            borderRadius: "10px",
                            "& fieldset": {
                                borderColor: theme.palette.primary.light,
                            },
                            "&:hover fieldset": {
                                borderColor: theme.palette.primary.main,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: theme.palette.primary.dark,
                            },
                        },


                    }} />

                </Stack>

            </Stack>

            <Box>
                <SliderPicker onChangeComplete={handleChange} color={componentColor} />
            </Box>
        </Box>
    )
}

export default CustColorPickerWithElement
