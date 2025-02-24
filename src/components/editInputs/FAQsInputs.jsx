/* eslint-disable react/prop-types */
import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addFAQItem,
  changeFAQ,
  changeFAQList,
  removeFAQItem,
} from "../../redux/reducers/universalStyles";
import ImageUpload from "../ImageUpload";

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

  // Handler for global FAQ image.
  const handleFAQGlobalImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(changeFAQ({ id, content: file, type: "image" }));
    }
  };

  const handleFAQGlobalImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch(changeFAQ({ id, content: file, type: "image" }));
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

      {/* Global FAQ Image Field */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">FAQ Global Image</Typography>
        <ImageUpload
          file={content.image}
          handleFileDrop={handleFAQGlobalImageDrop}
          hanldeFileUpload={handleFAQGlobalImageUpload}
        />
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
            <TextField
              placeholder="Enter Question"
              size="small"
              name="question"
              value={faq.question}
              onChange={(e) => handleFAQFieldChange(e, index, "question")}
              fullWidth
            />
          </Box>

          {/* Answer Field */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Answer</Typography>
            <TextField
              placeholder="Enter Answer"
              size="small"
              name="answer"
              value={faq.answer}
              onChange={(e) => handleFAQFieldChange(e, index, "answer")}
              fullWidth
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
