// import { Box, Container, Stack } from "@mui/material";
// import { doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import AboutUsSection from "../components/preview/AboutUsSection";
// import BenefitesSection from "../components/preview/BenefitesSection";
// import FAQSection from "../components/preview/FAQSection";
// import FooterSection from "../components/preview/FooterSection";
// import FormSection from "../components/preview/FormSection/FormSection";
// import HeaderSection from "../components/preview/HeaderSection";
// import HeroSection from "../components/preview/HeroSection";
// import IncludedOrNotIncludedSection from "../components/preview/IncludedOrNotIncludedSection";
// import ServicesOrOfferingSection from "../components/preview/ServicesOrOfferingSection";
// import TestimonialSection from "../components/preview/TestimonialSection";
// import { db } from "../firebase";
// import CallToActionSection from "../components/preview/CallToActionSection";

// const Website = () => {
//   const [data, setData] = useState();

//   const { id } = useParams();
//   useEffect(() => {
//     // fetch the data
//     // 1. Get Single Website by ID
//     const getWebsiteById = async (websiteId) => {
//       try {
//         const docRef = doc(db, "websites", websiteId);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           console.log("data", docSnap.data());
//           setData(docSnap.data());
//           return { id: docSnap.id, ...docSnap.data() };
//         } else {
//           console.log("No such document!");
//           return null;
//         }
//       } catch (error) {
//         console.error("Error getting document:", error);
//         throw error;
//       }
//     };
//     getWebsiteById(id);
//   }, [id]);

//   console.log("   data.websiteData.theme:", data?.websiteData?.theme);
//   return (
//     <Box sx={{ width: "100%" }}>
//       <Box
//         sx={{
//           position: "sticky",
//           top: "0rem",
//           zIndex: 100,
//           width: "100%",
//         }}
//       >
//         <HeaderSection
//           isFetchedTheme={true}
//           menuList={data?.sectionsPositions}
//           buttonText={data?.websiteData?.theme?.header?.headerButtonText}
//           logoImageURL={data?.websiteData?.theme?.header?.headerLogoImage}
//           buttonBackgroundColor={
//             data?.websiteData?.theme.button.buttonBackground
//           }
//           buttonTextColor={data?.websiteData?.theme.button.buttonTextColor}
//           backgroundColor={data?.websiteData?.theme?.header?.backgroundColor}
//         />
//       </Box>

//       <Box
//         sx={{
//           width: "100%",
//           display: "flex",
//           bgcolor: data?.websiteData?.theme.background.default,
//           paddingInline: "5rem",
//         }}
//       >
//         <Box
//           sx={{
//             width: "30%",
//             position:"relative"
//           }}
//         >
//           <Box sx={
//             {
//               position:"sticky",
//               top:"30%",
//               left:"50%"
//             }
//           }>
//           <CallToActionSection/>

//           </Box>
//         </Box>

//         <Box sx={{ flex: 1 }}>
//           {data?.sectionsPositions?.map((ele, index) => {
//             const websiteTheme = data.websiteData.theme;
//             const firstSection = data?.sectionsPositions?.[0];
//             if (firstSection) {
//               console.log('The first section is:', firstSection.title);
//             } else {
//               console.log('No sections available.');
//             }
//             if (ele.title === "HERO") {
//               const section = data.websiteData.hero;
//               return section.map((hero) => {
//                 if (hero.id === ele.id)
//                   return (
//                     <Box id={ele.id} key={index}>
//                       <HeroSection
//                         data={hero}
//                         isFetchedTheme={true}
//                         fetchingThemeData={websiteTheme}
//                       />
//                     </Box>
//                   );
//               });
//             } else if (ele.title === "BENEFITS") {
//               const section = data.websiteData.benefits;
//               return section.map((benefit) => {
//                 if (benefit.id === ele.id)
//                   return (
//                     <Box id={ele.id} key={index} bgcolor={"red"}>
//                       <BenefitesSection
//                         key={index}
//                         data={benefit}
//                         isFetchedTheme={true}
//                         fetchingThemeData={websiteTheme}
//                       />
//                     </Box>
//                   );
//               });
//             } else if (ele.title === "SERVICES") {
//               const section = data.websiteData.services;
//               return section.map((service) => {
//                 if (service.id === ele.id)
//                   return (
//                     <Box key={index} id={ele.id}>
//                       <ServicesOrOfferingSection
//                         key={index}
//                         data={service}
//                         isFetchedTheme={true}
//                         fetchingThemeData={websiteTheme}
//                       />
//                     </Box>
//                   );
//               });
//             } else if (ele.title === "TESTIMONIALS") {
//               const section = data.websiteData.testimonials;
//               return section.map((testimonial) => {
//                 if (testimonial.id === ele.id)
//                   return (
//                     <Box key={`${index}-${ele.id}`} id={ele.id}>
//                       <TestimonialSection
//                         key={index}
//                         data={testimonial}
//                         isFetchedTheme={true}
//                         fetchingThemeData={websiteTheme}
//                       />
//                     </Box>
//                   );
//               });
//             } else if (ele.title === "ABOUT US") {
//               const section = data.websiteData.about;
//               return section.map((about) => {
//                 if (about.id === ele.id)
//                   return (
//                     <Box key={index} id={ele.id}>
//                       <AboutUsSection
//                         key={index}
//                         data={about}
//                         isFetchedTheme={true}
//                         fetchingThemeData={websiteTheme}
//                       />
//                     </Box>
//                   );
//               });
//             } else if (ele.title === "FAQ") {
//               const section = data.websiteData.frequentlyAsked;
//               return section.map((question) => {
//                 if (question.id === ele.id)
//                   return (
//                     <Box id={ele.id} key={index}>
//                       <FAQSection
//                         key={index}
//                         data={question}
//                         isFetchedTheme={true}
//                         fetchingThemeData={websiteTheme}
//                       />
//                     </Box>
//                   );
//               });
//             } else if (ele.title === "INCLUDED / NOT-INCLUDED") {
//               const section = data.websiteData.includedNotIncluded;
//               return section.map((include) => {
//                 if (include.id === ele.id)
//                   return (
//                     <Box id={ele.id} key={index}>
//                       <IncludedOrNotIncludedSection
//                         key={index}
//                         data={include}
//                         isFetchedTheme={true}
//                         fetchingThemeData={websiteTheme}
//                       />
//                     </Box>
//                   );
//               });
//             } else if (ele.title === "FORM") {
//               const section = data.websiteData.form;
//               return section.map((form) => {
//                 if (form.id === ele.id)
//                   return (
//                     <Box id={ele.id} key={index}>
//                       <FormSection
//                         key={index}
//                         data={form}
//                         isFetchedTheme={true}
//                         fetchingThemeData={websiteTheme}
//                       />
//                     </Box>
//                   );
//               });
//             }
//           })}
//         </Box>
//       </Box>

//       <Box>
//         <FooterSection
//           isFetchedTheme={true}
//           footerData={data?.websiteData?.theme.footer}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Website;



import { Box, useMediaQuery, useTheme} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AboutUsSection from "../components/preview/AboutUsSection";
import BenefitesSection from "../components/preview/BenefitesSection";
import FAQSection from "../components/preview/FAQSection";
import FooterSection from "../components/preview/FooterSection";
import FormSection from "../components/preview/FormSection/FormSection";
import HeaderSection from "../components/preview/HeaderSection";
import HeroSection from "../components/preview/HeroSection";
import IncludedOrNotIncludedSection from "../components/preview/IncludedOrNotIncludedSection";
import ServicesOrOfferingSection from "../components/preview/ServicesOrOfferingSection";
import TestimonialSection from "../components/preview/TestimonialSection";
import { db } from "../firebase";
import CallToActionSection from "../components/preview/CallToActionSection";

const Website = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [contactFormId,setContactFormId] = useState()

  useEffect(() => {
    const getWebsiteById = async (websiteId) => {
      try {
        const docRef = doc(db, "websites", websiteId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("data", docSnap.data());
          setData(docSnap.data());
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error getting document:", error);
        throw error;
      }
    };
    getWebsiteById(id);
  }, [id]);

  const websiteTheme = data?.websiteData?.theme;

  // Helper to determine the section data and the component based on the title.
  const getSectionInfo = (title) => {
    switch (title) {
      case "HERO":
        return { sectionData: data?.websiteData?.hero || [], Component: HeroSection };
      case "BENEFITS":
        return { sectionData: data?.websiteData?.benefits || [], Component: BenefitesSection };
      case "SERVICES":
        return { sectionData: data?.websiteData?.services || [], Component: ServicesOrOfferingSection };
      case "TESTIMONIALS":
        return { sectionData: data?.websiteData?.testimonials || [], Component: TestimonialSection };
      case "ABOUT US":
        return { sectionData: data?.websiteData?.about || [], Component: AboutUsSection };
      case "FAQ":
        return { sectionData: data?.websiteData?.frequentlyAsked || [], Component: FAQSection };
      case "INCLUDED / NOT-INCLUDED":
        return { sectionData: data?.websiteData?.includedNotIncluded || [], Component: IncludedOrNotIncludedSection };
      case "FORM":
        return { sectionData: data?.websiteData?.form || [], Component: FormSection };
      default:
        return { sectionData: [], Component: null };
    }
  };

  // Extract the first section position and render its first matching object above the map.
  let firstSectionRendered = null;
  const firstSectionPosition = data?.sectionsPositions?.[0];
  if (firstSectionPosition) {
    const { sectionData, Component } = getSectionInfo(firstSectionPosition.title);
    // Find the first matching object (if multiple objects exist, we take the first one)
    const firstObj = sectionData.find((item) => item.id === firstSectionPosition.id);
    if (firstObj && Component) {
      firstSectionRendered = (
        <Box id={firstSectionPosition.id} key={`first-${firstSectionPosition.id}`}  sx={{
          paddingInline:{xs:'0rem', md:"5rem"},
        }}>
          <Component
            data={firstObj}
            isFetchedTheme={true}
            fetchingThemeData={websiteTheme}
            formID={contactFormId}
          />
        </Box>
      );
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: "0rem",
          zIndex: 100,
          width: "100%",
        }}
      >
        <HeaderSection
          isFetchedTheme={true}
          menuList={data?.sectionsPositions}
          buttonText={data?.websiteData?.theme?.header?.headerButtonText}
          logoImageURL={data?.websiteData?.theme?.header?.headerLogoImage}
          buttonBackgroundColor={data?.websiteData?.theme?.button?.buttonBackground}
          buttonTextColor={data?.websiteData?.theme?.button?.buttonTextColor}
          backgroundColor={data?.websiteData?.theme?.header?.backgroundColor}
          onFormIdChange= {setContactFormId}
      
      />
      </Box>
      {firstSectionRendered}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          bgcolor: data?.websiteData?.theme?.background?.default,
          paddingInline:{xs:'1rem', md:"5rem"},
        }}
      >
     {  !isMobile && <Box sx={{ width: "30%", position: "relative" }}>
          <Box sx={{ position: "sticky", top: "30%", left: "50%" }}>
            <CallToActionSection formID={contactFormId}  data = {data?.websiteData?.callToAction?.[0]} isFetchedTheme ={true } fetchingThemeData ={data?.websiteData?.theme}/>
          </Box>
        </Box>}

        <Box sx={{ flex: 1 }}>
          {/* Render the first section's first object above the map */}

          {/* Map through all section positions */}
          {data?.sectionsPositions?.map((ele, index) => {
            const { sectionData, Component } = getSectionInfo(ele.title);
            if (!sectionData.length || !Component) return null;

            // For the first section, filter out the object already rendered
            const itemsToRender =
              index === 0
                ? sectionData.filter((item) => item.id !== firstSectionPosition.id)
                : sectionData;

            return itemsToRender.map((item, idx) => {
              // Render only the matching object (skip others)
              if (item.id !== ele.id) return null;
              return (
                <Box id={ele.id} key={`${ele.id}-${idx}`}>
                  <Component
                    data={item}
                    isFetchedTheme={true}
                    fetchingThemeData={websiteTheme}
                    formID={contactFormId}
                  />
                </Box>
              );
            });
          })}
        </Box>
      </Box>

      {/* Footer */}
      <Box>
        <FooterSection
          isFetchedTheme={true}
          footerData={data?.websiteData?.theme?.footer}
        />
      </Box>
    </Box>
  );
};

export default Website;
