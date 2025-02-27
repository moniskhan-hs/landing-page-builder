/* eslint-disable react/prop-types */
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import ImageUpload from "../ImageUpload";

const ScheduleSectionInputs = ({ theme, index, item, handleItemFieldChange, handleScheduleImageDrop, handleScheduleImageChange,handleDeleteScheduleItem }) => {
  return (
    <Box
    key={item.id || index} // Use a stable unique key (item.id)
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
        Item {index + 1}
      </Typography>
      <IconButton onClick={() => handleDeleteScheduleItem(index)}>
        <DeleteOutlineOutlined sx={{ color: "red" }} />
      </IconButton>
    </Stack>

    {/* item Heading */}
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle1">Label</Typography>
      <TextField
        placeholder="Enter label Text eg, Time, location,etc"
        size="small"
        name="labelText"
        value={item.labelText}
        onChange={(e) => handleItemFieldChange(e, index, "labelText")}
        fullWidth
      />
    </Box>

    {/* item Description */}
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle1">Info Text</Typography>
      <TextField
        placeholder="Enter Info Text"
        size="small"
        name="infoText"
        value={item.infoText}
        onChange={(e) =>
          handleItemFieldChange(e, index, "infoText")
        }
        fullWidth
      />
    </Box>

    {/* Image Upload for item */}
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle1">Image</Typography>
      <ImageUpload
        file={item.image}
        handleFileDrop={(e) => handleScheduleImageDrop(e, index)}
        hanldeFileUpload={(e) => handleScheduleImageChange(e, index)}
      />
    </Box>
  </Box>
  );
};

export default ScheduleSectionInputs;
