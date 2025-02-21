import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
  FormControlLabel,
  Checkbox,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeServices,
  changeServicesList,
  changeServicesTitle,
} from "../../redux/reducers/universalStyles";
import ImageUpload from "../ImageUpload";

const ServicesInputs = ({id}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Combined state for title and services
  const [formData, setFormData] = useState({
    title: "",
    services: [
      {
        heading: "some heading",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
        image: null,
      },
    ],
  });

  // Handler for global fields (e.g., title)
  const handleGlobalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for service text inputs (heading, description)
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedServices = prev.services.map((service, idx) =>
        idx === index ? { ...service, [name]: value } : service
      );
      return { ...prev, services: updatedServices };
    });
  };

  // Handler for file upload via file input
  const handleServiceImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => {
        const updatedServices = prev.services.map((service, idx) =>
          idx === index ? { ...service, image: file } : service
        );
        return { ...prev, services: updatedServices };
      });
    }
  };

  // Handler for file drop (drag-and-drop)
  const handleServiceImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => {
        const updatedServices = prev.services.map((service, idx) =>
          idx === index ? { ...service, image: file } : service
        );
        return { ...prev, services: updatedServices };
      });
    }
  };

  // Add a new blank service entry
  const handleAddService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          heading: "",
          description: "",
          image: null,
        },
      ],
    }));
  };

  // Delete a service entry by its index
  const handleDeleteService = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, idx) => idx !== indexToDelete),
    }));
  };

  // Dispatch updated services list to Redux whenever it changes
  useEffect(() => {
    dispatch(changeServices( { id,content:formData.services ,type :'services'}));
  }, [dispatch, formData.services]);

  
  // Dispatch updated services list to Redux whenever it changes
 


  return (
    <Stack
      gap={1}
      sx={{
        padding: "0.5rem 0.5rem",
      }}
    >
      {/* Global Title Field */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Title</Typography>
        <TextField
          placeholder="Enter Title"
          size="small"
          name="title"
          value={formData.title}
          onChange={(e) => {
            handleGlobalChange(e);
            dispatch(changeServices({id, content:e.target.value,type:'title'}));
          }}
          fullWidth
        />
      </Box>

      {/* Map through services */}
      {formData.services.map((service, index) => (
        <Box
          key={"service" + index}
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
              onChange={(e) => handleServiceChange(e, index)}
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
              onChange={(e) => handleServiceChange(e, index)}
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
            {service.image && (
              <Typography
                variant="subtitle2"
                sx={{
                  border: "1px solid",
                  padding: "0.5rem 0.7rem",
                  mt: 1,
                }}
              >
                File selected: {service.image?.name}
              </Typography>
            )}
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
