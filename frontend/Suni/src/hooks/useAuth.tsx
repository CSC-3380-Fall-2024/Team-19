import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider'; // Adjust the import path as necessary

interface AuthContextType {
  auth: { user?: string; accessToken?: string } | null;
  setAuth: (auth: { user?: string; accessToken?: string } | null) => void;
}

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Add debug information
  useDebugValue(context, (context) => context?.auth ? `User: ${context.auth.user}` : 'No User');

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
