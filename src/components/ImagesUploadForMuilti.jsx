/* eslint-disable react/prop-types */
import { CloudUpload, Delete } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeServicesListImage } from '../redux/reducers/universalStyles';
import { deleteImageFromFirebaseStorage } from '../utils/imageupload/deleteImageFromFirebaseStorage';
import { uploadImageOnFirebaseStorage } from '../utils/imageupload/firebase-storage-upload';

const ImagesUploadForMultiple = ({ downloadURL, id, componentId}) => {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('')
    const theme = useTheme()
    const dispatch = useDispatch()
    
    // Define your websiteId (can be dynamic as needed)
    const websiteId = "my-website";

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file.name)
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            try {
                setLoading(true);
                // make sure to delete the previous image
            //    await deleteImageFromFirebaseStorage(websiteId, id)
                // Upload the image with compression
                const downloadURL = await uploadImageOnFirebaseStorage(
                    base64Image,
                    websiteId,
                    componentId //id as unique file name
                );
                // Save upload details in state
                dispatch(
                    changeServicesListImage({ id, componentId, content: downloadURL})
                  );
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setLoading(false);
            }
        };
    };

    const handleFileUpload = (e) => {
        handleFileChange(e);
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        handleFileChange(e);
    };



    // Handle deletion of the uploaded image
    const handleDelete = async (id) => {
        if (!id) return;
        try {
            setLoading(true);
            await deleteImageFromFirebaseStorage(websiteId, componentId)
            // id as uniquefile name);
            // Clear the upload details after successful deletion
            dispatch(
                changeServicesListImage({ id, componentId, content: null })
              );

        } catch (error) {
            console.error("Deletion failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <>
            {downloadURL  ? (
                <Stack variant= 'center' sx={{ marginTop: "1rem", display: "flex", alignItems: "center",bgcolor:theme.palette.background.paper,padding:"0.5rem" }}>
                    <span>{fileName || id}</span>
                    <IconButton
                        onClick={handleDelete}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            marginLeft: "auto",
                            color: "red",
                        }}
                        title="Delete Image"
                    >
                        <Delete />
                    </IconButton>
                </Stack>
            ) :
             <Box
                // elevation={3}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                sx={{
                    p: 1,
                    textAlign: "center",
                    borderRadius: "8px",
                    "&:hover": { borderColor: "primary.main" },
                    width: "70%",
                    // mx: 'auto',
                    bgcolor: '#f8f9fa',
                    border: "2px dashed #ccc",
                }}
            >
                <CloudUpload sx={{
                    color: "#6c757d",
                    width: "3rem",
                    height: "2rem",
                    mx: "auto"
                }} />

                <Box sx={{
                    position: "relative",


                }}>
                    <label htmlFor="file-upload">
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
                        id="file-upload"
                        type="file"
                        style={{
                            display: "none", // Hide but still clickable via label
                        }}
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
                </Box>


                {loading && (
                    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}>
                        <CircularProgress size={24} />
                        <span style={{ marginLeft: "0.5rem" }}>Processing...</span>
                    </div>
                )}



            </Box>
            
            
            }
        </>


    )
}

export default ImagesUploadForMultiple
