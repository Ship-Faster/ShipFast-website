"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Bot,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

const featuredProject = {
  title: "Zithara",
  subtitle: "AI-Powered CRM",
  description:
    "An intelligent customer relationship management platform powered by AI. Automates customer engagement, provides predictive analytics, and helps businesses build stronger relationships at scale.",
  icon: Bot,
  gradient: "from-violet-500 to-purple-600",
  tech: ["React", "Node.js", "Python", "AI/ML", "PostgreSQL", "AWS"],
  highlights: [
    "AI-driven customer insights",
    "Predictive analytics engine",
    "Automated engagement workflows",
    "Real-time dashboard",
  ],
  liveUrl: "https://zithara.ai/",
  mockbarUrl: "zithara.ai",
};

const otherProjects = [
  {
    title: "College ERP",
    subtitle: "Education Management",
    description:
      "Comprehensive enterprise resource planning for colleges — admissions, attendance, faculty, exams, fees, and academic records in one unified platform.",
    icon: GraduationCap,
    gradient: "from-blue-500 to-cyan-600",
    tech: ["React", "NestJS", "PostgreSQL", "Prisma", "Docker", "Redis"],
    highlights: [
      "Multi-tenant architecture",
      "Role-based access control",
      "Real-time attendance",
      "Automated reporting",
    ],
    status: "In Development",
  },
  {
    title: "LMS",
    subtitle: "Learning Platform",
    description:
      "Modern learning management system with course management, progress tracking, assessments, video lectures, and real-time collaboration tools.",
    icon: BookOpen,
    gradient: "from-emerald-500 to-green-600",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "S3", "WebRTC"],
    highlights: [
      "Interactive course builder",
      "Video streaming",
      "Progress analytics",
      "Live collaboration",
    ],
    liveUrl: "https://nagasai-creator.onrender.com/auth",
    status: "Live",
  },
];

/* ─── Mock Browser Frame ─── */
function BrowserMock({
  gradient,
  url,
  children,
}: {
  gradient: string;
  url: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden bg-background shadow-sm group-hover:shadow-lg transition-shadow duration-500">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 bg-muted/40 border-b border-border/50">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/60" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <span className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-background border border-border/50 text-xs text-muted-foreground font-mono max-w-[200px]">
            <Globe className="w-3 h-3 shrink-0" />
            <span className="truncate">{url}</span>
          </div>
        </div>
        <div className="w-[54px]" />
      </div>

      {/* Content area */}
      <div className={`relative bg-gradient-to-br ${gradient} overflow-hidden`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Featured Project Card ─── */
function FeaturedProject() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div className="rounded-2xl border border-border/60 bg-background hover:border-border hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden">
        {/* Top accent */}
        <div className={`h-[2px] bg-gradient-to-r ${featuredProject.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left — Info */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            {/* Badge */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${featuredProject.gradient} flex items-center justify-center shadow-sm`}
              >
                <featuredProject.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-mono text-accent uppercase tracking-wider">
                  {featuredProject.subtitle}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Live
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              {featuredProject.title}
            </h3>

            {/* Description */}
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
              {featuredProject.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {featuredProject.highlights.map((h, i) => (
                <motion.div
                  key={h}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-muted-foreground">{h}</span>
                </motion.div>
              ))}
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {featuredProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted/70 text-muted-foreground group-hover:bg-accent/8 group-hover:text-accent transition-colors duration-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href={featuredProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-all duration-300 w-fit"
            >
              Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Right — Browser mockup */}
          <div className="p-6 md:p-8 lg:p-10 flex items-center">
            <BrowserMock gradient="from-violet-500/10 to-purple-600/20" url={featuredProject.mockbarUrl}>
              <div className="h-[320px] md:h-[380px] flex flex-col items-center justify-center p-8 relative">
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-20 h-20 border border-violet-300/20 dark:border-violet-400/10 rounded-full" />
                <div className="absolute bottom-8 left-8 w-16 h-16 border border-purple-300/20 dark:border-purple-400/10 rounded-full" />

                {/* Logo placeholder */}
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${featuredProject.gradient} flex items-center justify-center shadow-xl mb-6`}
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="w-9 h-9 text-white" />
                </motion.div>
                <p className="text-xl font-bold text-foreground/80 dark:text-white/80 mb-1">
                  {featuredProject.title}
                </p>
                <p className="text-sm text-muted-foreground/60">
                  {featuredProject.subtitle}
                </p>

                {/* Fake UI elements */}
                <div className="mt-8 w-full max-w-[220px] space-y-2">
                  <div className="h-2 bg-foreground/[0.06] dark:bg-white/[0.06] rounded-full w-full" />
                  <div className="h-2 bg-foreground/[0.06] dark:bg-white/[0.06] rounded-full w-4/5" />
                  <div className="h-2 bg-foreground/[0.06] dark:bg-white/[0.06] rounded-full w-3/5" />
                </div>
              </div>
            </BrowserMock>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof otherProjects)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="rounded-2xl border border-border/60 bg-background hover:border-border hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden h-full flex flex-col">
        {/* Top accent */}
        <div className={`h-[2px] bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Browser mockup preview */}
        <div className="p-5 pb-0">
          <BrowserMock gradient={`${project.gradient.replace('500', '500/10').replace('600', '600/20')}`} url={project.title.toLowerCase().replace(/\s+/g, "") + ".app"}>
            <div className="h-[180px] flex flex-col items-center justify-center p-6 relative">
              <div className="absolute top-4 right-4 w-12 h-12 border border-foreground/5 dark:border-white/5 rounded-full" />
              <motion.div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg mb-3`}
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
              >
                <project.icon className="w-6 h-6 text-white" />
              </motion.div>
              <p className="text-sm font-semibold text-foreground/70 dark:text-white/70">
                {project.title}
              </p>

              {/* Fake UI lines */}
              <div className="mt-4 w-full max-w-[160px] space-y-1.5">
                <div className="h-1.5 bg-foreground/[0.05] dark:bg-white/[0.05] rounded-full w-full" />
                <div className="h-1.5 bg-foreground/[0.05] dark:bg-white/[0.05] rounded-full w-3/4" />
              </div>
            </div>
          </BrowserMock>
        </div>

        {/* Content */}
        <div className="p-6 md:p-7 pt-5 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                {project.subtitle}
              </p>
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {project.title}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {project.status}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="text-xs text-muted-foreground">{h}</span>
              </div>
            ))}
          </div>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-muted/70 text-muted-foreground group-hover:bg-accent/8 group-hover:text-accent transition-colors duration-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-4 border-t border-border/50 flex items-center justify-between">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit Website
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-muted-foreground/40">Internal Deployment</span>
            )}

            <div
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center opacity-10 group-hover:opacity-60 transition-opacity duration-500`}
            >
              <project.icon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ProjectsPage() {
  return (
    <main className="relative overflow-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden grid-bg">
        <div className="aurora" />

        {[
          { delay: 0, duration: 16, x: 12, size: 3 },
          { delay: 3, duration: 14, x: 35, size: 4 },
          { delay: 6, duration: 18, x: 58, size: 2.5 },
          { delay: 9, duration: 15, x: 78, size: 3.5 },
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

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-44 pb-16 text-center">
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
              Real Products. Real Impact.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
          >
            Projects We&apos;ve{" "}
            <span className="gradient-text">Shipped</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            From AI-powered platforms to enterprise systems — built to ship,
            scale, and survive the real world.
          </motion.p>
        </div>
      </section>

      {/* ═══ FEATURED PROJECT ═══ */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Featured label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Featured Project
            </span>
          </motion.div>

          <FeaturedProject />
        </div>
      </section>

      {/* ═══ OTHER PROJECTS ═══ */}
      <section className="pb-28 md:pb-36 relative section-glow">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              More Projects
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {otherProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          {/* More coming */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-dashed border-border/60 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              More projects in the pipeline
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pb-28 md:pb-36 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl border border-border/60 bg-background p-10 md:p-16 text-center"
          >
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
              Have a project in mind?
            </h3>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Let&apos;s talk about turning your idea into a product that ships.
            </p>
            <a
              href="/#contact"
              className="btn-shimmer group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-accent text-white hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
