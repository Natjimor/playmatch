import '../../styles/StepSection.css'

export default function StepSect() {

  return (
    <section className='StepSect'>
      <div className='StepTitle'>
          <h4>PASOS A SEGUIR</h4>
          <h2>Encuentra el juego perfecto en pocos pasos</h2>
          <p>PlayMatch facilita la elección de juegos para grupos con una experiencia rápida, clara y colaborativa</p>
      </div>
      <div className='StepImages'>
        <div className='StepImg'
        style={{
          backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Step1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvU3RlcDEucG5nIiwiaWF0IjoxNzQ5MTA2MDIzLCJleHAiOjE3ODA2NDIwMjN9.qQ2Am5lQfRy91O1f4woDe7QoJazxrCAMTmlrOFKrHVk")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        ></div>

        <div className='StepImg'
        style={{
          backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Step2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvU3RlcDIucG5nIiwiaWF0IjoxNzQ5MTA2MDYxLCJleHAiOjE3ODA2NDIwNjF9.B3FD2exe2pmNnteKJWngXsseOFl5hXzfylO5Bdhp7NM")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        ></div>
                
        <div className='StepImg'
        style={{
          backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Step3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvU3RlcDMucG5nIiwiaWF0IjoxNzQ5MTA2MDc2LCJleHAiOjE3ODA2NDIwNzZ9.GRtnc5kEtHuXcvHvld-UH9qMiwb-qpoe0hGOwUNTv-0")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        ></div>

        <div className='StepImg'
        style={{
          backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Step4.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvU3RlcDQucG5nIiwiaWF0IjoxNzQ5MTA2MDkwLCJleHAiOjE3ODA2NDIwOTB9.p2WkiCKbL9fIlFqeiuEwIQ15wfUCmijrUsFcz6eIKdY")`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        ></div>
      </div>
    </section>
  )
}