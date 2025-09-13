"use client";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function HousekeepingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 h-screen text-surface-600 bg-gray-50 dark:bg-gray-800">
      <main className="w-full min-h-screen space-y-4">
        <Navbar />
        <div className=" dark:bg-gray-800 rounded">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
