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
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../ImageUpload";
import {
  addBenefitsItem,
  changeBenefits,
  changeBenefitsList,
  removeBenefitItem,
} from "../../redux/reducers/universalStyles";

const BenefitsInputs = ({id}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Get the service component from Redux by id
  const benefitsState = useSelector((state) => state.universalThemeReducer.benefits);
  const selectedBenefits = benefitsState.find((ele) => ele.id == id);

  if(!selectedBenefits){
      return (
          <Typography variant="h6" color="error">
            Benfits component not found for id: {id}
          </Typography>
        );
  }

  const { content } = selectedBenefits; // content contains title and services array

 const handleTitleChange = (e) => {
    dispatch(
      changeBenefits({ id, content: e.target.value, type: "title" })
    );
  };

 const handleOptionalTextChange = (e) => {
    dispatch(
      changeBenefits({ id, content: e.target.value, type: "optionalText" })
    );
  };



  // --- Handlers for Service Item Fields ---
  const handleBenefitFieldChange = (e, index, field) => {
    dispatch(
      changeBenefitsList({ id, index, content: e.target.value, field })
    );
  };

  const handleBenefitsImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(
        changeBenefitsList({ id, index, content: file, field: "image" })
      );
    }
  };

  const handleBenefitsImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch(
        changeBenefitsList({ id, index, content: file, field: "image" })
      );
    }
  };



  // Add a new blank benefit entry
  const handleAddBenefit = () => {
    console.log('add benfit clicked')
   dispatch(
       addBenefitsItem({
         id,
         benefit: { infoText: "", image: null },
       })
     );
  };

  // Delete a benefit entry by its index
  const handleDeleteBenefit = (index) => {
  dispatch(removeBenefitItem({ id, index }));
  };


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
          value={content.title}
          onChange={handleTitleChange}
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
          value={content.optionalText}
          onChange={handleOptionalTextChange}
          fullWidth
        />
      </Box>

      {/* Map through the benefits list */}
      {content.benefits.map((benefit, index) => (
        <Box
          key={ benefit.id || index}
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
              onChange={(e) => handleBenefitFieldChange(e, index,"infoText")}
              fullWidth
            />
          </Box>

          {/* Image Upload */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={benefit.image}
              handleFileDrop={(e) => handleBenefitsImageDrop(e, index)}
              hanldeFileUpload={(e) => handleBenefitsImageChange(e, index)}
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
