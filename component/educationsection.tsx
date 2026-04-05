"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/component/ui/SectionHeading";
import SectionDivider from "@/component/ui/SectionDivider";
import { EDUCATION_DATA } from "@/lib/data";
import { stagger, fadeLeft } from "@/lib/variants";
import { BsFire } from "react-icons/bs";

export default function Education() {
  return (
    <section id="education" className="py-16 md:py-24 px-4 sm:px-6">
      <SectionHeading title="Education" subtitle="my learning journey" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto relative"
      >
        {/* Vertical timeline line */}
        <div className="absolute left-4 md:left-5 top-2 bottom-2 w-px bg-linear-to-b from-accent via-accent-violet to-transparent" />

        <div className="space-y-8 md:space-y-10 pl-12 md:pl-16">
          {EDUCATION_DATA.map((edu, i) => (
            <motion.div key={i} variants={fadeLeft} className="relative">
              {/* Timeline dot */}
              <div
                className={`absolute -left-9 md:-left-11 top-2 w-4 h-4 rounded-full border-2 border-accent transition-colors ${edu.current ? "bg-accent" : "bg-white dark:bg-gray-900"
                  }`}
              />

              <div className="p-5 md:p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                {edu.current && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent bg-accent/10 dark:bg-accent/15 px-2.5 py-0.5 rounded-full mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Current
                  </span>
                )}
                <h3 className="font-bold text-lg md:text-xl">{edu.degree}</h3>
                <p className="text-base text-black dark:text-gray-400 mt-1">{edu.school}</p>
                <p className="text-sm text-black dark:text-gray-500 mt-1">{edu.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider />
    </section>
  );
}
