/* eslint-disable react/prop-types */
import { Box, Radio, Stack, TextField, Typography, useTheme } from '@mui/material'
import { SliderPicker } from 'react-color'

const BackgroundStyle = ({backgrounds,setActiveBg,activeBg,handleInputBackgroundChange,handleColorChange}) => {
  const theme = useTheme()
  return (
    <Box>
    <Typography
      variant="inputLabel"
      sx={{
        color: theme.palette.primary.main,
        fontWeight: "bold",
        bgcolor: "#fff",
        borderRadius: "5px",
        padding: "0.23rem 0.6rem",
        mt: 4,
      }}
    >
      Background
    </Typography>

    <Box sx={{ paddingInline: "0.5rem" }} mt={2}>
      <Stack direction="row" mb={2} gap={2}>
        {["default", "paper", "section"].map((type) => (
          <Box
            key={type}
            sx={{
              flex: 1,
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setActiveBg(type)}
          >
            {/* Input Field for Custom Color */}
            <Stack variant="column">
              <Typography variant="subtitle1">hex/rgb</Typography>

              <TextField
                placeholder="Color"
                size="small"
                value={backgrounds[type]}
                onChange={(e) => handleInputBackgroundChange(e, type)}
                sx={{
                  // width: "7rem",
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
                }}
              />
            </Stack>

            <Typography variant="subtitle1">{type}</Typography>

            {/* Color Preview Box */}
            <Box
              sx={{
                width: "3rem",
                height: "3rem",
                bgcolor: backgrounds[type],
                borderRadius: "12px",
                mx: "auto",
                border:
                  activeBg === type
                    ? `2px solid ${theme.palette.primary.main}`
                    : `2px solid transparent`,
              }}
            />

            {/* Radio button for selection */}
            <Radio
              checked={activeBg === type}
              onChange={() => setActiveBg(type)}
              sx={{ mt: 0.5 }}
            />
          </Box>
        ))}
      </Stack>

      {/* Color Picker for Active Background */}
      <SliderPicker
        color={backgrounds[activeBg]}
        onChangeComplete={handleColorChange}
      />
    </Box>
  </Box>
  )
}

export default BackgroundStyle
