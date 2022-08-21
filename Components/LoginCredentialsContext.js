
import { createContext } from 'react';

export const LoginCredentialsContext = createContext({ storedCredentials: {}, setStoredCredentials: () => {} });
export const IsLoginVerified = createContext({IsVerified: false, setIsVerified: () => {} });
export const IsModalView = createContext({IsModal: false, setIsModal: () => {} });
export const locationAddress = createContext({myLocation: '', setMyLocation: () => {} });
// export const forgetSecurityToken = createContext('');

