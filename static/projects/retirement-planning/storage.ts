import { APP_STORAGE_KEY, DEFAULT_PROFILE } from "./constants.js";
import type { AppState, PlanData, ProfileRecord } from "./types.js";

const DB_NAME = "retirement-planning-os";
const DB_VERSION = 1;
const STATE_STORE = "state";
const STATE_KEY = "app-state";

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const makeId = (prefix: string): string => `${prefix}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STATE_STORE)) {
        db.createObjectStore(STATE_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

function seedState(): AppState {
  const profileId = makeId("profile");
  const planId = makeId("plan");
  const profile: ProfileRecord = {
    id: profileId,
    name: DEFAULT_PROFILE.name,
    profile: clone(DEFAULT_PROFILE.profile),
    createdAt: new Date().toISOString(),
  };
  const defaultPlan = clone(DEFAULT_PROFILE.plans[0]!);
  const plan: PlanData = {
    id: planId,
    profileId,
    ...defaultPlan,
    createdAt: new Date().toISOString(),
  };
  return {
    version: 2,
    activeProfileId: profileId,
    activePlanId: planId,
    ui: {
      mode: "guided",
      appendixPreset: "full",
      aiMode: "browser",
      selectedGraphPlanIds: [planId],
      inspectorOpen: false,
      chartHiddenSeries: {},
    },
    profiles: [profile],
    plans: [plan],
    aiWorkspaces: [],
  };
}

async function getStateFromIndexedDb(): Promise<AppState | null> {
  const db = await openDb();
  const tx = db.transaction(STATE_STORE, "readonly");
  const store = tx.objectStore(STATE_STORE);
  const request = store.get(STATE_KEY);
  const result = await new Promise<AppState | null>((resolve, reject) => {
    request.onsuccess = () => resolve((request.result as AppState | undefined) ?? null);
    request.onerror = () => reject(request.error);
  });
  await txDone(tx);
  db.close();
  return result;
}

async function putStateToIndexedDb(state: AppState): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(STATE_STORE, "readwrite");
  tx.objectStore(STATE_STORE).put(state, STATE_KEY);
  await txDone(tx);
  db.close();
}

function migrateLocalStorageState(): AppState | null {
  try {
    const raw = localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AppState | null;
    if (!parsed || typeof parsed !== "object") return null;
    localStorage.removeItem(APP_STORAGE_KEY);
    return parsed;
  } catch (error) {
    console.warn("Failed to migrate localStorage state.", error);
    return null;
  }
}

export async function loadState(): Promise<AppState> {
  try {
    const indexed = await getStateFromIndexedDb();
    if (indexed?.version) {
      indexed.ui.chartHiddenSeries ||= {};
      return indexed;
    }
    const migrated = migrateLocalStorageState();
    if (migrated?.version) {
      migrated.ui.chartHiddenSeries ||= {};
      await putStateToIndexedDb(migrated);
      return migrated;
    }
    const seeded = seedState();
    await putStateToIndexedDb(seeded);
    return seeded;
  } catch (error) {
    console.warn("Failed to load retirement planner state from IndexedDB, reseeding.", error);
    return seedState();
  }
}

export async function saveState(state: AppState): Promise<void> {
  await putStateToIndexedDb(state);
}

export async function wipeState(): Promise<AppState> {
  const db = await openDb();
  const tx = db.transaction(STATE_STORE, "readwrite");
  tx.objectStore(STATE_STORE).delete(STATE_KEY);
  await txDone(tx);
  db.close();
  const seeded = seedState();
  await putStateToIndexedDb(seeded);
  return seeded;
}

export function newId(prefix: string): string {
  return makeId(prefix);
}

export function deepClone<T>(value: T): T {
  return clone(value);
}
