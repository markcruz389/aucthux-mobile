import * as SecureStore from "expo-secure-store";

const SESSION_EMAIL_KEY = "aucthux.session-email";
const SESSION_USER_ID_KEY = "aucthux.session-user-id";

async function secureStoreSupported() {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

/** Cryptographically random positive int32-style id for API payloads. */
export function generateRandomUserId() {
  try {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    const n = array[0];
    if (n === undefined) throw new Error("missing random value");
    return (n % 2_147_483_646) + 1;
  } catch {
    return Math.floor(Math.random() * 2_147_483_646) + 1;
  }
}

export type StoredSession = {
  email: string | null;
  userId: number | null;
};

/** Loads persisted session (email + stable randomized user id for this sign-in). */
export async function loadStoredSession(): Promise<StoredSession> {
  if (!(await secureStoreSupported())) {
    return { email: null, userId: null };
  }

  const [emailRaw, userIdRaw] = await Promise.all([
    SecureStore.getItemAsync(SESSION_EMAIL_KEY),
    SecureStore.getItemAsync(SESSION_USER_ID_KEY),
  ]);

  const email = emailRaw?.trim() ? emailRaw.trim() : null;

  let userId: number | null = null;
  if (userIdRaw != null && userIdRaw !== "") {
    const parsed = Number.parseInt(userIdRaw, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      userId = Math.trunc(parsed);
    }
  }

  return { email, userId };
}

export async function storeSession(email: string, userId: number) {
  if (!(await secureStoreSupported())) return;
  await Promise.all([
    SecureStore.setItemAsync(SESSION_EMAIL_KEY, email),
    SecureStore.setItemAsync(SESSION_USER_ID_KEY, String(userId)),
  ]);
}

export async function wipeStoredSession() {
  if (!(await secureStoreSupported())) return;
  try {
    await SecureStore.deleteItemAsync(SESSION_EMAIL_KEY);
  } catch {
    /* no-op – treat as cleared */
  }
  try {
    await SecureStore.deleteItemAsync(SESSION_USER_ID_KEY);
  } catch {
    /* no-op – treat as cleared */
  }
}
