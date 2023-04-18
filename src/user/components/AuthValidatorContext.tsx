import { createContext, useCallback, useContext, useState } from 'react';

const AuthValidatorContext = createContext<Partial<Value>>({});

export const useAuthValidatorContext = () => {
  const context = useContext(AuthValidatorContext);
  if (context === undefined) {
    throw new Error('App Context must be within AppContextProvider');
  }

  return context;
};

interface Children {
  children: JSX.Element;
}

interface Value {
  helperFName: string;
  helperLName: string;
  helperEmail: string;
  helperUser: string;
  helperPass: string;
  validateFName: (name: string) => boolean;
  validateLName: (name: string) => boolean;
  validateEmail: (email: string) => boolean;
  validateUsername: (username: string) => boolean;
  validatePassword: (password: string) => boolean;
  readyToSignUp: () => boolean;
}

export const AuthValidatorContextProvider = ({ children }: Children) => {
  const [helperFName, setHelperFName] = useState('');
  const [helperLName, setHelperLName] = useState('');
  const [helperEmail, setHelperEmail] = useState('');
  const [helperUser, setHelperUser] = useState('');
  const [helperPass, setHelperPass] = useState('');

  const validateFName = useCallback((name: string) => {
    if (!/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name)) {
      setHelperFName('Invalid first name format');
      return false;
    }
    setHelperFName('');
    return true;
  }, []);

  const validateLName = useCallback((name: string) => {
    if (!/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name)) {
      setHelperLName('Invalid last name format');
      return false;
    }
    setHelperLName('');
    return true;
  }, []);

  const validateEmail = useCallback((email: string) => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setHelperEmail('Invalid e-mail format');
      return false;
    }
    setHelperEmail('');
    return true;
  }, []);

  const validatePassword = useCallback((password: string) => {
    if (password.length < 8) {
      setHelperPass('Password must be longer than 8 characters');
      return false;
    } else if (
      !/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password)
    ) {
      setHelperPass(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter and one number OR special character'
      );
      return false;
    }
    setHelperPass('');
    return true;
  }, []);

  const validateUsername = useCallback((username: string) => {
    if (username.length < 4 || username.length > 20) {
      setHelperUser('Username must be between 4-20 characters long');
      return false;
    } else if (!/^(?=.*[a-zA-Z])([a-zA-Z0-9_.-]+)$/.test(username)) {
      setHelperUser(
        'Username must contain letters and can contain numbers, underscores (_), dots (.) and dashes (-)'
      );
      return false;
    }
    setHelperUser('');
    return true;
  }, []);

  const readyToSignUp = useCallback(() => {
    if (helperFName || helperLName || helperEmail || helperPass || helperUser) {
      return false;
    }
    return true;
  }, [helperEmail, helperFName, helperLName, helperPass, helperUser]);

  return (
    <AuthValidatorContext.Provider
      value={{
        helperFName,
        helperLName,
        helperEmail,
        helperUser,
        helperPass,
        validateFName,
        validateLName,
        validateEmail,
        validateUsername,
        validatePassword,
        readyToSignUp,
      }}
    >
      {children}
    </AuthValidatorContext.Provider>
  );
};
