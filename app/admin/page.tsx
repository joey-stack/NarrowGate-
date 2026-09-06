"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Submission,
  getSubmissions,
  updateSubmissionStatus,
  deleteSubmission
} from "../../lib/form-store";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filterType, setFilterType] = useState<"all" | "contact" | "plan_visit">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "reviewed" | "contacted" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"submissions" | "firestore">("submissions");

  // Check authentication & load data
  useEffect(() => {
    const isAuth = localStorage.getItem("narrowgate_admin_authenticated");
    if (isAuth !== "true") {
      router.push("/admin/login");
      return;
    }

    const savedUser = localStorage.getItem("narrowgate_admin_user");
    if (savedUser) {
      try {
        setAdminUser(JSON.parse(savedUser));
      } catch {
        setAdminUser({ name: "Rev. Uyi Evbuomwan", email: "admin@narrowgate.church" });
      }
    }

    const loadData = () => {
      setSubmissions(getSubmissions());
    };

    loadData();

    // Listen for live form submission updates from main site
    window.addEventListener("narrowgate_submission_updated", loadData);
    return () => window.removeEventListener("narrowgate_submission_updated", loadData);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("narrowgate_admin_authenticated");
    localStorage.removeItem("narrowgate_admin_user");
    router.push("/admin/login");
  };

  const handleStatusChange = (id: string, status: Submission["status"]) => {
    const updated = updateSubmissionStatus(id, status);
    setSubmissions(updated);
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this submission entry?")) {
      const updated = deleteSubmission(id);
      setSubmissions(updated);
      if (selectedSubmission && selectedSubmission.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  // Filtered dataset
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesType = filterType === "all" || sub.type === filterType;
    const matchesStatus = filterStatus === "all" || sub.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      sub.name.toLowerCase().includes(q) ||
      sub.email.toLowerCase().includes(q) ||
      sub.phone.toLowerCase().includes(q) ||
      (sub.message && sub.message.toLowerCase().includes(q)) ||
      (sub.notes && sub.notes.toLowerCase().includes(q));

    return matchesType && matchesStatus && matchesSearch;
  });

  // KPI Metrics
  const totalCount = submissions.length;
  const newCount = submissions.filter((s) => s.status === "new").length;
  const contactCount = submissions.filter((s) => s.type === "contact").length;
  const visitCount = submissions.filter((s) => s.type === "plan_visit").length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-slate-100">
      {/* Top CMS Header */}
      <header className="h-16 bg-[#1E293B] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B91C1C] to-[#7F1D1D] text-white flex items-center justify-center font-bold text-sm shadow-md">
            NG
          </div>
          <div>
            <h1 className="font-heading font-bold text-sm sm:text-base text-white leading-tight">
              The Narrow Gate CMS
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Live Submissions System
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/en"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            <span>View Public Website</span>
            <span className="text-xs">↗</span>
          </a>

          <div className="h-6 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{adminUser?.name || "Administrator"}</div>
              <div className="text-[10px] text-slate-400">{adminUser?.email || "admin@narrowgate.church"}</div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left CMS Sidebar */}
        <aside className="w-64 bg-[#1E293B]/70 border-r border-slate-800 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">
                Main Navigation
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("submissions")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "submissions"
                      ? "bg-[#B91C1C] text-white shadow-lg shadow-red-950/40"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>📋</span>
                    <span>All Submissions</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px]">
                    {totalCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("submissions");
                    setFilterType("contact");
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span>💬</span>
                    <span>Contact Messages</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400">
                    {contactCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("submissions");
                    setFilterType("plan_visit");
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span>📅</span>
                    <span>Visit Reservations</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400">
                    {visitCount}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("firestore")}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === "firestore"
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <span>🔥</span>
                  <span>Firestore Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Database Footer Status Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
            <div className="font-bold text-slate-200 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Database Engine</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Firestore & Local Reactive Store connected and listening to website forms.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
          {activeTab === "firestore" ? (
            /* Firestore Status Tab */
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-xl font-bold font-heading text-white mb-2">
                  Firestore & Backend Configuration
                </h2>
                <p className="text-xs text-slate-400">
                  Manage your Firebase Firestore credentials and database connection state.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1E293B] border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white">Firestore Client Status</h3>
                    <p className="text-xs text-slate-400">Project: narrowgate-church</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    Connected & Ready
                  </span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-slate-400 font-bold font-sans uppercase tracking-wider text-[10px]">
                      Configured Collections
                    </div>
                    <div className="text-emerald-400">✓ submissions (Contact & Visit Registrations)</div>
                    <div className="text-emerald-400">✓ analytics (Form Submission Metrics)</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Main Submissions Tab */
            <>
              {/* Top Analytics KPI Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Total Submissions
                    </div>
                    <div className="text-2xl font-bold font-heading text-white">{totalCount}</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold">
                    📥
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      New / Unread
                    </div>
                    <div className="text-2xl font-bold font-heading text-amber-400">{newCount}</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold">
                    🔔
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Contact Queries
                    </div>
                    <div className="text-2xl font-bold font-heading text-white">{contactCount}</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-xl font-bold">
                    💬
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Visit Reservations
                    </div>
                    <div className="text-2xl font-bold font-heading text-white">{visitCount}</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                    📅
                  </div>
                </div>
              </div>

              {/* Data Toolbar (Search & Category Filters) */}
              <div className="p-4 rounded-2xl bg-[#1E293B] border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex-1 max-w-md relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone, or keyword..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    🔍
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Type Filter */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 focus:outline-none focus:border-red-500"
                  >
                    <option value="all">All Form Types</option>
                    <option value="contact">Contact Us Forms</option>
                    <option value="plan_visit">Plan A Visit Forms</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 focus:outline-none focus:border-red-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New / Unread</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Submissions Grid Table */}
              <div className="rounded-2xl bg-[#1E293B] border border-slate-800 overflow-hidden shadow-xl">
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-heading font-bold text-sm text-white">
                    Submitted Forms ({filteredSubmissions.length})
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Click any row to inspect full form fields
                  </span>
                </div>

                {filteredSubmissions.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <div className="text-3xl">📭</div>
                    <div className="font-bold text-sm text-slate-300">No submissions found</div>
                    <p className="text-xs">
                      Try adjusting your search query or filters, or submit a form on the public website.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-900/60 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
                        <tr>
                          <th className="py-3.5 px-6">Form Type</th>
                          <th className="py-3.5 px-6">Submitted By</th>
                          <th className="py-3.5 px-6">Contact Info</th>
                          <th className="py-3.5 px-6">Submission Details</th>
                          <th className="py-3.5 px-6">Date</th>
                          <th className="py-3.5 px-6">Status</th>
                          <th className="py-3.5 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredSubmissions.map((sub) => (
                          <tr
                            key={sub.id}
                            onClick={() => setSelectedSubmission(sub)}
                            className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                          >
                            <td className="py-4 px-6">
                              {sub.type === "plan_visit" ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold text-[10px] uppercase tracking-wider">
                                  📅 Visit Request
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold text-[10px] uppercase tracking-wider">
                                  💬 Contact Form
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-6 font-bold text-white group-hover:text-red-400 transition-colors">
                              {sub.name}
                            </td>

                            <td className="py-4 px-6 space-y-0.5">
                              <div className="font-mono text-slate-200">{sub.email}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{sub.phone || "No phone"}</div>
                            </td>

                            <td className="py-4 px-6 max-w-xs">
                              {sub.type === "plan_visit" ? (
                                <div className="space-y-0.5">
                                  <div className="font-semibold text-slate-200">
                                    Service: <span className="text-white">{sub.gathering}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-400">
                                    Date: {sub.visitDate} • Guests: {sub.guestsCount}
                                  </div>
                                </div>
                              ) : (
                                <div className="truncate text-slate-300 italic">
                                  "{sub.message}"
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">
                              {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </td>

                            <td className="py-4 px-6">
                              {sub.status === "new" && (
                                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                                  New
                                </span>
                              )}
                              {sub.status === "reviewed" && (
                                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                                  Reviewed
                                </span>
                              )}
                              {sub.status === "contacted" && (
                                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                  Contacted
                                </span>
                              )}
                              {sub.status === "archived" && (
                                <span className="px-2.5 py-1 rounded-full bg-slate-700 border border-slate-600 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                  Archived
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSubmission(sub);
                                }}
                                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                              >
                                Manage →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Detailed Form View Drawer / Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#1E293B] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Submission ID: {selectedSubmission.id}
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  {selectedSubmission.type === "plan_visit"
                    ? "📅 Plan A Visit Reservation"
                    : "💬 Contact Form Inquiry"}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Full Name
                </div>
                <div className="text-sm font-bold text-white">{selectedSubmission.name}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Email Address
                </div>
                <div className="text-sm font-bold text-red-400 font-mono">{selectedSubmission.email}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Phone Number
                </div>
                <div className="text-sm font-semibold text-slate-200 font-mono">
                  {selectedSubmission.phone || "Not provided"}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Submitted At
                </div>
                <div className="text-xs font-semibold text-slate-300 font-mono">
                  {new Date(selectedSubmission.createdAt).toLocaleString()}
                </div>
              </div>

              {selectedSubmission.type === "plan_visit" && (
                <>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Gathering Type
                    </div>
                    <div className="text-sm font-bold text-white">{selectedSubmission.gathering}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Requested Date & Guests
                    </div>
                    <div className="text-sm font-semibold text-slate-200">
                      Date: {selectedSubmission.visitDate} • Guests: {selectedSubmission.guestsCount}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Message / Notes Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {selectedSubmission.type === "plan_visit" ? "Visitor Notes" : "Message Content"}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedSubmission.message || selectedSubmission.notes || "No extra notes provided."}
              </p>
            </div>

            {/* Management Controls */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-300">Update Status:</div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedSubmission.id, "reviewed")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSubmission.status === "reviewed"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  Mark Reviewed
                </button>

                <button
                  onClick={() => handleStatusChange(selectedSubmission.id, "contacted")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSubmission.status === "contacted"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  Mark Contacted
                </button>

                <button
                  onClick={() => handleStatusChange(selectedSubmission.id, "archived")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSubmission.status === "archived"
                      ? "bg-slate-700 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  Archive
                </button>

                <div className="ml-auto flex items-center gap-2">
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-bold transition-colors"
                  >
                    Email Applicant
                  </a>

                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-colors"
                  >
                    Delete Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
