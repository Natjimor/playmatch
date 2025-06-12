import { HashRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

export function Providers({ children }) {
  return (
    <HashRouter>
      <AuthProvider>
        {children}
      </AuthProvider>
    </HashRouter>
  );
}
