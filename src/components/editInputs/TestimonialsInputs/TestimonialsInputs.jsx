/* eslint-disable react/prop-types */
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addTestimonialItem, changeTestimonials, changeTestimonialsList, removeTestimonialItem } from "../../../redux/reducers/universalStyles";
import ImageUpload from "../../ImageUpload";
import HighlightedReviewInputs from "./HighlightedReviewInputs";

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

  const hanldeIsSelectedReview = (e, index, field) => {
    dispatch(
      changeTestimonialsList({ id, index, content: e.target.checked, field })
    );
  }


  // --- Handlers for Service Item Fields ---
  const handleTestimonialsFieldChange = (e, index, field) => {
    dispatch(
      changeTestimonialsList({ id, index, content: e.target.value, field })
    );
  };

  const handleTestimonialsImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(
        changeTestimonialsList({ id, index, content: file, field: "image" })
      );
    }
  };

  const handleTestimonialImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch(
        changeTestimonialsList({ id, index, content: file, field: "image" })
      );
    }
  };



  // Add a new blank benefit entry
  const handleAddTestimonial = () => {
    console.log('add benfit clicked')
    dispatch(
      addTestimonialItem({
        id,
        user:  {
          name: "some question",
          address:'New York, US',
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
          image:null,
          ratingValue:4,
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
<HighlightedReviewInputs content={content}  id={id} theme={theme}/>

      {/* Map through each service item */}
      {content?.users?.map((user, index) => (
        <Box
          key={user.id || index} // Use a stable unique key (service.id)
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
                handleTestimonialsFieldChange(event,index,"ratingValue" )
              }}
            />
          </Box>

          {/* user Description */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Description</Typography>
            <TextField
              placeholder="Enter Description"
              size="small"
              name="description"
              value={user.description}
              onChange={(e) =>
                handleTestimonialsFieldChange(e, index, "description")
              }
              fullWidth
            />
          </Box>

          {/* Image Upload for Service */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={user.image}
              handleFileDrop={(e) => handleTestimonialImageDrop(e, index)}
              hanldeFileUpload={(e) => handleTestimonialsImageChange(e, index)}
            />
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
