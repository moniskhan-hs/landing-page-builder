/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import PaginationsButtons from "../Paginations";

const UserImage = ({ image }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (image && image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(image);
    }
  }, [image]);

  return (
    <img
      src={previewUrl || "/heroImage.jpg"}
      alt="services-img"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "fill",
        borderRadius: "12px",
      }}
    />
  );
};

const TestimonialSection = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedText, setExpandedText] = useState({});
  const [hasOverflow, setHasOverflow] = useState({});
  const descriptionRefs = useRef({});
  const componentsValue = useSelector((state) => state.universalThemeReducer);
  const { theme: selectedTheme } = componentsValue;
  const theme = useTheme();
  const [totalNumberOfButtons, setTotalNumberOfButtons] = useState(0);
  const [ratingListToShow, setRatingListToShow] = useState([]);
  const [selectedPageNumber, setSelectedPageNumber] = useState(1);

  const toggleExpanded = (index) => {
    setExpandedText((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const totalUsers = data?.content?.users?.length || 0;
    const newPageNumbers = Math.ceil(totalUsers / 4);
    setTotalNumberOfButtons(newPageNumbers);

    const startIndex = (selectedPageNumber - 1) * 4;
    const ratingstoshow = data?.content?.users.slice(startIndex, startIndex + 4);
    console.log("ratingstoshow:", ratingstoshow);
    setRatingListToShow(ratingstoshow);
  }, [data, selectedPageNumber]);

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
        bgcolor:
          selectedTheme.background.section || theme.palette.background.section,
      }}
    >
      <Typography
        variant="h3"
        mb={1}
        sx={{
          mx: "auto",
          color: selectedTheme.typography.subTitleColor,
        }}
      >
        {data?.content?.title || "People are saying"}
      </Typography>

      <Typography
        variant="subtitle1"
        mb={4}
        sx={{
          mx: "auto",
          color: selectedTheme.typography.paragraphColor,
        }}
      >
        {data?.content?.infoText || "4141+ Lorem ipsum dolor sit amet."}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "2rem",
        }}
      >
        {/* Highlighted Review (Left Container) */}
        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            borderRadius: "12px",
            bgcolor: selectedTheme.background.section || theme.palette.background.section,
          }}
        >
          <Stack
            gap={3}
            sx={{
              bgcolor: selectedTheme.background.paper || theme.palette.background.paper,
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
                bgcolor: selectedTheme.background.paper || theme.palette.background.paper,
                mx: "auto",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: selectedTheme.typography.paragraphColor }}
              >
                Highlighted review
              </Typography>
            </Box>

            <Stack gap={1} alignItems="center">
              <Box
                sx={{
                  width: "10rem",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <UserImage image={data?.content?.highlightedReview?.image} />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: "600",
                  color: selectedTheme.typography.headingColor,
                }}
              >
                {data?.content?.highlightedReview?.name || "John wick"}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: selectedTheme.typography.paragraphColor,
                }}
              >
                {data?.content?.highlightedReview?.address || "New York"}
              </Typography>

              <Rating
                name="read-only"
                value={data?.content?.highlightedReview?.ratingValue || 5}
                readOnly
              />
            </Stack>

            <Typography
              variant="subtitle1"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: expanded ? 999 : 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: selectedTheme.typography.paragraphColor,
              }}
            >
              {data?.content?.highlightedReview?.description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, facilis at, eligendi veritatis qui voluptas saepe maxime libero, voluptates quo distinctio accusantium tempore modi soluta velit vitae magni quae? At!"}
            </Typography>

            <Button
              onClick={() => setExpanded(!expanded)}
              sx={{
                alignSelf: "start",
                textTransform: "none",
                fontSize: "1rem",
                placeSelf: "end",
                color: selectedTheme.button.buttonBackground,
              }}
            >
              {expanded ? "See Less" : "See More"}
            </Button>
          </Stack>
        </Box>

        {/* Other Reviews (Right Container) */}
        <Box sx={{ flex: 1 }}>
          {ratingListToShow.map((ele, index) => (
            <Stack key={index} mb={1} sx={{ padding: "0.5rem 0.78rem" }}>
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <Box sx={{ width: "8rem" }}>
                  <UserImage image={ele.image} />
                </Box>
                <Stack sx={{ flex: 1, paddingY: "0.2rem" }}>
                  <Box>
                    <Rating value={ele.ratingValue} readOnly />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "600",
                      color: selectedTheme.typography.headingColor,
                    }}
                  >
                    {ele.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: selectedTheme.typography.paragraphColor,
                    }}
                  >
                    {ele.address}
                  </Typography>
                </Stack>
              </Stack>

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
                  color: selectedTheme.typography.paragraphColor,
                }}
              >
                {ele.description}
              </Typography>

              {hasOverflow[index] && (
                <Button
                  onClick={() => toggleExpanded(index)}
                  sx={{
                    alignSelf: "flex-start",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    placeSelf: "end",
                    color: selectedTheme.button.buttonBackground,
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
            selectedTheme={selectedTheme}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default TestimonialSection;
