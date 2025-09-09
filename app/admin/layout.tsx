"use client";
import { Providers } from "../providers";
import Sidebar from "./_components/sidebar";
import AdminNavbar from "./_components/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 h-screen text-surface-600 bg-primary-50 dark:bg-gray-800">
      <Sidebar />
      <main className="w-full min-h-screen max-h-screen overflow-y-auto space-y-4">
        <AdminNavbar />
        <div className="bg-white dark:bg-gray-900 rounded">{children}</div>
      </main>
    </div>
  );
}
