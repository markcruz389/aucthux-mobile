import {
  loadStoredSessionEmail,
  storeSessionEmail,
  wipeStoredSession,
} from "@/lib/session-storage";
import * as SplashScreen from "expo-splash-screen";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

void SplashScreen.preventAutoHideAsync();

type SessionContextValue = {
  userEmail: string | null;
  isReady: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const stored = await loadStoredSessionEmail();
        setUserEmail(stored?.trim() ? stored.trim() : null);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync().catch(() => {});
      }
    })();
  }, []);

  const signIn = useCallback(async (email: string) => {
    await storeSessionEmail(email.trim());
    setUserEmail(email.trim());
  }, []);

  const signOut = useCallback(async () => {
    await wipeStoredSession();
    setUserEmail(null);
  }, []);

  const value = useMemo(
    () => ({
      userEmail,
      isReady,
      signIn,
      signOut,
    }),
    [userEmail, isReady, signIn, signOut],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (ctx == null) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
}
