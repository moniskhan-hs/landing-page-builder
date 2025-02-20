/* eslint-disable react/prop-types */
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Button, Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const PaginationsButtons = ({ totalNumberOfButtons, selectedPageNumber, setSelectedPageNumber }) => {
    const theme = useTheme();
    const [buttonsToShow, setButtonsToShow] = useState(5);
    const [currentLoopOfFiveButtons, setCurrentLoopOfFiveButtons] = useState(1);

    useEffect(() => {
        const loopOfFiveButtons = Math.ceil(totalNumberOfButtons / 5);
        setCurrentLoopOfFiveButtons(Math.ceil(selectedPageNumber / 5));
    }, [selectedPageNumber, totalNumberOfButtons]);

    const handleNext = () => {
        if (selectedPageNumber < totalNumberOfButtons) {
            setSelectedPageNumber(selectedPageNumber + 1);
            if (selectedPageNumber % 5 === 0) {
                setButtonsToShow(prev => prev + 5);
            }
        }
    };

    const handlePrev = () => {
        if (selectedPageNumber > 1) {
            setSelectedPageNumber(selectedPageNumber - 1);
            if ((selectedPageNumber - 1) % 5 === 0) {
                setButtonsToShow(prev => prev - 5);
            }
        }
    };

    const renderPageButtons = () => {
        const start = (currentLoopOfFiveButtons - 1) * 5 + 1;
        const end = Math.min(start + 4, totalNumberOfButtons);

        return Array.from({ length: end - start + 1 }, (_, index) => {
            const pageNumber = start + index;
            return (
                <Stack
                    key={pageNumber}
                    variant='center'
                    sx={{
                        width: "3rem",
                        aspectRatio: "1",
                        border: `1px solid ${theme.palette.primary.light}`,
                        bgcolor: selectedPageNumber === pageNumber ? theme.palette.primary.main : "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onClick={() => setSelectedPageNumber(pageNumber)}
                >
                    {pageNumber}
                </Stack>
            );
        });
    };

    return (
        <Stack direction={'row'} gap={1}>
            <Button
                variant='outlined'
                disabled={selectedPageNumber <= 1}
                sx={{
                    height: "3rem",
                    padding: "0rem",
                    borderRadius: "0px",
                    border: `1px solid ${theme.palette.primary.light}`,
                    cursor: selectedPageNumber <= 1 ? 'not-allowed' : 'pointer'
                }}
                onClick={handlePrev}
            >
                <NavigateBefore sx={{ padding: "0rem", margin: "0rem" }} />
            </Button>

            {renderPageButtons()}

            <Button
                variant='outlined'
                disabled={selectedPageNumber >= totalNumberOfButtons}
                sx={{
                    height: "3rem",
                    padding: "0rem",
                    borderRadius: "0px",
                    border: `1px solid ${theme.palette.primary.light}`,
                    cursor: selectedPageNumber >= totalNumberOfButtons ? 'not-allowed' : 'pointer'
                }}
                onClick={handleNext}
            >
                <NavigateNext sx={{ padding: "0rem", margin: "0rem" }} />
            </Button>
        </Stack>
    );
};

export default PaginationsButtons;