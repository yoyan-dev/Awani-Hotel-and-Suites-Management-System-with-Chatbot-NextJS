"use client";
import React, { useEffect, useState } from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import { User } from "@/types/users";
import { supabase } from "@/lib/supabase/supabase-client";
import Chatbot from "./_components/chatbot";

export default function HousekeepingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<{ user: User | null; isLoading: boolean }>(
    { user: null, isLoading: true }
  );

  useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setState({ user: (user as User) ?? null, isLoading: false });
    }

    getCurrentUser();
  }, []);

  // const enhancedChildren = React.Children.map(children, (child) =>
  //   React.isValidElement(child)
  //     ? React.cloneElement(child, {
  //         user: state.user,
  //         isLoading: state.isLoading,
  //       })
  //     : child
  // );
  return (
    <>
      <div className="flex gap-4 h-screen text-surface-600 bg-gray-50 dark:bg-gray-800">
        <main className="w-full min-h-screen space-y-4">
          <Navbar user={state.user} isLoading={state.isLoading} />
          <div className="dark:bg-gray-800 rounded">{children}</div>
          <Footer />
        </main>
      </div>
      <Chatbot />
    </>
  );
}
