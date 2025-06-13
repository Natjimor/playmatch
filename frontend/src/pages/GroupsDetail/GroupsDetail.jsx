import GroupSect from "../../components/GroupsSection/GroupSection"
import InvitationSect from "../../components/InvitationsSection/InvitationSection"
import NavbarLog from "../../components/NavbarLog/NavbarLog"
import ParticipantsSect from "../../components/ParticipantsSection/ParticipantsSection"
import RecommendedSect from "../../components/RecommendationSect/RecommendationSect"
import "../../styles/GroupsDetail.css"

export default function GroupsDetail() {

    return (
        <div className="GroupDetail"
        style={{
        backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/FondoV.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvRm9uZG9WLnBuZyIsImlhdCI6MTc0ODQ2OTgyOSwiZXhwIjoxNzgwMDA1ODI5fQ.NG4MKDjYMdbI-GZEuu2yFxBcLJJyN3642AcNEKU5Vlc")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        }}
        >
        <NavbarLog/>
        <div className='GroupDetailInfo'>
            <ParticipantsSect/>
            <RecommendedSect/>
        </div>
        </div>
    )
}