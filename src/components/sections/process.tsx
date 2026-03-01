"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  MessageSquareText,
  Code2,
  Rocket,
  CheckCircle2,
  GitBranch,
  TestTube2,
  Monitor,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    number: "1",
    label: "Client",
    title: "Consultation & Analysis",
    description:
      "We begin with comprehensive consultation to understand your unique requirements and business objectives, ensuring personalized solutions that align with your goals.",
    icon: MessageSquareText,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    checkpoints: [
      "Requirements gathering",
      "Business analysis",
      "Scope definition",
      "Timeline planning",
    ],
  },
  {
    number: "2",
    label: "Development",
    title: "Design & Implementation",
    description:
      "Our expert team designs and develops scalable, efficient systems using cutting-edge technologies and industry best practices for optimal performance.",
    icon: Code2,
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-500/10 to-blue-500/10",
    checkpoints: [
      "Architecture design",
      "Agile development",
      "Code reviews",
      "Weekly demos",
    ],
  },
  {
    number: "3",
    label: "Delivery",
    title: "Testing & Deployment",
    description:
      "We ensure timely delivery of high-quality solutions through rigorous testing, seamless deployment, and comprehensive post-launch support.",
    icon: Rocket,
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    checkpoints: [
      "Rigorous QA testing",
      "Performance optimization",
      "Seamless deployment",
      "Post-launch support",
    ],
  },
];

const liveSteps = [
  {
    icon: GitBranch,
    label: "Branch Created",
    time: "0:00",
    command: "git checkout -b feat/new-module",
    status: "success",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Code2,
    label: "Code Committed",
    time: "0:42",
    command: 'git commit -m "feat: add core module"',
    status: "success",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    icon: TestTube2,
    label: "Tests Passing",
    time: "1:15",
    command: "npm run test -- --coverage 98.2%",
    status: "success",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    icon: CheckCircle2,
    label: "Review Approved",
    time: "1:38",
    command: "PR #247 approved by 2 reviewers",
    status: "success",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Rocket,
    label: "Deployed to Prod",
    time: "2:01",
    command: "kubectl rollout status deploy/app ✓",
    status: "success",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Monitor,
    label: "Live & Monitored",
    time: "2:10",
    command: "All systems operational — 0 errors",
    status: "live",
    gradient: "from-emerald-500 to-green-600",
  },
];

function StepCard({
  step,
  index,
  inView,
}: {
  step: (typeof steps)[number];
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

  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center gap-8 md:gap-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Timeline node — visible on md+ */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.25, type: "spring" }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl z-10`}
        >
          <span className="text-2xl font-black text-white">{step.number}</span>
        </motion.div>
        {/* Pulse ring */}
        <motion.div
          className={`absolute w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient}`}
          initial={{ scale: 1, opacity: 0 }}
          animate={
            inView
              ? {
                  scale: [1, 1.6, 1.6],
                  opacity: [0.4, 0, 0],
                }
              : {}
          }
          transition={{
            duration: 2,
            delay: 0.5 + index * 0.3,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </div>

      {/* Spacer for timeline */}
      <div className="hidden md:block w-1/2" />

      {/* Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isEven ? 60 : -60, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: index * 0.15 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="group relative w-full md:w-1/2 rounded-3xl cursor-default"
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

        <div className="relative rounded-3xl bg-background overflow-hidden">
          {/* Top accent bar */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Hover gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
          />

          <div className="relative z-10 p-8 md:p-10">
            {/* Mobile step number + icon */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <motion.div
                className={`w-14 h-14 md:hidden rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-xl font-black text-white">{step.number}</span>
              </motion.div>
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <step.icon className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span
                  className={`text-sm font-bold uppercase tracking-widest bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
                >
                  {step.label}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {step.description}
            </p>

            {/* Checkpoints */}
            <div className="grid grid-cols-2 gap-3">
              {step.checkpoints.map((cp, j) => (
                <motion.div
                  key={cp}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + j * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 text-accent`}
                  />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {cp}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating particles */}
          {hovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-accent/40"
                  initial={{
                    x: 40 + Math.random() * 180,
                    y: 40 + Math.random() * 120,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    y: [null, -50 - Math.random() * 30],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0],
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
    </div>
  );
}

function LiveProcess({ inView }: { inView: boolean }) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= liveSteps.length - 1 ? 0 : prev + 1));
    }, 2200);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-24 relative"
    >
      {/* Outer glow */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-violet-500/20 via-cyan-500/10 to-emerald-500/20" />

      <div className="relative rounded-3xl bg-background overflow-hidden">
        {/* Animated top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500"
            animate={{ x: ["-100%", "0%"] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>

        <div className="p-8 md:p-12 lg:p-14">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Live Development Process
              </h3>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Pipeline Active
              </span>
            </div>
          </div>

          {/* Two-column: Pipeline visual + Terminal */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Left — Pipeline Steps */}
            <div className="lg:col-span-3 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[1.95rem] top-8 bottom-8 w-[2px] bg-border/40 overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-b from-violet-500 via-cyan-500 to-emerald-500"
                  initial={{ height: 0 }}
                  animate={{
                    height: activeStep >= 0 ? `${((activeStep + 1) / liveSteps.length) * 100}%` : "0%",
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <div className="space-y-3">
                {liveSteps.map((item, i) => {
                  const isActive = i <= activeStep;
                  const isCurrent = i === activeStep;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={`relative flex items-center gap-5 p-4 rounded-2xl transition-all duration-500 ${
                        isCurrent
                          ? "bg-accent/5 border border-accent/15"
                          : isActive
                          ? "bg-muted/20"
                          : ""
                      }`}
                    >
                      {/* Node */}
                      <div className="relative shrink-0">
                        <motion.div
                          animate={{
                            scale: isCurrent ? 1.1 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                              : "bg-muted/50 border border-border"
                          }`}
                        >
                          <item.icon
                            className={`w-6 h-6 transition-colors duration-500 ${
                              isActive ? "text-white" : "text-muted-foreground/50"
                            }`}
                          />
                        </motion.div>

                        {/* Pulse ring on current */}
                        <AnimatePresence>
                          {isCurrent && (
                            <motion.div
                              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient}`}
                              initial={{ scale: 1, opacity: 0.3 }}
                              animate={{
                                scale: [1, 1.4],
                                opacity: [0.3, 0],
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                              }}
                            />
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-base font-bold transition-colors duration-500 ${
                              isActive ? "text-foreground" : "text-muted-foreground/50"
                            }`}
                          >
                            {item.label}
                          </span>
                          {isActive && !isCurrent && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            </motion.span>
                          )}
                          {isCurrent && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-accent/10 text-accent border border-accent/20"
                            >
                              Running
                            </motion.span>
                          )}
                        </div>
                        <p
                          className={`text-sm font-mono truncate transition-colors duration-500 ${
                            isActive ? "text-muted-foreground" : "text-muted-foreground/30"
                          }`}
                        >
                          {item.command}
                        </p>
                      </div>

                      {/* Time */}
                      <span
                        className={`hidden sm:block text-sm font-mono shrink-0 transition-colors duration-500 ${
                          isCurrent ? "text-accent" : isActive ? "text-muted-foreground" : "text-muted-foreground/30"
                        }`}
                      >
                        {item.time}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right — Live Terminal */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 rounded-2xl border border-border bg-zinc-950 overflow-hidden shadow-2xl">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs font-mono text-zinc-500 ml-2">
                    ~/shipfast/pipeline
                  </span>
                </div>

                {/* Terminal body */}
                <div className="p-5 font-mono text-sm min-h-[320px] max-h-[400px] overflow-hidden">
                  {liveSteps.map((item, i) => {
                    const isActive = i <= activeStep;
                    const isCurrent = i === activeStep;

                    if (!isActive) return null;

                    return (
                      <motion.div
                        key={item.label + "-terminal"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-3"
                      >
                        {/* Prompt line */}
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-emerald-400">$</span>
                          <motion.span
                            className="text-zinc-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {item.command}
                          </motion.span>
                        </div>

                        {/* Output line */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-2 pl-4"
                        >
                          {item.status === "live" ? (
                            <span className="text-emerald-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {item.label}
                            </span>
                          ) : (
                            <span className="text-emerald-400">
                              ✓ {item.label}
                              <span className="text-zinc-600 ml-2">{item.time}</span>
                            </span>
                          )}
                        </motion.div>

                        {/* Typing cursor on current */}
                        {isCurrent && (
                          <motion.div className="flex items-center gap-2 mt-1.5">
                            <span className="text-emerald-400">$</span>
                            <motion.span
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="w-2.5 h-5 bg-emerald-400/80"
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Empty state */}
                  {activeStep < 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">$</span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2.5 h-5 bg-emerald-400/80"
                      />
                    </div>
                  )}
                </div>

                {/* Terminal footer */}
                <div className="flex items-center justify-between px-5 py-3 bg-zinc-900/50 border-t border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-mono text-zinc-500">
                      {activeStep >= 0
                        ? `Step ${activeStep + 1}/${liveSteps.length}`
                        : "Waiting..."}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-600">
                    {activeStep >= 0 ? liveSteps[activeStep].time : "0:00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-28 md:py-36 relative section-glow" ref={ref}>
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-500/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-2 text-sm font-medium tracking-widest uppercase rounded-full border border-accent/20 text-accent bg-accent/5 mb-6"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            Our Work{" "}
            <span className="gradient-text">Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            How We Deliver Excellence Through Our Proven Three-Step Methodology
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="w-full h-full bg-gradient-to-b from-violet-500/40 via-cyan-500/40 to-emerald-500/40 origin-top"
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Live Development Process */}
        <LiveProcess inView={inView} />
      </div>
    </section>
  );
}
