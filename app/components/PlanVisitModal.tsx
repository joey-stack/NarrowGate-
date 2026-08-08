"use client";

import { useState, useEffect, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { usePlanVisit } from "./PlanVisitContext";

export function PlanVisitModal() {
  const t = useTranslations("PlanVisitModal");
  const { isOpen, selectedGathering, closePlanVisitModal } = usePlanVisit();

  const [gathering, setGathering] = useState(selectedGathering);
  const [date, setDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bringingFamily, setBringingFamily] = useState("no");
  const [guestsCount, setGuestsCount] = useState("1");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state when modal opens or selected gathering changes
  useEffect(() => {
    if (isOpen) {
      setGathering(selectedGathering || "sundayService");
      setIsSubmitted(false);
      // Default to next Sunday's date if empty
      if (!date) {
        const today = new Date();
        const daysUntilSunday = (7 - today.getDay()) % 7 || 7;
        const nextSunday = new Date(today);
        nextSunday.setDate(today.getDate() + daysUntilSunday);
        setDate(nextSunday.toISOString().split("T")[0]);
      }
    }
  }, [isOpen, selectedGathering]);

  // Handle Escape Key to Close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closePlanVisitModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closePlanVisitModal]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant secure submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Glassmorphic Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={closePlanVisitModal}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-[#121212] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 text-white transition-all transform my-8">
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
            <h2 className="font-heading font-extrabold text-lg sm:text-xl text-white uppercase tracking-wider">
              {t("title")}
            </h2>
          </div>
          <button
            onClick={closePlanVisitModal}
            className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-[#B91C1C]/20 border border-[#B91C1C] rounded-full flex items-center justify-center mx-auto text-[#B91C1C]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                {t("successTitle")}
              </h3>

              <p className="text-sm text-white/80 leading-relaxed max-w-md mx-auto">
                {t("successMessage")}
              </p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/70 space-y-1.5 text-left max-w-md mx-auto">
                <p>📍 <strong className="text-white">Location:</strong> Via Cadamure, N1/19 31045, Motta Di Livenza, Italy</p>
                <p>📞 <strong className="text-white">Contact:</strong> +39 - 3883629233 / fgcititaly@aol.com</p>
              </div>

              <button
                onClick={closePlanVisitModal}
                className="w-full py-3.5 rounded-xl bg-[#B91C1C] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#991B1B] transition-colors shadow-lg mt-4"
              >
                {t("closeBtn")}
              </button>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                {t("subtitle")}
              </p>

              {/* Gathering Selection */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-1.5">
                  {t("gatheringLabel")} *
                </label>
                <select
                  value={gathering}
                  onChange={(e) => setGathering(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] transition-colors"
                  required
                >
                  <option value="sundayService" className="bg-[#121212] text-white">
                    {t("gatherings.sundayService")}
                  </option>
                  <option value="sundayBreakfast" className="bg-[#121212] text-white">
                    {t("gatherings.sundayBreakfast")}
                  </option>
                  <option value="wednesdayBible" className="bg-[#121212] text-white">
                    {t("gatherings.wednesdayBible")}
                  </option>
                  <option value="saturdayPrayer" className="bg-[#121212] text-white">
                    {t("gatherings.saturdayPrayer")}
                  </option>
                </select>
              </div>

              {/* Grid: Planned Date & Full Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-1.5">
                    {t("dateLabel")} *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-1.5">
                    {t("fullNameLabel")} *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("fullNamePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Grid: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-1.5">
                    {t("emailLabel")} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-1.5">
                    {t("phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("phonePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] transition-colors"
                  />
                </div>
              </div>

              {/* Bringing Family Radio Toggle */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-1.5">
                  {t("familyLabel")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBringingFamily("yes")}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                      bringingFamily === "yes"
                        ? "bg-[#B91C1C]/20 border-[#B91C1C] text-white"
                        : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {t("familyYes")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBringingFamily("no")}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                      bringingFamily === "no"
                        ? "bg-[#B91C1C]/20 border-[#B91C1C] text-white"
                        : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {t("familyNo")}
                  </button>
                </div>
              </div>

              {bringingFamily === "yes" && (
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-1.5">
                    {t("guestsCountLabel")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] transition-colors"
                  />
                </div>
              )}

              {/* Notes / Special Requests */}
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-white/90 mb-1.5">
                  {t("notesLabel")}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("notesPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#B91C1C] text-white font-heading font-extrabold text-xs uppercase tracking-widest shadow-lg hover:bg-[#991B1B] transition-colors disabled:opacity-50 mt-2"
              >
                {isSubmitting ? t("submitting") : `${t("submitBtn")} →`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
