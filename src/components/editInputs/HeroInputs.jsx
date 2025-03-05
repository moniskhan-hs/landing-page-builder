/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  Box,
  Button,
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
import { addScheduleItem, changeHero, changeHeroScheduleList, removeScheduleItem, setHeroImage } from "../../redux/reducers/universalStyles";
import ImageUpload from "../ImageUpload";
import ScheduleSectionInputs from "./ScheduleSectionInputs";

const HeroInputs = ({ id }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Retrieve hero data from Redux by matching id
  const heroState = useSelector((state) => state.universalThemeReducer.hero);
  const selectedHero = heroState.find((ele) => ele.id === id);
  // Always define content. If not found, use a default empty object.
  const content = selectedHero
    ? selectedHero.content
    : {
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

  // Toggle effect: if "image" is selected, clear embededLink; if "link", clear file.
  useEffect(() => {
    if (content.value === "image" && content.embededLink) {
      dispatch(changeHero({ id, content: { ...content, embededLink: "" } }));
    }
    if (content.value === "link" && content.file) {
      dispatch(changeHero({ id, content: { ...content, file: null } }));
    }
  }, [content.value, content.embededLink, content.file, dispatch, id]);



  const handleItemFieldChange = (e, index, field) => {

    dispatch(changeHeroScheduleList({ id, index, content: e.target.value, field }))
  }

  const handleScheduleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      dispatch(changeHeroScheduleList({ id, index, content: file, field: 'image' }))
    }
  }


  const handleScheduleImageDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      dispatch(
        changeHeroScheduleList({ id, index, content: file, field: "image" })
      );
    }
  };

  const handleAddScheduleItem = () => {
    dispatch(
      addScheduleItem({
        id,
        item: {
          labelText: 'eg, TIME',
          infoText: '03:15 PM',
          image: null          // icon in future

        },
      })
    );
  };

  // --- Handler for Deleting a Service Item ---
  const handleDeleteScheduleItem = (index) => {
    dispatch(removeScheduleItem({ id, index }));
  };


  const handleToSetDownloadURL = (downloadURL) => {
    dispatch(setHeroImage({ id, content: downloadURL }))
  }

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
                maxWidth:'100%',
                minHeight:"10rem",
                minWidth:"99%"
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
                  label="Embedded Link"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Conditional Rendering: Image Upload vs. Embeded Link Input */}
          {content.value === "image" ? (
            <Box>
              <Typography variant="subtitle2">Add Image</Typography>
              <ImageUpload
                downloadURL={content.downloadURL}
                handleToSetDownloadURL={handleToSetDownloadURL}
                id={id}
                type = 'single'
                index = {1111}
              />
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle2">Add Embedded Link</Typography>
              <TextField
                name="embededLink"
                placeholder="Embedded Video Link"
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
              label="Add schedule"
            />
          </Box>

          {content.scheduleAdded &&



            content?.scheduleData?.map((ele, index) =>
              <ScheduleSectionInputs key={ele.id || index} theme={theme} index={index} item={ele} handleItemFieldChange={handleItemFieldChange} handleScheduleImageChange={handleScheduleImageChange} handleScheduleImageDrop={handleScheduleImageDrop} handleDeleteScheduleItem={handleDeleteScheduleItem} />
            )








          }

          {content.scheduleAdded && <Button
            onClick={handleAddScheduleItem}
            sx={{
              width: "50%",
              mx: "auto",
              mt: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            Add Item
          </Button>
          }




        </Stack>
      )}
    </>
  );
};

export default HeroInputs;
