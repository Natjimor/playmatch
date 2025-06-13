import FunctionBar from '../../components/Groups/FunctionBar/funtionBar'
import NewRecommendations from '../../components/Groups/NewRecommendations/newRecommendations'
import Participants from '../../components/Groups/Participants/participants'
import PrintRecommendations from '../../components/Groups/PrintRecommendations/printRecommendations'
import NavbarLog from '../../components/NavbarLog/NavbarLog'
import "../../styles/Group/groups.css"

export default function GroupsDetail() {

  return (
    <div className='groupsPage'>
      <NavbarLog/>
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