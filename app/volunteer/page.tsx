"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { BsFire } from "react-icons/bs";
import { fadeUp, stagger } from "@/lib/variants";
import { useTheme } from "@/component/ThemeProvider";

const VOLUNTEER = [
  {
    role: "Tech Mentor",
    org: "Code for Laos — Youth Program",
    period: "Mar 2024 – Present",
    hours: "40+ hrs",
    description:
      "Mentor high-school students from rural provinces in basic HTML, CSS, and web literacy during Saturday online sessions. Produced beginner-friendly tutorial videos uploaded to the program's YouTube channel.",
    impact: "Reached 120+ students across 5 provinces",
    icon: "👨‍🏫",
  },
  {
    role: "Digital Skills Trainer",
    org: "Lao Women's Union — Vientiane Chapter",
    period: "Jan 2024 – Feb 2024",
    hours: "20 hrs",
    description:
      "Delivered three weekend workshops teaching basic smartphone usage, Google Workspace, and online safety to women entrepreneurs aged 30–55 with limited digital exposure.",
    impact: "Trained 45 participants",
    icon: "💡",
  },
  {
    role: "Event Tech Volunteer",
    org: "Lao ICT Festival 2023",
    period: "Oct 2023",
    hours: "16 hrs",
    description:
      "Supported the AV and live-streaming team at the national ICT festival. Managed stage displays, troubleshot projector issues, and assisted speakers with presentation setup during a 2-day conference.",
    impact: "Supported 1,200+ festival attendees",
    icon: "🎤",
  },
  {
    role: "Environmental Campaign Designer",
    org: "Green Vientiane Initiative",
    period: "Jun 2023",
    hours: "12 hrs",
    description:
      "Created social-media graphics and a short promotional video for a city tree-planting campaign. Designed bilingual (Lao/English) infographics that were shared across municipal Facebook pages.",
    impact: "Posts reached 8,000+ people",
    icon: "🌱",
  },
];

const STATS = [
  { value: "88+", label: "Volunteer Hours" },
  { value: "4",   label: "Programmes" },
  { value: "165+", label: "People Reached" },
];

export default function VolunteerPage() {
  const { pagemode, setPagemode } = useTheme();
  const dark = pagemode === "dark";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0d] text-black dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 h-[60px] flex items-center justify-between px-6 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-black dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <FiArrowLeft size={16} />
            Back
          </Link>
          <BsFire size={32} className="text-accent" />
        </div>
        <h1 className="font-bold text-base tracking-wide">Volunteer</h1>
        <motion.button
          onClick={() => setPagemode(dark ? "light" : "dark")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full text-gray-500 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {dark ? <MdDarkMode size={22} /> : <MdOutlineDarkMode size={22} />}
        </motion.button>
      </header>

      {/* Hero title */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center pt-16 pb-10 px-4"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-4">
          <FiHeart size={28} className="text-accent" />
        </div>
        <h2 className="text-4xl font-bold">Volunteer Work</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase">
          Giving back through tech &amp; design
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-r from-accent to-accent-violet" />
      </motion.div>

      {/* Stats bar */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto px-4 mb-12"
      >
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-800 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 backdrop-blur-sm shadow-sm overflow-hidden"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-5 px-2">
              <span className="text-3xl font-bold text-accent">{value}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-4 pb-24 flex flex-col gap-6"
      >
        {VOLUNTEER.map((vol, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all px-6 py-5"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl mt-0.5">{vol.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-black dark:text-white">{vol.role}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{vol.org}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent">
                      {vol.hours}
                    </span>
                    <span className="text-xs text-gray-400">{vol.period}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {vol.description}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <FiHeart size={12} className="text-accent shrink-0" />
                  <span className="text-xs text-accent font-medium">{vol.impact}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
