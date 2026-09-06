"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { saveSubmission } from "../../lib/form-store";

export function ContactForm() {
  const t = useTranslations("ContactPage");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    saveSubmission({
      type: "contact",
      name,
      email,
      phone,
      message
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 400);
  };

  return (
    <div className="rounded-lg bg-white border border-black/10 p-8 sm:p-10 shadow-sm">
      <h2 className="text-h2 text-[#121212] mb-6">{t("formTitle")}</h2>

      {isSubmitted ? (
        <div className="p-6 rounded-lg bg-[#f2ebd1] border border-black/10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#121212] text-white flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h3 className="font-heading font-bold text-[#121212] text-lg">Thank You!</h3>
          <p className="text-sm text-[#525252]">
            Your message has been successfully received by our administrative team. We will reach out to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-5 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-md bg-[#121212] text-white hover:bg-black transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#121212] mb-2">
              {t("nameLabel")}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-[#121212] font-body bg-[#f2ebd1] text-[#121212]"
              placeholder="Your Full Name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#121212] mb-2">
                {t("emailLabel")}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-[#121212] font-body bg-[#f2ebd1] text-[#121212]"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#121212] mb-2">
                {t("phoneLabel")}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-[#121212] font-body bg-[#f2ebd1] text-[#121212]"
                placeholder="+39 388 362 9233"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-[#121212] mb-2">
              {t("messageLabel")}
            </label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:border-[#121212] font-body bg-[#f2ebd1] text-[#121212]"
              placeholder="Write your message or prayer request..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 rounded-lg bg-[#121212] text-white font-heading font-bold text-sm uppercase tracking-wider shadow-sm hover:bg-black transition-all w-full sm:w-auto disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : `${t("submitButton")} →`}
          </button>
        </form>
      )}
    </div>
  );
}
