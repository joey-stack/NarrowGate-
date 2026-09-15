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

const COLLECTION = "submissions";

/**
 * Save a new form submission to Firestore.
 */
export async function saveSubmission(
  newSubmission: Omit<Submission, "id" | "createdAt" | "status">
): Promise<Submission> {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...newSubmission,
    status: "new",
    createdAt: serverTimestamp(),
  });

  return {
    ...newSubmission,
    id: docRef.id,
    status: "new",
    createdAt: new Date().toISOString(),
  };
}

/**
 * Fetch all submissions from Firestore, ordered by newest first.
 */
export async function getSubmissions(): Promise<Submission[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      type: data.type,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      gathering: data.gathering,
      visitDate: data.visitDate,
      guestsCount: data.guestsCount,
      notes: data.notes,
      status: data.status,
      // Firestore Timestamp → ISO string (fallback for serverTimestamp() pending writes)
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
    } as Submission;
  });
}

/**
 * Subscribe to real-time updates on the submissions collection.
 * Returns an unsubscribe function to clean up the listener.
 */
export function subscribeToSubmissions(
  callback: (submissions: Submission[]) => void
): Unsubscribe {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const submissions = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        gathering: data.gathering,
        visitDate: data.visitDate,
        guestsCount: data.guestsCount,
        notes: data.notes,
        status: data.status,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
      } as Submission;
    });
    callback(submissions);
  });
}

/**
 * Update the status of a submission document in Firestore.
 */
export async function updateSubmissionStatus(
  id: string,
  newStatus: Submission["status"]
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { status: newStatus });
}

/**
 * Permanently delete a submission document from Firestore.
 */
export async function deleteSubmission(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
