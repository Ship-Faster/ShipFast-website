"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../section-heading";
import {
  Code2,
  Server,
  Cloud,
  ShieldCheck,
  Hexagon,
} from "lucide-react";
import { useState } from "react";

const categories = [
  {
    id: "frontend",
    icon: Code2,
    label: "Frontend",
    gradient: "from-violet-500 to-purple-600",
    color: "violet",
    items: [
      { name: "Next.js", desc: "Full-stack React framework", abbr: "Nx" },
      { name: "React", desc: "Component-driven UI", abbr: "Re" },
      { name: "TypeScript", desc: "Type-safe JavaScript", abbr: "Ts" },
      { name: "Tailwind CSS", desc: "Utility-first styling", abbr: "Tw" },
    ],
  },
  {
    id: "backend",
    icon: Server,
    label: "Backend",
    gradient: "from-cyan-500 to-blue-600",
    color: "blue",
    items: [
      { name: "SpringBoot", desc: "Large Enterprise Applications", abbr: "Sp" },
      { name: "Node.js", desc: "Server-side JavaScript", abbr: "No" },
      { name: "NestJS", desc: "Enterprise Node framework", abbr: "Ne" },
      { name: "PostgreSQL", desc: "Relational database", abbr: "Pg" },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "Cloud & DevOps",
    gradient: "from-orange-500 to-red-500",
    color: "orange",
    items: [
      { name: "AWS / GCP", desc: "Cloud infrastructure", abbr: "Aw" },
      { name: "Docker", desc: "Containerization", abbr: "Dk" },
      { name: "Kubernetes", desc: "Container orchestration", abbr: "K8" },
      { name: "Terraform", desc: "Infrastructure as code", abbr: "Tf" },
    ],
  },
  {
    id: "security",
    icon: ShieldCheck,
    label: "Security",
    gradient: "from-emerald-500 to-teal-600",
    color: "emerald",
    items: [
      { name: "OWASP", desc: "Security standards", abbr: "Ow" },
      { name: "SOC 2", desc: "Compliance framework", abbr: "S2" },
      { name: "Pen Testing", desc: "Vulnerability assessment", abbr: "Pt" },
      { name: "Zero Trust", desc: "Network security model", abbr: "Zt" },
    ],
  },
];

function TechCard({
  item,
  gradient,
  index,
}: {
  item: { name: string; desc: string; abbr: string };
  gradient: string;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group/card relative rounded-2xl cursor-default"
    >
      {/* Border */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-border/80 via-border/40 to-border/80 group-hover/card:from-accent/40 group-hover/card:via-accent/20 group-hover/card:to-accent/5 transition-all duration-500" />

      <div className="relative rounded-2xl bg-background p-6 md:p-7 h-full overflow-hidden">
        {/* Hover glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient.replace("500", "500/8").replace("600", "600/8")} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}
        />

        {/* Corner decoration */}
        <div
          className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover/card:opacity-[0.06] blur-2xl transition-opacity duration-500`}
        />

        <div className="relative z-10">
          {/* Abbreviation badge */}
          <div className="flex items-center justify-between mb-5">
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <span className="text-sm font-bold text-white tracking-tight">
                {item.abbr}
              </span>
            </motion.div>

            <Hexagon className="w-5 h-5 text-border group-hover/card:text-accent/30 transition-colors duration-300" />
          </div>

          {/* Name */}
          <h4 className="text-lg font-bold tracking-tight text-foreground mb-1.5">
            {item.name}
          </h4>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Stack() {
  const [activeTab, setActiveTab] = useState("frontend");
  const activeCategory = categories.find((c) => c.id === activeTab)!;

  return (
    <section id="stack" className="py-28 md:py-36 relative section-glow">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Our Stack"
          title="Modern Tools, Battle-Tested"
          description="We use the tools that let us move fast and build things that last."
        />

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="stack-tab-bg"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cat.gradient} opacity-10 border border-accent/20`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <cat.icon className={`relative z-10 w-5 h-5 ${isActive ? "text-accent" : ""}`} />
                <span className="relative z-10">{cat.label}</span>
                {isActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative z-10 w-2 h-2 rounded-full bg-accent"
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Active category header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "-header"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <motion.div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeCategory.gradient} flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.1 }}
            >
              <activeCategory.icon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                {activeCategory.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {activeCategory.items.length} technologies
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="wait">
            {activeCategory.items.map((item, i) => (
              <TechCard
                key={activeTab + "-" + item.name}
                item={item}
                gradient={activeCategory.gradient}
                index={i}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom: all tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-10 border-t border-border/40"
        >
          <p className="text-center text-sm text-muted-foreground mb-6 font-medium uppercase tracking-widest">
            Full toolkit at a glance
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.flatMap((cat) =>
              cat.items.map((item) => (
                <motion.span
                  key={item.name}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className={`px-4 py-2 text-sm font-medium rounded-full border border-border/60 bg-muted/20 text-muted-foreground hover:text-foreground hover:border-accent/30 hover:bg-accent/5 transition-colors duration-200 cursor-default`}
                >
                  {item.name}
                </motion.span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
