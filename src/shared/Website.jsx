import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AboutUsSection from '../components/preview/AboutUsSection';
import BenefitesSection from '../components/preview/BenefitesSection';
import FAQSection from '../components/preview/FAQSection';
import FormSection from '../components/preview/FormSection';
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
    return (
        
        <div>


            {data?.sectionsPositions?.map((ele, index) => {
                const websiteTheme = data.websiteData.theme
                if(ele.title === 'HERO'){
                    const section = data.websiteData.hero
                    return section.map((hero) => {
                        if (hero.id === ele.id)
                            return (
                                <HeroSection key={index} data={hero} isFetchedTheme={true} fetchingThemeData={websiteTheme} />
                            )
                    })
                }
                else if (ele.title === 'BENEFITS') {

                    const section = data.websiteData.benefits
                    return section.map((benefit) => {
                        if (benefit.id === ele.id)
                            return (
                       
                                <BenefitesSection key={index} data={benefit} isFetchedTheme={true} fetchingThemeData={websiteTheme}/>
                            )
                    })

                } else if (ele.title === 'SERVICES') {
                    const section = data.websiteData.services
                    return section.map((service) => {
                        if (service.id === ele.id)
                            return (
                                <ServicesOrOfferingSection key={index} data={service} isFetchedTheme={true} fetchingThemeData={websiteTheme}/>
                            )
                    })


                }else if (ele.title === 'TESTIMONIALS'){
                    const section = data.websiteData.testimonials
                    return section.map((testimonial) => {
                        if (testimonial.id === ele.id)
                            return (
                                <TestimonialSection key={index} data={testimonial} isFetchedTheme={true} fetchingThemeData={websiteTheme}/>
                            )
                    })
                } else if (ele.title === 'ABOUT US'){
                    const section = data.websiteData.about
                    return section.map((about) => {
                        if (about.id === ele.id)
                            return (
                                <AboutUsSection key={index} data={about} isFetchedTheme={true} fetchingThemeData={websiteTheme}/>
                            )
                    })
                }else if (ele.title === 'FAQ'){
                    const section = data.websiteData.frequentlyAsked
                    return section.map((question) => {
                        if (question.id === ele.id)
                            return (
                                <FAQSection key={index} data={question} isFetchedTheme={true} fetchingThemeData={websiteTheme}/>
                            )
                    })
                
                }else if (ele.title === 'INCLUDED / NOT-INCLUDED'){
                    const section = data.websiteData.includedNotIncluded
                    return section.map((include) => {
                        if (include.id === ele.id)
                            return (
                                <IncludedOrNotIncludedSection key={index} data={include} isFetchedTheme={true} fetchingThemeData={websiteTheme}/>
                            )
                    })
                
                }else if (ele.title === 'FORM'){
                    const section = data.websiteData.form
                    return section.map((form) => {
                        if (form.id === ele.id)
                            return (
                                <FormSection key={index} data={form} isFetchedTheme={true} fetchingThemeData={websiteTheme}/>
                            )
                    })
                }

            })}
        </div>
    )
}

export default Website
