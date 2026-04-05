"use client";
import Header from "@/component/header";
import HomeSection from "@/component/homesection";
import Project from "@/component/projectsection";
import Education from "@/component/educationsection";
import Skills from "@/component/skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0d] text-black dark:text-gray-100 transition-colors duration-300">
      <Header />
      <HomeSection />
      <Project />
      <Education />
      <Skills />
    </div>
  );
}
