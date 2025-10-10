"use client";

import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import FooterNav from "./_components/footer";
export default function HousekeepingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <div className="flex">
        <Sidebar />

        <div className="flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out">
          <Navbar />

          <main className="flex-1 overflow-y-auto px-0 py-2 md:p-4  ">
            <div className="transition-all duration-300">{children}</div>
          </main>
        </div>
      </div>
      <FooterNav />
    </div>
  );
}
