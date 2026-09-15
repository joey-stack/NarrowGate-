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
  {
    id: "food-drive-sept",
    title: "Banco Alimentare Food Distribution Day",
    theme: "Faith in Action: Feeding Families in Need",
    scripture: "Matthew 25:35 — \"For I was hungry and you gave me something to eat.\"",
    date: "2026-09-26",
    time: "10:00 AM – 1:00 PM",
    venue: "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy",
    host: "Community Outreach & Welfare Department",
    overview: "Distributing essential food items, fresh produce, and family care packages to registered families facing financial hardship across Motta di Livenza.",
    schedule: [
      { time: "10:00 AM", title: "Care Packages Staging & Volunteer Briefing" },
      { time: "10:30 AM", title: "Distribution to Registered Families" },
      { time: "12:30 PM", title: "Home Delivery Dispatch for Elderly Members" },
    ],
    flyerUrl: "/images/banco-alimentare.webp",
    tag: "Outreach",
  },
  {
    id: "prayer-summit-oct",
    title: "Quarterly Prayer & Fasting Summit",
    theme: "Breaking Limitations Through Prayer",
    scripture: "Isaiah 58:6 — \"Is not this the kind of fasting I have chosen: to loose the chains of injustice...\"",
    date: "2026-10-03",
    time: "9:00 AM – 1:00 PM",
    venue: "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy",
    host: "Pastoral Intercessory Prayer Team",
    overview: "An intensive half-day summit of deep prayer, consecration, and spiritual breakthrough for families, the church, and our broader Italian community.",
    schedule: [
      { time: "9:00 AM", title: "Consecration & Warfare Intercession" },
      { time: "11:00 AM", title: "Anointing Service & Breakthrough Word" },
      { time: "12:30 PM", title: "Corporate Communion & Benediction" },
    ],
    flyerUrl: "/images/gatherings/intercessory-prayer.jpg",
    tag: "Prayer",
  },
  {
    id: "cultural-sunday-oct",
    title: "Cultural Sunday & Diversity Feast",
    theme: "Our Strength Lies in Our Diversity",
    scripture: "2 Corinthians 11:22",
    date: "2026-10-18",
    time: "10:00 AM – 1:00 PM",
    venue: "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy",
    host: "Cultural Ministry & International Choir",
    overview: "A vibrant celebration of our international congregation with traditional attire, cultural music, and ethnic cuisines from around the globe.",
    schedule: [
      { time: "10:00 AM", title: "Procession of Nations in Traditional Attires" },
      { time: "10:45 AM", title: "Multilingual Worship & Anointed Word" },
      { time: "12:00 PM", title: "Global Fellowship & Cultural Dishes Sampling" },
    ],
    flyerUrl: "/images/visitation.webp",
    tag: "Celebration",
  },
  {
    id: "youth-encounter-nov",
    title: "Youth & Young Adults Worship Encounter",
    theme: "Set Apart for His Glory",
    scripture: "1 Timothy 4:12 — \"Don't let anyone look down on you because you are young...\"",
    date: "2026-11-28",
    time: "6:00 PM – 8:30 PM",
    venue: "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy",
    host: "Narrow Gate Youth & Young Adults Fellowship",
    overview: "An evening of dynamic acoustic worship, transparent panel discussions, and fellowship equipping young believers to stand bold in Christ.",
    schedule: [
      { time: "6:00 PM", title: "Youth Acoustic Worship & Creative Arts" },
      { time: "7:00 PM", title: "Relevant Gospel Message & Panel Q&A" },
      { time: "8:00 PM", title: "Fellowship, Pizza & Refreshments" },
    ],
    flyerUrl: "/images/education-fund.webp",
    tag: "Youth",
  },
  {
    id: "love-feast-dec",
    title: "Children & Family Love Feast",
    theme: "Celebrating the Gift of Family",
    scripture: "Joshua 24:15 — \"As for me and my household, we will serve the Lord.\"",
    date: "2026-12-20",
    time: "10:00 AM – 2:00 PM",
    venue: "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy",
    host: "Children's & Family Ministry Department",
    overview: "A joyful Christmas and end-of-year celebration uplifting our children with scripture presentations, shared holiday meals, games, and gifts.",
    schedule: [
      { time: "10:00 AM", title: "Children's Bible Presentations & Christmas Carols" },
      { time: "11:15 AM", title: "Family Blessing & Pastoral Dedication" },
      { time: "12:30 PM", title: "Love Feast Lunch, Games & Gift Sharing" },
    ],
    flyerUrl: "/images/gatherings/sunday-service.jpg",
    tag: "Family",
  },
];

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
 * If no upcoming event exists, fallback to the first event in the list.
 */
export function getNextFeaturedEvent(events: ChurchEvent[]): ChurchEvent {
  const upcoming = getUpcomingEvents(events);
  if (upcoming.length > 0) {
    return upcoming[0];
  }
  return events[0] || DEFAULT_EVENTS[0];
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
 * Fetch all events once from Firestore.
 * Falls back to DEFAULT_EVENTS if empty or offline.
 */
export async function getChurchEvents(): Promise<ChurchEvent[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("date", "asc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return DEFAULT_EVENTS;
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
    return DEFAULT_EVENTS;
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
          callback(DEFAULT_EVENTS);
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
        callback(DEFAULT_EVENTS);
      }
    );
  } catch (error) {
    console.warn("Firestore subscribeToEvents failed to initialize, using default events:", error);
    callback(DEFAULT_EVENTS);
    return () => {};
  }
}

/**
 * Helper to seed the initial default events into Firestore if the collection is empty.
 */
export async function seedDefaultEvents(): Promise<void> {
  for (const event of DEFAULT_EVENTS) {
    const { id: _id, ...data } = event;
    await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
    });
  }
}
