"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Users, Zap, Shield, Target, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../section-heading";
import { useRef, useState } from "react";

const reasons = [
  {
    icon: Users,
    title: "Small Team, Full Ownership",
    description:
      "No hand-offs, no miscommunication. The people who architect your system are the same ones who deploy it. Every member is senior, accountable, and invested.",
    stat: "6",
    statLabel: "Senior Engineers",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    highlights: ["Full-stack seniors", "Direct communication", "Zero hand-offs"],
  },
  {
    icon: Zap,
    title: "Startup Speed, Enterprise Discipline",
    description:
      "We move fast without cutting corners. Agile sprints, clean code, thorough testing — velocity and quality in the same package.",
    stat: "2x",
    statLabel: "Faster Delivery",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    highlights: ["Agile sprints", "Clean architecture", "Thorough testing"],
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Security isn't an afterthought or an add-on. It's baked into our architecture, our pipelines, and our culture from the first line of code.",
    stat: "0",
    statLabel: "Compromises",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    highlights: ["OWASP compliant", "Encrypted pipelines", "Audit-ready code"],
  },
  {
    icon: Target,
    title: "Built for Real Users",
    description:
      "We build products that work in the real world — not demos that impress in a boardroom. Performance, accessibility, and UX are non-negotiable.",
    stat: "100%",
    statLabel: "Production Focus",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    highlights: ["Performance-first", "Accessible by default", "User-tested"],
  },
];

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const isNumeric = /^\d+$/.test(value);

  if (!isNumeric) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-4xl md:text-5xl font-black tracking-tight gradient-text"
      >
        {value}
      </motion.span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: "spring" }}
      className="text-4xl md:text-5xl font-black tracking-tight gradient-text"
    >
      {value}
    </motion.span>
  );
}

function ReasonCard({
  reason,
  index,
  inView,
}: {
  reason: (typeof reasons)[number];
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 300,
    damping: 30,
  });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative rounded-3xl cursor-default"
    >
      {/* Animated border */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-transparent via-border to-transparent group-hover:from-accent/30 group-hover:via-accent/15 group-hover:to-transparent transition-all duration-700" />

      {/* Cursor spotlight */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, hsl(var(--accent) / 0.1), transparent 55%)`
          ),
        }}
      />

      {/* Card body */}
      <div className="relative rounded-3xl bg-background h-full overflow-hidden">
        {/* Hover gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${reason.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
          {/* Top row: icon + stat */}
          <div className="flex items-start justify-between mb-8">
            {/* Icon */}
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <reason.icon className="w-7 h-7 text-white" />
            </motion.div>

            {/* Animated stat */}
            <div className="text-right">
              <AnimatedCounter value={reason.stat} inView={inView} />
              <p className="text-sm text-muted-foreground font-medium mt-1">
                {reason.statLabel}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-foreground">
            {reason.title}
          </h3>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 flex-1">
            {reason.description}
          </p>

          {/* Highlight chips */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-border/50">
            {reason.highlights.map((highlight, i) => (
              <motion.span
                key={highlight}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.08 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full bg-accent/5 text-accent border border-accent/10 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {highlight}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        {hovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-accent/30"
                initial={{
                  x: 40 + Math.random() * 150,
                  y: 40 + Math.random() * 150,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: [null, -50 - Math.random() * 30],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 2.5 + Math.random(),
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

export function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-28 md:py-36 relative section-glow" ref={ref}>
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Why Us"
          title="Not Another Dev Agency"
          description="We're a small, focused team that treats your product like our own."
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
