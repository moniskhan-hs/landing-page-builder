/* eslint-disable react/prop-types */
import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCheckbox,
  addInputItem,
  addRadioButton,
  changeCheckboxList,
  changeForm,
  changeInputsList,
  changeRadioButtonsList,
  removeCheckbox,
  removeInputItem,
  removeRadioButton,
} from "../../redux/reducers/universalStyles";

const FormInputs = ({ id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Get the service component from Redux by id
  const formState = useSelector((state) => state.universalThemeReducer.form);
  const selectedForm = formState.find((ele) => ele.id == id);

  if (!selectedForm) {
    return (
      <Typography variant="h6" color="error">
        Form component not found for id: {id}
      </Typography>
    );
  }

  const { content } = selectedForm; // content contains title and services array

  // --- Handlers for Title ---
  const handleTitleChange = (e) => {
    dispatch(changeForm({ id, content: e.target.value, type: "title" }));
  };
  // --- Handlers for Description ---

  const handleDescriptionChange = (e) => {
    dispatch(changeForm({ id, content: e.target.value, type: "description" }));
  };
  // --- Handlers for Button Text ---

  const handleButtonTextChange = (e) => {
    dispatch(changeForm({ id, content: e.target.value, type: "buttonText" }));
  };

  // --- Handlers for Service Item Fields ---
  const handleInputFieldChange = (e, index, field) => {
    dispatch(changeInputsList({ id, index, content: e.target.value, field }));
  };
  // --- Handlers for radio lebel  Fields ---

  const handleRadioButtonValueChange = (e, index) => {
    dispatch(changeRadioButtonsList({ id, index, content: e.target.value }));
  };
  // --- Handlers for checkbox label   Fields ---

  const handleCheckboxValueChange = (e, index) => {
    dispatch(changeCheckboxList({ id, index, content: e.target.value }));
  };

  // --- Handler for Adding a New Input Item ---
  const handleAddInputItem = () => {
    dispatch(
      addInputItem({
        id,
        input: {
          labelText: "some label text",
          placeholderText: "place holder text.....",
        },
      })
    );
  };
  // --- Handler for Adding a New Radio Item ---
  const handleAddRadioItem = () => {
    dispatch(
      addRadioButton({
        id,
        radio: {
          label: "some label text",
        },
      })
    );
  };
  // --- Handler for Adding a New checkbox Item ---
  const handleAddCheckboxItem = () => {
    dispatch(
      addCheckbox({
        id,
        check: {
          label: "Select 2",
        },
      })
    );
  };

  // --- Handler for Deleting a Input Item ---
  const handleDeleteInputItem = (index) => {
    dispatch(removeInputItem({ id, index }));
  };

  // --- Handler for Deleting a Radio Item ---
  const handleDeleteRadioItem = (index) => {
    dispatch(removeRadioButton({ id, index }));
  };

  // --- Handler for Deleting a check Item ---
  const handleDeleteCheckItem = (index) => {
    dispatch(removeCheckbox({ id, index }));
  };

  return (
    <Stack gap={1} sx={{ padding: "0.5rem 0.5rem" }}>
      {/* Global Title Field */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Title</Typography>
        <TextField
          placeholder="Enter Title"
          size="small"
          name="title"
          value={content.title}
          onChange={handleTitleChange}
          fullWidth
        />
      </Box>
      {/*--------------- Description field */}

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Description</Typography>
        <TextField
          placeholder="Enter Title"
          size="small"
          name="description"
          value={content.description}
          onChange={handleDescriptionChange}
          fullWidth
        />
      </Box>
      {/*--------------- Terms & conidtions --------------------------- */}

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Terms & Conditions</Typography>
        <textarea
          placeholder="Enter terms & conditions"
          // size="small"
          name="termsAndConditions"
          value={content.termsAndConditions}
          onChange={(e) =>
            dispatch(
              changeForm({
                id,
                content: e.target.value,
                type: "termsAndConditions",
              })
            )
          }
          style={{
            background: "transparent",
            borderRadius: "8px",
            padding: "0.5rem 0.6rem",
            fontSize: "1rem",
            maxWidth: "100%",
            minHeight: "10rem",
            minWidth: "99%",
          }}
          // fullWidth
        />
      </Box>
      {/*--------------- Button Text field */}

      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle1">Button Text</Typography>
        <TextField
          placeholder="Enter Button Text "
          size="small"
          name="buttonText"
          value={content.buttonText}
          onChange={handleButtonTextChange}
          fullWidth
        />
      </Box>
      {/* ----------------------------------------- Input fields----------------------------------- */}
      <>
        {/* Map through each inputs item */}
        {content?.inputs?.map((input, index) => (
          <Box
            key={input.id || index} // Use a stable unique key (service.id)
            sx={{
              bgcolor: theme.palette.background.paper,
              padding: "0.5rem",
              borderRadius: "12px",
              mb: 2,
            }}
          >
            {/* Header with Delete Button */}
            <Stack direction="row" sx={{ display: "flex", width: "100%" }}>
              <Typography variant="subtitle1" sx={{ marginRight: "auto" }}>
                Input Field {index + 1}
              </Typography>
              <IconButton onClick={() => handleDeleteInputItem(index)}>
                <DeleteOutlineOutlined sx={{ color: "red" }} />
              </IconButton>
            </Stack>

            {/* Label Text */}
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1">Label Text</Typography>
              <TextField
                placeholder="Enter Heading"
                size="small"
                name="labelText"
                value={input.labelText}
                onChange={(e) => handleInputFieldChange(e, index, "labelText")}
                fullWidth
              />
            </Box>

            {/* placeholder Text  */}
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1">Placeholder Text</Typography>
              <TextField
                placeholder="Enter Description"
                size="small"
                name="placeholderText"
                value={input.placeholderText}
                onChange={(e) =>
                  handleInputFieldChange(e, index, "placeholderText")
                }
                fullWidth
              />
            </Box>
            {/* Select type of input   */}
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1">Select input type</Typography>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  id="demo-simple-select-input-type"
                  value={input.type}
                  // label="Age"

                  onChange={(e) => handleInputFieldChange(e, index, "type")}
                  size="small"
                >
                  <MenuItem value={"text"}>Text</MenuItem>
                  <MenuItem value={"number"}>Number</MenuItem>
                  <MenuItem value={"email"}>Email</MenuItem>
                  <MenuItem value={"password"}>Password</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 1,
              display: 'flex',
alignItems:"center"              
             }}>
              <Checkbox
                checked={input.makeItFull}
                 onChange={(e) =>
                  dispatch(
                    changeInputsList({
                      id,
                      index,
                      content: e.target.checked,
                      field: "makeItFull",
                    })
                  )
                }
              
              />
              <Typography variant="subtitle1">Make it full </Typography>
            </Box>
          </Box>
        ))}

        {/* Button to Add a New input */}
        <Button
          onClick={handleAddInputItem}
          sx={{
            width: "50%",
            mx: "auto",
            mb: 2,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Add Input
        </Button>
      </>

      {/* ------------------------------- radio content------------------------------------------- */}
      <>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle1">Radio title </Typography>
          <TextField
            placeholder="eg, Please choose your gender"
            size="small"
            value={content.radioTitle}
            onChange={(e) =>
              dispatch(
                changeForm({ id, content: e.target.value, type: "radioTitle" })
              )
            }
            fullWidth
          />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1">
            Select radio buttons direction{" "}
          </Typography>
          <FormControl fullWidth>
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Select
              id="demo-simple-select"
              value={content.radioDirection}
              // label="Age"
              onChange={(e) =>
                dispatch(
                  changeForm({
                    id,
                    content: e.target.value,
                    type: "radioDirection",
                  })
                )
              }
              size="small"
            >
              <MenuItem value={"row"}>Row</MenuItem>
              <MenuItem value={"column"}>Column</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {content?.radioButtons?.map((radio, index) => (
          <Box
            key={radio.id || index} // Use a stable unique key (service.id)
            sx={{
              bgcolor: theme.palette.background.paper,
              padding: "0.5rem",
              borderRadius: "12px",
              mb: 2,
            }}
          >
            {/* Header with Delete Button */}
            <Stack direction="row" sx={{ display: "flex", width: "100%" }}>
              <Typography variant="subtitle1" sx={{ marginRight: "auto" }}>
                Radio {index + 1}
              </Typography>
              <IconButton onClick={() => handleDeleteRadioItem(index)}>
                <DeleteOutlineOutlined sx={{ color: "red" }} />
              </IconButton>
            </Stack>

            {/* Label Text */}
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1">Label Text</Typography>
              <TextField
                placeholder="Enter Label Text"
                size="small"
                name="labelText"
                value={radio.label}
                onChange={(e) => handleRadioButtonValueChange(e, index)}
                fullWidth
              />
            </Box>
          </Box>
        ))}

        {/* Button to Add a New input */}
        <Button
          onClick={handleAddRadioItem}
          sx={{
            width: "50%",
            mx: "auto",
            // mt: 2,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Add Radio
        </Button>
      </>

      {/* ------------------------------- Multi checked ------------------------------------------- */}
      <>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Multiple Checkbox title </Typography>
          <TextField
            placeholder="eg, Please Choose one or more"
            size="small"
            value={content.checkboxesTitle}
            onChange={(e) =>
              dispatch(
                changeForm({
                  id,
                  content: e.target.value,
                  type: "checkboxesTitle",
                })
              )
            }
            fullWidth
          />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1">
            Select checkboxes direction{" "}
          </Typography>
          <FormControl fullWidth>
            <Select
              id="demo-simple-select"
              value={content.radioDirection}
              onChange={(e) =>
                dispatch(
                  changeForm({
                    id,
                    content: e.target.value,
                    type: "checkboxesDirection",
                  })
                )
              }
              size="small"
            >
              <MenuItem value={"row"}>Row</MenuItem>
              <MenuItem value={"column"}>Column</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {content?.multiChecked?.map((checkbox, index) => (
          <Box
            key={checkbox.id || index} // Use a stable unique key (service.id)
            sx={{
              bgcolor: theme.palette.background.paper,
              padding: "0.5rem",
              borderRadius: "12px",
              mb: 2,
            }}
          >
            {/* Header with Delete Button */}
            <Stack direction="row" sx={{ display: "flex", width: "100%" }}>
              <Typography variant="subtitle1" sx={{ marginRight: "auto" }}>
                Checkbox {index + 1}
              </Typography>
              <IconButton onClick={() => handleDeleteCheckItem(index)}>
                <DeleteOutlineOutlined sx={{ color: "red" }} />
              </IconButton>
            </Stack>

            {/* Label Text */}
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle1">Label Text</Typography>
              <TextField
                placeholder="Enter Label Text"
                size="small"
                name="labelText"
                value={checkbox.label}
                onChange={(e) => handleCheckboxValueChange(e, index)}
                fullWidth
              />
            </Box>
          </Box>
        ))}

        {/* Button to Add a New input */}
        <Button
          onClick={handleAddCheckboxItem}
          sx={{
            width: "50%",
            mx: "auto",
            // mt: 2,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Add Checkbox
        </Button>
      </>
    </Stack>
  );
};

export default FormInputs;
