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

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      console.log('Current user:', currentUser);
      console.log('User metadata:', currentUser?.user_metadata);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      console.log('Auth state changed. Current user:', currentUser);
      console.log('User metadata:', currentUser?.user_metadata);
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
