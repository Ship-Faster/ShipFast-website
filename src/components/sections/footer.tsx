"use client";

import { Zap, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "MVP Development", href: "/#services" },
    { label: "Internal Tools", href: "/#services" },
    { label: "DevOps & Cloud", href: "/#services" },
    { label: "Security Engineering", href: "/#services" },
    { label: "Ongoing Support", href: "/#services" },
  ],
  Company: [
    { label: "Team", href: "/team" },
    { label: "Projects", href: "/projects" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Why Us", href: "/#why-us" },
    { label: "Our Stack", href: "/#stack" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ],
};

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      {/* Gradient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow">
                <Zap className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                ship<span className="text-accent">fast</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              From idea to working product — fast, secure, and scalable.
              A senior engineering team for founders who ship.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-accent/40 hover:bg-accent/5 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => {
                  const isPage = link.href.startsWith("/") && !link.href.startsWith("/#");
                  const LinkTag = isPage ? Link : "a";
                  return (
                    <li key={link.label}>
                      <LinkTag
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </LinkTag>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-5">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-foreground transition-colors">
                hello@shipfast.dev
              </li>
              <li>
                <a href="/#contact" className="hover:text-foreground transition-colors">
                  Schedule a discovery call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} shipfast. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built with
            <span className="font-medium text-foreground">Next.js</span>
            <span className="text-muted-foreground/40">&bull;</span>
            Designed with intention
          </p>
        </div>
      </div>
    </footer>
  );
}
