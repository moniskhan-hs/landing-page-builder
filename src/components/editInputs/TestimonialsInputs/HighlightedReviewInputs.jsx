/* eslint-disable react/prop-types */
import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Rating, Stack, TextField, Typography } from '@mui/material';
import { deleteObject, ref } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../../firebase';
import { changeTestimonials } from '../../../redux/reducers/universalStyles';
import { uploadImageOnFirebaseStorageServices } from '../../../utils/imageupload/firebase-storage-upload';

const HighlightedReviewInputs = ({ id, theme, content }) => {
  console.log('highlighted content:', content)
  const dispatch = useDispatch()

  const handleChange = (data, type) => {
    dispatch(changeTestimonials({ id, content: data, type }));
  };




  const handleHighlightedImageChange = (e, id) => {
    handleFileChange(e, id);
  };

  const handleHighlightedImageDrop = (e, id) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } }, id);
  };

  const handleFileChange = async (e, id) => {
    const websiteId = `mywebsite`;
    const file = e.target.files[0];
    if (!file || !id) return;

    try {
      const downloadURL = await uploadImageOnFirebaseStorageServices(
        file,
        websiteId,
        `${id}-${uuidv4()}` // Unique filename with service ID
      );

      dispatch(changeTestimonials({
        id,
        content: downloadURL,
        type: 'highlightedImage'
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // to delete the uploaded image
  const handleDeleteImage = async (imageUrl) => {
    if (!imageUrl) return;

    try {
      // Extract path from download URL
      console.log('deleting...........')
      const encodedPath = imageUrl.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(encodedPath);
      const imageRef = ref(storage, decodedPath);

      // Delete from Firebase Storage
      await deleteObject(imageRef);
      console.log('deleteddddd...........')

      // Remove from Redux state
      dispatch(changeTestimonials({
        id,
        content: null,
        type: 'highlightedImage'
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Optionally show error to user
    }
  };




  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        padding: "0.5rem",
        borderRadius: "12px",
        mb: 2,
      }}
    >
      {/* Header with Delete Button */}
      <Stack direction="row" sx={{ display: "flex", width: "100%", mt: 2 }}>
        <Typography variant="subtitle1" sx={{ marginRight: "auto", my: 1, color: theme.palette.primary.main, fontWeight: "bold" }}>
          Highlighted
          Review
        </Typography>
      </Stack>


      {/*  user Name */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Name</Typography>
        <TextField
          placeholder="Enter Name"
          size="small"
          name="name"
          value={content.name}
          onChange={(e) => handleChange(e.target.value, "highlightedName")}
          fullWidth
        />
      </Box>
      {/* -----address------ */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Address</Typography>
        <textarea
          placeholder="Enter Address"
          name="address"
          value={content.address}
          onChange={(e) => handleChange(e.target.value, "highlightedAddress")}
          style={{
            background: "transparent",
            borderRadius: "8px",
            padding: "0.5rem 0.6rem",
            fontSize: "1rem",
            maxWidth:'100%',
            minHeight:"10rem",
            minWidth:"99%"
          }}
        />
      </Box>

      {/* -----rating------ */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Rating</Typography>

        <Rating
          name="ratingValue"
          value={content.ratingValue}
          onChange={(event, newValue) => {
            handleChange(newValue, "highlightedRatingValue")
          }}
        />
      </Box>

      {/* user Description */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Description</Typography>
        <textarea
          placeholder="Enter Description"
          name="description"
          value={content.description}
          onChange={(e) => handleChange(e.target.value, "highlightedDescription")}
          style={{
            background: "transparent",
            borderRadius: "8px",
            padding: "0.5rem 0.6rem",
            fontSize: "1rem",
            maxWidth:'100%',
            minHeight:"10rem",
            minWidth:"99%"
          }}
        />
      </Box>

      {/* Image Upload for Service */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Image</Typography>
        <Box
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleHighlightedImageDrop(e, id)}
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
          {content.highlightedReview
.image ? (
            <>
              <img
                src={content.highlightedReview
                  .image}
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
                onClick={() => handleDeleteImage(content.highlightedReview.image)}
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
                <label htmlFor={`file-upload-${id}`}>
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
                  id={`file-upload-${id}`}
                  type="file"
                  style={{
                    display: "none", // Hide but still clickable via label
                  }}
                  onChange={(e) => handleHighlightedImageChange(e, id)}
                  accept="image/*"
                />
              </Box>


            </>
          )}
        </Box>
      </Box>


    </Box>
  )
}

export default HighlightedReviewInputs
