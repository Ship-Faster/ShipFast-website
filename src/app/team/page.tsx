"use client";

import { motion, useInView } from "framer-motion";
import {
  Linkedin,
  Code2,
  Shield,
  Cloud,
  Smartphone,
  ArrowRight,
  Zap,
  Target,
  Heart,
  Sparkles,
  Users,
  Briefcase,
  Globe,
  Coffee,
} from "lucide-react";
import { useRef } from "react";

const team = [
  {
    name: "Naga Sai Kumar",
    role: "Full Stack Developer",
    subtitle: "Frontend & Backend",
    avatar: "NK",
    bio: "Builds end-to-end web applications with a focus on performance and clean architecture. From pixel-perfect UIs to robust APIs — delivers the full picture.",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
    icon: Code2,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    ringColor: "violet",
    linkedin: "https://www.linkedin.com/in/naga-sai-kumar-janipireddy/",
  },
  {
    name: "Lokesh",
    role: "Full Stack Developer",
    subtitle: "Frontend & Backend",
    avatar: "LK",
    bio: "Full Stack Developer with strong skills in system architecture design and building scalable applications. I focus on creating clean backend systems, designing efficient APIs, and delivering smooth end-to-end solutions.Improving performance, and writing clean, maintainable code.",
    skills: ["Java", "SpringBoot", "React", "Angular", "NestJS", "TypeScript", "MongoDB"],
    icon: Code2,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    ringColor: "blue",
    linkedin: "https://www.linkedin.com/in/lokeshchintakindi2468/",
  },
  {
    name: "Shiva",
    role: "Full Stack Developer",
    subtitle: "Frontend & Backend",
    avatar: "SH",
    bio: "Thrives on solving hard problems across the stack. From database design to interactive frontends — writes clean, tested, production-ready code every time.",
    skills: ["React", "Node.js", "Python", "PostgreSQL", "Redis"],
    icon: Code2,
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    ringColor: "amber",
    linkedin: "https://www.linkedin.com/in/shivakumar-kyamaji-60bb59272/",
  },
  {
    name: "Dileep",
    role: "Cyber Security Engineer",
    subtitle: "AppSec & Compliance",
    avatar: "DL",
    bio: "Security-first mindset with deep expertise in application security, penetration testing, and building compliance-ready systems from the ground up.",
    skills: ["OWASP", "Penetration Testing", "SOC2", "Encryption", "Audit"],
    icon: Shield,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    ringColor: "emerald",
    linkedin: "",
  },
  {
    name: "Vinay",
    role: "Mobile Developer",
    subtitle: "iOS & Android",
    avatar: "VN",
    bio: "Creates native-quality mobile experiences with cross-platform expertise. From smooth animations to offline-first architecture — mobile done right.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    icon: Smartphone,
    gradient: "from-pink-500 to-rose-600",
    bgGradient: "from-pink-500/10 to-rose-500/10",
    ringColor: "pink",
    linkedin: "",
  },
  {
    name: "Krishna",
    role: "DevOps Engineer",
    subtitle: "Infrastructure & CI/CD",
    avatar: "KR",
    bio: "Infrastructure enthusiast who automates everything. From container orchestration to zero-downtime deployments — making ops boring is the goal.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    icon: Cloud,
    gradient: "from-indigo-500 to-blue-600",
    bgGradient: "from-indigo-500/10 to-blue-500/10",
    ringColor: "indigo",
    linkedin: "",
  },
];

const values = [
  {
    icon: Zap,
    title: "Ship Fast",
    description: "We move at startup speed without cutting corners.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Every line of code is written with security in mind.",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: Target,
    title: "Pixel Perfect",
    description: "We obsess over details that users feel but can't explain.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Heart,
    title: "Client-First",
    description: "Your product is our product. We treat it like our own.",
    gradient: "from-pink-500 to-rose-600",
  },
];

const stats = [
  { value: "6", label: "Engineers", icon: Users },
  { value: "10+", label: "Projects Shipped", icon: Briefcase },
  { value: "100%", label: "Client Retention", icon: Heart },
  { value: "∞", label: "Coffee Consumed", icon: Coffee },
];

/* ─── Animated Counter ─── */
function AnimatedStat({
  value,
  label,
  icon: Icon,
  index,
  inView,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.1 + 0.2,
          type: "spring",
          stiffness: 200,
        }}
        className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3"
      >
        <Icon className="w-5 h-5 text-accent" />
      </motion.div>
      <div className="text-3xl md:text-4xl font-black tracking-tight gradient-text mb-1">
        {value}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
}

/* ─── Team Card ─── */
function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative rounded-2xl border border-border/60 bg-background hover:border-border hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden h-full flex flex-col">
        {/* Subtle top accent — thin line */}
        <div className={`h-[2px] bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="p-8 md:p-9 flex flex-col flex-1">
          {/* Row 1: Avatar + Info */}
          <div className="flex items-center gap-5 mb-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-500`}
              >
                <span className="text-xl font-bold text-white select-none">
                  {member.avatar}
                </span>
              </div>
            </div>

            {/* Name + Role */}
            <div className="min-w-0">
              <h3 className="text-xl font-bold tracking-tight text-foreground truncate">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {member.role}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 flex-1">
            {member.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted/70 text-muted-foreground transition-colors duration-300 group-hover:bg-accent/8 group-hover:text-accent"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-5 border-t border-border/50 flex items-center justify-between">
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            ) : (
              <span className="text-sm text-muted-foreground/30">—</span>
            )}

            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${member.gradient} flex items-center justify-center opacity-10 group-hover:opacity-60 transition-opacity duration-500`}
            >
              <member.icon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Value Card ─── */
function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-transparent via-border to-transparent group-hover:from-accent/20 group-hover:via-accent/10 group-hover:to-transparent transition-all duration-500" />
      <div className="relative rounded-2xl bg-background p-6 md:p-8 h-full text-center">
        <motion.div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg mx-auto mb-5`}
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <value.icon className="w-6 h-6 text-white" />
        </motion.div>
        <h4 className="text-lg font-bold tracking-tight mb-2">{value.title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {value.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function TeamPage() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <main className="relative overflow-hidden">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden grid-bg">
        {/* Aurora blobs */}
        <div className="aurora" />

        {/* Floating particles */}
        {[
          { delay: 0, duration: 15, x: 10, size: 3 },
          { delay: 2, duration: 18, x: 25, size: 2.5 },
          { delay: 4, duration: 13, x: 40, size: 4 },
          { delay: 6, duration: 16, x: 55, size: 3 },
          { delay: 8, duration: 19, x: 70, size: 2 },
          { delay: 10, duration: 14, x: 85, size: 4 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/30"
            style={{ width: p.size, height: p.size, left: `${p.x}%` }}
            initial={{ y: "100vh", opacity: 0, scale: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-44 pb-20 text-center">
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
              6 Engineers. One Mission.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
          >
            Meet the{" "}
            <span className="gradient-text">Engineers</span>
            <br />
            Behind shipfast
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          >
            A small, senior team that treats your product like our own. No hand-offs,
            no layers — just direct collaboration with the people building your product.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/#contact"
              className="btn-shimmer group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-accent text-white hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Work With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/projects"
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full border border-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              See Our Work
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section ref={statsRef} className="relative py-16 border-y border-border/50">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                index={i}
                inView={statsInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM GRID ═══ */}
      <section className="py-28 md:py-36 relative section-glow">
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section heading */}
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-2 text-sm font-medium tracking-widest uppercase rounded-full border border-accent/20 text-accent bg-accent/5 mb-6"
            >
              The Team
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            >
              Every Member is{" "}
              <span className="gradient-text">Senior</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
            >
              No juniors, no interns, no outsourcing. Every person on our team
              owns their domain and ships with confidence.
            </motion.p>
          </div>

          {/* Cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUES SECTION ═══ */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.02] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          {/* Section heading */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-2 text-sm font-medium tracking-widest uppercase rounded-full border border-accent/20 text-accent bg-accent/5 mb-6"
            >
              Our Values
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-5"
            >
              What Drives{" "}
              <span className="gradient-text">Us</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <ValueCard key={value.title} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="pb-28 md:pb-36 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Gradient border */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/30 via-cyan-500/20 to-emerald-500/30" />

            <div className="relative rounded-3xl bg-background p-10 md:p-16 text-center">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5" />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-xl mx-auto mb-8"
                >
                  <Globe className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
                  Ready to build something{" "}
                  <span className="gradient-text">great</span>?
                </h3>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                  Let&apos;s talk about your project. Our team is ready to turn your
                  vision into a product that ships, scales, and survives.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="/#contact"
                    className="btn-shimmer group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-accent text-white hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Start a Conversation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
