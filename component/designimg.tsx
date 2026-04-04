"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZoomIn } from "react-icons/fi";
import { DESIGN_IMAGES } from "@/lib/data";
import { stagger, scaleIn } from "@/lib/variants";

export default function DesignImg() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-6 justify-center p-8"
      >
        {DESIGN_IMAGES.map((src, i) => (
          <motion.button
            key={i}
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
            onClick={() => setLightbox(src)}
            className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-zoom-in"
          >
            <img
              src={src}
              alt={`Design work ${i + 1}`}
              className="w-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <FiZoomIn
                size={32}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl"
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              >
                <FiX size={28} />
              </button>
              <img
                src={lightbox}
                alt="Design work enlarged"
                className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
