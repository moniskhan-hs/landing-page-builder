/* eslint-disable react/prop-types */
import { CloudUpload } from '@mui/icons-material'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { deleteObject, ref } from 'firebase/storage'
import { useState } from 'react'
import { SliderPicker } from 'react-color'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { storage } from '../../../../firebase'
import { changeHeaderAndFooter } from '../../../../redux/reducers/universalStyles'
import { uploadImageOnFirebaseStorageServices } from '../../../../utils/imageupload/firebase-storage-upload'
import ButtonTextField from './ButtonTextField'
import RemoveHeaderLogoImage from './RemoveHeaderLogoImage'

const HeaderInputs = ({theme}) => {
    const [isLogoImageUploaded, setIsLogoImageUploaded] = useState(false)
    const [bgColor, setBgColor] = useState("#000");
    const dispatch = useDispatch()
  
  
    const changeBGcolor = (color) => {
      setBgColor(color.hex);
      dispatch(
        changeHeaderAndFooter({
          componentName: "header",
          textName: "backgroundColor",
          data: color.hex,
        })
      );
    };
  
    const changeBgThrougtInput = (e)=>{
      setBgColor(e.target.value);
      dispatch(
        changeHeaderAndFooter({
          componentName: "header",
          textName: "backgroundColor",
          data:e.target.value,
        })
      );
    }
  
  // ---------------------- to set the logo image on header--------------------------
  const handleImageChange = (e) => {
    handleFileChange(e);
  };

  const handleImageDrop = (e,) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } });
  };

  const handleFileChange = async (e) => {
    const websiteId = `mywebsite`;
    const file = e.target.files[0];
    if (!file) return;

    try {
      const downloadURL = await uploadImageOnFirebaseStorageServices(
        file,
        websiteId,
        `${uuidv4()}` // Unique filename with service ID
      );
      dispatch(changeHeaderAndFooter({
        componentName: 'header',
        textName:'headerLogoImage',
        data: downloadURL,
      }));
      setIsLogoImageUploaded(true)
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // to delete the uploaded image
  const handleDeleteImage = async (imageUrl) => {
    if (!imageUrl) return 'no image is there';

    try {
      // Extract path from download URL
      const encodedPath = imageUrl.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(encodedPath);
      const imageRef = ref(storage, decodedPath);

      // Delete from Firebase Storage
      await deleteObject(imageRef);
      setIsLogoImageUploaded(false)
      // Remove from Redux state
      dispatch(changeHeaderAndFooter({
        componentName: 'header',
        textName:'headerLogoImage',
        data: null,
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Optionally show error to user
    }
  };

  return (
    <Stack   sx={{
        ".MuiBox-root": {
          display: "flex",
          flexDirection: "column",
          gap: 1,
        },
      }}>
   <Typography
        variant="subtitle2"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "bold",
          bgcolor: "#fff",
          borderRadius: "5px",
          padding: " 0.23rem 0.6rem",
          mt: 2,
          width: "100%",
        }}
      >
        Header
      </Typography>
        {/* ------------------------------------------- Image upload content ---------------------------*/}
    <Box sx={{
          padding: "0.5rem 0.5rem",
    }}>
        {/* ------------------------------------------- Background color---------------------- */}

   <Box>
          <Typography variant="subtitle1">Background</Typography>
          <Stack direction={ 'row'}>
            <Stack variant = 'center'>
            <Box
            sx={{
              width: "3rem",
              height: "3rem",
              bgcolor: bgColor,
              borderRadius: "12px",
              // mx: "auto",
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          />
            </Stack>
  
          <Stack
            sx={{
              marginLeft: "auto",
            }}
          >
            <Typography variant="subtitle1">HEX / RGB</Typography>
            <TextField
              placeholder="color"
              size="small"
              value={bgColor}
                onChange={(e) => changeBgThrougtInput(e)}
              sx={{
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
          </Stack>
         

          <SliderPicker color={bgColor} onChangeComplete={changeBGcolor} />
        </Box>



         <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Add Logo Image</Typography>
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleImageDrop(e)}
              sx={{
                p: 1,
                textAlign: "center",
                borderRadius: "8px",
                "&:hover": { borderColor: "primary.main" },
                width: "70%",
                // mx: 'auto',
                bgcolor: '#f8f9fa',
                border: "2px dashed #ccc",
              }}
            >
              {isLogoImageUploaded ?
                <RemoveHeaderLogoImage handleDeleteImage={handleDeleteImage} /> : (
                  <>
                    <CloudUpload sx={{
                      color: "#6c757d",
                      width: "3rem",
                      height: "2rem",
                      mx: "auto"
                    }} />
                    <Box sx={{
                      position: "relative",


                    }}>
                      <label htmlFor={`file-upload`}>
                        <Box
                          sx={{
                            // padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ color: "#a9a9a9" }}>
                            Drag file here or click to browse.
                          </Typography>
                        </Box>
                      </label>

                      <input
                        id={`file-upload`}
                        type="file"
                        style={{
                          display: "none", // Hide but still clickable via label
                        }}
                        onChange={(e) => handleImageChange(e)}
                        accept="image/*"
                      />
                    </Box>

                  </>
                )}
            </Box>
          </Box>
          <ButtonTextField />
    </Box>
    </Stack>
  )
}

export default HeaderInputs
