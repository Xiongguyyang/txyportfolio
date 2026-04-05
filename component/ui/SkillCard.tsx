"use client";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/variants";

interface Props {
  title: string;
  items: readonly string[];
}

export default function SkillCard({ title, items }: Props) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl px-6 py-6 md:px-8 md:py-8 shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 w-full sm:w-auto sm:min-w-[220px]"
    >
      <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-accent">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-base text-black dark:text-gray-300">
            <span className="w-2 h-2 rounded-full bg-accent-violet shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
