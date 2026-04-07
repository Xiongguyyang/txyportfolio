"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineDingding } from "react-icons/ai";
import DesignImg from "@/component/designimg";
import { fadeUp } from "@/lib/variants";
import { BsFire } from "react-icons/bs";
import { useTheme } from "@/component/ThemeProvider";

export default function DesignPage() {
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

        <h1 className="font-bold text-base tracking-wide">Design Portfolio</h1>

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

      {/* Title */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center pt-16 pb-8 px-4"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Portfolio</p>
        <h2 className="text-5xl font-bold tracking-tight">Designing Performance</h2>
        <p className="mt-3 text-sm text-black dark:text-gray-400 tracking-widest uppercase">
          Visual work &amp; UI designs
        </p>
        <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </motion.div>

      <DesignImg />
    </div>
  );
}
