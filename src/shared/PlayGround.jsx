import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreviewContainer from "../components/PreviewContainer";
import SelectorSection from "../components/SelectorSection";
import SharableContentbar from "../components/SharableContentbar";
import { changeInSectionState } from "../redux/reducers/sectionsState";
import CustColorPicker from "../components/CustColorPicker";

const PlayGround = () => {
  const theme = useTheme();
  // const menuItemsState = useSelector((state) => state.sidebarMenuReducer);
  const menuItemsState = useSelector((state) => state.addMultiComponentReducer);

  const [selectedComponents, setSelectedComponents] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    const updatedSelected = menuItemsState.filter((ele) => ele.isSelected);
    setSelectedComponents(updatedSelected);
    console.log('updatedSelected:', updatedSelected)
    dispatch(changeInSectionState(updatedSelected));

  }, [menuItemsState]);

  const [draggedIndex, setDraggedIndex] = useState(null);



  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    // Create a copy of the array
    const newComponents = [...selectedComponents];

    // Swap the dragged and target elements
    const draggedItem = newComponents.splice(draggedIndex, 1)[0];
    newComponents.splice(index, 0, draggedItem);

    // Update the state --- need to persist the state in [REDUX PERSIST]
    setSelectedComponents(newComponents);
    dispatch(changeInSectionState(newComponents));
    console.log('newComponents:', newComponents)
    setDraggedIndex(null);

  };


  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap: '1rem',
      }}
    >
      <Box
        sx={{
          width: "29%",
          height: "100%",
          // bgcolor: 'purple',
          padding: "1rem 0.7rem",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          borderRight: `1px solid ${theme.palette.text.secondary}`

        }}
      >

        {/* ------------------------------------------ Theme selections space--------------------------------------------- */}

        <Box>
          <SelectorSection key={1215} oldLabelValue={''} id={1215} title={'THEME'} handleDragOver={()=>{}} handleDragStart={()=>{}} handleDrop={()=>{}} isDragged={false} index={1215} />
        </Box>


        <Box >
          {/* -------------------------------- each section of selector [should be map here]---------------------- */}
          {selectedComponents.length == 0 ? (
            <Stack
              variant="center"
              sx={{
                height: "5rem",
                border: `1px solid ${theme.palette.primary.light}`,
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.text.disabled,
                }}
              >
                Selected Components will be shown here
              </Typography>
            </Stack>
          ) : (
            selectedComponents.map((ele, index) => (
              <SelectorSection key={index} oldLabelValue={ele.label} id={ele.id} title={ele.title} handleDragOver={handleDragOver} handleDragStart={handleDragStart} handleDrop={handleDrop} isDragged={true} index={index} />
            ))
          )}

          {/* -------------------------------- Save and Apply Button---------------------- */}
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
              }}
            >
              Save And Apply
            </Button>
          </Box>

        </Box>






      </Box>

      {/* ----------------------------------------Preview Section---------------------------------- */}
      <Box
        sx={{
          width: "69%",
          height: "100%",
          // bgcolor: 'red'
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* ---------------------------------- Copy and Share bar----------------------------- */}
          <SharableContentbar />
          {/* ---------------------------------- In Preview Component------------------------------------- */}

          <PreviewContainer />
        </Stack>
      </Box>
    </div>
  );
};

export default PlayGround;
