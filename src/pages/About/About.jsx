import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  const volverAInicio = () => {
    navigate('/')
  }

  const irARegistro = () => {
    navigate('/register')
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1>Acerca de Nosotros</h1>

      <button 
        onClick={volverAInicio} 
        style={{ marginRight: '12px', padding: '10px 20px' }}
      >
        Volver a Inicio
      </button>

      <button 
        onClick={irARegistro}
        style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Ir a Registro
      </button>
    </div>
  )
}
