import { Add } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addMultiple } from "../redux/reducers/addMultiComponenet";
import { addMultipleFromSectionState } from "../redux/reducers/sectionsState";
import {
  addAbout,
  addBenefit,
  addCallToAction,
  addFAQ,
  addForm,
  addHero,
  addIncludedAndNotIncluded,
  addService,
  addTestimonials,
} from "../redux/reducers/universalStyles";

const Sidebar = () => {
  const theme = useTheme();
  const menuItemsState = useSelector((state) => state.sidebarMenuReducer);
  const dispatch = useDispatch();

  const handleAddState = (ele) => {
    const id = Date.now();
    switch (ele.title) {
      case "HERO":
        dispatch(
          addHero({
            id,
            content: {
              buttonText: "",
              description: "",
              embededLink: "",
              downloadURL: null,
              infoText: "",
              title: "",
              value: "image",
              scheduleAdded: false,
              scheduleData: [
                {
                  labelText: "eg, TIME",
                  infoText: "03:15 PM",
                  image: null, // icon in future
                },
              ],
            },
          })
        );
        break;
      case "SERVICES":
        dispatch(
          addService({
            id,
            content: {
              title: "Services you are offering",
              services: [
                {
                  heading: "some heading",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
                  image: null,
                  id: 123654789,
                },
              ],
            },
          })
        );
        break;
      case "BENEFITS":
        dispatch(
          addBenefit({
            id,
            content: {
              title: "Benefits title",
              optionalText: "optionalText",
              benefits: [
                {
                  infoText:
                    "some informations text Lorem ipsum dolor sit amet consectetur",
                  image: null,
                  id: 44444444,
                },
              ],
            },
          })
        );

        break;
      case "ABOUT US":
        dispatch(
          addAbout({
            id,
            content: {
              title: "",
              abouts: [
                {
                  heading: "some heading",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
                  image: null,
                  id: 66666666,
                },
              ],
            },
          })
        );
        break;
      case "FAQ":
        dispatch(
          addFAQ({
            id,
            content: {
              title: "",
              image: null,
              fAndq: [
                {
                  question: "some question",
                  answer:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
                },
              ],
            },
          })
        );
        break;
      case "INCLUDED / NOT-INCLUDED":
        dispatch(
          addIncludedAndNotIncluded({
            id,
            content: {
              title: "Some title",
              infoText: "some information text here",
              includes: [
                {
                  heading: "some question",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
                  image: null,
                  id: 55555555,
                },
              ],
            },
          })
        );
        break;
      case "TESTIMONIALS":
        dispatch(
          addTestimonials({
            id,
            content: {
              title: "Some title",
              infoText: "some information text here",
              highlightedReview: {
                name: "John wick",
                address: "New York, US",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
                image: null,
                ratingValue: 4,
              },

              users: [
                {
                  name: "some question",
                  address: "New York, US",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
                  image: null,
                  ratingValue: 4,
                  id: 33333333,
                },
              ],
            },
          })
        );
        break;
      case "CALL TO ACTION":
        dispatch(
          addCallToAction({
            id,
            content: {
              title: "Some title",
              information: [
                {
                  text: "some information provided",
                  // icon : icon Name - [in future]
                },
              ],
              buttonText: "",
              advantages: [
                {
                  text: "some advantage provided",
                  // icon : icon Name - [in future]
                },
              ],
              infoText: "some information text here",
            },
          })
        );
        break;
      case "FORM":
        dispatch(
          addForm({
            id,
            content: {
              title: "Some title",
              buttonText: "Click me",
              description:
                "[optional] Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quas nobis saepe adipisci ratione iusto nisi voluptas dolor facere deserunt impedit eius quasi placeat non, soluta cupiditate tempore voluptates alias!",
              termsAndConditions:
                "[optional] Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quas nobis saepe adipisci ratione iusto nisi voluptas dolor facere deserunt impedit eius quasi placeat non, soluta cupiditate tempore voluptates alias!",
               
              radioTitle:'eg, Please choose your gender',
              radioDirection:"row",
              checkboxesTitle:'eg, Please Choose one or more"',
              checkboxesDirection:"row",
                inputs: [
                {
                  labelText: "some label text",
                  placeholderText: "place holder text.....",
                  type: "text", // selection box
                  makeItFull:false // boolean
              
                },
              ],
              radioButtons: [
                {
                  label: "Male",
                },
                {
                  label: "Female",
                },
              ],

              multiChecked:[
                {
                  label: "Select 1",
                },
                {
                  label: "Select 2",
                },
              ]




            },
          })
        );
        break;

      default:
        dispatch(
          addHero({
            id,
            content: {
              buttonText: "",
              description: "",
              embededLink: "",
              file: null,
              infoText: "",
              title: "",
              value: "image",
              scheduleAdded: false,
            },
          })
        );
        break;
    }

    dispatch(
      addMultiple({
        id,
        label: ele.title === "HERO" ? "Home" : "",
        title: ele.title,
        isSelected: true,
      })
    );
    dispatch(
      addMultipleFromSectionState({
        id,
        label: ele.title === "HERO" ? "Home" : "",
        title: ele.title,
        isSelected: true,
      })
    );
  };

  return (
    <section
      style={{
        padding: "1.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100vh",
      }}
    >
      {/* ----------------------------------logo---------------------- */}
      <Box>
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: "100%",
          }}
        />
      </Box>

      {/* ------------------------------- menu---------------------------- */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 3,
        }}
      >
        {menuItemsState.map((ele, index) => (
          <Stack
            direction={"row"}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              paddingLeft: 1,
              backgroundColor: ele.isSelected
                ? theme.palette.secondary.light
                : "#ffffff",
            }}
          >
            <Box
              sx={{
                marginRight: "auto",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: ele.isSelected
                    ? theme.palette.primary.main
                    : "#000000",
                }}
              >
                {ele.title}
              </Typography>
            </Box>

            <IconButton onClick={() => handleAddState(ele)}>
              <Add
                sx={{
                  color: theme.palette.primary.main,
                }}
              ></Add>
            </IconButton>
          </Stack>
        ))}
      </Box>
    </section>
  );
};

export default Sidebar;
