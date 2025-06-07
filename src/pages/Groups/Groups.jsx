import Navbar from '../../components/Navbar/Navbar'
import FunctionBar from '../../components/Groups/FunctionBar/functionBar'
import NewRecommendations from '../../components/Groups/NewRecommendations/newRecommendations'
import Participants from '../../components/Groups/Participants/participants'
import PrintRecommendations from '../../components/Groups/PrintRecommendations/printRecommendations'
import "../../styles/Group/groups.css"

export default function Groups() {

  return (
    <div className='groupsPage'>
      <Navbar/>
      <div className='firstSection'>
        <FunctionBar/>
      </div>
      <div className='secondSection'>
        <NewRecommendations/>
        
        <div className="scrollContainer">
          <PrintRecommendations/>
        </div>
        
        <Participants/>
      </div>
    </div>
  )
}
