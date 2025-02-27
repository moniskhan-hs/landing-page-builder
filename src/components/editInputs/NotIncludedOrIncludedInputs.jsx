/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { CloudUpload, DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncludesItem,
  changeIncludedNotIncluded,
  changeIncludedNotIncludedList,
  changeListImage,
  removeIncludeItem,
} from "../../redux/reducers/universalStyles";
import ImageUpload from "../ImageUpload";
import { uploadImageOnFirebaseStorageServices } from "../../utils/imageupload/firebase-storage-upload";
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../firebase";

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
  // ------------------------ image upload and delete logic--------------------------------
  const handleImageChange = (e, itemId) => {
    handleFileChange(e, itemId);
  };

  const handleImageDrop = (e, itemId) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } }, itemId);
  };

  const handleFileChange = async (e, itemId) => {
    const websiteId = `mywebsite`;
    const file = e.target.files[0];
    if (!file || !itemId) return;

    try {
      const downloadURL = await uploadImageOnFirebaseStorageServices(
        file,
        websiteId,
        `${itemId}-${uuidv4()}` // Unique filename with service ID
      );

      dispatch(changeListImage({
        id,
        itemId,
        content: downloadURL,
        field: 'image'
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // to delete the uploaded image
  const handleDeleteImage = async (itemId, imageUrl) => {
    if (!imageUrl) return;

    try {
      // Extract path from download URL
      const encodedPath = imageUrl.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(encodedPath);
      const imageRef = ref(storage, decodedPath);

      // Delete from Firebase Storage
      await deleteObject(imageRef);

      // Remove from Redux state
      dispatch(changeListImage({
        id,
        itemId,
        content: null,
        field: 'image'
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Optionally show error to user
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

        {/* Image Upload for Service */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle1">Image</Typography>
                  <Box
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleImageDrop(e, item.id)}
                    sx={{     p: 1,
                      textAlign: "center",
                      borderRadius: "8px",
                      "&:hover": { borderColor: "primary.main" },
                      width: "70%",
                      // mx: 'auto',
                      bgcolor: '#f8f9fa',
                      border: "2px dashed #ccc", }}
                  >
                    {item.image ? (
                      <>
                        <img
                          src={item.image}
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
                          onClick={() => handleDeleteImage(item.id, item.image)}
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
                          <label htmlFor={`file-upload-${item.id}`}>
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
                              id={`file-upload-${item.id}`}
                              type="file"
                              style={{
                                  display: "none", // Hide but still clickable via label
                              }}
                              onChange={(e) => handleImageChange(e, item.id)}
                              accept="image/*"
                          />
                      </Box>
      
                      </>
                    )}
                  </Box>
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
