/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addAboutItem, changeAbout, changeAboutList, removeAboutItem } from '../../redux/reducers/universalStyles';
import ImageUpload from '../ImageUpload';

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

    const handleAboutImageChange = (e, index) => {
      const file = e.target.files[0];
      if (file) {
        dispatch(
          changeAboutList({ id, index, content: file, field: "image" })
        );
      }
    };


  const handleAboutImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch(
        changeAboutList({ id, index, content: file, field: "image" })
      );
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

          {/* Image Upload for Service */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={about.image}
              handleFileDrop={(e) => handleAboutImageDrop(e, index)}
              hanldeFileUpload={(e) => handleAboutImageChange(e, index)}
            />
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

