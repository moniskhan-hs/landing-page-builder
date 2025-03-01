import { Cancel, Check } from "@mui/icons-material";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

export const ratings = [
    {
      name: "Jon Bea",
      address: "Mumbai, INDIA",
      photo: "/userImage.jpg",
      rating: 1,
      description:
        "Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor.",
      Highlighted: false,
    },
    {
      name: "Jon Bea",
      address: "Mumbai, INDIA",
      photo: "/userImage.jpg",
      rating: 1,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor.",
      Highlighted: false,
    },
    {
      name: "Jon Bea",
      address: "Mumbai, INDIA",
      photo: "/userImage.jpg",
      rating: 1,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor.",
      Highlighted: false,
    },
    {
      name: "Jon Bea",
      address: "Mumbai, INDIA",
      photo: "/userImage.jpg",
      rating: 1,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor.",
      Highlighted: false,
    },
    {
      name: "Jon Bea",
      address: "Mumbai, INDIA",
      photo: "/userImage.jpg",
      rating: 1,
      description:
        " 5 Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor.",
      Highlighted: false,
    },
    {
      name: "Jon Bea",
      address: "Mumbai, INDIA",
      photo: "/userImage.jpg",
      rating: 1,
      description:
        " 6 Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis id doloribus neque, alias dolorum autem ipsam quam illum quo in itaque possimus maxime similique molestiae sint pariatur. Illum, quae dolor.",
      Highlighted: false,
    },
  ];

  export const iconsData = [
    {
      icon: Cancel,
      radius: '0px',
      type: 'square',
    },
    {
      icon: Check,
      radius: '12px',
      type: 'shape',
    },
    {
      icon: Cancel,
      radius: '100px',
      type: 'circle',
    },
  ];


  export const scheduleData = [
    {
      icon: CalendarMonthOutlinedIcon,
      title: 'Date',
      value: '',
    },
    {
      icon: AccessTimeOutlinedIcon,
      title: 'Time',
      value: '',
    },
    {
      icon: LanguageOutlinedIcon,
      title: 'Live',
      value: '',
    },
    {
      icon: HourglassBottomOutlinedIcon,
      title: 'Duration',
      value: '',
    },


  ]


 export const initialState = {
    // directly replace the theme with the object of theme of themeinputs.jsx file
    theme: {
      typography: {
        titleColor: "",
        subTitleColor: "",
        headingColor: "",
        paragraphColor: "",
      },
      button: {
        buttonTextColor: "",
        buttonBackground: "",
      },
      background: {
        default: "",
        paper: "",
        section: "",
      },
      icon: {
        iconColor: "",
        iconBackground: "",
        selectedIconType: "",
      },
      header:{
        headerLogoImage:null ,
        headerButtonText:'',
        backgroundColor:''
      },

      footer:{
      nameText:'',
      copyrigthText:'',
      backgroundColor:""
      }
    },
  
    hero: [],
  
    services: [],
  
    benefits: [],
  
    about: [],
  
    frequentlyAsked: [],
  
    includedNotIncluded: [],
  
    testimonials: [],
  
    callToAction: [],
    
    form:[],
    
  
  };