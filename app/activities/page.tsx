"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { FiArrowLeft, FiStar } from "react-icons/fi";
import { BsFire } from "react-icons/bs";
import { fadeUp, stagger } from "@/lib/variants";
import { useTheme } from "@/component/ThemeProvider";

const ACTIVITIES = [
  {
    title: "IT Club President",
    org: "Comcenter College — Student Union",
    period: "2024 – Present",
    category: "Leadership",
    description:
      "Lead a 30-member IT club organising weekly coding workshops, hackathons, and tech-talk sessions. Manage club budget, coordinate with faculty advisors, and mentor junior members on web development fundamentals.",
    icon: "🖥️",
  },
  {
    title: "National Hackathon Participant",
    org: "Lao ICT Festival — Vientiane",
    period: "Nov 2024",
    category: "Competition",
    description:
      "Competed in a 24-hour national hackathon as team lead, building a mobile app prototype for agricultural market price tracking in Laos. Reached the top-10 finalist round.",
    icon: "⚡",
  },
  {
    title: "UI/UX Design Workshop",
    org: "Lao Tech Community",
    period: "Aug 2024",
    category: "Workshop",
    description:
      "Attended a two-day intensive workshop on human-centred design principles, prototyping with Figma, and conducting user-research interviews. Applied learnings to redesign a local NGO's donation flow.",
    icon: "🎨",
  },
  {
    title: "College Basketball Team",
    org: "Comcenter College — Sports Dept.",
    period: "2023 – Present",
    category: "Sports",
    description:
      "Active member of the college basketball team, competing in inter-college tournaments. Balancing academics and sport has strengthened time management and team-work skills.",
    icon: "🏀",
  },
  {
    title: "Photography Club",
    org: "Comcenter College",
    period: "2023 – 2024",
    category: "Creative",
    description:
      "Documented college events and produced a year-end photo book. Developed skills in composition, Adobe Lightroom editing, and storytelling through visuals.",
    icon: "📷",
  },
];

const categoryColor: Record<string, string> = {
  Leadership:  "bg-accent/15 text-accent",
  Competition: "bg-rose-500/15 text-rose-400",
  Workshop:    "bg-purple-500/15 text-purple-400",
  Sports:      "bg-emerald-500/15 text-emerald-400",
  Creative:    "bg-sky-500/15 text-sky-400",
};

export default function ActivitiesPage() {
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
        <h1 className="font-bold text-base tracking-wide">Activities</h1>
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
          <FiStar size={28} className="text-accent" />
        </div>
        <h2 className="text-4xl font-bold">Activities</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase">
          Clubs · Competitions · Workshops · Sports
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-r from-accent to-accent-violet" />
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 pb-24 grid sm:grid-cols-2 gap-6"
      >
        {ACTIVITIES.map((act, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all px-6 py-5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{act.icon}</span>
                <div>
                  <h3 className="font-bold text-base text-black dark:text-white leading-tight">
                    {act.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{act.org}</p>
                </div>
              </div>
              <span className={`shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[act.category]}`}>
                {act.category}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-3">
              {act.description}
            </p>

            <p className="text-xs text-gray-400">{act.period}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
