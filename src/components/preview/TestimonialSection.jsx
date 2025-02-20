import {
  Box,
  Button,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PaginationsButtons from "../Paginations";
import { ratings } from "../../utils/data";

const TestimonialSection = () => {
  // For highlighted review (left container)
  const [expanded, setExpanded] = useState(false);
  // For the other reviews (right container)
  const [expandedText, setExpandedText] = useState({});
  const [hasOverflow, setHasOverflow] = useState({});
  const descriptionRefs = useRef({});
  const theme = useTheme();

  const [totalNumberOfButtons, setTotalNumberOfButtons] = useState(0);
  const [ratingListToShow, setRatingListToShow] = useState([]);
  const [selectedPageNumber, setSelectedPageNumber] = useState(1);

  // Toggle expanded state for each review (right container)
  const toggleExpanded = (index) => {
    setExpandedText((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Use effect for pagination calculation
  useEffect(() => {
    const newPageNumbers = Math.ceil(ratings.length / 4);
    setTotalNumberOfButtons(newPageNumbers);

    const startIndex = (selectedPageNumber - 1) * 4;
    const ratingstoshow = ratings.slice(startIndex, startIndex + 4);
    console.log("ratingstoshow:", ratingstoshow);
    setRatingListToShow(ratingstoshow);
  }, [ratings, selectedPageNumber]);

  // Use effect for measuring text overflow (always measure on ratingListToShow change)
  useEffect(() => {
    if (ratingListToShow.length > 0) {
      const newHasOverflow = {};
      ratingListToShow.forEach((ele, index) => {
        const descElem = descriptionRefs.current[index];
        if (descElem) {
          newHasOverflow[index] = descElem.scrollHeight > descElem.clientHeight;
        }
      });
      setHasOverflow(newHasOverflow);
    }
  }, [ratingListToShow]);

  return (
    <Stack
      sx={{
        width: "100vw",
        padding: "3rem 10rem",
        bgcolor: theme.palette.background.section,
      }}
    >
      <Typography
        variant="h3"
        mb={1}
        sx={{
          mx: "auto",
        }}
      >
        People are saying
      </Typography>

      <Typography
        variant="subtitle1"
        mb={4}
        sx={{
          mx: "auto",
        }}
      >
        4141+ Lorem ipsum dolor sit amet.
      </Typography>

{/* -------------------------------------------------- Content Box--------------------------------------- */}
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
        }}
      >
        {/* ---------------- Highlighted Review (Left Container) ---------------- */}
        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            gap={3}
            sx={{
              bgcolor: "background.paper",
              borderRadius: "12px",
              height: expanded ? "75%" : "70vh",
              padding: "1.5rem 1rem",
            }}
          >
            <Box
              sx={{
                padding: "0.3rem 1rem",
                borderRadius: "8px",
                width: "fit-content",
                bgcolor: "background.section",
                mx: "auto",
              }}
            >
              <Typography variant="subtitle1" sx={{ color: "#000" }}>
                Highlighted review
              </Typography>
            </Box>

            {/* User Info for Highlighted Review */}
            <Stack gap={1} alignItems="center">
              <Box
                sx={{
                  width: "10rem",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/userImage.jpg"
                  alt="user-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: "600" }}>
                John Wick
              </Typography>
              <Typography variant="subtitle1">New York, US</Typography>

              <Rating name="read-only" value={5} readOnly />
            </Stack>

            {/* Highlighted Review Text */}
            <Typography
              variant="subtitle1"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: expanded ? 999 : 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
              facilis at, eligendi veritatis qui voluptas saepe maxime libero,
              voluptates quo distinctio accusantium tempore modi soluta velit
              vitae magni quae? At! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Enim, facilis at, eligendi veritatis qui
              voluptas saepe maxime libero, voluptates quo distinctio
              accusantium tempore modi soluta velit vitae magni quae? At!
            </Typography>

            {/* Toggle Button for Highlighted Review */}
            <Button
              onClick={() => setExpanded(!expanded)}
              sx={{
                alignSelf: "start",
                textTransform: "none",
                fontSize: "1rem",
                color: "primary.main",
                placeSelf: "end",
              }}
            >
              {expanded ? "See Less" : "See More"}
            </Button>
          </Stack>
        </Box>

        {/* ---------------- Other Reviews (Right Container) ---------------- */}
        <Box sx={{ flex: 1 }}>
          {ratingListToShow?.map((ele, index) => (
            <Stack key={index} mb={1} sx={{ padding: "0.5rem 0.78rem" }}>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: "1rem",
                }}
              >
                {/* ------------------ Image --------------- */}
                <Box sx={{ width: "8rem" }}>
                  <img
                    src={ele.photo}
                    alt="user-img"
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      objectFit: "contain",
                      borderRadius: "100px",
                    }}
                  />
                </Box>
                {/* --------------- Ratings + Name + Address --------------- */}
                <Stack sx={{ flex: 1, paddingY: "0.2rem" }}>
                  <Box>
                    <Rating name="read-only" value={5} readOnly />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: "600" }}>
                    {ele.name}
                  </Typography>
                  <Typography variant="subtitle1">{ele.address}</Typography>
                </Stack>
              </Stack>

              {/* ---------------- Description with Overflow Measurement ---------------- */}
              <Typography
                variant="subtitle1"
                ref={(el) => (descriptionRefs.current[index] = el)}
                sx={{
                  mx: "auto",
                  display: "-webkit-box",
                  WebkitLineClamp: expandedText[index] ? "unset" : 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  mt: "0.45rem",
                }}
              >
                {ele.description}
              </Typography>

              {/* ---------------- Toggle Button for Each Review ---------------- */}
              {hasOverflow[index] && (
                <Button
                  onClick={() => toggleExpanded(index)}
                  sx={{
                    alignSelf: "flex-start",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    color: "primary.main",
                    placeSelf: "end",
                  }}
                >
                  {expandedText[index] ? "See Less" : "See More"}
                </Button>
              )}
            </Stack>
          ))}

          <PaginationsButtons
            totalNumberOfButtons={totalNumberOfButtons}
            selectedPageNumber={selectedPageNumber}
            setSelectedPageNumber={setSelectedPageNumber}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default TestimonialSection;
