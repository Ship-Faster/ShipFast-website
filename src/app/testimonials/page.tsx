"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Star, Quote, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const testimonials = [
  {
    name: "Ajay",
    role: "Full Stack Developer",
    company: "Syntrico",
    avatar: "AJ",
    rating: 5,
    quote:
      "shipfast delivered a robust, scalable full-stack application that exceeded our expectations. Their deep understanding of both frontend and backend made the entire process seamless and efficient.",
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    highlight: "Seamless delivery",
  },
  {
    name: "Rahul",
    role: "Cyber Security Engineer",
    company: "MCyber",
    avatar: "RK",
    rating: 5,
    quote:
      "Security was our top priority and shipfast nailed it. From secure architecture to penetration-tested code, they built a system we can trust completely. Truly impressive attention to detail.",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    highlight: "Rock-solid security",
  },
  {
    name: "Siva Gopi",
    role: "UI/UX Designer",
    company: "Zithara",
    avatar: "SG",
    rating: 5,
    quote:
      "The team translated our designs into pixel-perfect, buttery-smooth interfaces. Every animation, every interaction — exactly as envisioned. It's rare to find developers who truly respect design.",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/10 to-green-500/10",
    highlight: "Pixel-perfect execution",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
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
          className={`absolute inset-0 bg-gradient-to-br ${testimonial.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
          {/* Quote icon + Stars */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg`}
            >
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + i * 0.08 }}
                >
                  <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-6 flex-1">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          {/* Highlight chip */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="inline-flex self-start items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full bg-accent/5 text-accent border border-accent/10 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300 mb-6"
          >
            {testimonial.highlight}
          </motion.span>

          {/* Author */}
          <div className="pt-5 border-t border-border/50 flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center flex-shrink-0`}
            >
              <span className="text-sm font-bold text-white">{testimonial.avatar}</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
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

export default function TestimonialsPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="pt-44 pb-28 md:pb-36 relative section-glow">
        {/* Subtle background accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeading
            badge="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it — hear from the founders and teams we've helped ship, scale, and succeed."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                index={i}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-20"
          >
            <a
              href="/#contact"
              className="btn-shimmer group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold rounded-full bg-accent text-white hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
