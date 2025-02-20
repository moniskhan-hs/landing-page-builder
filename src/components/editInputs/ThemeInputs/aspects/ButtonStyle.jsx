/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { SliderPicker } from "react-color";

const ButtonStyle = ({
  buttonBackground,
  buttonTextColor,
  setButtonBackground,
  setBUttonTextColor,
}) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: "bold",
          bgcolor: "#fff",
          borderRadius: "5px",
          padding: " 0.23rem 0.6rem",
          mt: 4,
        }}
      >
        Button
      </Typography>

      <Box
        sx={{
          paddingInline: "0.5rem",
        }}
      >
        <Button
          variant="customButton"
          sx={{
            backgroundColor: buttonBackground,
            color: buttonTextColor,
            mx: "auto",
          }}
        >
          Text
        </Button>

        {/* ------------------------------------ Components name + input color textfield + labe------------------------------------------------------- */}
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
            <Typography variant="subtitle1">hex/rgb</Typography>
            <TextField
              placeholder="color"
              size="small"
              value={buttonBackground}
              onChange={(e) => setButtonBackground(e.target.value)}
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
          onChangeComplete={(color) => setButtonBackground(color.hex)}
          color={buttonBackground}
        />

        {/* ------------------------------------------- Button Text---------------------------------- */}

        <Stack direction={"row"}>
          <Typography
            variant="subtitle1"
            sx={{
              placeSelf: "end",
            }}
          >
            Text Color
          </Typography>
          <Stack
            sx={{
              width: "30%",
              marginLeft: "auto",
            }}
          >
            <Typography variant="subtitle1">hex/rgb</Typography>
            <TextField
              placeholder="color"
              size="small"
              value={buttonTextColor}
              onChange={(e) => setBUttonTextColor(e.target.value)}
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
          onChangeComplete={(color) => setBUttonTextColor(color.hex)}
          color={buttonTextColor}
        />
      </Box>
    </Box>
  );
};

export default ButtonStyle;
