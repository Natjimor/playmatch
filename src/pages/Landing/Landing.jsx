
import AboutSect from '../../components/AboutSection/AboutSection'
import BenefictSect from '../../components/BenefictSection/BenefictSection'
import CalltoAction from '../../components/CallSection/CallSection'
import Navbar from '../../components/Navbar/Navbar'
import StepSect from '../../components/StepSection/StepSect'
import TestimonySect from '../../components/TestimonySection/TestimonySection'
import '../../styles/Landing.css'

export default function Landing() {

  return (
    <div>
      <Navbar/>
      <CalltoAction/>
      <AboutSect/>
      <StepSect/>
      <BenefictSect/>
      <TestimonySect/>
    </div>
  )
}