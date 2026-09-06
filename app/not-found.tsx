export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-[#f2ebd1] flex flex-col justify-between font-sans">
      {/* Simple Header */}
      <header className="py-6 px-4 border-b border-black/10 bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/en" className="font-heading font-bold text-lg text-white">
            The Narrow Gate Foursquare Church
          </a>
          <a
            href="/en"
            className="text-xs font-heading font-bold uppercase tracking-wider text-accent-light hover:underline"
          >
            ← Return to Home
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-24 sm:py-32 flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-lg bg-eyebrow-gradient text-white text-xs font-heading font-bold uppercase tracking-wider mb-6 shadow-sm">
            404 — Page Not Found
          </span>
          <h1 className="text-display text-[#121212] mb-4 leading-tight">
            Page Not Found
          </h1>
          <p className="text-subheading text-[#525252] mb-8">
            The page you are looking for does not exist or may have been moved.
          </p>
          <a
            href="/en"
            className="btn-gradient-link text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <span>Return Home</span>
            <span className="arrow-icon">→</span>
          </a>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-6 px-4 border-t border-black/10 bg-[#121212] text-white/70 text-xs text-center">
        © The Narrow Gate Foursquare Church • Motta di Livenza, Italy
      </footer>
    </div>
  );
}
