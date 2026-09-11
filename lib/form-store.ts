import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

export interface Submission {
  id: string;
  type: "contact" | "plan_visit";
  name: string;
  email: string;
  phone: string;
  message?: string;
  gathering?: string;
  visitDate?: string;
  guestsCount?: string;
  notes?: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: string;
}

const STORAGE_KEY = "narrowgate_form_submissions_v1";

// Initial seed submissions so the admin dashboard immediately renders realistic records if empty
const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "sub-101",
    type: "contact",
    name: "Marco Rossi",
    email: "marco.rossi@example.it",
    phone: "+39 347 123 4567",
    message: "Praise the Lord! I would like to inquire about the Wednesday Bible Study times and location in Motta di Livenza.",
    status: "new",
    createdAt: "2026-09-06T18:30:00Z"
  },
  {
    id: "sub-102",
    type: "plan_visit",
    name: "Angela & David Chen",
    email: "david.chen@example.com",
    phone: "+39 388 987 6543",
    gathering: "Sunday Worship Service",
    visitDate: "2026-09-13",
    guestsCount: "3",
    notes: "We have a 4-year-old child and look forward to joining Sunday school and breakfast prayer.",
    status: "reviewed",
    createdAt: "2026-09-05T14:15:00Z"
  },
  {
    id: "sub-103",
    type: "contact",
    name: "Elena Moretti",
    email: "elena.m@example.it",
    phone: "+39 320 555 0192",
    message: "Requesting intercessory prayer support for family health.",
    status: "contacted",
    createdAt: "2026-09-04T09:45:00Z"
  }
];

export function getSubmissions(): Submission[] {
  if (typeof window === "undefined") return INITIAL_SUBMISSIONS;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SUBMISSIONS;
  }
}

// Write submission to LocalStorage and Firestore
export function saveSubmission(newSubmission: Omit<Submission, "id" | "createdAt" | "status">): Submission {
  const fullSubmission: Submission = {
    ...newSubmission,
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: "new",
    createdAt: new Date().toISOString()
  };

  const currentList = getSubmissions();
  const updatedList = [fullSubmission, ...currentList];

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event("narrowgate_submission_updated"));
  }

  // Cloud Firestore Persistence
  try {
    const docRef = doc(db, "submissions", fullSubmission.id);
    // Sanitize undefined fields to prevent Firestore serialization errors
    const cleanedPayload = Object.fromEntries(
      Object.entries(fullSubmission).filter(([_, v]) => v !== undefined)
    );
    setDoc(docRef, cleanedPayload).catch((err) => {
      console.warn("Firestore background sync note:", err);
    });
  } catch (e) {
    console.warn("Firestore save error:", e);
  }

  return fullSubmission;
}

// Update status in LocalStorage and Firestore
export function updateSubmissionStatus(id: string, newStatus: Submission["status"]): Submission[] {
  const currentList = getSubmissions();
  const updatedList = currentList.map(item => 
    item.id === id ? { ...item, status: newStatus } : item
  );

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event("narrowgate_submission_updated"));
  }

  try {
    const docRef = doc(db, "submissions", id);
    updateDoc(docRef, { status: newStatus }).catch((err) => {
      console.warn("Firestore update status note:", err);
    });
  } catch (e) {
    console.warn("Firestore update error:", e);
  }

  return updatedList;
}

// Delete submission from LocalStorage and Firestore
export function deleteSubmission(id: string): Submission[] {
  const currentList = getSubmissions();
  const updatedList = currentList.filter(item => item.id !== id);

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event("narrowgate_submission_updated"));
  }

  try {
    const docRef = doc(db, "submissions", id);
    deleteDoc(docRef).catch((err) => {
      console.warn("Firestore delete note:", err);
    });
  } catch (e) {
    console.warn("Firestore delete error:", e);
  }

  return updatedList;
}

// Real-time Firestore subscription for Admin Dashboard
export function subscribeToSubmissions(onUpdate: (submissions: Submission[]) => void): () => void {
  try {
    const submissionsCol = collection(db, "submissions");
    const q = query(submissionsCol, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteList: Submission[] = [];
          snapshot.forEach((docSnap) => {
            remoteList.push(docSnap.data() as Submission);
          });

          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteList));
          }
          onUpdate(remoteList);
        } else {
          // If Firestore is brand new/empty, fall back to initial seeded list
          onUpdate(getSubmissions());
        }
      },
      (error) => {
        console.warn("Firestore live subscription fallback to local cache:", error);
        onUpdate(getSubmissions());
      }
    );

    return unsubscribe;
  } catch (e) {
    console.warn("Firestore subscription error:", e);
    return () => {};
  }
}
