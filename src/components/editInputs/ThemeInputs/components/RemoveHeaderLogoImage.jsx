/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

const RemoveHeaderLogoImage = ({handleDeleteImage}) => {
      const componentsValue = useSelector((state) => state.universalThemeReducer);
  const { theme: selectedTheme } = componentsValue;

  return (
    <div>
       <img
                    src={selectedTheme.header.headerLogoImage}
                    alt="Preview"
                    style={{
                      maxWidth: 100,
                      maxHeight: 100,
                      marginBottom: 8,
                      borderRadius: 4
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteImage(selectedTheme.header.headerLogoImage)}
                  >
                    Remove Image
                  </Button>
    </div>
  )
}

export default RemoveHeaderLogoImage
