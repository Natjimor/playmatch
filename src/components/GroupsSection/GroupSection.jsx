import { FaCirclePlus } from "react-icons/fa6";
import '../../styles/Group.css'

export default function GroupSect() {

  return (
    <section className='GroupsSect'>
      <h1>Tus grupos</h1>
      <div className='JoinedGroupsContainer'>
        <div className='AddGroup'>
          <FaCirclePlus size={45} color="white"/>
        </div>
      </div>
      <h1>Recomendaciones de grupos</h1>
      <div className='RecommendedGroupsContainer'>
      </div>
    </section>
  )
}