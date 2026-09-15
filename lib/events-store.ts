import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ChurchEventScheduleItem {
  time: string;
  title: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  theme: string;
  scripture: string;
  date: string; // ISO format: YYYY-MM-DD for reliable date comparisons and sorting
  time: string;
  venue: string;
  host: string;
  overview: string;
  schedule: ChurchEventScheduleItem[];
  flyerUrl: string;
  tag: string;
  isFeatured?: boolean;
  createdAt?: string;
}

const COLLECTION = "events";

export const DEFAULT_EVENTS: ChurchEvent[] = [
  {
    id: "anniversary-2026",
    title: "Annual Church Anniversary & Thanksgiving Celebration",
    theme: "A Year of Divine Grace & Fruitfulness",
    scripture: "Psalm 65:11 — \"You crown the year with your goodness, and your paths drop fatness.\"",
    date: "2026-11-15",
    time: "10:00 AM – 1:30 PM",
    venue: "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy",
    host: "Senior Pastor Rev. Uyi Loveday Evbuomwan & Ministry Team",
    overview: "Every year, The Narrow Gate Foursquare Church family gathers together in heartfelt gratitude to celebrate another milestone of God's grace, salvation, and community impact. Expect anointed praise and worship, inspirational preaching, inspiring testimonies of God's goodness, and our signature post-service Love Feast Banquet celebrating our international unity in Christ.",
    schedule: [
      { time: "10:00 AM", title: "Breakfast Prayer & Pre-service Intercession" },
      { time: "10:30 AM", title: "Anniversary Praise & Anointed Worship" },
      { time: "11:15 AM", title: "Thanksgiving Word, Testimonies & Special Dedications" },
      { time: "12:30 PM", title: "Love Feast Banquet & Joyful Fellowship" },
    ],
    flyerUrl: "/images/events/anniversary-flyer.jpg",
    tag: "Anniversary",
    isFeatured: true,
  },
];

const SEEDS_CLEARED_KEY = "narrowgate_events_seeds_cleared";

/**
 * Check if the admin has cleared the default/seeded events.
 */
export function isDefaultSeedsCleared(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(SEEDS_CLEARED_KEY) === "true";
  }
  return false;
}

/**
 * Record that seeds have been cleared.
 */
export function markDefaultSeedsCleared(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SEEDS_CLEARED_KEY, "true");
  }
}

/**
 * Filter upcoming events (date >= today), sorted ascending by date (closest first).
 */
export function getUpcomingEvents(events: ChurchEvent[]): ChurchEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return events
    .filter((e) => !e.date || e.date >= today)
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
}

/**
 * Filter past events (date < today), sorted descending by date (most recent first).
 */
export function getPastEvents(events: ChurchEvent[]): ChurchEvent[] {
  const today = new Date().toISOString().split("T")[0];
  return events
    .filter((e) => e.date && e.date < today)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

/**
 * Get the next featured upcoming event (the very first upcoming event by date).
 * Returns null if no events exist.
 */
export function getNextFeaturedEvent(events: ChurchEvent[]): ChurchEvent | null {
  const upcoming = getUpcomingEvents(events);
  if (upcoming.length > 0) {
    return upcoming[0];
  }
  return events[0] || null;
}

/**
 * Save / Create a new church event in Firestore.
 */
export async function createChurchEvent(
  eventData: Omit<ChurchEvent, "id" | "createdAt">
): Promise<ChurchEvent> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...eventData,
    createdAt: serverTimestamp(),
  });

  return {
    ...eventData,
    id: docRef.id,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Update an existing church event document in Firestore.
 */
export async function updateChurchEvent(
  id: string,
  eventData: Partial<ChurchEvent>
): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  const { id: _id, ...cleanData } = eventData as any;
  await updateDoc(docRef, cleanData);
}

/**
 * Delete a church event from Firestore.
 */
export async function deleteChurchEvent(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  await deleteDoc(docRef);
}

/**
 * Delete ALL events from Firestore and permanently mark default seeds as cleared.
 */
export async function clearAllEvents(): Promise<void> {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const deletions = snapshot.docs.map((d) => deleteDoc(doc(db, COLLECTION, d.id)));
    await Promise.all(deletions);
    markDefaultSeedsCleared();
  } catch (error) {
    console.error("Failed to clear all events:", error);
    markDefaultSeedsCleared();
    throw error;
  }
}

/**
 * Fetch all events once from Firestore.
 * Respects whether seeds have been cleared.
 */
export async function getChurchEvents(): Promise<ChurchEvent[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("date", "asc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return isDefaultSeedsCleared() ? [] : DEFAULT_EVENTS;
    }
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        theme: data.theme || "",
        scripture: data.scripture || "",
        date: data.date || "",
        time: data.time || "",
        venue: data.venue || "",
        host: data.host || "",
        overview: data.overview || "",
        schedule: data.schedule || [],
        flyerUrl: data.flyerUrl || "/images/events/anniversary-flyer.jpg",
        tag: data.tag || "General",
        isFeatured: data.isFeatured ?? false,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.warn("Firestore getChurchEvents failed, using default events:", error);
    return isDefaultSeedsCleared() ? [] : DEFAULT_EVENTS;
  }
}

/**
 * Real-time listener for Firestore events collection.
 * Calls callback whenever any event is created, edited, or deleted.
 */
export function subscribeToEvents(
  callback: (events: ChurchEvent[]) => void
): Unsubscribe {
  try {
    const q = query(collection(db, COLLECTION), orderBy("date", "asc"));
    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          callback(isDefaultSeedsCleared() ? [] : DEFAULT_EVENTS);
          return;
        }
        const events = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            title: data.title || "",
            theme: data.theme || "",
            scripture: data.scripture || "",
            date: data.date || "",
            time: data.time || "",
            venue: data.venue || "",
            host: data.host || "",
            overview: data.overview || "",
            schedule: data.schedule || [],
            flyerUrl: data.flyerUrl || "/images/events/anniversary-flyer.jpg",
            tag: data.tag || "General",
            isFeatured: data.isFeatured ?? false,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          };
        });
        callback(events);
      },
      (error) => {
        console.warn("Firestore subscribeToEvents listener error, using default events:", error);
        callback(isDefaultSeedsCleared() ? [] : DEFAULT_EVENTS);
      }
    );
  } catch (error) {
    console.warn("Firestore subscribeToEvents failed to initialize, using default events:", error);
    callback(isDefaultSeedsCleared() ? [] : DEFAULT_EVENTS);
    return () => {};
  }
}

/**
 * Helper to seed the initial default events into Firestore.
 */
export async function seedDefaultEvents(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SEEDS_CLEARED_KEY);
  }
  for (const event of DEFAULT_EVENTS) {
    const { id: _id, ...data } = event;
    await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
    });
  }
}
