import '../../styles/AboutSection.css'

export default function AboutSect() {

  return (
    <section className='AboutSect'>
        <div className='AboutSectImg'
        style={{
                backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Compu.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvQ29tcHUucG5nIiwiaWF0IjoxNzQ4NDc3ODMzLCJleHAiOjE3ODAwMTM4MzN9._DwrmQ4E6gtVX8czrNFk39RBI9N9u1IyKYqSvto0J2s")`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
        }}
        > 
            <img id='AboutImg1' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/InteIA.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvSW50ZUlBLnBuZyIsImlhdCI6MTc0ODQ4MDQ4MiwiZXhwIjoxNzgwMDE2NDgyfQ.37hsvoqPaFICEWgTK-t-kiBCM931KZTKyLqQqbHoQEU" alt="Integración" />
            <img id='AboutImg2' src="https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/AlgRec.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvQWxnUmVjLnBuZyIsImlhdCI6MTc0ODQ4MDQ2NiwiZXhwIjoxNzgwMDE2NDY2fQ.pJkPv_hEH5mqpiU4hJhppQpH27NmQO_W88QhAhK3-s4" alt="Recomendación" />
        </div>
        <div className='AboutSectText'>
            <h4>SOBRE NOSOTROS</h4>
            <h2>¡Jugar juntos nunca fue tan fácil!</h2>
            <p>Somos un espacio que busca disminuir la fricción cuando un grupo quiere jugar junto. Entendemos lo difícil que puede ser coincidir en gustos, tiempos, plataformas y niveles de habilidad. Por eso creamos una solución que escuche a todos y ayude a encontrar ese juego ideal sin discusiones.</p>
            <div className='AboutSectBenef'>
                <div className='AboutBenef'
                style={{
                        backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Exp1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvRXhwMS5wbmciLCJpYXQiOjE3NDg1MzM2ODQsImV4cCI6MTc4MDA2OTY4NH0.2cq9JeEyOQ8noAIwqYPdgnRPkS4w1_fCbWWz_wJdBHw")`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                }}
                ></div>
                <div className='AboutBenef'
                style={{
                        backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Exp2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvRXhwMi5wbmciLCJpYXQiOjE3NDg1MzM3MTIsImV4cCI6MTc1MTEyNTcxMn0.mgNhdNXKiBcd8UnsFWfUN45oABiimgrmLlM8TMM8Z2c")`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                }}
                ></div>
                <div className='AboutBenef'
                style={{
                        backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Exp3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvRXhwMy5wbmciLCJpYXQiOjE3NDg1MzM3MzIsImV4cCI6MTc4MDA2OTczMn0.5fXTn2nskqXmzMoMtvQTHVKlaFRwxYTwt7fiq-HSGQs")`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                }}
                ></div>
                <div className='AboutBenef'
                style={{
                        backgroundImage: `url("https://kbkljkxypthbtafchvxz.supabase.co/storage/v1/object/sign/assets/Exp4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzc2MmJjMmFkLTJkMDYtNDljOC05MmQ2LTNlZjUzNWVlMDAzOCJ9.eyJ1cmwiOiJhc3NldHMvRXhwNC5wbmciLCJpYXQiOjE3NDg1MzM3NTEsImV4cCI6MTc4MDA2OTc1MX0.y5MYgSBTptloQRC1L7lV_feI7lt_E1pM3vOxIYllBOs")`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                }}
                ></div>
            </div>
        </div>
    </section>
  )
}