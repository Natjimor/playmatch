import GroupSect from '../../components/GroupsSection/GroupSection'
import InvitationSect from '../../components/InvitationsSection/InvitationSection'
import NavbarLog from '../../components/NavbarLog/NavbarLog'
import '../../styles/Dashboard.css'

export default function Dashboard() {

  return (
    <div className="Dashboard"
    style={{
      backgroundImage: `linear-gradient(80deg, rgba(17, 17, 17, 0.91),rgb(20, 1, 81)),url("https://historia.nationalgeographic.com.es/medio/2024/01/05/videojuegos_86dcb1e9.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    >
      <NavbarLog/>
      <div className='DashboardInfo'>
        <InvitationSect/>
        <GroupSect/>
      </div>
    </div>
  )
}