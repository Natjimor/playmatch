import "../../../styles/Group/newRecommendations.css"

export default function NewRecommendations() {

  return (
    <section className="NewRecommendations">
        <div className="recommendationHistory">
            <h3>Recomendaciones</h3>
            <button className="ChatHistory">
                <p>Acción / Aventura</p>
            </button>
            <button className="ChatHistory">
                <p>Acción / Aventura</p>
            </button>
            <button className="ChatHistory">
                <p>Acción / Aventura</p>
            </button>
        </div>
        <div className="newFormsRecom">
            <button className="newBtnRecom">
                
                <img src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/GameController.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvR2FtZUNvbnRyb2xsZXIuc3ZnIiwiaWF0IjoxNzQ5Mjc1MTcxLCJleHAiOjE3NTE4NjcxNzF9.UK5-MX1p2JaObZo0ll-_TCvHfaUKkRv9zZEcbRdtoUs" alt="newBtnRecommendations" />
                <p>Nueva Recomendación</p>
            </button>
        </div>
    </section>
  )
}