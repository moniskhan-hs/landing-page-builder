/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import FormTermAndPrivacyDialog from "./FormTermAndPrivacyDialog";

const FormSection = ({ data = {}, isFetchedTheme, fetchingThemeData }) => {
  const theme = useTheme();
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const { theme: selectedTheme } = componentsValue;
  const [checked, setChecked] = useState(true);
  const [isOpen,setIsOpen]= useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Helper function to chunk the array into groups of 2
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const chunkedItems = chunkArray(data?.content?.inputs, 2);

  // const handleClose = () => {
  //   onClose(selectedValue);
  // };

  // const handleListItemClick = (value: string) => {
  //   onClose(value);
  // };

  return (
    <Stack
      sx={{
        width: isFetchedTheme? "100%":"100vw",
        borderRadius:"12px",
        padding: { md: isFetchedTheme?"3rem 2rem":"3rem 10rem", xs: "1rem" },
        bgcolor: isFetchedTheme
          ? fetchingThemeData?.background.section
          : selectedTheme.background.section ||
            theme.palette.background.section,
            mt:5,
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
          {chunkedItems?.map((chunk, index) => (
            <Stack
              key={index}
              direction={{ md: "row", xs: "column" }}
              spacing={2}
              my={3}
            >
              {chunk.map((field, idx) => (
                <Stack
                  key={field.id || idx}
                  gap={1}
                  sx={{
                    flex: chunk.length === 1 ? 1 : "initial",
                    width: "100%",
                  }}
                >
                  <Typography variant="subtitle2" ml={"0.2rem"}>
                    {field.labelText}
                  </Typography>
                  <TextField
                    placeholder={field.placeholderText}
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "30px",
                        border: `1px solid ${theme.palette.primary.main}`,
                        "& .MuiOutlinedInput-root:hover": {
                          border: "none",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      },
                      // If only one field in the row, let it grow to fill the row.
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          ))}

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
                // bottom:"50%"
              }}
            />
            <Stack direction={'row'} gap={1} marginLeft={{ md: 3, xs: 5 }}>
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
              </Typography>
                <Typography sx={{
                  cursor:"pointer"
                }} color="#4095bf" onClick ={()=>setIsOpen(true)}>
                  term and conditions
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



      <FormTermAndPrivacyDialog isOpen ={isOpen}  setIsOpen={setIsOpen} termsAndConditions ={data.content.termsAndConditions}/>
    </Stack>
  );
};

export default FormSection;
