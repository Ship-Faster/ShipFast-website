"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Rocket,
  Wrench,
  Cloud,
  ShieldCheck,
  LifeBuoy,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "../section-heading";
import { useRef, useState } from "react";

const services = [
  {
    icon: Rocket,
    title: "MVP Development",
    subtitle: "Idea → Launch",
    description:
      "From napkin sketch to production. Rapid prototyping, user-tested design, and clean architecture — built to ship and iterate.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconGradient: "from-violet-500 to-purple-600",
    stats: "4-8 wks",
    statsLabel: "Avg. delivery",
  },
  {
    icon: Wrench,
    title: "Internal Tools & Automation",
    subtitle: "Efficiency at Scale",
    description:
      "Custom dashboards, workflows, and integrations that save your team hours every week. Built lean, designed to evolve.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconGradient: "from-blue-500 to-cyan-600",
    stats: "10x",
    statsLabel: "Productivity boost",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud Infrastructure",
    subtitle: "CI/CD & Containers",
    description:
      "Automated pipelines, container orchestration, and infrastructure as code. Deployments become boring — exactly how they should be.",
    gradient: "from-orange-500/20 to-amber-500/20",
    iconGradient: "from-orange-500 to-amber-600",
    stats: "99.9%",
    statsLabel: "Uptime SLA",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Engineering",
    subtitle: "Secure by Default",
    description:
      "Every line of code, every config, every deployment — audited for security. Compliance-ready architecture from day one.",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconGradient: "from-emerald-500 to-green-600",
    stats: "0",
    statsLabel: "Vulnerabilities shipped",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support & Scaling",
    subtitle: "Beyond Launch",
    description:
      "We don't disappear after deployment. Monitoring, feature iteration, and scaling support as your product grows.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconGradient: "from-pink-500 to-rose-600",
    stats: "24/7",
    statsLabel: "Monitoring",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
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
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className="group relative rounded-3xl cursor-default"
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-transparent via-border to-transparent opacity-100 group-hover:from-accent/40 group-hover:via-accent/20 group-hover:to-transparent transition-all duration-700" />

      {/* Spotlight glow following cursor */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, hsl(var(--accent) / 0.12), transparent 60%)`
          ),
        }}
      />

      {/* Card body */}
      <div className="relative rounded-3xl bg-background p-8 md:p-10 h-full flex flex-col overflow-hidden">
        {/* Hover gradient bg */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        {/* Floating particles on hover */}
        {hovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-accent/40"
                initial={{
                  x: Math.random() * 200,
                  y: Math.random() * 200,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  y: [null, -60 - Math.random() * 40],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon + Stats row */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.iconGradient} flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <service.icon className="w-7 h-7 text-white" />
            </motion.div>

            {/* Live stat pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex flex-col items-end"
            >
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {service.stats}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {service.statsLabel}
              </span>
            </motion.div>
          </div>

          {/* Subtitle */}
          <p className="text-sm font-mono text-accent mb-2 tracking-wide uppercase">
            {service.subtitle}
          </p>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-foreground">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed flex-1">
            {service.description}
          </p>

          {/* Interactive bottom bar */}
          <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors duration-300">
              Learn more
            </span>
            <motion.div
              className="w-10 h-10 rounded-xl bg-muted/50 group-hover:bg-accent/10 flex items-center justify-center transition-colors duration-300"
              whileHover={{ scale: 1.15 }}
            >
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-28 md:py-36 relative section-glow">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="What We Do"
          title="End-to-End Product Engineering"
          description="From first commit to first customer — we handle the full stack so you can focus on your vision."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
