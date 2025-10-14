// app/[locale]/(marketing)/components/FinalCTA.tsx
"use client";

import * as React from "react";
import Container from "@/components/ui/container";
import { H2, Muted } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { cubicBezier, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
        "relative overflow-hidden py-80",
        // gradiente de fundo com melhor profundidade
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

      {/* textura sutil para dar “grip” */}
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
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <H2 className="mb-3 text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
            {t("headline")}
          </H2>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
          >
            <Muted className="mx-auto mb-8 max-w-2xl text-black/80">
              {t("sub")}
            </Muted>
          </motion.div>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, ease: [0, 0, 0.2, 1], delay: 0.08 }}
            className="inline-flex"
          >
            <Button asChild className="bg-blue-600">
              <a
                href="https://wa.me/554899114-7704"
                target="_blank"
                rel="noopener noreferrer"
              >
                Entre em Contato
              </a>
            </Button>
          </motion.div>
        </motion.div>
        <Image src="flow_ec.svg" width={400} height={300} alt="a" />
      </Container>

      {/* bordas com vinheta sutil para “fechar” a seção */}
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
