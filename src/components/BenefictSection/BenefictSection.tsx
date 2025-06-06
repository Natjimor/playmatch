import '../../styles/BenefictSection.css'

export default function BenefictSect() {

  return (
    <section className='BenefictSect'>
        <div className='BenefictSectImg'
        style={{
            backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Celular.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjJiYzJhZC0yZDA2LTQ5YzgtOTJkNi0zZWY1MzVlZTAwMzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvQ2VsdWxhci5wbmciLCJpYXQiOjE3NDkxMTA4NjQsImV4cCI6MTc4MDY0Njg2NH0.sbUpM7j5p6Q7Wxc14laxQ3ok0jMVNgz7h9w6SALH4SU")`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        ></div>
        <div className='BenefictSectText'>
            <h4>BENEFICIOS</h4>
            <h2>¿Por qué usar PlayMatch?</h2>
            <div className='BenefictSectBenef'>
                <div className='BenefictBenef'>
                    <h1>01</h1>
                    <div className='BenefictInfo'>
                        <h3>Ahorra tiempo decidiendo</h3>
                        <p>Evita discusiones y encuentra en segundos juegos que encajan con todos</p>
                    </div>
                </div>

                <div className='BenefictBenef'>
                    <h1>02</h1>
                    <div className='BenefictInfo'>
                        <h3>Recomendaciones con IA adaptadas</h3>
                        <p>Nuestro sistema analiza gustos, plataformas y tiempos para proponer lo ideal</p>
                    </div>
                </div>

                <div className='BenefictBenef'>
                    <h1>03</h1>
                    <div className='BenefictInfo'>
                        <h3>Se ajusta si alguien entra o sale</h3>
                        <p>El grupo cambia, y las recomendaciones se actualizan al instante</p>
                    </div>
                </div>

                <div className='BenefictBenef'>
                    <h1>04</h1>
                    <div className='BenefictInfo'>
                        <h3>Juegos digitales, siempre compatibles</h3>
                        <p>Sugiere solo opciones que todos pueden jugar con sus dispositivos</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}