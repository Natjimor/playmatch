import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navigation from './routes/Navigation'
import { Providers } from './providers/Providers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Providers>
      <Navigation />
    </Providers>
  </StrictMode>
)