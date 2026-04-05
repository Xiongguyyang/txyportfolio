"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QRImage from "@/public/myQR.jpg";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa6";
import { AiOutlineDingding } from "react-icons/ai";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { BsFire } from "react-icons/bs";
import { useTheme } from "@/component/ThemeProvider";

export default function Header() {
  const { pagemode, setPagemode } = useTheme();
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dark = pagemode === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = useCallback((targetId: string) => {
    setMobileOpen(false);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 h-[60px] w-full flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${scrolled
            ? "backdrop-blur-md shadow-lg bg-white/80 dark:bg-gray-900/90 dark:shadow-black/40"
            : "bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
          }`}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <BsFire size={40} className="text-accent" />
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map(({ label, targetId }) => (
            <motion.button
              key={targetId}
              onClick={() => scrollTo(targetId)}
              whileHover={{ y: -2 }}
              className="text-base font-medium relative group text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent rounded-full group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
          <Link
            href="/designpage"
            className="text-base font-medium relative group text-accent hover:text-accent-light transition-colors"
          >
            Design
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent-light rounded-full group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={() => setPagemode(dark ? "light" : "dark")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full text-gray-500 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <FaLightbulb size={20} /> : <FaRegLightbulb size={20} />}
          </motion.button>

          <motion.button
            onClick={() => setContactOpen((v) => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1.5 rounded-full text-base font-semibold bg-accent-dark text-white hover:bg-accent-darker transition-colors shadow-md shadow-indigo-200 dark:shadow-none"
          >
            Contact
          </motion.button>
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden items-center gap-2">
          <motion.button
            onClick={() => setPagemode(dark ? "light" : "dark")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full text-gray-500 dark:text-yellow-400"
            aria-label="Toggle dark mode"
          >
            {dark ? <FaLightbulb size={20} /> : <FaRegLightbulb size={20} />}
          </motion.button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Desktop QR popup */}
        <AnimatePresence>
          {contactOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setContactOpen(false)}
                className="fixed inset-0 z-40"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-[68px] right-6 z-50 p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <p className="text-sm text-center mb-3 text-black dark:text-gray-400 font-medium tracking-wide uppercase">
                  Scan to connect
                </p>
                <Image
                  src={QRImage}
                  alt="Contact QR Code"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-xl md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(({ label, targetId }) => (
                <button
                  key={targetId}
                  onClick={() => scrollTo(targetId)}
                  className="text-left text-lg font-medium py-3 border-b border-gray-100 dark:border-gray-800 text-black dark:text-gray-200 hover:text-accent dark:hover:text-accent-light transition-colors"
                >
                  {label}
                </button>
              ))}
              <Link
                href="/designpage"
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium py-3 border-b border-gray-100 dark:border-gray-800 text-accent hover:text-accent-light transition-colors"
              >
                Design
              </Link>
              <button
                onClick={() => { setMobileOpen(false); setContactOpen(true); }}
                className="mt-2 w-full py-2.5 rounded-full text-base font-semibold bg-accent-dark text-white hover:bg-accent-darker transition-colors"
              >
                Contact
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
