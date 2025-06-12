import { useAuth } from '../context/AuthContext';

export function useUser() {
  const { user, loading } = useAuth();

  return {
    user,
    loading,
    userId: user?.id,
    userEmail: user?.email,
    userName: user?.user_metadata?.name || user?.user_metadata?.fullName || user?.user_metadata?.display_name || '',
    isAuthenticated: !!user,
  };
}
