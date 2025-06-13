import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase';

const AuthContext = createContext({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para enviar datos de login al backend FastAPI
  const sendUserLoginData = async (user) => {
    if (!user) return;
    
    const username = user.user_metadata?.name || user.user_metadata?.full_name || user.user_metadata?.display_name || user.email;
    const userId = user.id;
    
    try {
      const response = await fetch('http://localhost:5000/api/user_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          user_id: userId
        })
      });
      
      const data = await response.json();
      console.log('Datos de login enviados al backend FastAPI:', data);
    } catch (error) {
      console.error('Error al enviar datos de login:', error);
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      console.log('Current user:', currentUser);
      console.log('User metadata:', currentUser?.user_metadata);
      
      // Si hay un usuario activo, enviar datos al backend
      if (currentUser) {
        sendUserLoginData(currentUser);
      }
      
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      console.log('Auth state changed. Current user:', currentUser);
      console.log('User metadata:', currentUser?.user_metadata);
      
      // Si el evento es signin y hay un usuario, enviar datos al backend
      if (event === 'SIGNED_IN' && currentUser) {
        sendUserLoginData(currentUser);
      }
      
      setUser(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    signUp: async (email, password, fullName) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,          options: {
            data: {
              name: fullName,
              full_name: fullName,
              display_name: fullName,
            },
          },
        });
        
        if (error) throw error;
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    signIn: async (email, password) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Enviar datos al backend cuando el usuario inicia sesión exitosamente
        if (data.user) {
          sendUserLoginData(data.user);
        }
        
        return { data, error: null };
      } catch (error) {
        return { data: null, error };
      }
    },

    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate('/login');
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    },

    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}