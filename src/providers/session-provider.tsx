import {
  generateRandomUserId,
  loadStoredSession,
  storeSession,
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
  userId: number | null;
  isReady: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        let { email, userId: storedUserId } = await loadStoredSession();
        if (email != null && storedUserId == null) {
          storedUserId = generateRandomUserId();
          await storeSession(email, storedUserId);
        }
        setUserEmail(email);
        setUserId(storedUserId);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync().catch(() => {});
      }
    })();
  }, []);

  const signIn = useCallback(async (email: string) => {
    const trimmed = email.trim();
    const nextUserId = generateRandomUserId();
    await storeSession(trimmed, nextUserId);
    setUserEmail(trimmed);
    setUserId(nextUserId);
  }, []);

  const signOut = useCallback(async () => {
    await wipeStoredSession();
    setUserEmail(null);
    setUserId(null);
  }, []);

  const value = useMemo(
    () => ({
      userEmail,
      userId,
      isReady,
      signIn,
      signOut,
    }),
    [userEmail, userId, isReady, signIn, signOut],
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
