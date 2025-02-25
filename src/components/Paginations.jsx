/* eslint-disable react/prop-types */
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Button, Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const PaginationsButtons = ({ totalNumberOfButtons, selectedPageNumber, setSelectedPageNumber, selectedTheme }) => {
  const theme = useTheme();

  // Calculate the current loop (group of 5 pages)
  const currentLoop = Math.ceil(selectedPageNumber / 5);

  // Next button: simply increase selectedPageNumber if not at the end.
  const handleNext = () => {
    if (selectedPageNumber < totalNumberOfButtons) {
      setSelectedPageNumber(selectedPageNumber + 1);
    }
  };

  // Prev button: simply decrease selectedPageNumber if not at the beginning.
  const handlePrev = () => {
    if (selectedPageNumber > 1) {
      setSelectedPageNumber(selectedPageNumber - 1);
    }
  };

  // Render the page buttons for the current loop.
  const renderPageButtons = () => {
    // Calculate start and end numbers for current loop (groups of 5)
    const start = (currentLoop - 1) * 5 + 1;
    const end = Math.min(start + 4, totalNumberOfButtons);
    
    return Array.from({ length: end - start + 1 }, (_, index) => {
      const pageNumber = start + index;
      return (
        <Stack
          key={pageNumber}
          variant="center"
          sx={{
            width: "3rem",
            aspectRatio: "1",
            bgcolor: selectedPageNumber === pageNumber ? selectedTheme.button.buttonBackground : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
          }}
          onClick={() => setSelectedPageNumber(pageNumber)}
        >
          {pageNumber}
        </Stack>
      );
    });
  };

  return (
    <Stack direction="row" gap={1}>
      <Button
        variant="outlined"
        disabled={selectedPageNumber <= 1}
        sx={{
          height: "3rem",
          padding: "0rem",
          borderRadius: "0px",
          cursor: selectedPageNumber <= 1 ? "not-allowed" : "pointer",
          color: selectedTheme.button.buttonTextColor,
        }}
        onClick={handlePrev}
      >
        <NavigateBefore sx={{ color: "#000", fontWeight: "bold" }} />
      </Button>

      {renderPageButtons()}

      <Button
        variant="outlined"
        disabled={selectedPageNumber >= totalNumberOfButtons}
        sx={{
          height: "3rem",
          padding: "0rem",
          borderRadius: "0px",
          cursor: selectedPageNumber >= totalNumberOfButtons ? "not-allowed" : "pointer",
          color: selectedTheme.button.buttonTextColor,
        }}
        onClick={handleNext}
      >
        <NavigateNext sx={{ color: "#000", fontWeight: "bold" }} />
      </Button>
    </Stack>
  );
};

export default PaginationsButtons;
