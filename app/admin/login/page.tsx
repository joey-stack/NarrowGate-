"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@narrowgate.church");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const isAuth = localStorage.getItem("narrowgate_admin_authenticated");
    if (isAuth === "true") {
      router.push("/admin");
    }
  }, [router]);

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0F172A]" suppressHydrationWarning />;
  }

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (email.trim() === "admin@narrowgate.church" && password === "admin123") {
        localStorage.setItem("narrowgate_admin_authenticated", "true");
        localStorage.setItem("narrowgate_admin_user", JSON.stringify({
          name: "Rev. Uyi Evbuomwan",
          role: "Administrator",
          email
        }));
        router.push("/admin");
      } else {
        setError("Invalid email or password. Please use default credentials.");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div suppressHydrationWarning className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#090D16] relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B91C1C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#1E293B]/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B91C1C] to-[#7F1D1D] text-white shadow-lg mb-4 text-xl font-bold">
            NG
          </div>
          <h1 className="text-2xl font-bold font-heading text-white mb-1 tracking-tight">
            Narrow Gate CMS
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            The Narrow Gate Foursquare Church Administration
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Admin Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm font-medium transition-all"
              placeholder="admin@narrowgate.church"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm font-medium transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B91C1C] to-[#991B1B] hover:from-[#DC2626] hover:to-[#B91C1C] text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-red-900/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In to Dashboard →"
              )}
            </button>
          </div>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
          <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              🔑 Demo Admin Credentials
            </span>
            <div className="text-xs text-slate-300 space-y-0.5 font-mono">
              <div>Email: <span className="text-red-400">admin@narrowgate.church</span></div>
              <div>Password: <span className="text-red-400">admin123</span></div>
            </div>
          </div>
        </div>

        {/* Return to website link */}
        <div className="mt-6 text-center">
          <a
            href="/en"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            ← Return to Main Website
          </a>
        </div>
      </div>
    </div>
  );
}
