import { Box, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useSetComponentStyles from "../../hooks/useSetComponentStyles";
import { changeHero } from "../../redux/reducers/universalStyles";
import { websiteHeroStyles } from "../../styles/component/websiteTheme";
import ImageUpload from "../ImageUpload";

const HeroInputs = () => {
    const [file, setFile] = useState(null) // Image
    console.log('file:', file)
    const [value, setValue] = useState('image');   // toggle between image or embeded link
    const [title, setTitle] = useState('')
    console.log('title:', title)
    const [description, setDescription] = useState('')
    const [buttonText, setButtonText] = useState('')
    const [infoText, setInfoText] = useState('')
    const [embededLink, setEmbededLink] = useState('')
    console.log('value:', value)
    const [scheduleAdded, setScheduleAdded] = useState(false)

    const heroUpdates = {
        embededLink,
        infoText,
        buttonText,
        description,
        title,
        value,
        file,
        scheduleAdded
    }

    useSetComponentStyles({ updates: heroUpdates, targetedComponent: 'title', setHandler: changeHero });
    console.log('websiteHeroStyles:', websiteHeroStyles)



    //   ------------------------------- H A N D L E R S ----------------------------------
    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleFileDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0]; // Extract only one file
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleChange = (event) => {
        setValue((event.target).value);
    };

    // ----------------------------------- Toggle the values between the image and link values -----------------------------------------
    useEffect(() => {

        if (value == 'image') {
            setEmbededLink('')
        }

        if (value == 'link') {
            setFile(null)
        }
    }, [value])


    return (
        <Stack gap={1} sx={{
            padding: "0.5rem 0.5rem",
            '.MuiBox-root': {
                display: 'flex',
                flexDirection: 'column',
                gap: 1,

            }
        }}>
            {/* title */}
            <Box>
                <Typography variant="subtitle2">
                    Title
                </Typography>
                <TextField placeholder="Enter Title" size="small" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Box>
            {/* discripton */}
            <Box>
                <Typography variant="subtitle2">
                    Description
                </Typography>
                <textarea placeholder="Enter Description" value={description}
                    onChange={(e) => setDescription(e.target.value)}

                    style={{
                        background: "transparent",
                        borderRadius: "8px",
                        padding: "0.5rem 0.6rem",
                        fontSize: '1rem'
                    }} />
            </Box>
            {/* button text */}
            <Box>
                <Typography variant="subtitle2">
                    Button Text
                </Typography>
                <TextField placeholder="Enter Button Text" size="small" value={buttonText} onChange={(e => setButtonText(e.target.value))} />
            </Box>
            {/* optional below button text */}
            <Box>
                <Typography variant="subtitle2">
                    Info Text
                </Typography>
                <TextField placeholder="Enter Text" size="small" value={infoText} onChange={(e) => setInfoText(e.target.value)} />
            </Box>
            {/* image  */}
            <Box>
                <FormControl>
                    <Typography variant="subtitle2" >To Add</Typography>
                    <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        row                    >


                        <FormControlLabel value="image" control={<Radio />} label="Image" />
                        <FormControlLabel value="link" control={<Radio />} label="Embeded Link" />

                    </RadioGroup>
                </FormControl>
            </Box>

            {value === 'image' ? (

                // image upload 

                <Box >


                    <Typography variant="subtitle2">
                        Add Image
                    </Typography>

                    <ImageUpload file={file} handleFileDrop={handleFileDrop} hanldeFileUpload={handleFileUpload} />
                </Box>) : (
                // embeded video 

                <Box >
                    <Typography variant="subtitle2">
                        Add Embeded Link
                    </Typography>

                    <TextField placeholder="Embeded Video Link" size="small" value={embededLink} onChange={(e) => setEmbededLink(e.target.value)} />
                </Box>)

            }


            <Box>
                <Typography variant="subtitle2">
                    Schedule
                </Typography>
                <FormControlLabel required control={<Checkbox
                    checked={scheduleAdded}
                    onChange={(e) => setScheduleAdded(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />} label="Add schedule in my website" />

            </Box>
        </Stack>
    );
};

export default HeroInputs;
