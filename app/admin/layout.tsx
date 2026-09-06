import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Narrow Gate Foursquare Church",
  description: "CMS Administration Portal for managing form submissions, visit reservations, and ministry enquiries.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0F172A] text-[#F8FAFC] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
