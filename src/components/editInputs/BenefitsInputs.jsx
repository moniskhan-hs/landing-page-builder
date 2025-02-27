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
  addBenefitsItem,
  changeBenefitListImage,
  changeBenefits,
  changeBenefitsList,
  removeBenefitItem,
} from "../../redux/reducers/universalStyles";
import { uploadImageOnFirebaseStorageServices } from "../../utils/imageupload/firebase-storage-upload";

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

// ------------------------ image upload and delete logic--------------------------------
const handleBenefitImageChange = (e, serviceId) => {
  handleFileChange(e, serviceId);
};

const handleBenefitImageDrop = (e, serviceId) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) handleFileChange({ target: { files: [file] } }, serviceId);
};

const handleFileChange = async (e, benefitId) => {
  const websiteId = `mywebsite`;
  const file = e.target.files[0];
  if (!file || !benefitId) return;

  try {
    const downloadURL = await uploadImageOnFirebaseStorageServices(
      file,
      websiteId,
      `${benefitId}-${uuidv4()}` // Unique filename with service ID
    );

    dispatch(changeBenefitListImage({
      id,
      benefitId,
      content: downloadURL,
      field: 'image'
    }));
  } catch (error) {
    console.error("Upload failed:", error);
  }
};

// to delete the uploaded image
const handleDeleteImage = async (benefitId, imageUrl) => {
  if (!imageUrl) return;

  try {
    // Extract path from download URL
    const encodedPath = imageUrl.split('/o/')[1].split('?')[0];
    const decodedPath = decodeURIComponent(encodedPath);
    const imageRef = ref(storage, decodedPath);

    // Delete from Firebase Storage
    await deleteObject(imageRef);

    // Remove from Redux state
    dispatch(changeBenefitListImage({
      id,
      benefitId,
      content: null,
      field: 'image'
    }));
  } catch (error) {
    console.error("Error deleting image:", error);
    // Optionally show error to user
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
           {/* Image Upload for Service */}
                   <Box sx={{ mb: 1 }}>
                     <Typography variant="subtitle1">Image</Typography>
                     <Box
                       onDragOver={(e) => e.preventDefault()}
                       onDrop={(e) => handleBenefitImageDrop(e, benefit.id)}
                       sx={{     p: 1,
                         textAlign: "center",
                         borderRadius: "8px",
                         "&:hover": { borderColor: "primary.main" },
                         width: "70%",
                         // mx: 'auto',
                         bgcolor: '#f8f9fa',
                         border: "2px dashed #ccc", }}
                     >
                       {benefit.image ? (
                         <>
                           <img
                             src={benefit.image}
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
                             onClick={() => handleDeleteImage(benefit.id, benefit.image)}
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
                             <label htmlFor={`file-upload-${benefit.id}`}>
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
                                 id={`file-upload-${benefit.id}`}
                                 type="file"
                                 style={{
                                     display: "none", // Hide but still clickable via label
                                 }}
                                 onChange={(e) => handleBenefitImageChange(e, benefit.id)}
                                 accept="image/*"
                             />
                         </Box>
         
                         </>
                       )}
                     </Box>
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
