"use client";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/variants";

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base tracking-widest uppercase text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-linear-to-r from-indigo-500 to-violet-500" />
    </motion.div>
  );
}
