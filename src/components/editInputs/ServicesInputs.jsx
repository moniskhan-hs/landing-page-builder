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
  addServiceItem,
  changeServices,
  changeServicesList,
  changeServicesListImage,
  removeServiceItem,
} from "../../redux/reducers/universalStyles";
import { uploadImageOnFirebaseStorageServices } from "../../utils/imageupload/firebase-storage-upload";

const ServicesInputs = ({ id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

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

  // ------------------------ image upload and delete logic--------------------------------
  const handleServiceImageChange = (e, serviceId) => {
    handleFileChange(e, serviceId);
  };

  const handleServiceImageDrop = (e, serviceId) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } }, serviceId);
  };

  const handleFileChange = async (e, serviceId) => {
    const websiteId = `mywebsite`;
    const file = e.target.files[0];
    if (!file || !serviceId) return;

    try {
      const downloadURL = await uploadImageOnFirebaseStorageServices(
        file,
        websiteId,
        `${serviceId}-${uuidv4()}` // Unique filename with service ID
      );

      dispatch(changeServicesListImage({
        id,
        serviceId,
        content: downloadURL,
        field: 'image'
      }));
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // to delete the uploaded image
  const handleDeleteImage = async (serviceId, imageUrl) => {
    if (!imageUrl) return;

    try {
      // Extract path from download URL
      const encodedPath = imageUrl.split('/o/')[1].split('?')[0];
      const decodedPath = decodeURIComponent(encodedPath);
      const imageRef = ref(storage, decodedPath);

      // Delete from Firebase Storage
      await deleteObject(imageRef);

      // Remove from Redux state
      dispatch(changeServicesListImage({
        id,
        serviceId,
        content: null,
        field: 'image'
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
      // Optionally show error to user
    }
  };




  // Updated delete handler
  const handleDeleteService = (serviceId) => {
    dispatch(removeServiceItem({ id, serviceId }));
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
            <textarea
              placeholder="Enter Description"
              name="description"
              value={service.description}
              onChange={(e) =>
                handleServiceFieldChange(e, index, "description")
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

          {/* Image Upload for Service */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <Box
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleServiceImageDrop(e, service.id)}
              sx={{     p: 1,
                textAlign: "center",
                borderRadius: "8px",
                "&:hover": { borderColor: "primary.main" },
                width: "70%",
                // mx: 'auto',
                bgcolor: '#f8f9fa',
                border: "2px dashed #ccc", }}
            >
              {service.image ? (
                <>
                  <img
                    src={service.image}
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
                    onClick={() => handleDeleteImage(service.id, service.image)}
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
                    <label htmlFor={`file-upload-${service.id}`}>
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
                        id={`file-upload-${service.id}`}
                        type="file"
                        style={{
                            display: "none", // Hide but still clickable via label
                        }}
                        onChange={(e) => handleServiceImageChange(e, service.id)}
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
