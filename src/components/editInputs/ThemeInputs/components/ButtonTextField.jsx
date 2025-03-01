import { Box, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeHeaderAndFooter } from '../../../../redux/reducers/universalStyles';

const ButtonTextField = () => {
    const componentsValue = useSelector((state) => state.universalThemeReducer);
    const { theme: selectedTheme } = componentsValue;
  
    const dispatch = useDispatch()
  return (
    <Box>
    <Typography variant="subtitle1">Button Text</Typography>
    <TextField
      name="buttonText"
      placeholder="Enter Button Text"
      size="small"
    value={selectedTheme.headerButtonText}
    onChange={(e)=>dispatch(changeHeaderAndFooter({componentName:'header',textName:'headerButtonText',data: e.target.value }))}
    />
  </Box>
  )
}

export default ButtonTextField
