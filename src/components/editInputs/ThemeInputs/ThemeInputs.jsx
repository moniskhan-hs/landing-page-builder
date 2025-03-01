import { Stack, useTheme } from '@mui/material'
import { useState } from 'react'
import useSetThemeStyles from '../../../hooks/useSetThemeStyles'
import BackgroundStyle from './aspects/BackgroundStyle'
import ButtonStyle from './aspects/ButtonStyle'
import IconStyle from './aspects/IconStyle'
import TypographyStyle from './aspects/TypographyStyle'
import FooterInputs from './components/FooterInputs'
import HeaderInputs from './components/HeaderInputs'

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

  const [selectedIconType, setSelectedIconType] = useState('square');
  const theme = useTheme()



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


      {/* ------------------------------------------------Header-------------------------------------------- */}
    <HeaderInputs theme = {theme}/>
    
      {/* ------------------------------------------------Footer-------------------------------------------- */}

        <FooterInputs theme={theme} />
    </Stack>
  )
}

export default ThemeInputs
