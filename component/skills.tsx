"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/component/ui/SectionHeading";
import SkillCard from "@/component/ui/SkillCard";
import { SKILLS_DATA } from "@/lib/data";
import { stagger } from "@/lib/variants";

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 pb-24 md:pb-32">
      <SectionHeading title="Skills" subtitle="tools & technologies" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6"
      >
        {SKILLS_DATA.map((skill) => (
          <SkillCard key={skill.title} title={skill.title} items={skill.items} />
        ))}
      </motion.div>
    </section>
  );
}
