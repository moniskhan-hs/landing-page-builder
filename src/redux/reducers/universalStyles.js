import { typography } from "@mui/system";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    // directly replace the theme with the object of theme of themeinputs.jsx file
    theme: {

        typography: {
            titleColor: '',
            subTitleColor: '',
            headingColor: '',
            paragraphColor: '',
        },
        button: {
            buttonTextColor: '',
            buttonBackground: ''

        },
        background: {
            default: '',
            paper: '',
            section: ''
        },
        icon: {
            iconColor: '',
            iconBackground: '',
            selectedIconType: ''
        }


    },

    hero: {
        buttonText: "",
        description: "",
        embededLink: "",
        file: null,
        infoText: "",
        title: "",
        value:"image",
        scheduleAdded:false
    },

    services:{
        title:'Services you are offering',
        list: [
            {
                heading: "some heading",
                description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sequi veniam nemo corporis maxime! Labore nesciunt adipisci perferendis, sed rem nemo dicta earum, sint, provident explicabo quo sunt eius eligendi.",
                image: null,
              },
        ]
    },
    benefits:{
        title:'Benefits title',
        optionalText:'optionalText',
        list: [
            {
                infoText:'some informations text Lorem ipsum dolor sit amet consectetur',
                image: null,
              },
        ]
    }
    
    
   
}

export const universalThemeReducer = createSlice({
    name: 'universalThemeReducer',
    initialState,
    reducers: {
        changeTheme : (state,action) =>{
          const { componentName, data } = action.payload;
          console.log('componentName:', componentName)
          state.theme[componentName] = data;
        },
        changeHero: (state, action) => {
            const data= action.payload;
            state.hero= data;
          },
        changeServicesList: (state, action) => {
            const data = action.payload
            state.services.list= data;
          },
          changeServicesTitle : (state,action)=>{
            const title = action.payload
            state.services.title= title;
          },
        changeBenefitsList: (state, action) => {
            const data = action.payload
            state.benefits.list= data;
          },
          changeBenefitsTitle : (state,action)=>{
            const title = action.payload
            state.benefits.title= title;
          },
          changeOptionalText : (state,action)=>{
            const title = action.payload
            state.benefits.optionalText= title;
          }



    }
});

export const { changeOptionalText,changeBenefitsTitle,changeBenefitsList,changeHero ,changeTheme,changeServicesTitle,changeServicesList} = universalThemeReducer.actions

