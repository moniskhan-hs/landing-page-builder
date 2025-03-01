import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PreviewContainer from "../components/PreviewContainer";
import SaveAndApplyButton from "../components/SaveAndApplyButton";
import SelectorSection from "../components/SelectorSection";
import SharableContentbar from "../components/SharableContentbar";
import { changeInMultiState } from "../redux/reducers/addMultiComponenet";
import { changeInSectionState } from "../redux/reducers/sectionsState";

const PlayGround = () => {
  const theme = useTheme();
  //TODO ----------- If something will happen related to the 
  //TODO            ordring of selected sections then undo the commented line a 
  // const menuItemsState = useSelector((state) => state.addMultiComponentReducer);
  const menuItemsState = useSelector((state) => state.sectionStateReducer);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const dispatch = useDispatch()
  const [isFullPreviewed, setIsFullPreviewed] = useState(false)

  useEffect(() => {
    const updatedSelected = menuItemsState.filter((ele) => ele.isSelected);
    console.log('menuItemsState:', menuItemsState)
    setSelectedComponents(updatedSelected);
    console.log('updatedSelected:', updatedSelected)
    dispatch(changeInMultiState(updatedSelected));
  }, [menuItemsState, dispatch]);
  // }, [dispatch]);


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
          <SelectorSection key={1215} oldLabelValue={''} id={1215} title={'THEME'} handleDragOver={() => { }} handleDragStart={() => { }} handleDrop={() => { }} isDragged={false} index={1215} />
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
                Selected sections will be shown here
              </Typography>
            </Stack>
          ) : (
            selectedComponents.map((ele, index) => (
              <SelectorSection key={index} oldLabelValue={ele.label} id={ele.id} title={ele.title} handleDragOver={handleDragOver} handleDragStart={handleDragStart} handleDrop={handleDrop} isDragged={true} index={index} isFullPreviewed={isFullPreviewed} />
            ))
          )}

          {/* -------------------------------- Save and Apply Button---------------------- */}

          <SaveAndApplyButton />



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
          <SharableContentbar hanldeFullPreviewed={() => setIsFullPreviewed((pre) => !pre)} isFullPreviewed={isFullPreviewed} />
          {/* ---------------------------------- In Preview Component------------------------------------- */}

          <PreviewContainer isFullPreviewed={isFullPreviewed} />
        </Stack>
      </Box>
    </div>
  );
};

export default PlayGround;
