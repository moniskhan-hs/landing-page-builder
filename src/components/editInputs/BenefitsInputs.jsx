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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageUpload from "../ImageUpload";
import {
  changeBenefits,
} from "../../redux/reducers/universalStyles";

const BenefitsInputs = ({id}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Combined state for title, optional text, and benefits list
  const [formData, setFormData] = useState({
    title: "",
    optionalText: "",
    benefits: [
      {
        infoText: "some informations text",
        image: null,
      },
    ],
  });

  // Global change handler for "title" and "optionalText"
  const handleGlobalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "title") {
      dispatch(changeBenefits({id:id,content:value,type:'title'}));
    }
    if (name === "optionalText") {
      dispatch(changeBenefits({id:id,content:value,type:'optionalText'}));    }
  };

  // Handler for benefit text inputs (e.g., infoText)
  const handleBenefitChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedBenefits = prev.benefits.map((benefit, idx) =>
        idx === index ? { ...benefit, [name]: value } : benefit
      );
      return { ...prev, benefits: updatedBenefits };
    });
  };

  // Handler for file upload for a specific benefit
  const handleBenefitImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => {
        const updatedBenefits = prev.benefits.map((benefit, idx) =>
          idx === index ? { ...benefit, image: file } : benefit
        );
        return { ...prev, benefits: updatedBenefits };
      });
    }
  };

  // Handler for file drop (drag-and-drop) for a specific benefit
  const handleBenefitImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => {
        const updatedBenefits = prev.benefits.map((benefit, idx) =>
          idx === index ? { ...benefit, image: file } : benefit
        );
        return { ...prev, benefits: updatedBenefits };
      });
    }
  };

  // Add a new blank benefit entry
  const handleAddBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [
        ...prev.benefits,
        {
          infoText: "",
          image: null,
        },
      ],
    }));
  };

  // Delete a benefit entry by its index
  const handleDeleteBenefit = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, index) => index !== indexToDelete),
    }));
  };

  // Dispatch updated benefits list to Redux whenever it changes
  useEffect(() => {
    dispatch(changeBenefits({id:id,content:formData.benefits,type:'list'}));
  }, [dispatch, formData.benefits]);

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
          value={formData.title}
          onChange={handleGlobalChange}
          fullWidth
        />
      </Box>

      {/* Optional Text Field */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Optional Text</Typography>
        <TextField
          placeholder="Enter Optional text"
          size="small"
          name="optionalText"
          value={formData.optionalText}
          onChange={handleGlobalChange}
          fullWidth
        />
      </Box>

      {/* Map through the benefits list */}
      {formData.benefits.map((benefit, index) => (
        <Box
          key={"benefit" + index}
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
              Benefit {index + 1}
            </Typography>
            <IconButton onClick={() => handleDeleteBenefit(index)}>
              <DeleteOutlineOutlined sx={{ color: "red" }} />
            </IconButton>
          </Stack>

          {/* Info Text Field */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Info Text</Typography>
            <TextField
              placeholder="Enter Info Text"
              size="small"
              name="infoText"
              value={benefit.infoText}
              onChange={(e) => handleBenefitChange(e, index)}
              fullWidth
            />
          </Box>

          {/* Image Upload */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={benefit.image}
              hanldeFileUpload={(e) => handleBenefitImageChange(e, index)}
              handleFileDrop={(e) => handleBenefitImageDrop(e, index)}
            />
            {benefit.image && (
              <Typography
                variant="subtitle2"
                sx={{
                  border: "1px solid",
                  padding: "0.5rem 0.7rem",
                  mt: 1,
                }}
              >
                File selected: {benefit.image?.name}
              </Typography>
            )}
          </Box>
        </Box>
      ))}

      {/* Button to add a new benefit */}
      <Button
        onClick={handleAddBenefit}
        sx={{
          width: "50%",
          mx: "auto",
          mt: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        Add Benefit
      </Button>
    </Stack>
  );
};

export default BenefitsInputs;
