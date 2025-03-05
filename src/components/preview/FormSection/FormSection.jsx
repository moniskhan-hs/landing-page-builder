/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Radio,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import FormTermAndPrivacyDialog from "./FormTermAndPrivacyDialog";

const FormSection = ({ data = {}, isFetchedTheme, fetchingThemeData }) => {
  const theme = useTheme();
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const { theme: selectedTheme } = componentsValue;
  const [checked, setChecked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [radioValue, setValueRadio] = useState("");
  const [checkedValues, setCheckedValues] = useState([]);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  const handleChangeRadio = (event) => {
    const value = event.target.value;
    setValueRadio(value);
  };

  const handleChangeCheckbox = (event, label) => {
    if (event.target.checked) {
      // Add the label to the array
      setCheckedValues((prev) => [...prev, label]);
    } else {
      // Remove the label from the array
      setCheckedValues((prev) => prev.filter((val) => val !== label));
    }
  };
  return (
    <Stack
      sx={{
        width: isFetchedTheme ? "100%" : "100vw",
        borderRadius: "12px",
        padding: {
          md: isFetchedTheme ? "3rem 2rem" : "3rem 10rem",
          xs: "1rem",
        },
        bgcolor: isFetchedTheme
          ? fetchingThemeData?.background.section
          : selectedTheme.background.section ||
            theme.palette.background.section,
        mt: 5,
      }}
    >
      {/* Main content container */}
      <Box
        sx={{
          bgcolor: isFetchedTheme
            ? fetchingThemeData?.background.paper
            : selectedTheme.background.paper || theme.palette.background.paper,

          padding: { md: "3rem 16rem", xs: "1rem" },
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h3"
          mb={5}
          sx={{
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            color: isFetchedTheme
              ? fetchingThemeData?.typography.subTitleColor
              : selectedTheme.typography.subTitleColor,
          }}
        >
          {data?.content?.title || "Some title here"}
        </Typography>

        <form>
          {/* Render text fields two per row */}

          <Box sx={{ flexGrow: 1,mb:4 }} >
            <Grid container spacing={2}>
              {data?.content?.inputs.map((field, idx) => (
                <Grid item xs={field.makeItFull==true?12:6}  key={field.id || idx}>
                  <Stack gap={1}>
                    <Typography variant="subtitle2" ml={"0.2rem"}>
                      {field.labelText}
                    </Typography>
                    <TextField
                      placeholder={field.placeholderText}
                      fullWidth
                      size="small"
                      type={field.type}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "30px",
                          border: `1px solid ${theme.palette.primary.main}`,
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        },
                      }}
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* {chunk.map((field, idx) => (
            
          ))} */}
          {/* ----------------------------------------- Radio buttons----------------------------------- */}
          <Typography variant="subtitle2" ml={"0.2rem"}>
            {data?.content?.radioTitle || "Choose a gender"}
          </Typography>
          {/* ----------------------- Direction should be dynamic---------------------------- */}
          <Stack direction={data?.content?.radioDirection} mb={3}>
            {data?.content?.radioButtons?.map((ele, index) => (
              <Stack
                direction={"row"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                key={ele.id || index}
              >
                <Radio
                  value={ele.label}
                  checked={radioValue === ele.label}
                  onChange={handleChangeRadio}
                />
                <Typography variant="subtitle1">{ele.label}</Typography>
              </Stack>
            ))}
          </Stack>
          {/* ----------------------------------------- Checkbox----------------------------------- */}
          <Typography variant="subtitle2" ml={"0.2rem"}>
            {data?.content?.checkboxesTitle || "Choose one or more"}
          </Typography>
          {/* ----------------------- Direction should be dynamic---------------------------- */}
          <Stack direction={data?.content?.checkboxesDirection} mb={3}>
            {data?.content?.multiChecked?.map((ele, index) => (
              <Stack
                direction="row"
                sx={{ display: "flex", alignItems: "center" }}
                key={ele.id || index}
              >
                <Checkbox
                  checked={checkedValues.includes(ele.label)}
                  onChange={(event) => handleChangeCheckbox(event, ele.label)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography variant="subtitle1">{ele.label}</Typography>
              </Stack>
            ))}
          </Stack>

          {/* Term and Conditions */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="subtitle1"
              color={
                isFetchedTheme
                  ? fetchingThemeData?.typography.paragraphColor
                  : selectedTheme.typography.paragraphColor
              }
            >
              {data?.content?.description ||
                "[optional] Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quas nobis saepe adipisci ratione iusto nisi voluptas dolor facere deserunt impedit eius quasi placeat non, soluta cupiditate tempore voluptates alias! "}
            </Typography>
          </Box>
          {/* Term and Conditions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              mt: 5,
            }}
          >
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              sx={{
                position: "absolute",
                left: "-2%",
                bottom: { xs: "30%", md: "-30%" },
                // bottom:"50%"
              }}
            />
            <Stack direction={"row"} marginLeft={{ md: 5, xs: 5 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color={
                  isFetchedTheme
                    ? fetchingThemeData?.typography.paragraphColor
                    : selectedTheme.typography.paragraphColor
                }
              >
                I agree and accept the{" "}
                <span
                  style={{
                    cursor: "pointer",
                    color: "#4095bf",
                  }}
                  onClick={() => setIsOpen(true)}
                >
                  terms and conditions
                </span>
              </Typography>
            </Stack>
          </Box>

          {/* Submit Button */}
          <Stack alignItems="center" mt={5} mb={2}>
            <Button
              variant="customButton"
              type="submit"
              sx={{
                color: isFetchedTheme
                  ? fetchingThemeData?.button.buttonTextColor
                  : selectedTheme.button.buttonTextColor,
                bgcolor: isFetchedTheme
                  ? fetchingThemeData?.button.buttonBackground
                  : selectedTheme.button.buttonBackground,
                width: { md: "18rem", xs: "100%" },
              }}
            >
              {data?.content?.buttonText || "Click me"}
            </Button>
          </Stack>
        </form>
      </Box>

      <FormTermAndPrivacyDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        termsAndConditions={data.content.termsAndConditions}
      />
    </Stack>
  );
};

export default FormSection;
