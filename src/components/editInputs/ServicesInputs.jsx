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
  changeServices,
  changeServicesList,
  addServiceItem,
  removeServiceItem,
} from "../../redux/reducers/universalStyles";
import ImageUpload from "../ImageUpload";

const ServicesInputs = ({ id }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Get the service component from Redux by id
  const servicesState = useSelector((state) => state.universalThemeReducer.services);
  const selectedService = servicesState.find((ele) => ele.id == id);

  if (!selectedService) {
    return (
      <Typography variant="h6" color="error">
        Service component not found for id: {id}
      </Typography>
    );
  }

  const { content } = selectedService; // content contains title and services array

  // --- Handlers for Title ---
  const handleTitleChange = (e) => {
    dispatch(
      changeServices({ id, content: e.target.value, type: "title" })
    );
  };

  // --- Handlers for Service Item Fields ---
  const handleServiceFieldChange = (e, index, field) => {
    dispatch(
      changeServicesList({ id, index, content: e.target.value, field })
    );
  };

  const handleServiceImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(
        changeServicesList({ id, index, content: file, field: "image" })
      );
    }
  };

  const handleServiceImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch(
        changeServicesList({ id, index, content: file, field: "image" })
      );
    }
  };

  // --- Handler for Adding a New Service Item ---
  const handleAddService = () => {
    dispatch(
      addServiceItem({
        id,
        service: { heading: "", description: "", image: null },
      })
    );
  };

  // --- Handler for Deleting a Service Item ---
  const handleDeleteService = (index) => {
    dispatch(removeServiceItem({ id, index }));
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

      {/* Map through each service item */}
      {content.services.map((service, index) => (
        <Box
          key={service.id || index} // Use a stable unique key (service.id)
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
              Service {index + 1}
            </Typography>
            <IconButton onClick={() => handleDeleteService(index)}>
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
              value={service.heading}
              onChange={(e) => handleServiceFieldChange(e, index, "heading")}
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
              value={service.description}
              onChange={(e) =>
                handleServiceFieldChange(e, index, "description")
              }
              fullWidth
            />
          </Box>

          {/* Image Upload for Service */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={service.image}
              handleFileDrop={(e) => handleServiceImageDrop(e, index)}
              hanldeFileUpload={(e) => handleServiceImageChange(e, index)}
            />
          </Box>
        </Box>
      ))}

      {/* Button to Add a New Service */}
      <Button
        onClick={handleAddService}
        sx={{
          width: "50%",
          mx: "auto",
          mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Add Service
      </Button>
    </Stack>
  );
};

export default ServicesInputs;
