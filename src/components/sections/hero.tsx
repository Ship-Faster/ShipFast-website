"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

function FloatingParticle({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-accent/30"
      style={{ width: size, height: size, left: `${x}%` }}
      initial={{ y: "100vh", opacity: 0, scale: 0 }}
      animate={{
        y: "-10vh",
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// Pre-computed particle values to avoid SSR hydration mismatch
const particles = [
  { delay: 0, duration: 15, x: 5, size: 3 },
  { delay: 1.5, duration: 18, x: 15, size: 2.5 },
  { delay: 3, duration: 13, x: 25, size: 4 },
  { delay: 4.5, duration: 16, x: 35, size: 3.5 },
  { delay: 6, duration: 19, x: 45, size: 2 },
  { delay: 7.5, duration: 14, x: 55, size: 4.5 },
  { delay: 9, duration: 17, x: 65, size: 3 },
  { delay: 10.5, duration: 12, x: 75, size: 2.5 },
  { delay: 12, duration: 18, x: 85, size: 4 },
  { delay: 13.5, duration: 15, x: 95, size: 3.5 },
  { delay: 15, duration: 13, x: 10, size: 2 },
  { delay: 16.5, duration: 19, x: 20, size: 4.5 },
  { delay: 18, duration: 16, x: 30, size: 3 },
  { delay: 19.5, duration: 14, x: 40, size: 2.5 },
  { delay: 21, duration: 17, x: 50, size: 4 },
  { delay: 22.5, duration: 12, x: 60, size: 3.5 },
  { delay: 24, duration: 18, x: 70, size: 2 },
  { delay: 25.5, duration: 15, x: 80, size: 4.5 },
  { delay: 27, duration: 13, x: 90, size: 3 },
  { delay: 28.5, duration: 16, x: 50, size: 2.5 },
];

const techStack = [
  "Next.js", "React", "Node.js", "TypeScript", "AWS", "Docker",
  "Kubernetes", "PostgreSQL", "Terraform", "NestJS", "Python", "Redis",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const spotlightX = useTransform(springX, (v) => v - 150);
  const spotlightY = useTransform(springY, (v) => v - 150);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Aurora blobs */}
      <div className="aurora" />

      {/* Mouse-following spotlight */}
      <motion.div
        className="spotlight hidden lg:block"
        style={{ x: spotlightX, y: spotlightY }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full border border-accent/20 bg-accent/5 text-accent backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            6 Engineers. Full-Stack Execution.
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-[1.1rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] mb-8 max-w-5xl mx-auto"
        >
          We Build MVPs That{" "}
          <span className="gradient-text">Ship, Scale,</span>
          {/* <br /> */}
          <span className="gradient-text">and Survive</span> the Real World
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A small, senior team delivering end-to-end product execution — design,
          development, DevOps, and security — without the overhead.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#contact"
            className="btn-shimmer group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-accent text-white hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full border border-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            Let&apos;s Collaborate
          </a>
        </motion.div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="relative overflow-hidden max-w-3xl mx-auto"
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-marquee w-max">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="mx-3 px-4 py-2 text-xs font-mono text-muted-foreground border border-border/50 rounded-full bg-muted/20 backdrop-blur-sm whitespace-nowrap hover:border-accent/30 hover:text-accent transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
