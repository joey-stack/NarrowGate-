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

// Initial seed submissions so the admin dashboard immediately renders realistic records
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
    // Dispatch custom event to update admin dashboard UI live in the same browser window
    window.dispatchEvent(new Event("narrowgate_submission_updated"));
  }

  return fullSubmission;
}

export function updateSubmissionStatus(id: string, newStatus: Submission["status"]): Submission[] {
  const currentList = getSubmissions();
  const updatedList = currentList.map(item => 
    item.id === id ? { ...item, status: newStatus } : item
  );

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event("narrowgate_submission_updated"));
  }

  return updatedList;
}

export function deleteSubmission(id: string): Submission[] {
  const currentList = getSubmissions();
  const updatedList = currentList.filter(item => item.id !== id);

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event("narrowgate_submission_updated"));
  }

  return updatedList;
}
