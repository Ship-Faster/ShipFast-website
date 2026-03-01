"use client";

import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Stack } from "@/components/sections/stack";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <Services />
      <WhyUs />
      <Stack />
      <Process />
      <Contact />
    </main>
  );
}
