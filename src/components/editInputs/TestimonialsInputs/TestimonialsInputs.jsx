/* eslint-disable react/prop-types */
import { CloudUpload, DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTestimonialItem, changeTestimonialListImage, changeTestimonials, changeTestimonialsList, removeTestimonialItem } from "../../../redux/reducers/universalStyles";
import ImageUpload from "../../ImageUpload";
import HighlightedReviewInputs from "./HighlightedReviewInputs";
import { uploadImageOnFirebaseStorageServices } from "../../../utils/imageupload/firebase-storage-upload";
import { v4 as uuidv4 } from 'uuid';
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../firebase";

const TestimonialsInputs = ({ id }) => {
  const theme = useTheme();
  const dispatch = useDispatch()

  // Get the service component from Redux by id
  const testimonialsState = useSelector((state) => state.universalThemeReducer.testimonials);
  const selectedTestimonials = testimonialsState.find((ele) => ele.id == id);

  if (!selectedTestimonials) {
    return (
      <Typography variant="h6" color="error">
        Testimonials component not found for id: {id}
      </Typography>
    );
  }

  const { content } = selectedTestimonials; // content contains title and services array

  const handleTitleChange = (e) => {
    dispatch(
      changeTestimonials({ id, content: e.target.value, type: "title" })
    );
  };

  const handleInfoTextChange = (e) => {
    dispatch(
      changeTestimonials({ id, content: e.target.value, type: "infoText" })
    );
  };




  // --- Handlers for Service Item Fields ---
  const handleTestimonialsFieldChange = (e, index, field) => {
    dispatch(
      changeTestimonialsList({ id, index, content: e.target.value, field })
    );
  };

  const handleTestimonialsImageChange = (e, userId) => {
    handleFileChange(e, userId);
  };

  const handleTestimonialImageDrop = (e, userId) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } }, userId);

  };


  const handleFileChange = async (e, userId) => {
    const websiteId = `mywebsite`;
    const file = e.target.files[0];
    if (!file || !userId) return;

    try {
      const downloadURL = await uploadImageOnFirebaseStorageServices(
        file,
        websiteId,
        `${userId}-${uuidv4()}` // Unique filename with user ID
      );
      console.log('image uploaded-----------------------------')

      dispatch(changeTestimonialListImage({
        id,
        userId,
        content: downloadURL,
        field: 'image'
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };



  // to delete the uploaded image
  const handleDeleteImage = async (userId, imageUrl) => {
    if (!imageUrl) return;

    try {
      // Extract path from download URL
      const encodedPath = imageUrl.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(encodedPath);
      const imageRef = ref(storage, decodedPath);

      // Delete from Firebase Storage
      await deleteObject(imageRef);

      // Remove from Redux state
      dispatch(changeTestimonialListImage({
        id,
        userId,
        content: null,
        field: 'image'
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Optionally show error to user
    }
  };



  // Add a new blank benefit entry
  const handleAddTestimonial = () => {
    console.log('add benfit clicked')
    dispatch(
      addTestimonialItem({
        id,
        user: {
          name: "some question",
          address: 'New York, US',
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
          image: null,
          ratingValue: 4,
        },
      })
    );
  };

  // Delete a benefit entry by its index
  const handleDeleteTestimonials = (index) => {
    dispatch(removeTestimonialItem({ id, index }));
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
      {/* --------------- Info text ------------------ */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Info Text</Typography>
        <TextField
          placeholder="Enter Info Text"
          size="small"
          name="title"
          value={content.infoText}
          onChange={handleInfoTextChange}
          fullWidth
        />
      </Box>
      {/* ------------------------------- highlighted review------------------------------------------------ */}
      <HighlightedReviewInputs content={content} id={id} theme={theme} />

      {/* Map through each service item */}
      {content?.users?.map((user, index) => (
        <Box
          key={user.id || index} // Use a stable unique key (user.id)
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
              User {index + 1}
            </Typography>
            <IconButton onClick={() => handleDeleteTestimonials(index)}>
              <DeleteOutlineOutlined sx={{ color: "red" }} />
            </IconButton>
          </Stack>


          {/*  user Name */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Name</Typography>
            <TextField
              placeholder="Enter Name"
              size="small"
              name="name"
              value={user.name}
              onChange={(e) => handleTestimonialsFieldChange(e, index, "name")}
              fullWidth
            />
          </Box>
          {/* -----address------ */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Address</Typography>
            <TextField
              placeholder="Enter Address"
              size="small"
              name="address"
              value={user.address}
              onChange={(e) => handleTestimonialsFieldChange(e, index, "address")}
              fullWidth
            />
          </Box>

          {/* -----rating------ */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Rating</Typography>

            <Rating
              name="ratingValue"
              value={user.ratingValue}
              onChange={(event) => {
                handleTestimonialsFieldChange(event, index, "ratingValue")
              }}
            />
          </Box>

          {/* user Description */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Description</Typography>
            <textarea
              placeholder="Enter Description"
              name="description"
              value={user.description}
              onChange={(e) =>
                handleTestimonialsFieldChange(e, index, "description")
              }
              style={{
                background: "transparent",
                borderRadius: "8px",
                padding: "0.5rem 0.6rem",
                fontSize: "1rem",
                maxWidth:'100%',
                minHeight:"15rem",
                minWidth:"99%"
              }}
            />
          </Box>

          {/* Image Upload of user */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleTestimonialImageDrop(e, user.id)}
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
              {user.image ? (
                <>
                  <img
                    src={user.image}
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
                    onClick={() => handleDeleteImage(user.id, user.image)}
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
                    <label htmlFor={`file-upload-${user.id}`}>
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
                      id={`file-upload-${user.id}`}
                      type="file"
                      style={{
                        display: "none", // Hide but still clickable via label
                      }}
                      onChange={(e) => handleTestimonialsImageChange(e, user.id)}
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
        onClick={handleAddTestimonial}
        sx={{
          width: "50%",
          mx: "auto",
          mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Add User
      </Button>
    </Stack>
  );
}

export default TestimonialsInputs
