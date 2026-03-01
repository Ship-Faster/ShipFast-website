"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#services", label: "Services", type: "section" as const },
  { href: "/team", label: "Team", type: "page" as const },
  { href: "/projects", label: "Projects", type: "page" as const },
  { href: "/testimonials", label: "Testimonials", type: "page" as const },
  { href: "/#contact", label: "Contact", type: "section" as const },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for home page sections
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionLinks = navLinks.filter((l) => l.type === "section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionLinks.forEach((link) => {
      const id = link.href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  function isActive(link: (typeof navLinks)[number]) {
    if (link.type === "page") return pathname === link.href;
    if (link.type === "section" && pathname === "/") return activeSection === link.href;
    return false;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <nav
            className={`relative flex items-center justify-between h-[5.5rem] px-7 rounded-2xl transition-all duration-500 ${
              scrolled
                ? "bg-white/80 dark:bg-zinc-950/70 shadow-[0_2px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06]"
                : "bg-white/60 dark:bg-zinc-950/40 backdrop-blur-md border border-transparent"
            }`}
          >
            {/* Logo — Left */}
            <Link href="/" className="flex items-center gap-3.5 pl-1 group shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                ship<span className="text-accent">fast</span>
              </span>
            </Link>

            {/* Center — Pill nav */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-zinc-100/70 dark:bg-white/[0.06] rounded-2xl px-3 py-2">
                {navLinks.map((link) => {
                  const active = isActive(link);
                  const LinkTag = link.type === "page" ? Link : "a";
                  return (
                    <LinkTag
                      key={link.href}
                      href={link.href}
                      className={`relative px-6 py-2.5 text-lg font-medium rounded-xl transition-all duration-200 ${
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="navbar-active"
                          className="absolute inset-0 bg-white dark:bg-white/10 rounded-xl shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </LinkTag>
                  );
                })}
              </div>
            </div>

            {/* Right — CTA */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/#contact"
                className="hidden md:inline-flex items-center gap-2 px-7 py-3 text-lg font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-all duration-300 hover:shadow-md hover:gap-3 group"
              >
                Book a Call
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>

          {/* Mobile menu — slides down from nav */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden mt-2 rounded-2xl bg-white/90 dark:bg-zinc-950/80 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                <div className="p-3 flex flex-col gap-0.5">
                  {navLinks.map((link, i) => {
                    const active = isActive(link);
                    const LinkTag = link.type === "page" ? Link : "a";
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                      >
                        <LinkTag
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block text-[20px] font-medium py-3.5 px-6 rounded-xl transition-colors ${
                            active
                              ? "bg-zinc-100 dark:bg-white/10 text-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-white/5"
                          }`}
                        >
                          {link.label}
                        </LinkTag>
                      </motion.div>
                    );
                  })}
                  <div className="pt-2 mt-1 border-t border-border/50">
                    <a
                      href="/#contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 text-[20px] font-semibold rounded-xl bg-foreground text-background transition-opacity hover:opacity-90"
                    >
                      Book a Call
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
