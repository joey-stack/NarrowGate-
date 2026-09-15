"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Submission,
  subscribeToSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from "../../lib/form-store";
import {
  ChurchEvent,
  ChurchEventScheduleItem,
  subscribeToEvents,
  createChurchEvent,
  updateChurchEvent,
  deleteChurchEvent,
  seedDefaultEvents,
  getUpcomingEvents,
  getPastEvents,
  getNextFeaturedEvent,
} from "../../lib/events-store";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [filterType, setFilterType] = useState<"all" | "contact" | "plan_visit">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "reviewed" | "contacted" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"submissions" | "events" | "firestore">("submissions");
  const [isMounted, setIsMounted] = useState(false);

  // Events CMS State
  const [eventSearchQuery, setEventSearchQuery] = useState("");
  const [eventTagFilter, setEventTagFilter] = useState("all");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [isSavingEvent, setIsSavingEvent] = useState(false);
  const [eventFormData, setEventFormData] = useState<Omit<ChurchEvent, "id" | "createdAt">>({
    title: "",
    theme: "",
    scripture: "",
    date: "",
    time: "10:00 AM – 1:30 PM",
    venue: "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy",
    host: "Senior Pastor Rev. Uyi Loveday Evbuomwan",
    overview: "",
    schedule: [{ time: "10:00 AM", title: "Opening Worship" }],
    flyerUrl: "/images/events/anniversary-flyer.jpg",
    tag: "Anniversary",
    isFeatured: false,
  });

  // Check authentication & subscribe to Firestore real-time updates
  useEffect(() => {
    setIsMounted(true);
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

    // Subscribe to Submissions
    const unsubscribeSubmissions = subscribeToSubmissions((data) => {
      setSubmissions(data);
    });

    // Subscribe to Events
    const unsubscribeEvents = subscribeToEvents((data) => {
      setEvents(data);
    });

    return () => {
      unsubscribeSubmissions();
      unsubscribeEvents();
    };
  }, [router]);

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0F172A]" suppressHydrationWarning />;
  }

  const handleLogout = () => {
    localStorage.removeItem("narrowgate_admin_authenticated");
    localStorage.removeItem("narrowgate_admin_user");
    router.push("/admin/login");
  };

  const handleStatusChange = async (id: string, status: Submission["status"]) => {
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
    await updateSubmissionStatus(id, status);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission entry?")) {
      if (selectedSubmission && selectedSubmission.id === id) {
        setSelectedSubmission(null);
      }
      await deleteSubmission(id);
    }
  };

  // Events CRUD Handlers
  const handleOpenCreateEvent = () => {
    setEditingEventId(null);
    setEventFormData({
      title: "",
      theme: "",
      scripture: "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00 AM – 1:30 PM",
      venue: "Via Cadamure 1/19, 31045 Motta di Livenza (TV), Italy",
      host: "Senior Pastor Rev. Uyi Loveday Evbuomwan",
      overview: "",
      schedule: [
        { time: "10:00 AM", title: "Breakfast Prayer & Intercession" },
        { time: "10:30 AM", title: "Anointed Praise & Worship" },
        { time: "11:15 AM", title: "Thanksgiving Word & Testimonies" },
        { time: "12:30 PM", title: "Love Feast Banquet & Fellowship" },
      ],
      flyerUrl: "/images/events/anniversary-flyer.jpg",
      tag: "Anniversary",
      isFeatured: false,
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (event: ChurchEvent) => {
    setEditingEventId(event.id);
    setEventFormData({
      title: event.title || "",
      theme: event.theme || "",
      scripture: event.scripture || "",
      date: event.date || "",
      time: event.time || "",
      venue: event.venue || "",
      host: event.host || "",
      overview: event.overview || "",
      schedule: event.schedule && event.schedule.length > 0 ? event.schedule : [{ time: "10:00 AM", title: "Opening" }],
      flyerUrl: event.flyerUrl || "/images/events/anniversary-flyer.jpg",
      tag: event.tag || "General",
      isFeatured: event.isFeatured ?? false,
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventFormData.title.trim() || !eventFormData.date) {
      alert("Please enter at least an Event Title and Date.");
      return;
    }

    setIsSavingEvent(true);
    try {
      if (editingEventId) {
        await updateChurchEvent(editingEventId, eventFormData);
      } else {
        await createChurchEvent(eventFormData);
      }
      setIsEventModalOpen(false);
      setEditingEventId(null);
    } catch (err: any) {
      alert("Failed to save event: " + (err?.message || err));
    } finally {
      setIsSavingEvent(false);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the event "${title}"?`)) {
      await deleteChurchEvent(id);
    }
  };

  const handleSeedEvents = async () => {
    if (confirm("Seed default church events (Anniversary, Love Feast, Cultural Sunday, etc.) into Firestore?")) {
      try {
        await seedDefaultEvents();
        alert("Default church events seeded successfully!");
      } catch (err: any) {
        alert("Seed failed: " + err?.message);
      }
    }
  };

  // Schedule builder helpers
  const handleAddScheduleStep = () => {
    setEventFormData({
      ...eventFormData,
      schedule: [...eventFormData.schedule, { time: "11:00 AM", title: "Program Milestone" }],
    });
  };

  const handleUpdateScheduleStep = (index: number, field: "time" | "title", value: string) => {
    const updated = [...eventFormData.schedule];
    updated[index][field] = value;
    setEventFormData({ ...eventFormData, schedule: updated });
  };

  const handleRemoveScheduleStep = (index: number) => {
    const updated = eventFormData.schedule.filter((_, i) => i !== index);
    setEventFormData({ ...eventFormData, schedule: updated });
  };

  // Submissions Filtering
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

  // Events Filtering
  const filteredEvents = events.filter((ev) => {
    const matchesTag = eventTagFilter === "all" || ev.tag?.toLowerCase() === eventTagFilter.toLowerCase();
    const q = eventSearchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      ev.title?.toLowerCase().includes(q) ||
      ev.theme?.toLowerCase().includes(q) ||
      ev.venue?.toLowerCase().includes(q) ||
      ev.host?.toLowerCase().includes(q);
    return matchesTag && matchesSearch;
  });

  // Metrics
  const totalCount = submissions.length;
  const newCount = submissions.filter((s) => s.status === "new").length;
  const contactCount = submissions.filter((s) => s.type === "contact").length;
  const visitCount = submissions.filter((s) => s.type === "plan_visit").length;

  const upcomingEvents = getUpcomingEvents(events);
  const pastEvents = getPastEvents(events);
  const nextFeatured = getNextFeaturedEvent(events);

  return (
    <div suppressHydrationWarning className="min-h-screen flex flex-col bg-[#0F172A] text-slate-100">
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
                Live Church Portal
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
                    <span>Submissions</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px]">
                    {totalCount}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("events")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "events"
                      ? "bg-[#B91C1C] text-white shadow-lg shadow-red-950/40"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>🎉</span>
                    <span>Events Management</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px]">
                    {events.length}
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
              <span>Firestore Connected</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Submissions & Events are wired directly to Firebase Firestore live.
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
          {/* Mobile Tab Pills */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            <button
              onClick={() => setActiveTab("submissions")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                activeTab === "submissions" ? "bg-[#B91C1C] text-white" : "bg-slate-800 text-slate-300"
              }`}
            >
              Submissions ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                activeTab === "events" ? "bg-[#B91C1C] text-white" : "bg-slate-800 text-slate-300"
              }`}
            >
              Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab("firestore")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                activeTab === "firestore" ? "bg-[#B91C1C] text-white" : "bg-slate-800 text-slate-300"
              }`}
            >
              Firestore
            </button>
          </div>

          {/* TAB 1: EVENTS MANAGEMENT */}
          {activeTab === "events" && (
            <div className="space-y-6">
              {/* Header & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">
                    Church Events & Special Celebrations
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage upcoming programs, update event dates, upload flyers, and customize schedules.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSeedEvents}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700 flex items-center gap-1.5"
                  >
                    <span>⚡</span>
                    <span>Seed Default Events</span>
                  </button>

                  <button
                    onClick={handleOpenCreateEvent}
                    className="px-4 py-2 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>➕</span>
                    <span>Create New Event</span>
                  </button>
                </div>
              </div>

              {/* Event KPI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Total Events
                  </div>
                  <div className="text-2xl font-bold font-heading text-white">{events.length}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Upcoming
                  </div>
                  <div className="text-2xl font-bold font-heading text-emerald-400">{upcomingEvents.length}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Past Milestones
                  </div>
                  <div className="text-2xl font-bold font-heading text-slate-400">{pastEvents.length}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Current Homepage Feature
                  </div>
                  <div className="text-xs font-bold text-[#F2EBD1] truncate mt-1">
                    {nextFeatured ? nextFeatured.title : "None Scheduled"}
                  </div>
                  <span className="text-[10px] text-emerald-400">● Automatic Next Event</span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="p-4 rounded-xl bg-[#1E293B] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 max-w-md relative w-full">
                  <input
                    type="text"
                    value={eventSearchQuery}
                    onChange={(e) => setEventSearchQuery(e.target.value)}
                    placeholder="Search events by title, theme, or venue..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    🔍
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={eventTagFilter}
                    onChange={(e) => setEventTagFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-red-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="celebration">Celebration</option>
                    <option value="family">Family</option>
                    <option value="youth">Youth</option>
                    <option value="prayer">Prayer</option>
                    <option value="outreach">Outreach</option>
                  </select>
                </div>
              </div>

              {/* Events Grid / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const isUpcoming = !event.date || event.date >= new Date().toISOString().split("T")[0];
                  const isFeaturedThis = nextFeatured?.id === event.id;

                  return (
                    <div
                      key={event.id}
                      className="bg-[#1E293B] rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between shadow-md hover:border-slate-700 transition-all"
                    >
                      {/* Flyer Thumbnail & Badges */}
                      <div className="relative aspect-[16/10] w-full bg-black/50 overflow-hidden">
                        <Image
                          src={event.flyerUrl || "/images/events/anniversary-flyer.jpg"}
                          alt={event.title}
                          fill
                          className="object-cover object-center"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white border border-white/10">
                            {event.tag}
                          </span>
                          {isFeaturedThis && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
                              ★ Home Featured
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isUpcoming ? "bg-[#B91C1C] text-white" : "bg-slate-700 text-slate-300"
                            }`}
                          >
                            {event.date || "TBA"}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-heading font-bold text-base text-white line-clamp-1">
                            {event.title}
                          </h3>
                          {event.theme && (
                            <p className="text-xs text-[#F2EBD1] font-semibold italic line-clamp-1">
                              "{event.theme}"
                            </p>
                          )}
                          <div className="text-[11px] text-slate-400 space-y-1">
                            <p className="flex items-center gap-1.5">
                              <span>⏰</span> <span>{event.time || "10:00 AM"}</span>
                            </p>
                            <p className="flex items-center gap-1.5 truncate">
                              <span>📍</span> <span>{event.venue}</span>
                            </p>
                            {event.schedule && event.schedule.length > 0 && (
                              <p className="text-[10px] text-slate-500 pt-1">
                                {event.schedule.length} schedule milestones configured
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleOpenEditEvent(event)}
                            className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors text-center"
                          >
                            ✏️ Edit Details & Date
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id, event.title)}
                            className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredEvents.length === 0 && (
                <div className="p-12 text-center rounded-2xl bg-[#1E293B] border border-slate-800">
                  <div className="text-4xl mb-3">📅</div>
                  <h3 className="text-base font-bold text-white mb-1">No Events Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                    Get started by creating your first event or seed the church's annual calendar!
                  </p>
                  <button
                    onClick={handleSeedEvents}
                    className="px-4 py-2 rounded-xl bg-[#B91C1C] text-white text-xs font-bold"
                  >
                    Seed Default Events
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SUBMISSIONS */}
          {activeTab === "submissions" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Submissions Inbox</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage visit reservations and contact messages submitted through the website.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Total Entries
                    </div>
                    <div className="text-2xl font-bold font-heading text-white">{totalCount}</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold">
                    📋
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      New Unread
                    </div>
                    <div className="text-2xl font-bold font-heading text-emerald-400">{newCount}</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold">
                    ✨
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

              {/* Data Toolbar */}
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
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 focus:outline-none focus:border-red-500"
                  >
                    <option value="all">All Form Types</option>
                    <option value="contact">Contact Us Forms</option>
                    <option value="plan_visit">Plan A Visit Forms</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 focus:outline-none focus:border-red-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New (Unread)</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Submissions Table */}
              <div className="rounded-2xl bg-[#1E293B] border border-slate-800 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Applicant / Contact</th>
                        <th className="py-3 px-4">Details / Notes</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-xs">
                      {filteredSubmissions.map((sub) => (
                        <tr
                          key={sub.id}
                          onClick={() => setSelectedSubmission(sub)}
                          className="hover:bg-slate-800/60 cursor-pointer transition-colors"
                        >
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                sub.type === "plan_visit"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}
                            >
                              {sub.type === "plan_visit" ? "Plan Visit" : "Contact"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-white">{sub.name}</div>
                            <div className="text-[11px] text-slate-400">{sub.email}</div>
                            {sub.phone && (
                              <div className="text-[10px] text-slate-500">{sub.phone}</div>
                            )}
                          </td>
                          <td className="py-4 px-4 max-w-xs">
                            {sub.type === "plan_visit" ? (
                              <div className="text-slate-300 truncate">
                                <span className="font-semibold text-white">{sub.gathering}:</span>{" "}
                                {sub.visitDate} ({sub.guestsCount || "1"} guests)
                              </div>
                            ) : (
                              <div className="text-slate-300 truncate">
                                {sub.message || "No message content"}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                sub.status === "new"
                                  ? "bg-emerald-500/20 text-emerald-400 animate-pulse"
                                  : sub.status === "reviewed"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : sub.status === "contacted"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "bg-slate-700 text-slate-400"
                              }`}
                            >
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-[11px] text-slate-400">
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDelete(sub.id)}
                              className="text-red-400 hover:text-red-300 text-xs font-semibold px-2 py-1 rounded hover:bg-red-500/10"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredSubmissions.length === 0 && (
                  <div className="p-10 text-center text-slate-400 text-xs">
                    No submissions matching your filter criteria.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: FIRESTORE SETTINGS */}
          {activeTab === "firestore" && (
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
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500">PROJECT_ID:</span>{" "}
                    <span className="text-emerald-400">narrowgate-church</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500">AUTH_DOMAIN:</span>{" "}
                    <span className="text-emerald-400">narrowgate-church.firebaseapp.com</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500">COLLECTIONS:</span>{" "}
                    <span className="text-emerald-400">/submissions, /events</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* EVENT CREATE / EDIT MODAL */}
      {isEventModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative max-w-2xl w-full my-8 bg-[#1E293B] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  {editingEventId ? "Edit Church Event" : "Create New Church Event"}
                </h3>
                <p className="text-xs text-slate-400">
                  {editingEventId
                    ? "Update event details, change dates, or upload an updated poster."
                    : "Add an upcoming celebration to Firestore. It will auto-reflect on the website."}
                </p>
              </div>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    placeholder="e.g. Annual Church Anniversary"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category / Tag *</label>
                  <select
                    value={eventFormData.tag}
                    onChange={(e) => setEventFormData({ ...eventFormData, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Anniversary">Anniversary</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Family">Family</option>
                    <option value="Youth">Youth</option>
                    <option value="Prayer">Prayer</option>
                    <option value="Outreach">Outreach</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Event Date (YYYY-MM-DD) *</label>
                  <input
                    type="date"
                    required
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Time Range</label>
                  <input
                    type="text"
                    value={eventFormData.time}
                    onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                    placeholder="e.g. 10:00 AM – 1:30 PM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Theme (Optional)</label>
                  <input
                    type="text"
                    value={eventFormData.theme}
                    onChange={(e) => setEventFormData({ ...eventFormData, theme: e.target.value })}
                    placeholder="e.g. A Year of Divine Grace & Fruitfulness"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Scripture Reference</label>
                  <input
                    type="text"
                    value={eventFormData.scripture}
                    onChange={(e) => setEventFormData({ ...eventFormData, scripture: e.target.value })}
                    placeholder="e.g. Psalm 65:11"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Venue Address</label>
                  <input
                    type="text"
                    value={eventFormData.venue}
                    onChange={(e) => setEventFormData({ ...eventFormData, venue: e.target.value })}
                    placeholder="e.g. Via Cadamure 1/19, 31045 Motta di Livenza"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Host / Minister</label>
                  <input
                    type="text"
                    value={eventFormData.host}
                    onChange={(e) => setEventFormData({ ...eventFormData, host: e.target.value })}
                    placeholder="e.g. Senior Pastor Rev. Uyi Loveday Evbuomwan"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Flyer Image Path / URL</label>
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={eventFormData.flyerUrl}
                    onChange={(e) => setEventFormData({ ...eventFormData, flyerUrl: e.target.value })}
                    placeholder="e.g. /images/events/anniversary-flyer.jpg or https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                    <span>Quick options:</span>
                    <button
                      type="button"
                      onClick={() => setEventFormData({ ...eventFormData, flyerUrl: "/images/events/anniversary-flyer.jpg" })}
                      className="hover:text-white underline"
                    >
                      Anniversary Flyer
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setEventFormData({ ...eventFormData, flyerUrl: "/images/banco-alimentare.webp" })}
                      className="hover:text-white underline"
                    >
                      Food Bank
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setEventFormData({ ...eventFormData, flyerUrl: "/images/gatherings/intercessory-prayer.jpg" })}
                      className="hover:text-white underline"
                    >
                      Prayer
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={eventFormData.overview}
                  onChange={(e) => setEventFormData({ ...eventFormData, overview: e.target.value })}
                  placeholder="Detailed description of what will take place during this special gathering..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Dynamic Program Schedule Builder */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-bold">Program Schedule Steps</label>
                  <button
                    type="button"
                    onClick={handleAddScheduleStep}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold"
                  >
                    + Add Step
                  </button>
                </div>

                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {eventFormData.schedule.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={step.time}
                        onChange={(e) => handleUpdateScheduleStep(idx, "time", e.target.value)}
                        placeholder="Time (e.g. 10:00 AM)"
                        className="w-32 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleUpdateScheduleStep(idx, "title", e.target.value)}
                        placeholder="Activity (e.g. Breakfast Prayer)"
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveScheduleStep(idx)}
                        className="px-2 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEvent}
                  className="px-6 py-2 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-bold transition-all shadow-md disabled:opacity-50"
                >
                  {isSavingEvent ? "Saving to Firestore..." : editingEventId ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUBMISSION DETAILS MODAL */}
      {selectedSubmission && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative max-w-xl w-full bg-[#1E293B] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    selectedSubmission.type === "plan_visit"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {selectedSubmission.type === "plan_visit" ? "Visit Reservation" : "Contact Message"}
                </span>
                <span className="text-xs text-slate-400">ID: {selectedSubmission.id.substring(0, 8)}</span>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Applicant Name
                </div>
                <div className="text-sm font-bold text-white">{selectedSubmission.name}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Email Address
                </div>
                <div className="text-xs font-semibold text-slate-200 truncate">
                  {selectedSubmission.email}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Phone / WhatsApp
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {selectedSubmission.phone || "None Provided"}
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

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {selectedSubmission.type === "plan_visit" ? "Visitor Notes" : "Message Content"}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {selectedSubmission.message || selectedSubmission.notes || "No extra notes provided."}
              </p>
            </div>

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
