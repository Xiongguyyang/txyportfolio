"use client";
import Image from "next/image";
import Myimage from "@/public/mypicture.png";
import { IoLogoFacebook } from "react-icons/io";
import { FaSquareGithub } from "react-icons/fa6";
import { motion } from "framer-motion";
import SectionDivider from "@/component/ui/SectionDivider";
import { fadeLeft, fadeRight, scaleIn, stagger } from "@/lib/variants";
import { SOCIAL_LINKS } from "@/lib/data";

const iconMap = {
  facebook: IoLogoFacebook,
  github: FaSquareGithub,
};

const iconStyle = {
  facebook: "text-blue-600",
  github: "text-gray-800 dark:text-gray-200",
};

export default function HomeSection() {
  return (
    <section
      id="homesection"
      className="relative flex flex-col justify-center min-h-[calc(100vh-60px)] pb-0 overflow-hidden"
    >
      {/* Ambient gradient blobs */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row justify-around items-center px-4 sm:px-8 gap-10 md:gap-12 max-w-6xl mx-auto w-full py-12 md:py-0"
      >
        {/* Left — name & socials */}
        <motion.div variants={fadeLeft} className="text-center md:text-left space-y-5">
          <div>
            <p className="text-sm md:text-base tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-2">
              Welcome, I&apos;m
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent leading-tight">
              TouXiong
            </h1>
          </div>

          <div>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-2">My socials</p>
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
                    className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Icon size={28} className={iconStyle[icon]} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Center — photo */}
        <motion.div variants={scaleIn} className="relative shrink-0 order-first md:order-0">
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-2xl scale-110"
          />
          <Image
            src={Myimage}
            alt="TouXiong profile photo"
            className="relative w-52 sm:w-64 md:w-72 rounded-3xl shadow-2xl object-cover ring-4 ring-indigo-500/20"
            priority
          />
        </motion.div>

        {/* Right — bio */}
        <motion.div variants={fadeRight} className="max-w-sm w-full text-center md:text-left space-y-4">
          <div>
            <p className="text-sm md:text-base tracking-widest uppercase text-gray-500 dark:text-gray-400">
              Aspiring
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-500">Full-Stack Developer</h2>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            I am a student aspiring to become a full-stack developer, building skills in both
            front-end and back-end. I enjoy creating projects that connect design, logic, and
            real-world problem solving. My goal is to grow into a developer who delivers complete
            and impactful solutions.
          </p>
          <p className="text-base font-semibold text-indigo-500">
            Tech is my passion · Building is my drive · Growth is my goal.
          </p>
        </motion.div>
      </motion.div>

      <SectionDivider />
    </section>
  );
}
