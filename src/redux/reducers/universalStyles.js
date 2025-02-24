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

  benefits: [],

  about:[],

   frequentlyAsked:[]
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
// -------------------------------------------------H E R O ----------------------------------------

    addHero: (state, action) => {
      state.hero.push(action.payload);
    },
    removeHero: (state, action) => {
      const id = action.payload;
      state.hero = state.hero.filter((ele) => ele.id !== id);
    },

    changeHero: (state, action) => {
      const { id, content } = action.payload;
      const heroComponent = state.hero.find((ele) => ele.id === id);
      if (heroComponent) {
        // Merge the updated fields with existing content.
        heroComponent.content = { ...heroComponent.content, ...content };
      }
    },
    
// ------------------------------------------------- S E R V I C E S -------------------------------------

   addService: (state, action) => {
      state.services.push(action.payload);
    },

    removeService: (state, action) => {
      const id = action.payload;
      state.services = state.services.filter((ele) => ele.id !== id);
    },

    changeServicesList: (state, action) => {
      const { id, index, content, field } = action.payload;
      const serviceComp = state.services.find(ele => ele.id === id);
      if (serviceComp && serviceComp.content && Array.isArray(serviceComp.content.services)) {
        serviceComp.content.services[index][field] = content;
      }
    },
    addServiceItem: (state, action) => {
      const { id, service } = action.payload;
      const serviceComp = state.services.find(ele => ele.id === id);
      if (serviceComp && serviceComp.content && Array.isArray(serviceComp.content.services)) {
        // Assign a unique id to the new service if not provided
        service.id = service.id || Date.now();
        serviceComp.content.services.push(service);
      }
    },
    removeServiceItem: (state, action) => {
      const { id, index } = action.payload;
      const serviceComp = state.services.find(ele => ele.id === id);
      if (serviceComp && serviceComp.content && Array.isArray(serviceComp.content.services)) {
        serviceComp.content.services.splice(index, 1);
      }
    },

    changeServices: (state, action) => {
      const { id, content, type } = action.payload;
      const serviceComp = state.services.find(ele => ele.id === id);
      if (serviceComp) {
        if (type === 'title') {
          serviceComp.content.title = content;
        } else if (type === 'content') {
          serviceComp.content.services = content;
        }
      }
    },


// ------------------------------------------------- B E N E F I T S -------------------------------------


    addBenefit: (state, action) => {
      state.benefits.push(action.payload);
    },
    

    removeBenefit: (state, action) => {
      const id = action.payload;
      state.benefits = state.benefits.filter((ele) => ele.id !== id);
    },
    

    changeBenefitsList: (state, action) => {
      const { id, index, content, field } = action.payload;
      const benefitComp = state.benefits.find(ele => ele.id === id);
      if (benefitComp && benefitComp.content && Array.isArray(benefitComp.content.benefits)) {
        benefitComp.content.benefits[index][field] = content;
      }
    },
    
    addBenefitsItem: (state, action) => {
      const { id, benefit } = action.payload;
      const benefitComp = state.benefits.find(ele => ele.id === id);
      if (benefitComp && benefitComp.content && Array.isArray(benefitComp.content.benefits)) {
        // Assign a unique id to the new benefit if not provided
        benefit.id = benefit.id || Date.now();
        benefitComp.content.benefits.push(benefit);
      }
    },
    
    removeBenefitItem: (state, action) => {
      const { id, index } = action.payload;
      const benefitComp = state.benefits.find(ele => ele.id === id);
      if (benefitComp && benefitComp.content && Array.isArray(benefitComp.content.benefits)) {
        benefitComp.content.benefits.splice(index, 1);
      }
    },
    
    changeBenefits: (state, action) => {
      const { id, content, type } = action.payload;
      const component = state.benefits.find((ele) => ele.id === id);
      if (component) {
        if (type === 'title') {
          component.content.title = content;
        } else if (type === 'content') {
          component.content.benefits = content;
        } else if (type === 'optionalText') {
          component.content.optionalText = content;
        }
      }
    },
    

  
  


// ------------------------------------------------- A B O U T   U S ------------------------------------------


    addAbout : (state,action)=>{
      state.about.push(action.payload)
    },

    removeAbout : (state,action)=>{
      const id = action.payload;
      state.about = state.about.filter((ele) => ele.id !== id);
      
    },

    changeAboutList: (state, action) => {
      const { id, index, content, field } = action.payload;
      const aboutComp = state.about.find(ele => ele.id === id);
      if (aboutComp && aboutComp.content && Array.isArray(aboutComp.content.abouts)) {
        aboutComp.content.abouts[index][field] = content;
      }
    },

    addAboutItem: (state, action) => {
      const { id, about } = action.payload;
      const aboutComp = state.about.find(ele => ele.id === id);
      if (aboutComp && aboutComp.content && Array.isArray(aboutComp.content.abouts)) {
        // Assign a unique id to the new service if not provided
        about.id = about.id || Date.now();
        aboutComp.content.abouts.push(about);
      }
    },

    removeAboutItem: (state, action) => {
      const { id, index } = action.payload;
      const aboutComp = state.about.find(ele => ele.id === id);
      if (aboutComp && aboutComp.content && Array.isArray(aboutComp.content.abouts)) {
        aboutComp.content.abouts.splice(index, 1);
      }
    },
    changeAbout :(state,action)=>{
      const {id,content,type} = action.payload;
      const component = state.about.find((ele) => ele.id === id);
      if (component) {
        if (type === 'title') {
          component.content.title = content;
        } 
      }
    },
// ------------------------------------------------- F A Q ------------------------------------------
  // FAQ reducers:
  addFAQ: (state, action) => {
    state.frequentlyAsked.push(action.payload);
  },

  removeFAQ: (state, action) => {
    const id = action.payload;
    state.frequentlyAsked = state.frequentlyAsked.filter((ele) => ele.id !== id);
  },

  // Update a field in one of the FAQ items (question or answer)
  changeFAQList: (state, action) => {
    const { id, index, content, field } = action.payload;
    const faqComp = state.frequentlyAsked.find((ele) => ele.id === id);
    if (faqComp && faqComp.content && Array.isArray(faqComp.content.fAndq)) {
      faqComp.content.fAndq[index][field] = content;
    }
  },

  // Add a new FAQ item to the FAQ component
  addFAQItem: (state, action) => {
    const { id, fAndq } = action.payload;
    const faqComp = state.frequentlyAsked.find((ele) => ele.id === id);
    if (faqComp && faqComp.content && Array.isArray(faqComp.content.fAndq)) {
      // Assign a unique id to the new FAQ item if not provided
      fAndq.id = fAndq.id || Date.now();
      faqComp.content.fAndq.push(fAndq);
    }
  },

  // Remove a FAQ item from the FAQ component by its index
  removeFAQItem: (state, action) => {
    const { id, index } = action.payload;
    const faqComp = state.frequentlyAsked.find((ele) => ele.id === id);
    if (faqComp && faqComp.content && Array.isArray(faqComp.content.fAndq)) {
      faqComp.content.fAndq.splice(index, 1);
    }
  },

  // Update global FAQ fields (title or image)
  changeFAQ: (state, action) => {
    const { id, content, type } = action.payload;
    const faqComp = state.frequentlyAsked.find((ele) => ele.id === id);
    if (faqComp) {
      if (type === "title") {
        faqComp.content.title = content;
      } else if (type === "image") {
        faqComp.content.image = content;
      }
    }
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
  removeServiceItem,
  addServiceItem,
  removeService,
  addBenefit,
  changeBenefits,
  removeBenefit,
  addAbout,
  changeAbout,
  removeAbout,
  changeServicesList,
  changeBenefitsList,
  addBenefitsItem,
  removeBenefitItem,
  changeAboutList,
  addAboutItem,
  removeAboutItem,
  addFAQ,
  removeFAQ,removeFAQItem,addFAQItem,changeFAQList,changeFAQ
} = universalThemeReducer.actions;
