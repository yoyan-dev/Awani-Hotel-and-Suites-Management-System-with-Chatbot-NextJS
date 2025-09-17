"use client";
import React, { useEffect, useState } from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import { User } from "@/types/users";
import { supabase } from "@/lib/supabase/supabase-client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getCurrentUser } from "@/features/auth/auth-thunk";

export default function HousekeepingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector(
    (state: RootState) => state.auth_user
  );

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const enhancedChildren = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { user, isLoading })
      : child
  );
  return (
    <div className="flex gap-4 h-screen text-surface-600 bg-gray-50 dark:bg-gray-800">
      <main className="w-full min-h-screen space-y-4">
        <Navbar user={user} isLoading={isLoading} />
        <div className="dark:bg-gray-800 rounded">{enhancedChildren}</div>
        <Footer />
      </main>
    </div>
  );
}
