import {createContext, useState, PropsWithChildren} from 'react';


// Define the type for the context state
interface AuthContextType {
  auth: { accessToken?: string } | null;
  setAuth: (auth: { accessToken?: string } | null) => void;
}
// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);




export const AuthProvider = ({ children }: PropsWithChildren) => {
  // Initialize state for authentication data
  const [auth, setAuth] = useState<{accessToken?: string, user?: string, role?: string} | null>(null);
  return (
    <AuthContext.Provider value={{auth,setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
