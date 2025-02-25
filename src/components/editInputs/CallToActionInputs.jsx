/* eslint-disable react/prop-types */
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCallToActionItem, changeCallToAction, changeCallToActionList, removeCallToActionItem } from "../../redux/reducers/universalStyles";

const CallToActionInputs = ({ id }) => {
  const theme = useTheme()
  const dispatch = useDispatch();
  // Get the service component from Redux by id
  const callToActionState = useSelector((state) => state.universalThemeReducer.callToAction);
  const selectedCallToAction = callToActionState.find((ele) => ele.id == id);

  if (!selectedCallToAction) {
    return (
      <Typography variant="h6" color="error">
        Service component not found for id: {id}
      </Typography>
    );
  }

  const { content } = selectedCallToAction;

  // --- Handlers for Title ---
  const handleTitleChange = (e) => {
    dispatch(
      changeCallToAction({ id, content: e.target.value, type: "title" })
    );
  };

  // --- Handlers for info text ---
  const handleInfoTextChange = (e) => {
    dispatch(
      changeCallToAction({ id, content: e.target.value, type: "infoText" })
    );
  };

  // --- Handlers for sub text ---
  const handleButtonTextChange = (e) => {
    dispatch(
      changeCallToAction({ id, content: e.target.value, type: "buttonText" })
    );
  };

  // --- Handlers for Call To Action Item Fields ---
  const handleCallToActionFieldChange = (e, index, arrayName) => {
    dispatch(
      changeCallToActionList({ id, index, content: e.target.value, arrayName })
    );
  };

  // --- Handler for Adding a New  Item ---
  const handleAddItem = (arrayName) => {
    dispatch(
      addCallToActionItem({
        id,
        item: { text: "some text", },
        arrayName
      })
    );
  };

  // --- Handler for Deleting a Service Item ---
  const handleDeleteItem = (index, arrayName) => {
    dispatch(removeCallToActionItem({ id, index, arrayName }));
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
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Button Text</Typography>
        <TextField
          placeholder="Enter Button Text"
          size="small"
          name="buttonText"
          value={content.buttonText}
          onChange={handleButtonTextChange}
          fullWidth
        />
      </Box>
      {/* ------------------------------------------ Information content box----------------------------------- */}
      <Stack mb={1} gap={1}>
        <Typography variant="subtitle1" sx={{
          color: theme.palette.primary.main,
          fontWeight: "700"
        }}>Information</Typography>
        {/* ---------------------------------------- Map through each information item */}
        {content?.information?.map((item, index) => (
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
                Info {index + 1}
              </Typography>
              <IconButton onClick={() => handleDeleteItem(index, 'information')}>
                <DeleteOutlineOutlined sx={{ color: "red" }} />
              </IconButton>
            </Stack>

            {/* Heading Field */}
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1">Text</Typography>
              <TextField
                placeholder="Enter Text"
                size="small"
                name="heading"
                value={item.text}
                onChange={(e) =>
                  handleCallToActionFieldChange(e, index, "information")
                }
                fullWidth
              />
            </Box>


            {/* Icon Upload - [in future] */}
            {/* <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={item.image}
              handleFileDrop={(e) => handleIncludedNotIncludedImageDrop(e, index)}
              hanldeFileUpload={(e) => handleIncludedNotIncludedImageChange(e, index)}
            />
          </Box> */}
          </Box>
        ))}
        <Button
          onClick={() => handleAddItem('information')}
          sx={{
            width: "50%",
            mx: "auto",

            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Add Item
        </Button>
      </Stack>


<Stack gap={1} mb={1}>
<Typography variant="subtitle1" sx={{
          color: theme.palette.primary.main,
          fontWeight: "700"
        }}>Advantages</Typography>
      {/* ---------------------------------------- Map through each Advantages item */}
      {content?.advantages?.map((item, index) => (
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
            <IconButton onClick={() => handleDeleteItem(index, 'advantages')}>
              <DeleteOutlineOutlined sx={{ color: "red" }} />
            </IconButton>
          </Stack>

          {/* Heading Field */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Text</Typography>
            <TextField
              placeholder="Enter Text"
              size="small"
              name="heading"
              value={item.text}
              onChange={(e) =>
                handleCallToActionFieldChange(e, index, "advantages")
              }
              fullWidth
            />
          </Box>


          {/* Icon Upload - [in future] */}
          {/* <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={item.image}
              handleFileDrop={(e) => handleIncludedNotIncludedImageDrop(e, index)}
              hanldeFileUpload={(e) => handleIncludedNotIncludedImageChange(e, index)}
            />
          </Box> */}
        </Box>
      ))}
        {/* Button to Add a New Item */}
        <Button
        onClick={() => handleAddItem('advantages')}
        sx={{
          width: "50%",
          mx: "auto",
          mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Add Itme
      </Button>
</Stack>


    
    </Stack>
  );
}

export default CallToActionInputs
