import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const irAAcerca = () => {
    navigate('/about')
  }

  return (
    <div>
      <h1>Página de Inicio</h1>
      <button onClick={irAAcerca}>Ir a Acerca</button>
    </div>
  )
}