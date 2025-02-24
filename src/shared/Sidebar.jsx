import { Add } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addMultiple } from "../redux/reducers/addMultiComponenet";
import {
  addAbout,
  addBenefit,
  addFAQ,
  addHero,
  addService,
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
              file: null,
              infoText: "",
              title: "",
              value: "image",
              scheduleAdded: false,
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
                },
              ],
            },
          })
        );
        break;
      case 'FAQ':
        dispatch(
          addFAQ({
            id,
            content: {
              title: "",
              image:null,
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
        label: "",
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
