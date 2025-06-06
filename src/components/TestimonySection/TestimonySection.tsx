import '../../styles/TestimonySection.css'

export default function TestimonySect() {

  return (
    <section className='TestimonySect'>
        <div className='TestimonyImg'
        style={{
            backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/2149829176.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvMjE0OTgyOTE3Ni5qcGciLCJpYXQiOjE3NDkxNzE4NDUsImV4cCI6MTc4MDcwNzg0NX0.N9ZrJG6hWZ5czB-AwWrBgRkshCis-xaxOtgly2q4bqQ")`,
            backgroundSize: 'cover',
            backgroundPosition: '90%',
            backgroundRepeat: 'no-repeat',
        }}
        >
        </div>
        <div className='TestimonyInfo'>
            <h4>TESTIMONIOS</h4>
            <h2>¿Qué dicen quienes lo probaron?</h2>
            <div className='TestimonyInfoImg'>
                <img id='Testimony' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Testimonio1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvVGVzdGltb25pbzEucG5nIiwiaWF0IjoxNzQ5MTc2NjQwLCJleHAiOjE3ODA3MTI2NDB9.CT_6xl_AV6DHNJVL1oCd-Vg6LFfUhyA6JOHMgeyuCKg" alt="Testimonio" />
                <img id='TestimonyCal' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Calificacion.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvQ2FsaWZpY2FjaW9uLnBuZyIsImlhdCI6MTc0OTE3NDcyOCwiZXhwIjoxNzgwNzEwNzI4fQ.UzZKYWm8mKMvwwuqxxCqQktmN-UAcnbZaNbYRvJDNxQ" alt="Calificación" />
            </div>
        </div>
    </section>
  )
}