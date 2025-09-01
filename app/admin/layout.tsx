'use client'
import { Providers } from "../providers";
import Sidebar from "./_components/sidebar";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className="flex gap-4 h-screen text-surface-600 bg-gray-50">
        <Sidebar />
        <main className="w-full min-h-screen">
          navbar
          <div className="p-6">{children}</div>
        </main> 
      </div>
    </Providers>
  );
}
