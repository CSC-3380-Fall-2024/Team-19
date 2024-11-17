import { createContext, useState, ReactNode } from 'react';

// Define the type for the context state
interface AuthContextType {
  auth: { user?: string; accessToken?: string } | null;
  setAuth: (auth: { user?: string; accessToken?: string } | null) => void;
}

// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Initialize state for authentication data
  const [auth, setAuth] = useState<{ user?: string; accessToken?: string } | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
