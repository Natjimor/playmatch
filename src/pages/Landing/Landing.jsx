
import AboutSect from '../../components/AboutSection/AboutSection'
import CalltoAction from '../../components/CallSection/CallSection'
import Navbar from '../../components/Navbar/Navbar'
import StepSect from '../../components/StepSection/StepSect'
import '../../styles/Landing.css'

export default function Landing() {

  return (
    <div>
      <Navbar/>
      <CalltoAction/>
      <AboutSect/>
      <StepSect/>
    </div>
  )
}