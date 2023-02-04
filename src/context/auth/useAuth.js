import { useContext } from 'react';
import AuthContext  from '@context/auth/AuthContext';

export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}