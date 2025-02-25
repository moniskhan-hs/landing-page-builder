import { Box, Radio, Stack, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { SliderPicker } from 'react-color'
import useSetThemeStyles from '../../../hooks/useSetThemeStyles'
import { websiteThemeStyles } from '../../../styles/component/websiteTheme'
import BackgroundStyle from './aspects/BackgroundStyle'
import ButtonStyle from './aspects/ButtonStyle'
import IconStyle from './aspects/IconStyle'
import TypographyStyle from './aspects/TypographyStyle'

const ThemeInputs = () => {
  const [headingColor, setHeadingColor] = useState('#000')
  const [paragraphColor, setParagraphColor] = useState('#757575')
  const [titleColor, setTitleColor] = useState('#000')
  const [subTitleColor, setSubTitleColor] = useState('#000')
  const [buttonBackground, setButtonBackground] = useState('#fa7d26')
  const [buttonTextColor, setBUttonTextColor] = useState('#ffffff')
  const [backgrounds, setBackgrounds] = useState({
    default: '#f5f5f5',
    paper: '#ffffff',
    section: '#ADD8E6'
  });
  const [activeBg, setActiveBg] = useState('default');
  const [iconBackground, setIconBackground] = useState('#ffff')
  const [iconColor, setIconColor] = useState('#000')
  const [componentColors, setComponentColors] = useState({
    Header: "#d1e0ff",
    Footer: "#f7c6c7",
  });
  const [activeComponent, setActiveComponent] = useState('Header');
  const [selectedIconType, setSelectedIconType] = useState('square');

  const theme = useTheme()
  // console.log('theme:', theme)


  //------------------------------------------- Set state of [Typography] in redux-------------------------------------------
  useSetThemeStyles({
    updates: {
      titleColor,
      subTitleColor,
      headingColor,
      paragraphColor,
    }, targetedElement: 'typography'
  })
  // //------------------------------------------- Set state of [Button] in redux-------------------------------------------
  useSetThemeStyles({
    updates: {
      buttonTextColor,
      buttonBackground,
    }, targetedElement: 'button'
  })

  // //------------------------------------------- Set state of [Background] in redux-------------------------------------------
  useSetThemeStyles({
    updates: {
      default: backgrounds.default,
      paper: backgrounds.paper,
      section: backgrounds.section,

    }, targetedElement: 'background'
  })
  // //------------------------------------------- Set state of [Icon] in redux-------------------------------------------
  useSetThemeStyles({
    updates: {
      iconColor,
      iconBackground,
      selectedIconType,
    }, targetedElement: 'icon'
  })

  console.log('websiteThemeStyles:', websiteThemeStyles)

  // -------------------------------- Change background color -------------------------------------------------

  const handleColorChange = (color) => {
    setBackgrounds(prev => ({
      ...prev,
      [activeBg]: color.hex
    }));
  };


  const handleInputBackgroundChange = (event, type) => {
    setBackgrounds((prev) => ({
      ...prev,
      [type]: event.target.value,
    }));
  };
  // -------------------------------- Change background color of header and Navbar-------------------------------------------
  const handleColorChangeOfComponents = (color) => {
    setComponentColors(prevColors => ({
      ...prevColors,
      [activeComponent]: color.hex
    }));
  };

  const handleInputChange = (event, component) => {
    setComponentColors((prev) => ({
      ...prev,
      [component]: event.target.value,
    }));
  };

  return (
    <Stack gap={1} sx={{
      padding: "0.5rem 0.5rem",
      '.MuiBox-root': {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,

      }
    }}>

      {/*------------------------------------------------ Background ------------------------------------------------------ */}

      <BackgroundStyle backgrounds={backgrounds} setActiveBg={setActiveBg} activeBg={activeBg} handleInputBackgroundChange={handleInputBackgroundChange} handleColorChange={handleColorChange} />
      {/*------------------------------------------------ Typography ------------------------------------------------------ */}

      <TypographyStyle titleColor={titleColor} setTitleColor={setTitleColor} subTitleColor={subTitleColor} setSubTitleColor={setSubTitleColor} headingColor={headingColor} setHeadingColor={setHeadingColor} paragraphColor={paragraphColor} setParagraphColor={setParagraphColor} />

      {/* ------------------------------------------------Buttons-------------------------------------------- */}

      <ButtonStyle buttonBackground={buttonBackground} buttonTextColor={buttonTextColor} setButtonBackground={setButtonBackground} setBUttonTextColor={setBUttonTextColor} />

      {/* ------------------------------------------------Icons-------------------------------------------- */}
      <IconStyle iconColor={iconColor} setIconColor={setIconColor} setSelectedIconType={setSelectedIconType} iconBackground={iconBackground} selectedIconType={selectedIconType} setIconBackground={setIconBackground} />


      {/* ------------------------------------------------Header & Footer-------------------------------------------- */}


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
          Component
        </Typography>

        <Typography variant="subtitle1">Background</Typography>
        <Box sx={{ paddingInline: "0.5rem" }}>
          <Stack direction="row" variant="center" mb={2} gap={2}>
            {["Header", "Footer"].map((component) => (
              <Box
                key={component}
                sx={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => setActiveComponent(component)}
              >
                {/* Input Field for Custom Color */}
                <Stack variant='column'>
                  <Typography variant="subtitle1" sx={{
                    // placeSelf: 'end'
                  }}>
                    HEX / RGB
                  </Typography>

                  <TextField
                    placeholder="Color"
                    size="small"
                    value={componentColors[component]}
                    onChange={(e) => handleInputChange(e, component)}
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


                <Typography>{component}</Typography>

                {/* Color Preview Box */}
                <Box
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    bgcolor: componentColors[component],
                    borderRadius: "12px",
                    mx: "auto",
                    border:
                      activeComponent === component
                        ? `2px solid ${theme.palette.primary.main}`
                        : `2px solid transparent`,
                  }}
                />

                {/* Radio Button for Selection */}
                <Radio
                  checked={activeComponent === component}
                  onChange={() => setActiveComponent(component)}
                  sx={{ mt: 0.5 }}
                />
              </Box>
            ))}
          </Stack>

          {/* Color Picker for Active Component */}
          <SliderPicker
            color={componentColors[activeComponent]}
            onChangeComplete={handleColorChangeOfComponents}
          />
        </Box>
      </Box>
    </Stack>
  )
}

export default ThemeInputs
