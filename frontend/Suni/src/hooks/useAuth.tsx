import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider'; 

interface User {
  username: string;
  // Add any other properties your user might have
}

interface AuthContextType {
  auth: { user?: User; accessToken?: string } | null;
  setAuth: (auth: { user?: User; accessToken?: string } | null) => void;
}

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Add debug information
  useDebugValue(context, (context) => context?.auth ? `User: ${context.auth.user?.username || 'Unknown User'}` : 'No User');

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default useAuth;
