// app/[locale]/(marketing)/components/FinalCTA.tsx
"use client";

import * as React from "react";
import Container from "@/components/ui/container";
import { H2 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { cubicBezier, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { GlobeDemo } from "@/components/usable_globe";

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
        "relative overflow-hidden",
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
        <div className="absolute -top-32 left-1/2 h-[320px] sm:h-[420px] w-[320px] sm:w-[420px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
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
          className="grid items-center grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 lg:gap-16 py-10 sm:py-14 md:py-20"
        >
          {/* Coluna de texto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left px-3 sm:px-6 md:px-8">
            <H2 className="mb-4 text-2xl sm:text-3xl md:text-4xl text-gray-700 font-semibold drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
              {t("headline")}
            </H2>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.35, ease: [0, 0, 0.2, 1], delay: 0.08 }}
              className="inline-flex w-full justify-center md:justify-start mt-6"
            >
              <Button
                asChild
                className="bg-blue-600 w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:scale-105 transform transition focus:outline-none focus:ring-4 focus:ring-blue-300"
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

          {/* Coluna da imagem — oculta no mobile */}
          <div className="hidden md:flex justify-center md:justify-end w-full px-3 sm:px-4 md:px-0">
            <GlobeDemo />
          </div>
        </motion.div>
      </Container>

      {/* vinhetas sutis */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-10 sm:h-16 bg-gradient-to-b from-black/10 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-black/10 to-transparent"
      />
    </section>
  );
}
