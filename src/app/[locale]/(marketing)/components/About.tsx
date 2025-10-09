"use client";

import Container from "@/components/ui/container";
import { H2 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { GlowCard } from "@/components/ui/spotlight-card"; // ajuste o caminho conforme sua estrutura

export default function About() {
  const t = useTranslations("about");

  const bullets = [
    t("items.legitimacy"),
    t("items.speed"),
    t("items.partnership"),
    t("items.techDNA"),
  ];

  const colors: ("blue" | "purple" | "green" | "red" | "orange")[] = [
    "blue",
    "purple",
    "purple",
    "blue",
  ];

  return (
    <section className="bg-brand-light2 py-16">
      <H2 className="mb-8 text-brand-primary">{t("title")}</H2>

      <ul className="grid gap-6 md:grid-cols-2">
        {bullets.map((b, i) => (
          <GlowCard
            key={i}
            glowColor={colors[i % colors.length]}
            customSize
            className="p-5 bg-white/70 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
          >
            <li className="flex items-start gap-2 text-brand-text/90">
              <span className="text-xl text-brand-primary">✓</span>
              <span>{b}</span>
            </li>
          </GlowCard>
        ))}
      </ul>
    </section>
  );
}
