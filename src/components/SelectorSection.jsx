/* eslint-disable react/prop-types */
import {
  Check,
  DragIndicator,
  Edit,
  OpenInFull,
  Remove,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLabelInMultiReducer,
  removeComponent,
} from "../redux/reducers/addMultiComponenet";
import { addLabel, removeComponentFromSection } from "../redux/reducers/sectionsState";
import { addSelectedComponent } from "../redux/reducers/selectedComponent";
import {
  removeAbout,
  removeBenefit,
  removeCallToAction,
  removeFAQ,
  removeForm,
  removeHero,
  removeIncludedNotIncluded,
  removeService,
  removeTestimonials,
} from "../redux/reducers/universalStyles";
import { componentsInputs } from "../utils/constants";
import { setExpandedBoxId } from "../redux/reducers/boxExpander";

const SelectorSection = ({
  id,
  title,
  oldLabelValue,
  handleDragOver,
  handleDragStart,
  handleDrop,
  isDragged,
  index,
  
}) => {
  const dispatch = useDispatch();
  const {expandedBoxId} = useSelector((state) => state.boxExpandReducer);
  const isExpanded = expandedBoxId === id;
  const [addLableIsActive, setAddLableIsActive] = useState(true);
  console.log('oldLabelValue:', oldLabelValue)
  const theme = useTheme();
  // const dispatch = useDispatch();

  const handleToAddLabel = () => {
    // -------------- Need to persist the  lable of associated component
    setAddLableIsActive(true);

 
  };

  const hanldeRemove = (id) => {
    console.log("deleted id------------------------------------------:", id);
    dispatch(removeComponent(id));
    dispatch(removeComponentFromSection(id))
    switch (title) {
      case "HERO":
        dispatch(removeHero(id));

        break;
      case "TESTIMONIALS":
        dispatch(removeTestimonials(id));
        break;

      case "SERVICES":
        dispatch(removeService(id));

        break;
      case "BENEFITS":
        dispatch(removeBenefit(id));

        break;
      case "ABOUT US":
        dispatch(removeAbout(id));
        break;
      case "FAQ":
        dispatch(removeFAQ(id));
        break;
      case "INCLUDED / NOT-INCLUDED":
        dispatch(removeIncludedNotIncluded(id));
        break;
      case "CALL TO ACTION":
        dispatch(removeCallToAction(id));
        break;
      case "FORM":
        dispatch(removeForm(id));
        break;
      default:
        dispatch(removeComponent(id));
        break;
    }
  };


  useEffect(() => {
    if (isExpanded && title !== "THEME") {
      dispatch(addSelectedComponent({ id, name: title }));
      console.log('title:', title)
    }
  }, [isExpanded, title, dispatch, id]);

  return (
    <Stack
      direction={"row"}
      sx={{
        gap: "0.2rem",
        my: 1,
      }}
    >
      <Box
        sx={{
          flex: 1,
          border: isExpanded
            ? `2px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.primary.light}`,
          borderRadius: "8px",
          height: isExpanded ? "50vh" : "2.5rem",
          transition: "height 0.3s ease-in-out",
          overflow: isExpanded ? "scroll" : "hidden",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "0.2rem",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#fa7d26",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#757575",
          },
        }}
        draggable={isDragged}
        onDragStart={() => handleDragStart(index)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(index)}
      >
        <Stack direction={"row"}>
          <Box
            sx={{
              mr: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {title !== "THEME" && (
              <DragIndicator
                sx={{
                  color: theme.palette.text.disabled,
                  cursor: "grab",
                }}
              />
            )}

            <Typography
              variant="subtitle1"
              ml={1}
              sx={{
                color: isExpanded ? theme.palette.primary.main : "#00000",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: "0.8rem",


              }}
            >
              {title}
            </Typography>
            {title !== "THEME" ? (
              <Typography mx={1}>/</Typography>
            ) : (
              <Typography variant="subtitle1" mx={1} sx={{

                background: "linear-gradient(45deg,rgb(225, 121, 16),rgb(228, 57, 102))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",

              }}>
                Customize your theme
              </Typography>
            )}

            {title !== "THEME" && (
              <Box>
                {addLableIsActive ? (
                  <Stack variant="center">
                    <Typography
                      variant="truncateText"
                      mx={1}
                      title={oldLabelValue}
                      sx={{
                        width: "80%",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {oldLabelValue !== "" ? oldLabelValue : "Add label"}
                    </Typography>
                    <IconButton onClick={() => setAddLableIsActive(false)}>
                      <Edit
                        sx={{
                          color: theme.palette.text.secondary,
                          fontSize: "1.2rem",
                        }}
                      />
                    </IconButton>
                  </Stack>
                ) : (
                  <Stack variant="center">
                    <TextField
                      placeholder="Add label"
                      variant="standard"
                      onChange={(e) =>{
                        dispatch(addLabel({id, title: title, labelValue: e.target.value }));
                        dispatch(addLabelInMultiReducer({id, title: title, labelValue: e.target.value }));
                      }}
                      value={oldLabelValue}
                      sx={{
                        mx: 1,
                        "& .MuiInputBase-root": {
                          height: "1.5rem", // Adjust height here
                        },
                      }}
                    />

                    <Stack
                      variant="center"
                      onClick={handleToAddLabel}
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        width: "1.5rem",
                        aspectRatio: "1",
                        cursor: "pointer",
                      }}
                    >
                      <Check
                        sx={{
                          color: theme.palette.primary.contrastText,
                          fontSize: "1.2rem",
                        }}
                      />
                    </Stack>
                  </Stack>
                )}
              </Box>
            )}
          </Box>

          <IconButton
            sx={{
              color: theme.palette.primary.main,
            }}
            onClick={() => {
              if (expandedBoxId === id) {
                dispatch(setExpandedBoxId(null));
              } else {
                dispatch(setExpandedBoxId(id));
              }
            }}
          >
            <OpenInFull />
          </IconButton>
        </Stack>

        {/* ----------------------- Input field based on the title  selected */}
        <Box
          sx={{
            overflowY: "auto",
          }}
        >
          {componentsInputs.map((ele, index) => {
            const Component = ele[title];
            return Component ? (
              <Component key={index} id={id} title={title} />
            ) : null;
          })}
        </Box>
      </Box>

      {title !== "THEME" && (
        <Box
          sx={{
            // flex:1,
            height: isExpanded ? "50vh" : "2.5rem",
            transition: "height 0.3s ease-in-out",
            overflow: isExpanded ? "scroll" : "hidden",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              width: "0.2rem",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#fa7d26",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#757575",
            },
            display: "flex",
            // alignItems: 'center'
          }}
        >
          <Stack
            variant="center"
            sx={{
              borderRadius: "8px",
              // border: `1px solid ${theme.palette.primary.light}`,
              height: "2.5rem",
              position: "sticky",
              bgcolor: theme.palette.error.main,
            }}
            onClick={() => hanldeRemove(id)}
          >
            <Remove
              sx={{
                color: theme.palette.primary.contrastText,
                cursor: "pointer",
              }}
            ></Remove>
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default SelectorSection;
