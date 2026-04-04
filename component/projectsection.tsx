"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionHeading from "@/component/ui/SectionHeading";
import SectionDivider from "@/component/ui/SectionDivider";
import { PROJECT_IMAGES, PROJECT_FEATURES } from "@/lib/data";
import { fadeLeft, fadeRight } from "@/lib/variants";

export default function Project() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % PROJECT_IMAGES.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % PROJECT_IMAGES.length);
  const prev = () => setCurrent((p) => (p - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length);

  return (
    <section id="projectsection" className="py-16 md:py-24 px-4 sm:px-6">
      <SectionHeading title="Projects" subtitle="what I've built" />

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
        {/* Carousel */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl shrink-0 bg-gray-100 dark:bg-gray-800"
        >
          <div className="relative aspect-video overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={PROJECT_IMAGES[current]}
                alt={`Project screenshot ${current + 1}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute top-1/2 left-3 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <FiChevronRight size={22} />
          </button>

          {/* Pill indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {PROJECT_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Project info */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-5 w-full"
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Todolist App</h3>
            <a
              href="https://www.todolifetask.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-1 text-indigo-500 hover:text-indigo-400 text-base font-medium transition-colors"
            >
              Visit live project <FiExternalLink size={16} />
            </a>
          </div>

          <div>
            <p className="text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3 font-semibold">
              Features
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {PROJECT_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <SectionDivider />
    </section>
  );
}
