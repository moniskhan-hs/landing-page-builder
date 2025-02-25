/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncludesItem,
  changeIncludedNotIncluded,
  changeIncludedNotIncludedList,
  removeIncludeItem,
} from "../../redux/reducers/universalStyles";
import ImageUpload from "../ImageUpload";

const NotIncludedOrIncludedInputs = ({ id }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Correctly reference the includedNotIncluded slice from Redux
  const includedAndNotIncludedState = useSelector(
    (state) => state.universalThemeReducer.includedNotIncluded
  );
  const selectedIncludedAndNotIncluded = includedAndNotIncludedState.find(
    (ele) => ele.id == id
  );

  if (!selectedIncludedAndNotIncluded) {
    return (
      <Typography variant="h6" color="error">
        Included/Not Included component not found for id: {id}
      </Typography>
    );
  }

  const { content } = selectedIncludedAndNotIncluded;
  // content structure: { title: string, includes: [{ heading, description, image, ...}, ...] }

  // Update the title field in Redux
  const handleTitleChange = (e) => {
    dispatch(
      changeIncludedNotIncluded({
        id,
        content: e.target.value,
        type: "title",
      })
    );
  };



   const handleInfoTextChange = (e) => {
      dispatch(
        changeIncludedNotIncluded({ id, content: e.target.value, type: "infoText" })
      );
    };

  // Update a field (heading, description, etc.) for one item in the includes array
  const handleIncludedAndNotIncludedFieldChange = (e, index, field) => {
    dispatch(
      changeIncludedNotIncludedList({
        id,
        index,
        content: e.target.value,
        field,
      })
    );
  };

  // File upload for an item’s image
  const handleIncludedNotIncludedImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(
        changeIncludedNotIncludedList({
          id,
          index,
          content: file,
          field: "image",
        })
      );
    }
  };

  // Drag-and-drop for an item’s image
  const handleIncludedNotIncludedImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch(
        changeIncludedNotIncludedList({
          id,
          index,
          content: file,
          field: "image",
        })
      );
    }
  };

  // Add a new item to the includes array
  const handleAddIncludes = () => {
    dispatch(
      addIncludesItem({
        id,
        include: { heading: "", description: "", image: null },
      })
    );
  };

  // Remove an item by its index
  const handleDeleteIncludes = (index) => {
    dispatch(removeIncludeItem({ id, index }));
  };

  return (
    <Stack gap={1} sx={{ padding: "0.5rem 0.5rem" }}>
      {/* Title Field */}
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
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Info Text</Typography>
        <TextField
          placeholder="Enter Info Text"
          size="small"
          name="infoText"
          value={content.infoText}
          onChange={handleInfoTextChange}
          fullWidth
        />
      </Box>

      {/* Map through each included item */}
      {content.includes.map((item, index) => (
        <Box
          key={item.id || index} // Use item.id if it exists
          sx={{
            bgcolor: theme.palette.background.paper,
            padding: "0.5rem",
            borderRadius: "12px",
            mb: 2,
          }}
        >
          {/* Header with Delete Button */}
          <Stack direction="row" sx={{ width: "100%" }}>
            <Typography variant="subtitle1" sx={{ marginRight: "auto" }}>
              Item {index + 1}
            </Typography>
            <IconButton onClick={() => handleDeleteIncludes(index)}>
              <DeleteOutlineOutlined sx={{ color: "red" }} />
            </IconButton>
          </Stack>

          {/* Heading Field */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Heading</Typography>
            <TextField
              placeholder="Enter Heading"
              size="small"
              name="heading"
              value={item.heading}
              onChange={(e) =>
                handleIncludedAndNotIncludedFieldChange(e, index, "heading")
              }
              fullWidth
            />
          </Box>

          {/* Description Field */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Description</Typography>
            <TextField
              placeholder="Enter Description"
              size="small"
              name="description"
              value={item.description}
              onChange={(e) =>
                handleIncludedAndNotIncludedFieldChange(e, index, "description")
              }
              fullWidth
            />
          </Box>

          {/* Image Upload */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={item.image}
              handleFileDrop={(e) => handleIncludedNotIncludedImageDrop(e, index)}
              hanldeFileUpload={(e) => handleIncludedNotIncludedImageChange(e, index)}
            />
          </Box>
        </Box>
      ))}

      {/* Button to Add a New Item */}
      <Button
        onClick={handleAddIncludes}
        sx={{
          width: "50%",
          mx: "auto",
          mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Add Item
      </Button>
    </Stack>
  );
};

export default NotIncludedOrIncludedInputs;
