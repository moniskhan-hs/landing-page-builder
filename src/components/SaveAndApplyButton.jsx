import { Box, Button, CircularProgress, useTheme } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { setGeneratedWebsiteId } from '../redux/reducers/websiteId';

const SaveAndApplyButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const websiteData = useSelector((state) => state.universalThemeReducer, shallowEqual);
    const theme = useTheme();
    const sectionsPositions = useSelector((state) => state.sectionStateReducer);
    const addmultipleReducers = useSelector((state) => state.addMultiComponentReducer);
    console.log('addmultipleReducers:', addmultipleReducers)
    console.log('sectionsPositions:', sectionsPositions)

    const dispatch = useDispatch()

    const PostDataOnFirebase = async () => {
        if (!websiteData || isLoading) return;
        
        setIsLoading(true);
        try {
            const docRef = await addDoc(collection(db, "websites"), { 
                websiteData, 
                sectionsPositions 
            });
            dispatch(setGeneratedWebsiteId(docRef?.id))
            console.log("Document written with ID:", docRef.id);
        } catch (error) {
            console.error("Error adding document:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                my: 2,
            }}
        >
            <Button
                variant="outlined"
                sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "#fff",
                    textTransform: "none",
                    mx: "auto",
                    '&:disabled': {
                        bgcolor: theme.palette.action.disabledBackground,
                        color: theme.palette.action.disabled
                    }
                }}
                onClick={PostDataOnFirebase}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress 
                            size={24} 
                            sx={{ color: 'inherit' }} 
                        />
                        Saving...
                    </Box>
                ) : (
                    "Save And Apply"
                )}
            </Button>
        </Box>
    );
};

export default SaveAndApplyButton;