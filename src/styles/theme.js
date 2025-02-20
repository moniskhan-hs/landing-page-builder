import { createTheme } from '@mui/material/styles';


// Create a theme instance
export const theme = createTheme({
  palette: {
    mode: 'light', // Enable light or dark mode
    primary: {
      main:"#fa7d26", // Primary brand color
      light: '#42a5f5', // copy button background Lighter shade
      contrastText: '#ffffff', // Text color on primary background
    },
    secondary: {
      main: '#04b797', // share button background color
      light:'#ffeddc', // selected field background color
      contrastText: '#ffffff', // Text color on secondary background
    },
    error: {
      main: '#FF0000', // Error color
      light: '#ef5350', // Lighter shade
      dark: '#c62828', // Darker shade
      contrastText: '#ffffff', // Text color on error background
    },
    warning: {
      main: '#ed6c02', // Warning color
      light: '#ff9800', // Lighter shade
      dark: '#e65100', // Darker shade
      contrastText: '#ffffff', // Text color on warning background
    },
    info: {
      main: '#0288d1', // Info color
      light: '#03a9f4', // Lighter shade
      dark: '#01579b', // Darker shade
      contrastText: '#ffffff', // Text color on info background
    },
    success: {
      main: '#2e7d32', // Success color
      light: '#4caf50', // Lighter shade
      dark: '#1b5e20', // Darker shade
      contrastText: '#ffffff', // Text color on success background
    },
    background: {
      default: '#f5f5f5', // Default background color
      paper: '#ffffff', // Background color for paper components
      section:'#f3f3f3'
    },
    text: {
      primary: '#212121', // Primary text color
      secondary: '#757575', // Secondary text color
      disabled: '#9e9e9e', // Disabled text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Default font family
    h1: {
      fontSize: '4rem',
      fontWeight: 900,
      lineHeight: 1.2,
    },
    // main title
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.3,

    },
    // subTitle
    h3: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.3,
    },
    // heading
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.2,

    },
    // call to action heading
    h5: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    // FAQ
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
       color:'#757575'
    },
    // paragraph 
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,

    },
    // input label
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color:'#757575'

    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase', // Uppercase text for buttons
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },



    truncateText: {
      display: "-webkit-box",
      WebkitLineClamp: 1, // Limit to 1 lines
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color:'#757575'
    },
  },
  spacing: 8, // Base spacing unit (8px)
  shape: {
    borderRadius: 8, // Default border radius for components
  },
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (phones)
      sm: 600, // Small devices (tablets)
      md: 900, // Medium devices (laptops)
      lg: 1200, // Large devices (desktops)
      xl: 1536, // Extra large devices (large desktops)
    },
  },
  components: {
    // Customize specific components
    MuiButton: {
      variants:[
        {
          props: { variant: "customButton" },


          style:{
             borderRadius: '30px', // Custom border radius for buttons
              textTransform:"none",
              width: '18rem',
              marginTop: 5,
             
          }
        }

      ],
      styleOverrides: {
        
        root: {
          borderRadius: '30px', // Custom border radius for buttons
          textTransform:"none"
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove shadow from AppBar
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Custom shadow for Paper
        },
      },
    },

    MuiStack: {
        variants: [
          {
            props: { variant: "center" },
            style: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
          },
        ],
      },




  },
});

