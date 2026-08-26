"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-mobile-menu", handleOpen);
    return () => window.removeEventListener("open-mobile-menu", handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden flex">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)}></div>
      <div className="relative h-full z-10 animate-in slide-in-from-left duration-300">
        <Sidebar />
      </div>
    </div>
  );
}
