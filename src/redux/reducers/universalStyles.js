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

  about: [],

  frequentlyAsked: [],

  includedNotIncluded: [],

  testimonials: [],

  callToAction: [],


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
      const serviceComp = state.services.find((ele) => ele.id === id);
      if (
        serviceComp &&
        serviceComp.content &&
        Array.isArray(serviceComp.content.services)
      ) {
        serviceComp.content.services[index][field] = content;
      }
    },
    addServiceItem: (state, action) => {
      const { id, service } = action.payload;
      const serviceComp = state.services.find((ele) => ele.id === id);
      if (
        serviceComp &&
        serviceComp.content &&
        Array.isArray(serviceComp.content.services)
      ) {
        // Assign a unique id to the new service if not provided
        service.id = service.id || Date.now();
        serviceComp.content.services.push(service);
      }
    },
    removeServiceItem: (state, action) => {
      const { id, index } = action.payload;
      const serviceComp = state.services.find((ele) => ele.id === id);
      if (
        serviceComp &&
        serviceComp.content &&
        Array.isArray(serviceComp.content.services)
      ) {
        serviceComp.content.services.splice(index, 1);
      }
    },

    changeServices: (state, action) => {
      const { id, content, type } = action.payload;
      const serviceComp = state.services.find((ele) => ele.id === id);
      if (serviceComp) {
        if (type === "title") {
          serviceComp.content.title = content;
        } else if (type === "content") {
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
      const benefitComp = state.benefits.find((ele) => ele.id === id);
      if (
        benefitComp &&
        benefitComp.content &&
        Array.isArray(benefitComp.content.benefits)
      ) {
        benefitComp.content.benefits[index][field] = content;
      }
    },

    addBenefitsItem: (state, action) => {
      const { id, benefit } = action.payload;
      const benefitComp = state.benefits.find((ele) => ele.id === id);
      if (
        benefitComp &&
        benefitComp.content &&
        Array.isArray(benefitComp.content.benefits)
      ) {
        // Assign a unique id to the new benefit if not provided
        benefit.id = benefit.id || Date.now();
        benefitComp.content.benefits.push(benefit);
      }
    },

    removeBenefitItem: (state, action) => {
      const { id, index } = action.payload;
      const benefitComp = state.benefits.find((ele) => ele.id === id);
      if (
        benefitComp &&
        benefitComp.content &&
        Array.isArray(benefitComp.content.benefits)
      ) {
        benefitComp.content.benefits.splice(index, 1);
      }
    },

    changeBenefits: (state, action) => {
      const { id, content, type } = action.payload;
      const component = state.benefits.find((ele) => ele.id === id);
      if (component) {
        if (type === "title") {
          component.content.title = content;
        } else if (type === "content") {
          component.content.benefits = content;
        } else if (type === "optionalText") {
          component.content.optionalText = content;
        }
      }
    },

    // ------------------------------------------------- A B O U T   U S ------------------------------------------

    addAbout: (state, action) => {
      state.about.push(action.payload);
    },

    removeAbout: (state, action) => {
      const id = action.payload;
      state.about = state.about.filter((ele) => ele.id !== id);
    },

    changeAboutList: (state, action) => {
      const { id, index, content, field } = action.payload;
      const aboutComp = state.about.find((ele) => ele.id === id);
      if (
        aboutComp &&
        aboutComp.content &&
        Array.isArray(aboutComp.content.abouts)
      ) {
        aboutComp.content.abouts[index][field] = content;
      }
    },

    addAboutItem: (state, action) => {
      const { id, about } = action.payload;
      const aboutComp = state.about.find((ele) => ele.id === id);
      if (
        aboutComp &&
        aboutComp.content &&
        Array.isArray(aboutComp.content.abouts)
      ) {
        // Assign a unique id to the new service if not provided
        about.id = about.id || Date.now();
        aboutComp.content.abouts.push(about);
      }
    },

    removeAboutItem: (state, action) => {
      const { id, index } = action.payload;
      const aboutComp = state.about.find((ele) => ele.id === id);
      if (
        aboutComp &&
        aboutComp.content &&
        Array.isArray(aboutComp.content.abouts)
      ) {
        aboutComp.content.abouts.splice(index, 1);
      }
    },
    changeAbout: (state, action) => {
      const { id, content, type } = action.payload;
      const component = state.about.find((ele) => ele.id === id);
      if (component) {
        if (type === "title") {
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
      state.frequentlyAsked = state.frequentlyAsked.filter(
        (ele) => ele.id !== id
      );
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

    // ------------------------------------------------- INCLUDED / NOT INCLUDED --------------------------------------------
    addIncludedAndNotIncluded: (state, action) => {
      state.includedNotIncluded.push(action.payload);
    },

    removeIncludedNotIncluded: (state, action) => {
      const id = action.payload;
      state.includedNotIncluded = state.includedNotIncluded.filter(
        (ele) => ele.id !== id
      );
    },

    changeIncludedNotIncluded: (state, action) => {
      const { id, content, type } = action.payload;
      const includedNotIncludedComp = state.includedNotIncluded.find(
        (ele) => ele.id === id
      );
      if (includedNotIncludedComp) {
        if (type === "title") {
          includedNotIncludedComp.content.title = content;
        } else if (type === "infoText") {
          includedNotIncludedComp.content.infoText = content;
        } else if (type === "content") {
          includedNotIncludedComp.content.includes = content;
        }
      }
    },

    changeIncludedNotIncludedList: (state, action) => {
      const { id, index, content, field } = action.payload;
      const includedNotIncludedComp = state.includedNotIncluded.find(
        (ele) => ele.id === id
      );
      if (
        includedNotIncludedComp &&
        includedNotIncludedComp.content &&
        Array.isArray(includedNotIncludedComp.content.includes)
      ) {
        includedNotIncludedComp.content.includes[index][field] = content;
      }
    },

    addIncludesItem: (state, action) => {
      const { id, include } = action.payload;
      const includesComp = state.includedNotIncluded.find(
        (ele) => ele.id === id
      );
      if (
        includesComp &&
        includesComp.content &&
        Array.isArray(includesComp.content.includes)
      ) {
        // Assign a unique id to the new service if not provided
        include.id = include.id || Date.now();
        includesComp.content.includes.push(include);
      }
    },
    removeIncludeItem: (state, action) => {
      const { id, index } = action.payload;
      const includesComp = state.includedNotIncluded.find(
        (ele) => ele.id === id
      );
      if (
        includesComp &&
        includesComp.content &&
        Array.isArray(includesComp.content.includes)
      ) {
        includesComp.content.includes.splice(index, 1);
      }
    },



    // ---------------------------------------------------T E S T I M O N I A L S  --------------------------------------------
    addTestimonials: (state, action) => {
      state.testimonials.push(action.payload);
    },

    removeTestimonials: (state, action) => {
      const id = action.payload;
      state.testimonials = state.testimonials.filter(
        (ele) => ele.id !== id
      );
    },


    changeTestimonialsList: (state, action) => {
      const { id, index, content, field } = action.payload;
      const testimonialsComp = state.testimonials.find((ele) => ele.id === id);
      if (
        testimonialsComp &&
        testimonialsComp.content &&
        Array.isArray(testimonialsComp.content.users)
      ) {
        testimonialsComp.content.users[index][field] = content;
      }
    },
    addTestimonialItem: (state, action) => {
      const { id, user } = action.payload;
      const testimonialComp = state.testimonials.find((ele) => ele.id === id);
      if (
        testimonialComp &&
        testimonialComp.content &&
        Array.isArray(testimonialComp.content.users)
      ) {
        // Assign a unique id to the new service if not provided
        user.id = user.id || Date.now();
        testimonialComp.content.users.push(user);
      }
    },
    removeTestimonialItem: (state, action) => {
      const { id, index } = action.payload;
      const testimonialComp = state.testimonials.find((ele) => ele.id === id);
      if (
        testimonialComp &&
        testimonialComp.content &&
        Array.isArray(testimonialComp.content.users)
      ) {
        testimonialComp.content.users.splice(index, 1);
      }
    },

    changeTestimonials: (state, action) => {
      const { id, content, type } = action.payload;
      const testimonialComp = state.testimonials.find((ele) => ele.id === id);
      if (testimonialComp) {
        if (type === "title") {
          testimonialComp.content.title = content;
        } else if (type === "infoText") {
          testimonialComp.content.infoText = content;
        } else if (type === 'highlightedName') {
          testimonialComp.content.highlightedReview.name = content
        } else if (type === 'highlightedAddress') {
          testimonialComp.content.highlightedReview.address = content
        } else if (type === 'highlightedDescription') {
          testimonialComp.content.highlightedReview.description = content
        } else if (type === 'highlightedRatingValue') {
          testimonialComp.content.highlightedReview.ratingValue = content
        } else if (type == 'highlightedImage') {
          testimonialComp.content.highlightedReview.image = content
        } else if (type === "content") {
          testimonialComp.content.users = content;
        }
      }

    },


    // ----------------------------------------------------------- C A L L   T O   A C T I O N -----------------------------------------------------

    addCallToAction: (state, action) => {
      state.callToAction.push(action.payload)
    },
    removeCallToAction: (state, action) => {
      const id = action.payload;
      state.callToAction = state.callToAction.filter(
        (ele) => ele.id !== id
      );
    },
    changeCallToActionList: (state, action) => {
      const { id, index, content,arrayName} = action.payload;
      const callToActionComp = state.callToAction.find((ele) => ele.id === id);
      if (
        callToActionComp &&
        callToActionComp.content &&
        Array.isArray(callToActionComp.content[arrayName])
      ) {
        callToActionComp.content[arrayName][index].text = content;
      }
    },
    addCallToActionItem: (state, action) => {
      const { id, item,arrayName } = action.payload;
      const callToActionComp = state.callToAction.find((ele) => ele.id === id);
      if (
        callToActionComp &&
        callToActionComp.content &&
        Array.isArray(callToActionComp.content[arrayName])
      ) {
        // Assign a unique id to the new service if not provided
        item.id = item.id || Date.now();
        callToActionComp.content[arrayName].push(item);
      }
    },
    removeCallToActionItem: (state, action) => {
      const { id, index,arrayName } = action.payload;
      const callToActionComp = state.callToAction.find((ele) => ele.id === id);
      if (
        callToActionComp &&
        callToActionComp.content &&
        Array.isArray(callToActionComp.content[arrayName])
      ) {
        callToActionComp.content[arrayName].splice(index, 1);
      }
    },
    changeCallToAction: (state, action) => {
      const { id, content, type } = action.payload;
      const callToActionComp = state.callToAction.find((ele) => ele.id === id);
      if (callToActionComp) {
        if (type === "title") {
          callToActionComp.content.title = content;
        } else if (type === "infoText") {
          callToActionComp.content.infoText = content;
        } 
         else if (type === "buttonText") {
          callToActionComp.content.buttonText = content;
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
  changeServicesList,
  addBenefit,
  changeBenefits,
  removeBenefit,
  addBenefitsItem,
  removeBenefitItem,
  changeBenefitsList,
  addAbout,
  changeAbout,
  removeAbout,
  changeAboutList,
  addAboutItem,
  removeAboutItem,
  addFAQ,
  removeFAQ,
  removeFAQItem,
  addFAQItem,
  changeFAQList,
  changeFAQ,
  addIncludedAndNotIncluded,
  removeIncludedNotIncluded,
  changeIncludedNotIncluded,
  changeIncludedNotIncludedList,
  addIncludesItem,
  removeIncludeItem,
  changeTestimonials, removeTestimonialItem, addTestimonialItem, changeTestimonialsList, removeTestimonials, addTestimonials,
  addCallToAction,addCallToActionItem,changeCallToAction,changeCallToActionList,removeCallToAction,removeCallToActionItem

} = universalThemeReducer.actions;
