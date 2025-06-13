import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarLog from "../../components/NavbarLog/NavbarLog"
import ParticipantsSect from "../../components/ParticipantsSection/ParticipantsSection";
import RecommendedSect from "../../components/RecommendationSect/RecommendationSect";
import { apiUtils } from "../../utils/apiUtils";
import "../../styles/GroupsDetail.css"

export default function GroupsDetail() {
    const { groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRecommendationForm, setShowRecommendationForm] = useState(false);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                setLoading(true);
                const response = await apiUtils({
                    url: `api/groups/${groupId}`,
                    method: 'GET'
                });
                setGroup(response);
                setError(null);
            } catch (err) {
                console.error("Error al obtener detalles del grupo:", err);
                setError("No se pudo cargar la información del grupo");
            } finally {
                setLoading(false);
            }
        };

        if (groupId) {
            fetchGroupDetails();
        }
    }, [groupId]);

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
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando detalles del grupo...</p>
                </div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : group ? (
                <>
                    <ParticipantsSect 
                        groupUsers={group.group_users} 
                        onShowRecommendationForm={() => setShowRecommendationForm(true)} 
                    />
                    <RecommendedSect 
                        showForm={showRecommendationForm}
                        onCloseForm={() => setShowRecommendationForm(false)}
                    />
                </>
            ) : (
                <div className="error-message">No se encontró información del grupo</div>
            )}
        </div>
        </div>
    )
}