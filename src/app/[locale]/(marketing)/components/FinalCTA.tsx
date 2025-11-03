// app/[locale]/(marketing)/components/FinalCTA.tsx
"use client";

import * as React from "react";
import Container from "@/components/ui/container";
import { H2, Muted } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { cubicBezier, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { GlobeDemo } from "@/components/usable_globe";

/**
 * Melhorias de layout e imagem
 * - Grid responsivo: texto à esquerda, imagem à direita no desktop. No mobile empilha.
 * - Espaçamento e alinhamento refinados.
 * - Container da imagem com "glow" e leve animação.
 * - Image otimizada com sizes e prioridade condicional.
 * - Acessibilidade com aria-labelledby e alt melhor.
 */

type FinalCTAProps = {
  id?: string;
  className?: string;
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicBezier(0, 0, 0.2, 1) },
  },
};

export default function FinalCTA({
  id = "final-cta",
  className,
}: FinalCTAProps) {
  const t = useTranslations("finalCTA");
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        // base
        "relative overflow-hidden ",
        // gradiente de fundo
        "bg-gradient-to-b from-brand-primary via-brand-primary to-brand-primary",
        className
      )}
    >
      {/* brilho radial suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(60% 60% at 50% 10%, rgba(0,0,0,1) 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 10%, rgba(0,0,0,1) 40%, transparent 100%)",
        }}
      >
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* textura sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
          color: "black",
          mixBlendMode: "soft-light",
        }}
      />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={sectionVariants}
          className="grid items-center gap-10 md:gap-14 lg:gap-16 md:grid-cols-2"
        >
          {/* Coluna de texto */}
          <div className="text-center md:text-left">
            <H2 className="mb-4 text-gray-700 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
              {t("headline")}
            </H2>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
            ></motion.div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.35, ease: [0, 0, 0.2, 1], delay: 0.08 }}
              className="inline-flex"
            >
              <Button
                asChild
                className="bg-blue-600 w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transform transition focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <a
                  href="https://wa.me/5548991147704"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("cta", { default: "Entre em Contato" })}
                >
                  {t("cta", { default: "Entre em Contato" })}
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Coluna da imagem */}
          <GlobeDemo />
        </motion.div>
      </Container>

      {/* vinhetas sutis */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent"
      />
    </section>
  );
}
