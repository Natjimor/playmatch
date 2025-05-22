import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()

  const navigateHome = () => {
    navigate('/')
  }

  return (
    <div>
      <h1>Acerca de Nosotros</h1>
      <button onClick={navigateHome}>Volver a Inicio</button>
    </div>
  )
}