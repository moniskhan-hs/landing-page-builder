import AboutInputs from "../components/editInputs/AboutInputs";
import BenefitsInputs from "../components/editInputs/BenefitsInputs";
import CallToActionInputs from "../components/editInputs/CallToActionInputs";
import FAQsInputs from "../components/editInputs/FAQsInputs";
import FormInputs from "../components/editInputs/FormInputs";
import HeroInputs from "../components/editInputs/HeroInputs";
import ScheduleSectionInputs from "../components/editInputs/ScheduleSectionInputs";
import ServicesInputs from "../components/editInputs/ServicesInputs";
import TestimonialsInputs from '../components/editInputs/TestimonialsInputs';
import ThemeInputs from "../components/editInputs/ThemeInputs/ThemeInputs";
import AboutUsSection from "../components/preview/AboutUsSection";
import BenefitesSection from "../components/preview/BenefitesSection";
import CallToActionSection from "../components/preview/CallToActionSection";
import FAQSection from "../components/preview/FAQSection";
import FormSection from "../components/preview/FormSection";
import HeroSection from "../components/preview/HeroSection";
import IncludedOrNotIncluded from "../components/preview/IncludedOrNotIncluded";
import ScheduleSection from "../components/preview/ScheduleSection";
import ServicesOrOfferingSection from "../components/preview/ServicesOrOfferingSection";
import TestimonialSection from "../components/preview/TestimonialSection";

const componentMap = {
    "HERO": HeroSection,
    "SERVICES": ServicesOrOfferingSection,
    "TESTIMONIALS": TestimonialSection,
    "BENEFITS":BenefitesSection,
    "INCLUDED / NOT-INCLUDED":IncludedOrNotIncluded,
    "ABOUT US": AboutUsSection,
    "SCHEDULE": ScheduleSection,
    "FORM": FormSection,
    "FAQ": FAQSection,
    "CALL TO ACTION": CallToActionSection
};

export const chooseRenderComponent = (title) => {
    return componentMap[title] || null; 
};



export const componentsInputs = [

   { "HERO": HeroInputs,},
    {"SERVICES": ServicesInputs},
    {"TESTIMONIALS": TestimonialsInputs},
    {"BENEFITS":BenefitsInputs},
    {"INCLUDED / NOT-INCLUDED":IncludedOrNotIncluded},
    {"ABOUT US": AboutInputs},
    {"SCHEDULE": ScheduleSectionInputs},
   { "FORM": FormInputs},
   { "FAQ": FAQsInputs},
   { "CALL TO ACTION": CallToActionInputs},
   { 'THEME':ThemeInputs}
]


  