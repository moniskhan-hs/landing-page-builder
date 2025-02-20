/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from '@mui/material'
import CustColorPickerWithElement from '../../../CustColorPicker'

const TypographyStyle = ({titleColor,setTitleColor,subTitleColor,setSubTitleColor,headingColor,setHeadingColor,paragraphColor,setParagraphColor}) => {
    const theme = useTheme()
    return (
        <Box mt={4}>
            <Typography variant="subtitle2" sx={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                bgcolor: "#fff",
                borderRadius: "5px",
                padding: " 0.23rem 0.6rem"
            }}>
                Typography
            </Typography>
            {/* ------------------------------------------- Main Content---------------------------------- */}
            <Box sx={{
                paddingInline: "0.5rem"
            }}>
                {/* ------------------------------------------- Title---------------------------------- */}

                <CustColorPickerWithElement componentColor={titleColor} HanldeToPickColor={setTitleColor} componentName={'Title'} variantName={'h2'} />

                {/* ------------------------------------------- Sub - Title---------------------------------- */}

                <CustColorPickerWithElement componentColor={subTitleColor} HanldeToPickColor={setSubTitleColor} componentName={'subtitle'} variantName={'h3'} />

                {/* ------------------------------------------- Heading---------------------------------- */}

                <CustColorPickerWithElement componentColor={headingColor} HanldeToPickColor={setHeadingColor} componentName={'Heading'} variantName={'h4'} />

                {/* ------------------------------------------- Paragraph---------------------------------- */}

                <CustColorPickerWithElement componentColor={paragraphColor} HanldeToPickColor={setParagraphColor} componentName={'Paragraph'} variantName={'subtitle1'} />
            </Box>

        </Box>
    )
}

export default TypographyStyle
