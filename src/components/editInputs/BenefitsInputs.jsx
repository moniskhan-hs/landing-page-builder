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
  changeBenefitsList,
  changeBenefitsTitle,
  changeOptionalText,
} from "../../redux/reducers/universalStyles";

const benefitsInputsData = [
  {
    infoText: "some informations text",
    image: null,
  },
];

const BenefitsInputs = () => {
  const [inputsData, setInputsData] = useState(benefitsInputsData);
  const [title, setTitle] = useState("");
  const [optionalText, setOptionalText] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setInputsData((prev) =>
      prev.map((benefit, idx) =>
        idx === index ? { ...benefit, [name]: value } : benefit
      )
    );
  };

  // Update the image for a specific benefit from file input
  const handleBenefitImageChange = (e, benefitIndex) => {
    const file = e.target.files[0];
    if (file) {
      setInputsData((prev) =>
        prev.map((benefit, idx) =>
          idx === benefitIndex ? { ...benefit, image: file } : benefit
        )
      );
    }
  };

  // Update the image for a specific benefit from drag-and-drop
  const handlebenefitImageDrop = (e, benefitIndex) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setInputsData((prev) =>
        prev.map((benefit, idx) =>
          idx === benefitIndex ? { ...benefit, image: file } : benefit
        )
      );
    }
  };

  // Add a new blank benefit
  const handleAddBenefit = () => {
    setInputsData((prev) => [
      ...prev,
      {
        heading: "",
        description: "",
        image: null,
      },
    ]);
  };

  // Delete a benefit by its index
  const handleDeleteBenefit = (indexToDelete) => {
    setInputsData((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  useEffect(() => {
    dispatch(changeBenefitsList(inputsData));
  }, [inputsData]);

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
            dispatch(changeBenefitsTitle(e.target.value));
          }}
          fullWidth
        />
      </Box>

      {/* Optional Text  */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Optional Text</Typography>
        <TextField
          placeholder="Enter Optional text"
          size="small"
          name="title"
          value={optionalText}
          onChange={(e) => {
            setOptionalText(e.target.value);
            dispatch(changeOptionalText(e.target.value));
          }}
          fullWidth
        />
      </Box>

      {inputsData.map((benefit, index) => (
        <Box
          key={"benefit" + index}
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
              benefit {index + 1}{" "}
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
              onChange={(e) => handleChange(e, index)}
              fullWidth
            />
          </Box>

          {/* Image Upload */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={benefit.image}
              hanldeFileUpload={(e) => handleBenefitImageChange(e, index)}
              handleFileDrop={(e) => handlebenefitImageDrop(e, index)}
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
