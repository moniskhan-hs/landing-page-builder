import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeServicesList,
  changeServicesTitle
} from "../../redux/reducers/universalStyles";
// import { theme } from "../../styles/theme";
import ImageUpload from "../ImageUpload";

const servicesInputsData = [
  {
    heading: "some heading",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
    image: null,
  },
];

const ServicesInputs = () => {
  const [inputsData, setInputsData] = useState(servicesInputsData);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme()

  // Update text fields for a specific service
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setInputsData((prev) =>
      prev.map((service, idx) =>
        idx === index ? { ...service, [name]: value } : service
      )
    );


  };

  // Update the image for a specific service from file input
  const handleServiceImageChange = (e, serviceIndex) => {
    const file = e.target.files[0];
    if (file) {
      setInputsData((prev) =>
        prev.map((service, idx) =>
          idx === serviceIndex ? { ...service, image: file } : service
        )
      );
    }
  };

  // Update the image for a specific service from drag-and-drop
  const handleServiceImageDrop = (e, serviceIndex) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setInputsData((prev) =>
        prev.map((service, idx) =>
          idx === serviceIndex ? { ...service, image: file } : service
        )
      );
    }
  };

  // Add a new blank service
  const handleAddService = () => {
    setInputsData((prev) => [
      ...prev,
      {
        heading: "",
        description: "",
        image: null,
      },
    ]);
  };

  // Delete a service by its index
  const handleDeleteService = (indexToDelete) => {
    setInputsData((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  // useSetComponentStyles({
  //   updates: inputsData,
  //   setHandler: changeServicesList,
  // });
useEffect(()=>{
  dispatch(changeServicesList(inputsData));
},[inputsData])
  return (
    <Stack
      gap={1}
      sx={{
        padding: "0.5rem 0.5rem",
      }}
    >
      {/* Title Field */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Title</Typography>
        <TextField
          placeholder="Enter Title"
          size="small"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            dispatch(changeServicesTitle(e.target.value));
          }}
          fullWidth
        />
      </Box>
      {inputsData.map((service, index) => (
        <Box
          key={"service" + index}
          sx={{
            bgcolor: theme.palette.background.paper,
            padding: "0.5rem",
            borderRadius: "12px",
            mb: 2,
          }}
        >
          {/* Delete button */}
          <Stack
            direction="row"
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                marginRight: "auto",
              }}
            >
              Service {index + 1}{" "}
            </Typography>

            <IconButton onClick={() => handleDeleteService(index)}>
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
              value={service.heading}
              onChange={(e) => handleChange(e, index)}
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
              value={service.description}
              onChange={(e) => handleChange(e, index)}
              fullWidth
            />
          </Box>

          {/* Image Upload */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={service.image}
              hanldeFileUpload={(e) => handleServiceImageChange(e, index)}
              handleFileDrop={(e) => handleServiceImageDrop(e, index)}
            />
            {service.image && (
              <Typography variant ="subtitle2"
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
