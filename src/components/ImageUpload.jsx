/* eslint-disable react/prop-types */
import { CloudUpload } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

const ImageUpload = ({ file, handleFileDrop, hanldeFileUpload }) => {
    return (
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
                    onChange={hanldeFileUpload}
                    accept="image/*"
                />
            </Box>


            {file && (
                <Typography variant="subtitle2" sx={{
                    border: '1px solid',
                    padding: '0.5rem 0.7rem',
                }}>
                    file selected: {file.name}
                </Typography>
            )}

        </Box>
    )
}

export default ImageUpload
