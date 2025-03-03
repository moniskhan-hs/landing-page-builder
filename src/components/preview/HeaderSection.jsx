/* eslint-disable react/prop-types */
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import { theme as appTheme } from "../../styles/theme";
import { capitalizeString } from "../../utils/constants";

const HeaderSection = ({
  menuList,
  buttonText,
  logoImageURL,
  buttonTextColor,
  buttonBackgroundColor,
  backgroundColor,
  isFetchedTheme,
  onFormIdChange,
}) => {
  // Use MUI's theme and media query to check if device is mobile
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  // Menu state (used both for mobile and for desktop "More" overflow)
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // For desktop/tablet: show first 4 items inline; the rest in a "More" menu.
  const visibleItems = menuList?.slice(0, 4);
  const overflowItems = menuList?.slice(4);


  useEffect(() => {
    // Find the first item with title "FORM"
    const formItem = menuList?.find(item => item.title === "FORM");
    if (formItem) {
      onFormIdChange(formItem.id);
      console.log('formItem.id in header section',formItem.id)
    }
  }, [menuList,onFormIdChange]);

  return (
    <Stack
      sx={{
        padding: { md: "1rem 5rem", xs: "1rem" },
        flexDirection: { xs: "row", md: "row" },
        alignItems: "center",
        bgcolor: backgroundColor || appTheme.palette.background.default,
        width: isFetchedTheme ? "100%" : "100vw",
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: { xs: "50%", sm: "30%", md: "20%" },
          height: "3rem",
          mr: { md: "15%", xs: 0 },
          mb: { xs: "0rem", md: 0 },
        }}
      >
        <img
          src={logoImageURL || "/logo.png"}
          alt="website-logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Navigation Menu */}
      {isMobile ? (
        // On mobile, use an IconButton to open a menu with all items
        <Stack direction={"row"} ml={"auto"}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {menuList?.map((ele, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleCloseMenu();
                  // Scroll to section using react-scroll scroller
                  scroller.scrollTo(ele.id, {
                    smooth: true,
                    duration: 500,
                    offset: -70,
                  });
                }}
              >
                {capitalizeString(
                  ele.label || (ele.title === "HERO" ? "HOME" : ele.title)
                )}
              </MenuItem>
            ))}
            {isMobile && (
              <Stack
                sx={{
                  mt: { xs: "0.5rem", md: 0 },
                  ml: { xs: 2, md: 2 },
                  mx: 2,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    padding: { xs: "0.6rem 2rem", md: "0.6rem 4rem" },
                    bgcolor:
                      buttonBackgroundColor || appTheme.palette.secondary.main,
                    color: buttonTextColor || "#ffffff",
                  }}
                >
                  {buttonText || "click me"}
                </Button>
              </Stack>
            )}
          </Menu>
        </Stack>
      ) : (
        // On tablet/desktop, display inline items plus a "More" option for overflow
        <Stack
          direction="row"
          sx={{
            ml: "auto",
            gap: 4,
            width: "fit-content",
          }}
        >
          {visibleItems?.map((ele, index) => {
         

            return (
              <ScrollLink
                key={index}
                to={ele.id}
                smooth={true}
                duration={500}
                offset={-70}
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                {!isMobile && ele.title === "FORM" ? (
                  <Stack
                    sx={{
                      mt: { xs: "1rem", md: 0 },
                      ml: { xs: 0, md: 2 },
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        padding: { xs: "0.6rem 2rem", md: "0.6rem 4rem" },
                        bgcolor:
                          buttonBackgroundColor ||
                          appTheme.palette.secondary.main,
                        color: buttonTextColor || "#ffffff",
                      }}
                    >
                      {buttonText || "Contact Us"}
                    </Button>
                  </Stack>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "capitalize",
                      ":hover": { color: "orange" },
                    }}
                  >
                    {capitalizeString(
                      ele.label || (ele.title === "HERO" ? "HOME" : ele.title)
                    )}
                  </Typography>
                )}
              </ScrollLink>
            );
          })}
          {overflowItems?.length > 0 && (
            <>
              <Typography
                variant="h6"
                onClick={handleOpenMenu}
                sx={{
                  cursor: "pointer",
                  textTransform: "capitalize",
                  ":hover": { color: "orange" },
                }}
              >
                More
              </Typography>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {overflowItems.map((ele, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleCloseMenu();
                      scroller.scrollTo(ele.id, {
                        smooth: true,
                        duration: 500,
                        offset: -70,
                      });
                    }}
                  >
                    {capitalizeString(ele.label || ele.title)}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Stack>
      )}

      {/* Action Button */}
      {/* {!isMobile && (
        <Stack
          sx={{
            mt: { xs: "1rem", md: 0 },
            ml: { xs: 0, md: 2 }
          }}
        >
          <Button
            variant="outlined"
            sx={{
              padding: { xs: "0.6rem 2rem", md: "0.6rem 4rem" },
              bgcolor: buttonBackgroundColor || appTheme.palette.secondary.main,
              color: buttonTextColor || "#ffffff",
            }}
          >
            {buttonText || "click me"}
          </Button>
        </Stack>
      )} */}
    </Stack>
  );
};

export default HeaderSection;
