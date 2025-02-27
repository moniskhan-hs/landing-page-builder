/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react';
import { CloudUpload, DeleteOutlineOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { deleteObject, ref } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../firebase';
import { addAboutItem, changeAbout, changeAboutList, changeAboutListImage, removeAboutItem } from '../../redux/reducers/universalStyles';
import { uploadImageOnFirebaseStorageServices } from '../../utils/imageupload/firebase-storage-upload';

const AboutInputs = ({id}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // Get the service component from Redux by id
  const aboutsState = useSelector((state) => state.universalThemeReducer.about);
  const selectedAbout = aboutsState.find((ele) => ele.id == id);
 
  if (!selectedAbout) {
    return (
      <Typography variant="h6" color="error">
        About component not found for id: {id}
      </Typography>
    );
  }

  const { content } = selectedAbout; // content contains title and services array



  const handleTitleChange = (e) => {
    dispatch(
      changeAbout({ id, content: e.target.value, type: "title" })
    );
  };

 const handleAboutFieldChange = (e, index, field) => {
    dispatch(
      changeAboutList({ id, index, content: e.target.value, field })
    );
  }; 
  // ------------------------ image upload and delete logic--------------------------------
  const handleAboutImageChange = (e, serviceId) => {
    handleFileChange(e, serviceId);
  };

  const handleAboutImageDrop = (e, serviceId) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } }, serviceId);
  };

  const handleFileChange = async (e, aboutId) => {
    const websiteId = `mywebsite`;
    const file = e.target.files[0];
    if (!file || !aboutId) return;

    try {
      const downloadURL = await uploadImageOnFirebaseStorageServices(
        file,
        websiteId,
        `${aboutId}-${uuidv4()}` // Unique filename with service ID
      );

      dispatch(changeAboutListImage({
        id,
        aboutId,
        content: downloadURL,
        field: 'image'
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // to delete the uploaded image
  const handleDeleteImage = async (aboutId, imageUrl) => {
    if (!imageUrl) return;

    try {
      // Extract path from download URL
      const encodedPath = imageUrl.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(encodedPath);
      const imageRef = ref(storage, decodedPath);

      // Delete from Firebase Storage
      await deleteObject(imageRef);

      // Remove from Redux state
      dispatch(changeAboutListImage({
        id,
        aboutId,
        content: null,
        field: 'image'
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Optionally show error to user
    }
  };


 const handleAddAbout = () => {
    dispatch(
      addAboutItem({
        id,
        about: { heading: "", description: "", image: null },
      })
    );
  };

    // --- Handler for Deleting a Service Item ---
    const handleDeleteAbout = (index) => {
      dispatch(removeAboutItem({ id, index }));
    };
  return (
    <Stack
      gap={1}
      sx={{
        padding: "0.5rem 0.5rem",
      }}
    >
      {/* Global Title Field */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Title</Typography>
        <TextField
          placeholder="Enter Title"
          size="small"
          name="title"
          value={content.title}
          onChange={handleTitleChange}
          fullWidth
        />
      </Box>

      {/* Map through about */}
      {content?.abouts?.map((about, index) => (
        <Box
          key={about.id || + index}
          sx={{
            bgcolor: theme.palette.background.paper,
            padding: "0.5rem",
            borderRadius: "12px",
            mb: 2,
          }}
        >
          {/* Header with Delete Button */}
          <Stack direction="row" sx={{ display: "flex", width: "100%" }}>
            <Typography variant="subtitle1" sx={{ marginRight: "auto" }}>
              About {index + 1}
            </Typography>
            <IconButton onClick={() => handleDeleteAbout(index)}>
              <DeleteOutlineOutlined sx={{ color: "red" }} />
            </IconButton>
          </Stack>

          {/* Service Heading */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Heading</Typography>
            <TextField
              placeholder="Enter Heading"
              size="small"
              name="heading"
              value={about.heading}
              onChange={(e) => handleAboutFieldChange(e, index,"heading")}
              fullWidth
            />
          </Box>

          {/* Service Description */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Description</Typography>
            <TextField
              placeholder="Enter Description"
              size="small"
              name="description"
              value={about.description}
              onChange={(e) => handleAboutFieldChange(e, index,"description")}
              fullWidth
            />
          </Box>

      <Box sx={{ mb: 1 }}>
                 <Typography variant="subtitle1">Image</Typography>
                 <Box
                   onDragOver={(e) => e.preventDefault()}
                   onDrop={(e) => handleAboutImageDrop(e, about.id)}
                   sx={{     p: 1,
                     textAlign: "center",
                     borderRadius: "8px",
                     "&:hover": { borderColor: "primary.main" },
                     width: "70%",
                     // mx: 'auto',
                     bgcolor: '#f8f9fa',
                     border: "2px dashed #ccc", }}
                 >
                   {about.image ? (
                     <>
                       <img
                         src={about.image}
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
                         onClick={() => handleDeleteImage(about.id, about.image)}
                       >
                         Remove Image
                       </Button>
                     </>
                   ) : (
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
                         <label htmlFor={`file-upload-${about.id}`}>
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
                             id={`file-upload-${about.id}`}
                             type="file"
                             style={{
                                 display: "none", // Hide but still clickable via label
                             }}
                             onChange={(e) => handleAboutImageChange(e, about.id)}
                             accept="image/*"
                         />
                     </Box>
     
                     </>
                   )}
                 </Box>
               </Box>
        </Box>
      ))}

      {/* Button to Add a New Service */}
      <Button
        onClick={handleAddAbout}
        sx={{
          width: "50%",
          mx: "auto",
          mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Add About
      </Button>
    </Stack>
  
  );
  
}

export default AboutInputs

