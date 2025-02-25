/* eslint-disable react/prop-types */
import { Box, Rating, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeTestimonials } from '../../../redux/reducers/universalStyles';
import ImageUpload from '../../ImageUpload';

const HighlightedReviewInputs = ({id,theme,content}) => {
 const dispatch = useDispatch()

    const handleChange = (data,type) => {
     dispatch(changeTestimonials({ id, content:data, type }));
   };
 
    // File handlers
  const handleFileUpload = (e,type) => {
    const data = e.target.files[0]
    handleChange(data,type);
  };

  const handleFileDrop = (e,type) => {
      e.preventDefault();
      const data = e.target.files[0]
      
    handleChange(data,type);
  };

 
    return (
    <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            padding: "0.5rem",
            borderRadius: "12px",
            mb: 2,
          }}
        >
          {/* Header with Delete Button */}
          <Stack direction="row" sx={{ display: "flex", width: "100%", mt:2}}>
            <Typography variant="subtitle1" sx={{ marginRight: "auto",my:1,color:theme.palette.primary.main,fontWeight:"bold" }}>
            Highlighted
            Review 
            </Typography>
          </Stack>


          {/*  user Name */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Name</Typography>
            <TextField
              placeholder="Enter Name"
              size="small"
              name="name"
              value={content.name}
              onChange={(e) => handleChange(e.target.value,"highlightedName")}
              fullWidth
            />
          </Box>
          {/* -----address------ */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Address</Typography>
            <TextField
              placeholder="Enter Address"
              size="small"
              name="address"
              value={content.address}
              onChange={(e) => handleChange(e.target.value,"highlightedAddress")}
              fullWidth
            />
          </Box>

          {/* -----rating------ */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Rating</Typography>

            <Rating
              name="ratingValue"
              value={content.ratingValue}
              onChange={(event, newValue) => {
                handleChange( newValue, "highlightedRatingValue" )
              }}
            />
          </Box>

          {/* user Description */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Description</Typography>
            <TextField
              placeholder="Enter Description"
              size="small"
              name="description"
              value={content.description}
              onChange={(e) => handleChange(e.target.value,"highlightedDescription")}
              fullWidth
            />
          </Box>

          {/* Image Upload for Service */}
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Image</Typography>
            <ImageUpload
              file={content.image}
              handleFileDrop={(e) => handleFileDrop(e,'highlightedImage')}
              hanldeFileUpload={(e) => handleFileUpload(e,'highlightedImage')}
            />
          </Box>


        </Box>
  )
}

export default HighlightedReviewInputs
