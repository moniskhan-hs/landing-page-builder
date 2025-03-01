import { Box, Stack } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AboutUsSection from '../components/preview/AboutUsSection';
import BenefitesSection from '../components/preview/BenefitesSection';
import FAQSection from '../components/preview/FAQSection';
import FooterSection from '../components/preview/FooterSection';
import FormSection from '../components/preview/FormSection/FormSection';
import HeaderSection from '../components/preview/HeaderSection';
import HeroSection from '../components/preview/HeroSection';
import IncludedOrNotIncludedSection from '../components/preview/IncludedOrNotIncludedSection';
import ServicesOrOfferingSection from '../components/preview/ServicesOrOfferingSection';
import TestimonialSection from '../components/preview/TestimonialSection';
import { db } from '../firebase';

const Website = () => {
    const [data, setData] = useState()

    const { id } = useParams()
    useEffect(() => {
        // fetch the data
        // 1. Get Single Website by ID
        const getWebsiteById = async (websiteId) => {
            try {
                const docRef = doc(db, "websites", websiteId);
                const docSnap = await getDoc(docRef);


                if (docSnap.exists()) {
                    console.log('data', docSnap.data())
                    setData(docSnap.data())
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
        getWebsiteById(id)

    }, [id])

    console.log('   data.websiteData.theme:', data?.
        websiteData?.theme)
    return (

        <div>

            <Box sx={{
                position: "sticky",
                top: '0rem',
                zIndex: 100,
            }}>
                <HeaderSection menuList={data?.sectionsPositions} buttonText={data?.websiteData?.theme?.header?.headerButtonText} logoImageURL={data?.websiteData?.theme?.header?.headerLogoImage} buttonBackgroundColor={data?.websiteData?.theme.button.buttonBackground} buttonTextColor={data?.websiteData?.theme.button.buttonTextColor} backgroundColor={data?.websiteData?.theme?.header?.backgroundColor} />
            </Box>
            <Stack>
                {data?.sectionsPositions?.map((ele, index) => {
                    const websiteTheme = data.websiteData.theme
                    if (ele.title === 'HERO') {
                        const section = data.websiteData.hero
                        return section.map((hero) => {
                            if (hero.id === ele.id)
                                return (
                                    <Box id={ele.id} key={index}>

                                        <HeroSection data={hero} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                                    </Box>
                                )
                        })
                    }
                    else if (ele.title === 'BENEFITS') {
                        const section = data.websiteData.benefits
                        return section.map((benefit) => {
                            if (benefit.id === ele.id)
                                return (
                                    <Box id={ele.id} key={index}>
                                        <BenefitesSection key={index} data={benefit} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                                    </Box>
                                )
                        })

                    } else if (ele.title === 'SERVICES') {
                        const section = data.websiteData.services
                        return section.map((service) => {
                            if (service.id === ele.id)
                                return (
                                    <Box key={index} id={ele.id}>

                                        <ServicesOrOfferingSection key={index} data={service} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                                    </Box>
                                )
                        })


                    } else if (ele.title === 'TESTIMONIALS') {
                        const section = data.websiteData.testimonials
                        return section.map((testimonial) => {
                            if (testimonial.id === ele.id)
                                return (
                                    <Box key={index} id={ele.id}>

                                        <TestimonialSection key={index} data={testimonial} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                                    </Box>
                                )
                        })
                    } else if (ele.title === 'ABOUT US') {
                        const section = data.websiteData.about
                        return section.map((about) => {
                            if (about.id === ele.id)
                                return (
                                    <Box key={index} id={ele.id}>

                                        <AboutUsSection key={index} data={about} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                                    </Box>
                                )
                        })
                    } else if (ele.title === 'FAQ') {
                        const section = data.websiteData.frequentlyAsked
                        return section.map((question) => {
                            if (question.id === ele.id)
                                return (
                                    <Box id={ele.id} key={index}>

                                        <FAQSection key={index} data={question} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                                    </Box>
                                )
                        })

                    } else if (ele.title === 'INCLUDED / NOT-INCLUDED') {
                        const section = data.websiteData.includedNotIncluded
                        return section.map((include) => {
                            if (include.id === ele.id)
                                return (
                                    <Box id={ele.id} key={index}>

                                        <IncludedOrNotIncludedSection key={index} data={include} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                                    </Box>
                                )
                        })

                    } else if (ele.title === 'FORM') {
                        const section = data.websiteData.form
                        return section.map((form) => {
                            if (form.id === ele.id)
                                return (
                                    <Box id={ele.id} key={index}>

                                        <FormSection key={index} data={form} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                                    </Box>
                                )
                        })
                    }

                })}
            </Stack>
            <FooterSection footerData={data?.websiteData?.theme.footer} />



        </div>)
}

export default Website
