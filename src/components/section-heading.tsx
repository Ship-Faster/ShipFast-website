"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
}

export function SectionHeading({ badge, title, description }: SectionHeadingProps) {
  return (
    <div className="text-center mb-20">
      <motion.span
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="inline-block px-5 py-2 text-sm font-medium tracking-widest uppercase rounded-full border border-accent/20 text-accent bg-accent/5 mb-6"
      >
        {badge}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
