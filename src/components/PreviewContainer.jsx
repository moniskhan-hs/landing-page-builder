/* eslint-disable react/prop-types */
import { Add } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { chooseRenderComponent } from "../utils/constants";
import NoSelectedPreview from "./NoSelectedPreview";

const PreviewContainer = ({ isFullPreviewed }) => {
  const previewComponents = useSelector((state) => state.sectionStateReducer);
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const theme = useTheme();
  const { id: selectedComponentId, name } = useSelector(
    (state) => state.selectedComponentReducer
  );

  return (
    <Box
      sx={{
        // width:'100%',
        border: "1px solid red",
        // bgcolor:'red',
        height: "88vh",
        width: "59vw",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          // height:'50%',
          height: "100%",
          padding: "1rem",
          overflowX: "scroll",
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {/* -------------------------------- to render based on the state of selection sections------------------------------------------- */}
        {previewComponents.length == 0 ? (
          <Stack
            variant="center"
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.text.disabled,
                fontSize: "1.6rem",
              }}
            >
              No component is in preview
            </Typography>

            <Stack
              variant={"center"}
              sx={{
                color: theme.palette.text.disabled,
              }}
            >
              Click{" "}
              <Add
                sx={{
                  color: theme.palette.primary.main,
                }}
              ></Add>{" "}
              to Add
            </Stack>
          </Stack>
        ) : // ---------------------------------- Components render in for preview------------------------------------------------
        isFullPreviewed ? (
          previewComponents.map((ele, index) => {
            const Component = chooseRenderComponent(ele.title);
            console.log("Component Name in preview:", ele.title);
            let selectedComponent;

            switch (ele.title) {
              case "HERO":
                selectedComponent = componentsValue.hero;
                break;
              case "SERVICES":
                selectedComponent = componentsValue.services;
                break;
              case "BENEFITS":
                selectedComponent = componentsValue.benefits;
                break;
                case "TESTIMONIALS":
                  selectedComponent = componentsValue.testimonials;
                  break;
                  case "INCLUDED / NOT-INCLUDED":
                    selectedComponent = componentsValue.includedNotIncluded;
                    break;
              case "ABOUT US":
                selectedComponent = componentsValue.about;
                break;
              case "FAQ":
                selectedComponent = componentsValue.frequentlyAsked;
                break;
              
              case "CALL TO ACTION":
                selectedComponent = componentsValue.callToAction;
                break;
              
              


              default:
                selectedComponent = componentsValue.hero;

                break;
            }
            console.log("selectedComponent:", selectedComponent);
            const dataToSend = selectedComponent.find(
              (data) => data.id === ele.id
            );
            console.log("dataToSend:", dataToSend);
            if (dataToSend == undefined)
              return <NoSelectedPreview key={index} theme={theme} />;
            return Component && dataToSend ? (
              <Component key={index} id={ele.id} data={dataToSend} />
            ) : null;
          })
        ) : selectedComponentId == null ? (
          <NoSelectedPreview theme={theme} />
        ) : (
          // ------------------------Show only selected COmponent---------------

          previewComponents.map((ele, index) => {
            if (ele.title == name && ele.id == selectedComponentId) {
              const Component = chooseRenderComponent(name);
              console.log("Selected Component Name", name);
              let selectedComponent;
              switch (name) {
                case "HERO":
                  selectedComponent = componentsValue.hero;
                  break;
                case "SERVICES":
                  selectedComponent = componentsValue.services;
                  break;
                case "BENEFITS":
                  selectedComponent = componentsValue.benefits;
                  break;
                  case "TESTIMONIALS":
                    selectedComponent = componentsValue.testimonials;
                    break;
                case "ABOUT US":
                  selectedComponent = componentsValue.about;
                  break;
                case "FAQ":
                  selectedComponent = componentsValue.frequentlyAsked;
                  break;
                  case "INCLUDED / NOT-INCLUDED":
                    selectedComponent = componentsValue.includedNotIncluded;
                    break;
                  case "CALL TO ACTION":
                    selectedComponent = componentsValue.callToAction;
                    break;
                default:
                  selectedComponent = componentsValue.hero;
                break;
              }
              console.log("selectedComponent:", selectedComponent);
              const dataToSend = selectedComponent.find(
                (data) => data.id === ele.id
              );
              console.log("dataToSend:", dataToSend);
              if (dataToSend == undefined)
                return <NoSelectedPreview key={index} theme={theme} />;
              return Component && dataToSend ? (
                <Component key={index} id={ele.id} data={dataToSend} />
              ) : null;
            }
          })
        )}
      </Box>
    </Box>
  );
};

export default PreviewContainer;
