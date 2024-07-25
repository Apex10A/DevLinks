import { createContext, useContext, useState, useEffect, ReactNode, FunctionComponent } from 'react';
import { onAuthStateChanged, signOut as authSignOut, User } from 'firebase/auth';
import { auth } from './Fire';

// Define the shape of the context value
interface AuthUserContextType {
  authUser: User | null;
  isLoading: boolean;
  signOut: () => void;
  setAuthUser: (user: User | null) => void;
}

// Initialize the context with default values
const AuthUserContext = createContext<AuthUserContextType>({
  authUser: null,
  isLoading: true,
  signOut: () => {},
  setAuthUser: () => {},
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authStateChanged = async (user: User | null) => {
    setIsLoading(true);
    if (!user) {
      clear();
      return;
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    } as User); // Casting to User type
    setIsLoading(false);
  };

  const signOut = () => {
    authSignOut(auth).then(() => clear());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, [authStateChanged]);

  return {
    authUser,
    isLoading,
    signOut,
    setAuthUser,
  };
}

// Define the props for the AuthUserProvider
interface AuthUserProviderProps {
  children: ReactNode;
}

// Create a provider component
export const AuthUserProvider: FunctionComponent<AuthUserProviderProps> = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>
      {children}
    </AuthUserContext.Provider>
  );
};

// Create a hook to use the AuthUserContext
export const useAuth = () => useContext(AuthUserContext);
