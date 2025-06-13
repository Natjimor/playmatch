import '../../styles/Landing.css'
import Navbar from '../../components/Navbar/Navbar'
import CalltoAction from '../../components/CallSection/CallSection'
import AboutSect from '../../components/AboutSection/AboutSection'
import StepSect from '../../components/StepSection/StepSect'
import BenefictSect from '../../components/BenefictSection/BenefictSection'
import TestimonySect from '../../components/TestimonySection/TestimonySection'
import FAQSection from '../../components/FAQSection/FAQSection'
import Footer from '../../components/Footer/Footer'

export default function Landing() {

  return (
    <div className='Landing'>
      <Navbar/>
      <CalltoAction/>
      <AboutSect/>
      <StepSect/>
      <BenefictSect/>
      <TestimonySect/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}