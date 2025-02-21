/* eslint-disable react/prop-types */
import { Box, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeHero } from "../../redux/reducers/universalStyles";
import ImageUpload from "../ImageUpload";

const HeroInputs = ({ id,title }) => {
    console.log('title:', title)
    const [formData, setFormData] = useState({
        file: null,          // Image file
        value: "image",      // Toggle between image or embedded link
        title: "",
        description: "",
        buttonText: "",
        infoText: "",
        embededLink: "",
        scheduleAdded: false,
      });
    
const dispatch = useDispatch()

      // Generic onChange handler for text, select, checkbox, and file inputs
      const handleChange = (e) => {
        const { name, type, value, checked, files } = e.target;
        
        if (type === "file") {
          // For file inputs, use the first file from the FileList
          setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
          }));
        } else if (type === "checkbox") {
          // For checkboxes, use the checked value
          setFormData((prevData) => ({
            ...prevData,
            [name]: checked,
          }));
        } else {
          // For other input types, use the input's value
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }

        
        
        
    };
    
    useEffect(()=>{
          dispatch(changeHero({id:id, content:formData}));
      },[formData,dispatch])

// useSetComponentStyles({ updates: heroUpdates, setHandler: changeHero, id: id });



    //   ------------------------------- H A N D L E R S ----------------------------------
    
  // File upload handler (for input type="file")
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData((prevData) => ({
        ...prevData,
        file: selectedFile,
      }));
    }
  };

  // File drop handler (for drag and drop)
  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFormData((prevData) => ({
        ...prevData,
        file: droppedFile,
      }));
    }
  };



 
    // ----------------------------------- Toggle the values between the image and link values -----------------------------------------
    useEffect(() => {
        if (formData.value == 'image') {
            setFormData({...formData, embededLink:''})
        }

        if (formData.value == 'link') {
            setFormData({...formData, file:''})
        }
    }, [formData.value])


    return (
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
          {/* Title */}
          <Box>
            <Typography variant="subtitle2">Title</Typography>
            <TextField
              name="title"
              placeholder="Enter Title"
              size="small"
              value={formData.title}
              onChange={handleChange}
            />
          </Box>
      
          {/* Description */}
          <Box>
            <Typography variant="subtitle2">Description</Typography>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              style={{
                background: "transparent",
                borderRadius: "8px",
                padding: "0.5rem 0.6rem",
                fontSize: "1rem",
              }}
            />
          </Box>
      
          {/* Button Text */}
          <Box>
            <Typography variant="subtitle2">Button Text</Typography>
            <TextField
              name="buttonText"
              placeholder="Enter Button Text"
              size="small"
              value={formData.buttonText}
              onChange={handleChange}
            />
          </Box>
      
          {/* Info Text */}
          <Box>
            <Typography variant="subtitle2">Info Text</Typography>
            <TextField
              name="infoText"
              placeholder="Enter Text"
              size="small"
              value={formData.infoText}
              onChange={handleChange}
            />
          </Box>
      
          {/* Radio Group: Choose between Image and Embeded Link */}
          <Box>
            <FormControl>
              <Typography variant="subtitle2">To Add</Typography>
              <RadioGroup
                name="value"
                value={formData.value}
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
      
          {/* Conditionally render image upload or embeded link input */}
          {formData.value === "image" ? (
            // Image Upload
            <Box>
              <Typography variant="subtitle2">Add Image</Typography>
              <ImageUpload
                file={formData.file}
                handleFileDrop={handleFileDrop}
                handleFileUpload={handleFileUpload}
              />
            </Box>
          ) : (
            // Embeded Video Input
            <Box>
              <Typography variant="subtitle2">Add Embeded Link</Typography>
              <TextField
                name="embededLink"
                placeholder="Embeded Video Link"
                size="small"
                value={formData.embededLink}
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
                  checked={formData.scheduleAdded}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Add schedule in my website"
            />
          </Box>
        </Stack>
      );
      
};

export default HeroInputs;
