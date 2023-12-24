'use client';

import { LoginCard } from '@/components/Auth/LoginCard';
import useAuth from '@/hooks/useAuth';

export default function App() {
    const { UserAuthDataState, AuthContext } = useAuth();
  return (
      <AuthContext.Provider value={UserAuthDataState}>
          <LoginCard />;
      </AuthContext.Provider>
      );
}
