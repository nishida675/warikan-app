"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initAnonymousAuth } from "@/app/lib/firebase";
import Loading from "@/app/loading";

type AuthContextType = {
  isAuthReady: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        await initAnonymousAuth();
        if (mounted) setIsAuthReady(true);
      } catch (error) {
        console.error("認証初期化エラー:", error);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  if (!isAuthReady) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
