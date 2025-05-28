import '../../styles/CallSection.css'

export default function CalltoAction() {

  return (
    <section className='CalltoActSect'
    style={{
                backgroundImage: `linear-gradient(to top, rgba(20, 20, 23, 0.85), rgba(20, 20, 23, 0.36)), url("https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/12/amigos-discutiendo-2901462.jpg?tf=3840x")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
    }}
    >
        <div className='CalltoActInfo'>
          <h2>¿Tu grupo de amigos nunca se decide a qué jugar? ¡Dejen que PlayMatch lo resuelva por ustedes!</h2>
          <p>Reúnanse, compartan sus gustos y reciban recomendaciones personalizadas en segundos.</p>
          <div className='CalltoActBtn'>
            <button>Comienza desde la web</button>
            <button>Comienza con nuestro Bot</button>
          </div>
        </div>
    </section>
  )
}