"use client";

import React from "react";
import Sidebar from "./components/sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <main className="flex">
        <Sidebar />
        {children}
      </main>
    </>
  );
}

export default DashboardLayout;
