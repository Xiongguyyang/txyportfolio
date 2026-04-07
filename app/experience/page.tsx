"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { FiArrowLeft, FiBriefcase } from "react-icons/fi";
import { BsFire } from "react-icons/bs";
import { fadeUp, stagger } from "@/lib/variants";
import { useTheme } from "@/component/ThemeProvider";

const EXPERIENCES = [
  {
    role: "Frontend Developer Intern",
    company: "Tech Startup — Vientiane",
    period: "Jun 2024 – Aug 2024",
    type: "Internship",
    description:
      "Built responsive UI components with React and Tailwind CSS. Collaborated with the design team to translate Figma mockups into production-ready pages and improved page load performance by optimising asset delivery.",
    tags: ["React", "Tailwind CSS", "Figma", "Git"],
  },
  {
    role: "Web Design Assistant",
    company: "Comcenter College — IT Department",
    period: "Jan 2024 – May 2024",
    type: "Part-time",
    description:
      "Assisted lecturers in maintaining the department website. Redesigned several landing sections and documented component usage for the student developer community.",
    tags: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
  {
    role: "Freelance Graphic Designer",
    company: "Self-employed",
    period: "2023 – Present",
    type: "Freelance",
    description:
      "Design social-media assets, event posters, and brand identity kits for local businesses and student organisations around Vientiane Capital.",
    tags: ["Canva", "Illustrator", "Photoshop", "Branding"],
  },
];

const typeBadge: Record<string, string> = {
  Internship: "bg-accent/15 text-accent",
  "Part-time": "bg-accent-violet/20 text-blue-400",
  Freelance: "bg-emerald-500/15 text-emerald-400",
};

export default function ExperiencePage() {
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
        <h1 className="font-bold text-base tracking-wide">Experience Work</h1>
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
          <FiBriefcase size={28} className="text-accent" />
        </div>
        <h2 className="text-4xl font-bold">Work Experience</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase">
          Roles · Internships · Freelance
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-r from-accent to-accent-violet" />
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-4 pb-24 relative"
      >
        {/* vertical line */}
        <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="relative flex gap-6 mb-10"
          >
            {/* dot */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-accent ring-4 ring-white dark:ring-[#0d0d0d] mt-1 shrink-0" />
            </div>

            {/* card */}
            <div className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white">{exp.role}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeBadge[exp.type]}`}>
                    {exp.type}
                  </span>
                  <span className="text-xs text-gray-400">{exp.period}</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
