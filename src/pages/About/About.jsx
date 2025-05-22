import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  const volverAInicio = () => {
    navigate('/')
  }

  return (
    <div>
      <h1>Acerca de Nosotros</h1>
      <button onClick={volverAInicio}>Volver a Inicio</button>
    </div>
  )
}