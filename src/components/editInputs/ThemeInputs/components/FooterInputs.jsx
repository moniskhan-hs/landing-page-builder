/* eslint-disable react/prop-types */
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SliderPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { changeHeaderAndFooter } from "../../../../redux/reducers/universalStyles";



const FooterInputs = ({ theme }) => {
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const { theme: selectedTheme } = componentsValue;
  const dispatch = useDispatch();

  const [bgColor, setBgColor] = useState("#000");

  const changeBGcolor = (color) => {
    setBgColor(color.hex);
    dispatch(
      changeHeaderAndFooter({
        componentName: "footer",
        textName: "backgroundColor",
        data: color.hex,
      })
    );
  };

  const changeBgThrougtInput = (e)=>{
    setBgColor(e.target.value);
    dispatch(
      changeHeaderAndFooter({
        componentName: "footer",
        textName: "backgroundColor",
        data:e.target.value,
      })
    );
  }

  return (
    <Stack
      gap={1}
      sx={{
        ".MuiBox-root": {
          display: "flex",
          flexDirection: "column",
          gap: 1,
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "bold",
          bgcolor: "#fff",
          borderRadius: "5px",
          padding: " 0.23rem 0.6rem",
          mt: 2,
          width: "100%",
        }}
      >
        Footer
      </Typography>

      <Box
        sx={{
          padding: "0.5rem 0.5rem",
        }}
      >
        {/* Title  text Field */}
        <Box>
          <Typography variant="subtitle1">Name</Typography>
          <TextField
            name="name"
            placeholder="Enter Name"
            size="small"
            value={selectedTheme?.theme?.footer?.nameText}
            onChange={(e) =>
              dispatch(
                changeHeaderAndFooter({
                  componentName: "footer",
                  textName: "nameText",
                  data: e.target.value,
                })
              )
            }
          />
        </Box>

        {/* Copyright text Field */}
        <Box>
          <Typography variant="subtitle1">Copyright text</Typography>
          <TextField
            name="copyrigth"
            placeholder="Enter copy right text"
            size="small"
            value={selectedTheme?.theme?.footer?.copyrigthText}
            onChange={(e) =>
              dispatch(
                changeHeaderAndFooter({
                  componentName: "footer",
                  textName: "copyrigthText",
                  data: e.target.value,
                })
              )
            }
          />
        </Box>

        {/* Background color text Field */}

        <Box>
          <Typography variant="subtitle1">Background</Typography>
          <Stack direction={ 'row'}>
            <Stack variant = 'center'>
            <Box
            sx={{
              width: "3rem",
              height: "3rem",
              bgcolor: bgColor,
              borderRadius: "12px",
              // mx: "auto",
              border: `2px solid ${theme.palette.primary.main}`,
            }}
          />
            </Stack>
  
          <Stack
            sx={{
              marginLeft: "auto",
            }}
          >
            <Typography variant="subtitle1">HEX / RGB</Typography>
            <TextField
              placeholder="color"
              size="small"
              value={bgColor}
                onChange={(e) => changeBgThrougtInput(e)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#f9f9f9",
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.dark,
                  },
                },
              }}
            />
          </Stack>
          </Stack>
         

          <SliderPicker color={bgColor} onChangeComplete={changeBGcolor} />
        </Box>
      </Box>
    </Stack>
  );
};

export default FooterInputs;
