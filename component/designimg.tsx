"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZoomIn, FiArrowRight } from "react-icons/fi";
import { DESIGN_IMAGES } from "@/lib/data";
import { stagger, scaleIn } from "@/lib/variants";

export default function DesignImg() {
  const [lightbox, setLightbox] = useState<{ src: string; index: number } | null>(null);

  const goNext = () => {
    if (!lightbox) return;
    const next = (lightbox.index + 1) % DESIGN_IMAGES.length;
    setLightbox({ src: DESIGN_IMAGES[next], index: next });
  };

  const goPrev = () => {
    if (!lightbox) return;
    const prev = (lightbox.index - 1 + DESIGN_IMAGES.length) % DESIGN_IMAGES.length;
    setLightbox({ src: DESIGN_IMAGES[prev], index: prev });
  };

  return (
    <>
      {/* Masonry columns — images display at natural size, constrained to column width */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="columns-1 sm:columns-2 lg:columns-3 gap-5 p-8 max-w-7xl mx-auto"
      >
        {DESIGN_IMAGES.map((src, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            className="break-inside-avoid mb-5"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              onClick={() => setLightbox({ src, index: i })}
              className="group relative w-full overflow-hidden rounded-2xl shadow-xl border border-white/10 cursor-zoom-in block"
            >
              <img
                src={src}
                alt={`Design work ${i + 1}`}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              />

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-end justify-between">
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-white/60 mb-0.5">
                      Design {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-white font-semibold text-base leading-tight">
                      Visual Work
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <FiZoomIn size={15} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            {DESIGN_IMAGES.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
              >
                <FiArrowRight size={20} className="rotate-180" />
              </button>
            )}

            <motion.div
              key={lightbox.src}
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center"
            >
              <div className="flex items-center justify-between w-full mb-4 px-1">
                <p className="text-white/50 text-sm tracking-widest uppercase">
                  Design {String(lightbox.index + 1).padStart(2, "0")} / {String(DESIGN_IMAGES.length).padStart(2, "0")}
                </p>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  <FiX size={24} />
                </button>
              </div>

              <img
                src={lightbox.src}
                alt="Design work enlarged"
                className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain ring-1 ring-white/10"
              />
            </motion.div>

            {DESIGN_IMAGES.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer z-10"
              >
                <FiArrowRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
