/* eslint-disable react/prop-types */
import { DeleteOutlineOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import ImageUpload from '../ImageUpload'
import { useDispatch, useSelector } from 'react-redux'
import { addInputItem, changeForm, changeInputsList, removeInputItem } from '../../redux/reducers/universalStyles'

const FormInputs = ({ id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Get the service component from Redux by id
  const formState = useSelector((state) => state.universalThemeReducer.form);
  const selectedForm = formState.find((ele) => ele.id == id);

  if (!selectedForm) {
    return (
      <Typography variant="h6" color="error">
        Form component not found for id: {id}
      </Typography>
    );
  }

  const { content } = selectedForm; // content contains title and services array



  // --- Handlers for Title ---
  const handleTitleChange = (e) => {
    dispatch(
      changeForm({ id, content: e.target.value, type: "title" })
    );
  };
  // --- Handlers for Description ---

  const handleDescriptionChange = (e) => {
    dispatch(
      changeForm({ id, content: e.target.value, type: "description" })
    );
  };
  // --- Handlers for Button Text ---

  const handleButtonTextChange = (e) => {
    dispatch(
      changeForm({ id, content: e.target.value, type: "buttonText" })
    );
  };

  // --- Handlers for Service Item Fields ---
  const handleInputFieldChange = (e, index, field) => {
    dispatch(
      changeInputsList({ id, index, content: e.target.value, field })
    );
  };


  // --- Handler for Adding a New Service Item ---
  const handleAddInputItem = () => {
    dispatch(
      addInputItem({
        id,
        input: {
          labelText: "some label text",
          placeholderText: "place holder text.....",
        },
      })
    );
  };

  // --- Handler for Deleting a Service Item ---
  const handleDeleteInputItem = (index) => {
    dispatch(removeInputItem({ id, index }));
  };




  return (
    <Stack gap={1} sx={{ padding: "0.5rem 0.5rem" }}>
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
      {/*--------------- Description field */}

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Description</Typography>
        <TextField
          placeholder="Enter Title"
          size="small"
          name="description"
          value={content.description}
          onChange={handleDescriptionChange}
          fullWidth
        />
      </Box>
      {/*--------------- Button Text field */}

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Button Text</Typography>
        <TextField
          placeholder="Enter Button Text "
          size="small"
          name="buttonText"
          value={content.buttonText}
          onChange={handleButtonTextChange}
          fullWidth
        />
      </Box>



      {/* Map through each service item */}
      {content?.inputs?.map((input, index) => (
        <Box
          key={input.id || index} // Use a stable unique key (service.id)
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
              Input Field {index + 1}
            </Typography>
            <IconButton onClick={() => handleDeleteInputItem(index)}>
              <DeleteOutlineOutlined sx={{ color: "red" }} />
            </IconButton>
          </Stack>

          {/* Label Text */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Label Text</Typography>
            <TextField
              placeholder="Enter Heading"
              size="small"
              name="labelText"
              value={input.labelText}
              onChange={(e) => handleInputFieldChange(e, index, "labelText")}
              fullWidth
            />
          </Box>

          {/* placeholder Text  */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Placeholder Text</Typography>
            <TextField
              placeholder="Enter Description"
              size="small"
              name="placeholderText"
              value={input.placeholderText}
              onChange={(e) =>
                handleInputFieldChange(e, index, "placeholderText")
              }
              fullWidth
            />
          </Box>
        </Box>
      ))}


      {/* Button to Add a New Service */}
      <Button
        onClick={handleAddInputItem}
        sx={{
          width: "50%",
          mx: "auto",
          // mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Add Input
      </Button>


    </Stack>
  )
}

export default FormInputs
