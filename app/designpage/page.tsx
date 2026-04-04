"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineDingding } from "react-icons/ai";
import DesignImg from "@/component/designimg";
import { fadeUp } from "@/lib/variants";

export default function DesignPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d0d] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 h-[60px] flex items-center justify-between px-6 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft size={16} />
            Back
          </Link>
          <AiOutlineDingding size={32} className="text-indigo-500" />
        </div>

        <h1 className="font-bold text-base tracking-wide">Design Portfolio</h1>

        <motion.button
          onClick={() => setDark((v) => !v)}
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
        className="text-center pt-16 pb-4 px-4"
      >
        <h2 className="text-4xl font-bold">Designing Performance</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase">
          Visual work &amp; UI designs
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-r from-indigo-500 to-violet-500" />
      </motion.div>

      <DesignImg />
    </div>
  );
}
