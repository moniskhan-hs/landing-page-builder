/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Box, Radio, Stack, TextField, Typography } from "@mui/material";
import { SliderPicker } from "react-color";
import { iconsData } from "../../../../utils/data";

const IconStyle = ({iconColor,setIconColor,setSelectedIconType,iconBackground,selectedIconType,setIconBackground}) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="inputlabel"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "bold",
          bgcolor: "#fff",
          borderRadius: "5px",
          padding: "0.23rem 0.6rem",
          mt: 4,
        }}
      >
        Icon Styles
      </Typography>

      <Stack direction={"row"}>
        <Typography
          variant="subtitle1"
          sx={{
            placeSelf: "end",
          }}
        >
          Icon Color
        </Typography>
        <Stack
          sx={{
            width: "30%",
            marginLeft: "auto",
          }}
        >
          <Typography variant="subtitle1">HEX / RGB</Typography>
          <TextField
            placeholder="color"
            size="small"
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
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

      <SliderPicker
        color={iconColor}
        onChangeComplete={(color) => setIconColor(color.hex)}
      />

      <Typography variant="subtitle1">Icon Type</Typography>

      <Stack
        direction="row"
        mb={2}
        gap={2}
        sx={{ justifyContent: "space-evenly" }}
      >
        {iconsData.map((ele, index) => (
          <Box
            key={index}
            sx={{ textAlign: "center", cursor: "pointer" }}
            onClick={() => setSelectedIconType(ele.type)}
          >
            <Typography variant="subtitle1" sx={{
              textTransform:"capitalize"
            }}>{ele.type}</Typography>
            <Stack
              variant="center"
              sx={{
                width: "3rem",
                height: "3rem",
                bgcolor: iconBackground,
                borderRadius: ele.radius,
                mx: "auto",
                border:
                  selectedIconType === ele.type
                    ? `2px solid ${theme.palette.primary.main}`
                    : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ele.icon sx={{ color: iconColor }} />
            </Stack>
            <Radio
              checked={selectedIconType === ele.type}
              onChange={() => setSelectedIconType(ele.type)}
              sx={{ mt: 0.5 }}
            />
          </Box>
        ))}
      </Stack>

      <Stack direction={"row"}>
        <Typography
          variant="subtitle1"
          sx={{
            placeSelf: "end",
          }}
        >
          Background
        </Typography>
        <Stack
          sx={{
            width: "30%",
            marginLeft: "auto",
          }}
        >
          <Typography variant="subtitle1">HEX / RGB</Typography>
          <TextField
            placeholder="color"
            size="small"
            value={iconBackground}
            onChange={(e) => setIconBackground(e.target.value)}
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

      <SliderPicker
        color={iconBackground}
        onChangeComplete={(color) => setIconBackground(color.hex)}
      />
    </Box>
  );
};

export default IconStyle;
