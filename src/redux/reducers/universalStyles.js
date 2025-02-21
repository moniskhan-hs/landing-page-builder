import { typography } from "@mui/system";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },

  hero: [],

  services: [],

  benefits: []
};

export const universalThemeReducer = createSlice({
  name: "universalThemeReducer",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      const { componentName, data } = action.payload;
      console.log("componentName:", componentName);
      state.theme[componentName] = data;
    },

    addHero: (state, action) => {
      state.hero.push(action.payload);
    },
    removeHero: (state, action) => {
      const id = action.payload;
      state.hero = state.hero.filter((ele) => ele.id !== id);
    },

    changeHero: (state, action) => {
      const { id, content } = action.payload;
      const component = state.hero.find((ele) => ele.id === id);

      if (component) {
        component.content = content;
      }
    },

    
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    changeServices: (state, action) => {
      const { id, content, type } = action.payload;
      const component = state.services.find((ele) => ele.id === id);
      if(component) component[type] = content;
    },

    removeService: (state, action) => {
      const id = action.payload;
      state.services = state.services.filter((ele) => ele.id !== id);
    },

    addBenefit: (state, action) => {
      state.benefits.push(action.payload);
    },

    changeBenefits: (state, action) => {
      const {id,content,type} = action.payload;
      const component = state.benefits.find((ele) => ele.id === id);
      if(component) component[type] = content;
    },


    removeBenefit: (state, action) => {
      const id = action.payload;
      state.benefits = state.benefits.filter((ele) => ele.id !== id);
    },

  },
});

export const {
  changeTheme,
  addHero,
  changeHero,
  removeHero,
  addService,
  changeServices,
  removeService,
  addBenefit,
  changeBenefits,
  removeBenefit,
} = universalThemeReducer.actions;
