import * as SecureStore from "expo-secure-store";

const SESSION_EMAIL_KEY = "aucthux.session-email";

async function secureStoreSupported() {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

/** Loads persisted sign-in identifier (currently the account email used for demo auth). */
export async function loadStoredSessionEmail() {
  if (!(await secureStoreSupported())) return null;
  return SecureStore.getItemAsync(SESSION_EMAIL_KEY);
}

export async function storeSessionEmail(email: string) {
  if (!(await secureStoreSupported())) return;
  await SecureStore.setItemAsync(SESSION_EMAIL_KEY, email);
}

export async function wipeStoredSession() {
  if (!(await secureStoreSupported())) return;
  try {
    await SecureStore.deleteItemAsync(SESSION_EMAIL_KEY);
  } catch {
    /* no-op – treat as cleared */
  }
}
