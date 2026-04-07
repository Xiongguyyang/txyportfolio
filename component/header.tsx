"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QRImage from "@/public/myQR.jpg";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa6";
import { FiMenu, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { BsFire } from "react-icons/bs";
import { useTheme } from "@/component/ThemeProvider";

const MORE_LINKS = [
  { label: "Designing",        href: "/designpage" },
  { label: "Experience Work",  href: "/experience" },
  { label: "Activities",       href: "/activities" },
  { label: "Volunteer",        href: "/volunteer" },
];

export default function Header() {
  const { pagemode, setPagemode } = useTheme();
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
          {/* More About Me dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (moreTimer.current) clearTimeout(moreTimer.current);
              setMoreOpen(true);
            }}
            onMouseLeave={() => {
              moreTimer.current = setTimeout(() => setMoreOpen(false), 120);
            }}
          >
            <motion.button
              whileHover={{ y: -2 }}
              className="flex items-center gap-1 text-base font-medium text-accent hover:text-accent-light transition-colors"
            >
              More About Me
              {moreOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
            </motion.button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl overflow-hidden z-50"
                >
                  {MORE_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-accent/10 hover:text-accent dark:hover:text-accent transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
              {/* More About Me — mobile accordion */}
              <div className="border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setMobileMoreOpen((v) => !v)}
                  className="w-full flex items-center justify-between text-left text-lg font-medium py-3 text-accent hover:text-accent-light transition-colors"
                >
                  More About Me
                  {mobileMoreOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
                <AnimatePresence>
                  {mobileMoreOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 pb-2 flex flex-col gap-1"
                    >
                      {MORE_LINKS.map(({ label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="text-base font-medium py-2 text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors"
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
