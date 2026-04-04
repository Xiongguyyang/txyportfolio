"use client";
import { useEffect, useState } from "react";
import Header from "@/component/header";
import HomeSection from "@/component/homesection";
import Project from "@/component/projectsection";
import Education from "@/component/educationsection";
import Skills from "@/component/skills";

export default function Home() {
  const [pagemode, setPagemode] = useState("light");

  // Restore persisted preference on mount
  useEffect(() => {
    const stored = localStorage.getItem("pagemode");
    if (stored) setPagemode(stored);
  }, []);

  // Sync localStorage + toggle Tailwind dark class on <html>
  useEffect(() => {
    localStorage.setItem("pagemode", pagemode);
    document.documentElement.classList.toggle("dark", pagemode === "dark");
  }, [pagemode]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0d] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header pagemode={pagemode} setPagemode={setPagemode} />
      <HomeSection />
      <Project />
      <Education />
      <Skills />
    </div>
  );
}
