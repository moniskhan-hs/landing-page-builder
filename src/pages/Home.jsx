import { useTheme } from '@mui/material'

import PlayGround from '../shared/PlayGround'
import Sidebar from '../shared/Sidebar'


const HomePage = () => {
    const theme = useTheme()
    return (
        <div style={{
            width: '100%',
            height: "100vh",
            display: 'flex',
            gap: 2
        }}>
            <div style={{
                width: "15%",
                borderRight: `1px solid ${theme.palette.text.secondary}`
            }}>

                <Sidebar />
            </div>


            <div style={{
                width: "100%",
            }}>

                <PlayGround />
            </div>
        </div>
        // <FAQSection/>
        // <ServicesOrOfferingSection />
        // <TestimonialSection />
        
        // <BenefitesSection />
        // <IncludedOrNotIncluded/>
        // <FormSection/>
        // <AboutUsSection/>
        // <CallToActionSection/>
        

    )
}

export default HomePage
