import jwt from 'jwt-decode';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const UserContext = createContext<Partial<Value>>({});

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('App Context must be within AppContextProvider');
  }

  return context;
};

interface Children {
  children: JSX.Element;
}

interface TokenObject {
  exp: number;
  iat: number;
  username: string;
}

interface Value {
  username: string | null;
  isLoggedIn: boolean;
  logout: () => void;
  login: (token: string) => void;
}

export const UserContextProvider = ({ children }: Children) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('accessToken') ? true : false
  );
  const [expire, setExpire] = useState(localStorage.getItem('expires'));

  const login = useCallback((token: string) => {
    localStorage.setItem('accessToken', token);
    setIsLoggedIn(true);

    const decodedToken: TokenObject = jwt(token);
    localStorage.setItem('username', decodedToken.username);
    localStorage.setItem('expires', JSON.stringify(decodedToken.exp * 1000));
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setToken('');
    setUsername('');
    setIsLoggedIn(false);
    setExpire(null);
  }, []);

  useEffect(() => {
    if (!username) {
      setUsername(localStorage.getItem('username'));
    }
    if (expire) {
      console.log(`Expires in ${Number(expire) - Date.now()} ms`);
      if (Number(expire) < Date.now()) {
        logout();
      }
    }
  }, [isLoggedIn, token, username, expire, logout]);

  return (
    <UserContext.Provider value={{ username, isLoggedIn, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};
