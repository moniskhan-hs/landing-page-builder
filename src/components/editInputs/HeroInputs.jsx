/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeHero } from "../../redux/reducers/universalStyles";
import ImageUpload from "../ImageUpload";

const HeroInputs = ({ id }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Retrieve hero data from Redux by matching id
  const heroState = useSelector((state) => state.universalThemeReducer.hero);
  const selectedHero = heroState.find((ele) => ele.id === id);
  // Always define content. If not found, use a default empty object.
  const content = selectedHero ? selectedHero.content : {
    file: null,
    value: "image",
    title: "",
    description: "",
    buttonText: "",
    infoText: "",
    embededLink: "",
    scheduleAdded: false,
  };

  // Generic change handler
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    let newValue;
    if (type === "file") {
      newValue = files[0];
    } else if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }
    // Create updated content by merging with the new value
    const updatedContent = { ...content, [name]: newValue };
    dispatch(changeHero({ id, content: updatedContent }));
  };

  // File handlers
  const handleFileUpload = (e) => {
    handleChange(e);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    handleChange(e);
  };

  // Toggle effect: if "image" is selected, clear embededLink; if "link", clear file.
  useEffect(() => {
    if (content.value === "image" && content.embededLink) {
      dispatch(changeHero({ id, content: { ...content, embededLink: "" } }));
    }
    if (content.value === "link" && content.file) {
      dispatch(changeHero({ id, content: { ...content, file: null } }));
    }
  }, [content.value, content.embededLink, content.file, dispatch, id]);

  return (
    <>
      {!selectedHero ? (
        <Typography variant="h6" color="error">
          Hero component not found for id: {id}
        </Typography>
      ) : (
        <Stack
          gap={1}
          sx={{
            padding: "0.5rem 0.5rem",
            ".MuiBox-root": {
              display: "flex",
              flexDirection: "column",
              gap: 1,
            },
          }}
        >
          {/* Title Field */}
          <Box>
            <Typography variant="subtitle2">Title</Typography>
            <TextField
              name="title"
              placeholder="Enter Title"
              size="small"
              value={content.title}
              onChange={handleChange}
            />
          </Box>

          {/* Description Field */}
          <Box>
            <Typography variant="subtitle2">Description</Typography>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={content.description}
              onChange={handleChange}
              style={{
                background: "transparent",
                borderRadius: "8px",
                padding: "0.5rem 0.6rem",
                fontSize: "1rem",
              }}
            />
          </Box>

          {/* Button Text Field */}
          <Box>
            <Typography variant="subtitle2">Button Text</Typography>
            <TextField
              name="buttonText"
              placeholder="Enter Button Text"
              size="small"
              value={content.buttonText}
              onChange={handleChange}
            />
          </Box>

          {/* Info Text Field */}
          <Box>
            <Typography variant="subtitle2">Info Text</Typography>
            <TextField
              name="infoText"
              placeholder="Enter Text"
              size="small"
              value={content.infoText}
              onChange={handleChange}
            />
          </Box>

          {/* Radio Group: Choose between Image and Embeded Link */}
          <Box>
            <FormControl>
              <Typography variant="subtitle2">To Add</Typography>
              <RadioGroup
                name="value"
                value={content.value}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="image"
                  control={<Radio />}
                  label="Image"
                />
                <FormControlLabel
                  value="link"
                  control={<Radio />}
                  label="Embeded Link"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Conditional Rendering: Image Upload vs. Embeded Link Input */}
          {content.value === "image" ? (
            <Box>
              <Typography variant="subtitle2">Add Image</Typography>
              <ImageUpload
                file={content.file}
                handleFileDrop={handleFileDrop}
                handleFileUpload={handleFileUpload}
              />
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle2">Add Embeded Link</Typography>
              <TextField
                name="embededLink"
                placeholder="Embeded Video Link"
                size="small"
                value={content.embededLink}
                onChange={handleChange}
              />
            </Box>
          )}

          {/* Schedule Checkbox */}
          <Box>
            <Typography variant="subtitle2">Schedule</Typography>
            <FormControlLabel
              required
              control={
                <Checkbox
                  name="scheduleAdded"
                  checked={content.scheduleAdded}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Add schedule in my website"
            />
          </Box>
        </Stack>
      )}
    </>
  );
};

export default HeroInputs;
