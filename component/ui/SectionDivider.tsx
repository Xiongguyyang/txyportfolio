"use client";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-center mt-20"
    >
      <div className="h-px w-[480px] bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
    </motion.div>
  );
}
