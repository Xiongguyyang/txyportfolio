"use client";
import { useState } from "react";
import Image from "next/image";
import Myimage from "@/public/mypicture.png";
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareGithub } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import SectionDivider from "@/component/ui/SectionDivider";
import { fadeLeft, fadeRight, scaleIn, stagger } from "@/lib/variants";
import { SOCIAL_LINKS } from "@/lib/data";
import GalaxyCanvas from "@/component/GalaxyCanvas";
import { useTheme } from "@/component/ThemeProvider";

const iconMap = {
  facebook: IoLogoFacebook,
  github:   FaSquareGithub,
};

const iconStyle = {
  facebook: "text-blue-400",
  github:   "text-gray-200",
};

export default function HomeSection() {
  const [showImage, setShowImage] = useState(true);
  const { pagemode } = useTheme();
  const dark = pagemode === "dark";

  return (
    <section
      id="homesection"
      className="relative flex flex-col justify-center min-h-[calc(100vh-60px)] pb-0 overflow-hidden"
    >
      {/* ── Galaxy backdrop ───────────────────────────────────────────────── */}
      <GalaxyCanvas onEarthClick={() => setShowImage(true)} />

      {/* ── Radial scrim ──────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, rgba(1,2,17,0.45) 100%)",
        }}
      />

      {/* ── Hero content ──────────────────────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col md:flex-row justify-around items-center px-4 sm:px-8 gap-10 md:gap-12 max-w-6xl mx-auto w-full py-12 md:py-0"
      >
        {/* Left — name & socials */}
        <motion.div variants={fadeLeft} className="text-center md:text-left space-y-5">
          <div>
            <p className="text-sm md:text-base tracking-widest uppercase text-gray-400 mb-2">
              Welcome, I&apos;m
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-linear-to-r from-accent via-accent-violet to-accent-light bg-clip-text text-transparent leading-tight drop-shadow-[0_0_32px_rgba(255,180,60,0.35)]">
              TouXiong
            </h1>
          </div>

          <div>
            <p className="text-base text-gray-400 mb-2">My socials</p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              {SOCIAL_LINKS.map(({ href, label, icon }) => {
                const Icon = iconMap[icon];
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                    className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-accent/15 hover:border-accent/30 transition-colors"
                  >
                    <Icon size={28} className={iconStyle[icon]} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Center — profile photo, shifted up to reveal more galaxy below */}
        <motion.div
          variants={scaleIn}
          className="relative shrink-0 order-first md:order-none -mt-6 md:-mt-14"
        >
          <AnimatePresence mode="wait">
            {showImage ? (
              <motion.div
                key="photo"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.35, ease: "backOut" }}
                className="relative"
              >
                {/* Glow ring behind photo */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl blur-2xl scale-110"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,200,100,0.28) 0%, rgba(140,80,255,0.14) 60%, transparent 100%)",
                  }}
                />
                <Image
                  src={Myimage}
                  alt="TouXiong profile photo"
                  className="relative w-52 sm:w-64 md:w-72 rounded-3xl shadow-2xl object-cover ring-2 ring-accent/40 drop-shadow-[0_0_28px_rgba(255,180,60,0.25)]"
                  priority
                />
                {/* Close button */}
                <button
                  onClick={() => setShowImage(false)}
                  aria-label="Hide photo"
                  className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-black/65 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:bg-black/85 hover:text-white transition-colors"
                >
                  <FiX size={14} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="hint"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
                onClick={() => setShowImage(true)}
                aria-label="Show photo"
                className="px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/15 text-sm text-gray-300 hover:bg-accent/15 hover:border-accent/35 hover:text-accent transition-colors"
              >
                Show Photo
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right — bio (glass card) */}
        <motion.div
          variants={fadeRight}
          className="max-w-sm w-full text-center md:text-left space-y-4 rounded-2xl px-6 py-6 border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/5"
        >
          <div>
            <p className="text-sm md:text-base tracking-widest uppercase text-gray-400">
              Aspiring
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-accent drop-shadow-[0_0_14px_rgba(255,180,60,0.3)]">
              Full-Stack Developer
            </h2>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-gray-300">
            I am a student aspiring to become a full-stack developer, building skills in both
            front-end and back-end. I enjoy creating projects that connect design, logic, and
            real-world problem solving. My goal is to grow into a developer who delivers complete
            and impactful solutions.
          </p>
          <p className="text-base font-semibold text-accent/90">
            Tech is my passion · Building is my drive · Growth is my goal.
          </p>
        </motion.div>
      </motion.div>

      <SectionDivider />
    </section>
  );
}
