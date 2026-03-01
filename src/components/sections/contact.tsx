"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Send,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Users,
  MessageCircle,
  Package,
  Mail,
  User,
  FileText,
  PenLine,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  AlertCircle,
  Loader2,
  Phone,
} from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

/* ─── engagement stats ─── */
const engagement = [
  {
    icon: Clock,
    label: "Timeline",
    value: "4-12 weeks for MVP",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Users,
    label: "Team",
    value: "2-3 dedicated engineers",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: MessageCircle,
    label: "Communication",
    value: "Daily async + weekly syncs",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Package,
    label: "Deliverables",
    value: "Working product + full source",
    gradient: "from-emerald-500 to-green-600",
  },
];

/* ─── trust signals ─── */
const trustSignals = [
  { icon: Zap, text: "< 24h Response" },
  { icon: ShieldCheck, text: "NDA Ready" },
  { icon: Globe, text: "Remote-First" },
];

/* ─── Glassmorphic floating-label input ─── */
function GlassInput({
  id,
  name,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  step,
  delay = 0,
}: {
  id: string;
  name: string;
  label: string;
  icon: typeof User;
  type?: string;
  placeholder: string;
  step: number;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-all duration-300 ${
            focused || filled
              ? "bg-accent text-white shadow-md shadow-accent/30"
              : "bg-muted/50 text-muted-foreground"
          }`}
        >
          {step}
        </span>
        <label
          htmlFor={id}
          className={`text-sm font-semibold transition-colors duration-300 ${
            focused ? "text-accent" : "text-foreground"
          }`}
        >
          {label}
        </label>
      </div>

      <div className="relative group/input">
        {/* Animated border ring */}
        <div
          className={`absolute -inset-px rounded-2xl transition-all duration-500 ${
            focused
              ? "bg-gradient-to-r from-accent via-purple-500 to-cyan-500 opacity-100"
              : "bg-border opacity-50 group-hover/input:opacity-80"
          }`}
        />

        {/* Inner glow */}
        {focused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -inset-2 rounded-3xl bg-accent/5 blur-xl pointer-events-none"
          />
        )}

        <div className="relative flex items-center rounded-2xl bg-background overflow-hidden">
          <div
            className={`flex items-center justify-center w-12 h-full pl-4 pointer-events-none transition-colors duration-300 ${
              focused ? "text-accent" : "text-muted-foreground/40"
            }`}
          >
            <Icon className="w-[18px] h-[18px]" />
          </div>
          <input
            id={id}
            name={name}
            type={type}
            required
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              setFilled(e.target.value.length > 0);
            }}
            className="flex-1 pl-2 pr-4 py-4 bg-transparent text-base placeholder:text-muted-foreground/35 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── EmailJS config ───
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_qqrmkav";
const EMAILJS_TEMPLATE_ID = "template_n1k1mrk";
const EMAILJS_PUBLIC_KEY = "madEFfq-GiS4aCFYz";

export function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formElement = useRef<HTMLFormElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [textareaFocused, setTextareaFocused] = useState(false);
  const [textareaFilled, setTextareaFilled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  /* ── 3D tilt for form card ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping: 30,
  });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), {
    stiffness: 200,
    damping: 30,
  });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), {
    stiffness: 200,
    damping: 30,
  });
  const spotlightBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, hsl(var(--accent) / 0.07), transparent 50%)`
  );

  function handleMouseMove(e: React.MouseEvent) {
    if (!formRef.current) return;
    const rect = formRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formElement.current || sending) return;

    setSending(true);
    setError("");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formElement.current,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      formElement.current.reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError("Failed to send message. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-28 md:py-36 relative" ref={sectionRef}>
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-accent/[0.04] rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -25, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-0 left-1/2 w-[350px] h-[350px] bg-violet-500/[0.03] rounded-full blur-[100px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium tracking-widest uppercase rounded-full border border-accent/20 text-accent bg-accent/5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Extraordinary</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Have an early-stage idea, pilot project, or internal tool? We&apos;d love to hear about it.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            {trustSignals.map((signal, i) => (
              <motion.div
                key={signal.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <signal.icon className="w-4 h-4 text-accent" />
                <span className="font-medium">{signal.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* ─── Contact Form — 3 cols ─── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            className="lg:col-span-3 relative group"
          >
            {/* Animated gradient border */}
            <div className="absolute -inset-px rounded-3xl overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, hsl(var(--accent) / 0.4) 10%, transparent 20%, hsl(var(--accent) / 0.2) 30%, transparent 40%, rgba(6,182,212,0.3) 50%, transparent 60%, hsl(var(--accent) / 0.3) 70%, transparent 80%, rgba(139,92,246,0.2) 90%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              {/* Mask the inside to reveal only border */}
              <div className="absolute inset-px rounded-3xl bg-background" />
            </div>

            {/* Hover border boost */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-transparent via-border to-transparent opacity-0 group-hover:from-accent/30 group-hover:via-accent/15 group-hover:to-cyan-500/20 group-hover:opacity-100 transition-all duration-700" />

            {/* Cursor spotlight */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: spotlightBg }}
            />

            <form
              ref={formElement}
              className="relative rounded-3xl bg-background p-8 md:p-10 space-y-7 overflow-hidden"
              onSubmit={handleSubmit}
            >
              {/* Top accent bar - animated gradient */}
              <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
                <motion.div
                  className="h-full w-[200%] bg-gradient-to-r from-violet-500 via-accent to-cyan-500"
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Corner orbital decoration */}
              <div className="absolute -top-12 -right-12 w-32 h-32 pointer-events-none">
                <motion.div
                  className="absolute inset-0 rounded-full border border-accent/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-3 rounded-full border border-dashed border-accent/[0.07]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/20" />
              </div>

              {/* Form header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-2"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/20"
                >
                  <PenLine className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Send us a message</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    We respond within 24 hours
                  </p>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Inputs */}
              <div className="grid sm:grid-cols-2 gap-6">
                <GlassInput id="name" name="from_name" label="Your Name" icon={User} placeholder="John Doe" step={1} delay={0.05} />
                <GlassInput id="email" name="from_email" label="Email Address" icon={Mail} type="email" placeholder="john@company.com" step={2} delay={0.1} />
              </div>

              <GlassInput id="phone" name="phone" label="Phone Number" icon={Phone} type="tel" placeholder="+91 98765 43210" step={3} delay={0.15} />

              <GlassInput id="project" name="project" label="What are you building?" icon={FileText} placeholder="SaaS platform, mobile app, internal tool..." step={4} delay={0.2} />

              {/* Textarea */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-all duration-300 ${
                      textareaFocused || textareaFilled
                        ? "bg-accent text-white shadow-md shadow-accent/30"
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    5
                  </span>
                  <label
                    htmlFor="message"
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      textareaFocused ? "text-accent" : "text-foreground"
                    }`}
                  >
                    Tell us more
                  </label>
                </div>

                <div className="relative group/ta">
                  {/* Animated border ring */}
                  <div
                    className={`absolute -inset-px rounded-2xl transition-all duration-500 ${
                      textareaFocused
                        ? "bg-gradient-to-r from-accent via-purple-500 to-cyan-500 opacity-100"
                        : "bg-border opacity-50 group-hover/ta:opacity-80"
                    }`}
                  />

                  {textareaFocused && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -inset-2 rounded-3xl bg-accent/5 blur-xl pointer-events-none"
                    />
                  )}

                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Budget range, timeline, technical needs — whatever helps us understand your vision."
                    onFocus={() => setTextareaFocused(true)}
                    onBlur={(e) => {
                      setTextareaFocused(false);
                      setTextareaFilled(e.target.value.length > 0);
                    }}
                    className="relative w-full px-4 py-4 rounded-2xl bg-background text-base placeholder:text-muted-foreground/35 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-4 pt-2"
              >
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending && !submitted ? { scale: 1.03, y: -2 } : {}}
                  whileTap={!sending && !submitted ? { scale: 0.97 } : {}}
                  className={`btn-shimmer group/btn relative inline-flex items-center justify-center gap-2.5 px-10 py-4 text-base font-semibold rounded-2xl text-white transition-all duration-500 cursor-pointer overflow-hidden ${
                    submitted
                      ? "bg-emerald-500 shadow-xl shadow-emerald-500/25"
                      : sending
                        ? "bg-accent/70 cursor-not-allowed"
                        : "bg-gradient-to-r from-accent via-purple-600 to-accent bg-[length:200%_100%] hover:bg-right hover:shadow-xl hover:shadow-accent/25"
                  }`}
                >
                  {submitted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </motion.div>
                  ) : sending ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-[18px] h-[18px] animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-[18px] h-[18px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {error ? (
                  <span className="flex items-center gap-1.5 text-xs text-red-500">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error}
                  </span>
                ) : (
                  <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Secured & encrypted
                  </span>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* ─── Right side — 2 cols ─── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Discovery call card */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 100 }}
              className="relative group flex-1"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-transparent via-border to-transparent group-hover:from-accent/30 group-hover:via-accent/15 group-hover:to-cyan-500/15 transition-all duration-700" />

              <div className="relative rounded-3xl bg-background p-8 md:p-9 overflow-hidden h-full">
                {/* Top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent via-purple-500 to-cyan-500 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Animated background glow */}
                <motion.div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-accent blur-[80px] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700"
                />

                {/* Decorative dots */}
                <div className="absolute top-6 right-6 flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-accent/20 group-hover:bg-accent/40 transition-colors duration-500" />
                  <div className="w-2 h-2 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 transition-colors duration-500" />
                  <div className="w-2 h-2 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/40 transition-colors duration-500" />
                </div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-accent/20"
                  >
                    <Calendar className="w-6 h-6 text-white" />
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">
                    Book a Discovery Call
                  </h3>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    30 minutes. No pitch deck needed. Just tell us what you&apos;re
                    building and we&apos;ll map out how to get there.
                  </p>

                  <motion.a
                    href="#"
                    whileHover={{ x: 6 }}
                    className="group/link inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-accent/10 to-purple-500/10 text-accent border border-accent/20 hover:border-accent/40 hover:from-accent/15 hover:to-purple-500/15 transition-all duration-300"
                  >
                    Schedule a call
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Typical engagement card */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.25, type: "spring", stiffness: 100 }}
              className="relative group flex-1"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/15 via-accent/5 to-transparent group-hover:from-accent/25 group-hover:via-accent/10 transition-all duration-700" />

              <div className="relative rounded-3xl bg-background p-8 md:p-9 overflow-hidden h-full">
                {/* Shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-7">
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles className="w-5 h-5 text-accent" />
                    </motion.div>
                    <span className="text-sm font-bold text-accent uppercase tracking-[0.15em]">
                      Typical Engagement
                    </span>
                  </div>

                  <div className="space-y-4">
                    {engagement.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200, damping: 25 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-4 group/item p-2 -mx-2 rounded-xl hover:bg-accent/[0.03] transition-colors duration-300"
                      >
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0 shadow-md`}
                        >
                          <item.icon className="w-[18px] h-[18px] text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <span className="text-base font-semibold text-foreground block">
                            {item.label}
                          </span>
                          <p className="text-sm text-muted-foreground truncate">
                            {item.value}
                          </p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-accent/30 group-hover/item:text-accent group-hover/item:scale-110 transition-all duration-300 shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
