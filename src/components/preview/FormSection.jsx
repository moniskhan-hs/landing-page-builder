import { Stack, Typography, useTheme, Box, TextField, Button, Radio, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState } from 'react';

const FormSection = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // Dynamic form content
  const formSectionContent = {
    feilds: [
      {
        name: 'name',
        placholder: 'Enter name',
        value: '',
      },
      {
        name: 'email',
        placholder: 'Enter Email',
        value: '',
      },
      {
        name: 'address',
        placholder: 'Enter Address',
        value: '',
      },
      {
        name: 'phone',
        placholder: 'Enter Phone Number',
        value: '',
      },
      {
        name: 'some field',
        placholder: 'Enter value',
        value: '',
      },
    ],
    termAndConditions: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo aut, quaerat ipsum mollitia consequatur facilis ea delectus animi voluptatibus atque. Adipisci magni perferendis minima, unde doloribus illum? Deserunt, doloremque voluptatum!'
  };

  // Helper function to chunk the array into groups of 2
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const chunkedItems = chunkArray(formSectionContent.feilds, 2);

  return (
    <Stack
      sx={{
        width: "100vw",
        padding: "3rem 10rem",
        bgcolor: theme.palette.background.section,
      }}
    >

      {/* Main content container */}
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          padding: "3rem 16rem",
          borderRadius: "12px"
        }}
      >


        <Typography
          variant="h3"
          mb={5}
          sx={{
            mx: "auto",
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            gap: 1
          }}
        >
          Some title here
        </Typography>

        <form>
          {/* Render text fields two per row */}
          {chunkedItems.map((chunk, index) => (
            <Stack key={index} direction="row" spacing={2} my={3}>
              {chunk.map((field, idx) => (
                <TextField
                  key={field.name + idx}
                  placeholder={field.placholder}
                  value={field.value}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "30px",
                      border: `1px solid ${theme.palette.primary.main}`,
                      "& .MuiOutlinedInput-root:hover": {
                        border: "none"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    },
                    // If only one field in the row, let it grow to fill the row.
                    flex: chunk.length === 1 ? 1 : 'initial',
                  }}
                />
              ))}
            </Stack>
          ))}

          {/* Term and Conditions */}
          <Box sx={{ display: 'flex', alignItems: "center" }}>
            <Typography variant="subtitle1">
              [optional] Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quas nobis saepe adipisci ratione iusto nisi voluptas dolor facere deserunt impedit eius quasi placeat non, soluta cupiditate tempore voluptates alias!
            </Typography>
          </Box>
          {/* Term and Conditions */}
          <Box sx={{ display: 'flex', alignItems: "center", position: 'relative', mt:5}}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                position: "absolute",
                left: "-2%",
                // bottom:"50%"
              }}
            />
            <Box marginLeft={3}>
              <Typography variant="subtitle1" fontWeight={600}>
                I agree and accept the <a href='/' target='_blank' rel="noreferrer">term and conditions</a>
              </Typography>
            </Box>
          </Box>

          {/* Submit Button */}
          <Stack alignItems="center" mt={5} mb={2}>
            <Button variant="customButton" type="submit">
              Click me
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default FormSection;
