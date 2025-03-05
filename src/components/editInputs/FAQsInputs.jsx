/* eslint-disable react/prop-types */
import { CloudUpload, DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { storage } from "../../firebase";
import {
  addFAQItem,
  changeFAQ,
  changeFAQList,
  removeFAQItem,
} from "../../redux/reducers/universalStyles";
import { uploadImageOnFirebaseStorageServices } from "../../utils/imageupload/firebase-storage-upload";


const FAQsInputs = ({ id }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Retrieve FAQ data from Redux from the frequentlyAsked slice.
  const faqState = useSelector((state) => state.universalThemeReducer.frequentlyAsked);
  const selectedFAQ = faqState.find((ele) => ele.id == id);

  if (!selectedFAQ) {
    return (
      <Typography variant="h6" color="error">
        FAQ component not found for id: {id}
      </Typography>
    );
  }

  // Destructure content: { title, image, fAndq }
  const { content } = selectedFAQ;

  // Handler for global title field.
  const handleTitleChange = (e) => {
    dispatch(changeFAQ({ id, content: e.target.value, type: "title" }));
  };


  const handleImageChange = (e, id) => {
    handleFileChange(e, id);
  };

  const handleImageDrop = (e, id) => {
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

      dispatch(changeFAQ({
        id,
        content: downloadURL,
        type: 'image'
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
      const encodedPath = imageUrl.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(encodedPath);
      const imageRef = ref(storage, decodedPath);

      // Delete from Firebase Storage
      await deleteObject(imageRef);

      // Remove from Redux state
      dispatch(changeFAQ({
        id,
        content: null,
        type: 'image'
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Optionally show error to user
    }
  };


  // Handler for updating FAQ list items (question or answer)
  const handleFAQFieldChange = (e, index, field) => {
    dispatch(changeFAQList({ id, index, content: e.target.value, field }));
  };

  // Handler for adding a new FAQ item.
  const handleAddFAQ = () => {
    dispatch(
      addFAQItem({
        id,
        fAndq: { question: "", answer: "" },
      })
    );
  };

  // Handler for deleting a FAQ item by its index.
  const handleDeleteFAQ = (index) => {
    dispatch(removeFAQItem({ id, index }));
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

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Image</Typography>
        <Box
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleImageDrop(e, id)}
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
          {content.image ? (
            <>
              <img
                src={content.image}
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
                onClick={() => handleDeleteImage(content.image)}
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
                  onChange={(e) => handleImageChange(e, id)}
                  accept="image/*"
                />
              </Box>

            </>
          )}
        </Box>
      </Box>

      {/* Map through FAQ items */}
      {content?.fAndq?.map((faq, index) => (
        <Box
          key={faq.id || index}
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
              FAQ {index + 1}
            </Typography>
            <IconButton onClick={() => handleDeleteFAQ(index)}>
              <DeleteOutlineOutlined sx={{ color: "red" }} />
            </IconButton>
          </Stack>

          {/* Question Field */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Question</Typography>
            <textarea
              placeholder="Enter Question"
              size="small"
              name="question"
              value={faq.question}
              onChange={(e) => handleFAQFieldChange(e, index, "question")}
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

          {/* Answer Field */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Answer</Typography>
            <textarea
              placeholder="Enter Answer"
              size="small"
              name="answer"
              value={faq.answer}
              onChange={(e) => handleFAQFieldChange(e, index, "answer")}
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
        </Box>
      ))}

      {/* Button to Add a New FAQ Item */}
      <Button
        onClick={handleAddFAQ}
        sx={{
          width: "50%",
          mx: "auto",
          mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Add FAQ
      </Button>
    </Stack>
  );
};

export default FAQsInputs;
