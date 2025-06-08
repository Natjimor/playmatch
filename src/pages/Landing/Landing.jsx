
import AboutSect from '../../components/AboutSection/AboutSection'
import BenefictSect from '../../components/BenefictSection/BenefictSection'
import CalltoAction from '../../components/CallSection/CallSection'
import Navbar from '../../components/Navbar/Navbar'
import PQSection from '../../components/FAQSection/FAQSection'
import StepSect from '../../components/StepSection/StepSect'
import TestimonySect from '../../components/TestimonySection/TestimonySection'
import '../../styles/Landing.css'
import Footer from '../../components/Footer/Footer'

export default function Landing() {

  return (
    <div>
      <Navbar/>
      <CalltoAction/>
      <AboutSect/>
      <StepSect/>
      <BenefictSect/>
      <TestimonySect/>
      <PQSection/>
      <Footer/>
    </div>
  )
}