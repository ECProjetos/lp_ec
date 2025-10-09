"use client";

import React from "react";
import Container from "@/components/ui/container";
import { H2, Muted } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export default function Problem() {
  const t = useTranslations("problem");
  const cards: { title: string; desc: string }[] = [
    { title: t("card1.title"), desc: t("card1.desc") },
    { title: t("card2.title"), desc: t("card2.desc") },
    { title: t("card3.title"), desc: t("card3.desc") },
  ];

  return (
    <section
      className="relative bg-gradient-to-b from-white via-brand-light1/60 to-white py-24 overflow-hidden"
      id="problem"
    >
      {/* Luz de fundo suave */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05),transparent_60%)] pointer-events-none" />

      <Container>
        <div className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-secondary/80">
          {t("tag")}
        </div>
        <H2 className="mb-6 text-3xl md:text-4xl font-extrabold text-brand-primary drop-shadow-sm">
          {t("title")}
        </H2>
        <Muted className="mb-14 max-w-3xl text-base md:text-lg text-brand-text/70">
          {t("subtitle")}
        </Muted>

        <div className="grid gap-10 md:grid-cols-3">
          {cards.map((c, i) => (
            <HoverCard key={i} title={c.title} desc={c.desc} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// =====================
// Card refinado com CanvasRevealEffect
// =====================
const HoverCard = ({
  title,
  desc,
  index,
}: {
  title: string;
  desc: string;
  index: number;
}) => {
  const [hovered, setHovered] = React.useState(false);

  const colorPresets = [
    {
      bg: "bg-blue-600",
      colors: [
        [37, 99, 235], // blue-600
        [59, 130, 246], // blue-500
        [147, 197, 253], // blue-200
      ],
    },
  ];

  const preset = colorPresets[index % colorPresets.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-3xl flex items-center justify-center h-[22rem] p-8 cursor-pointer group transition-all duration-700 ease-out",
        "bg-white/60 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.05)] border b-1 hover:shadow-[0_8px_40px_rgba(37,99,235,0.15)] hover:scale-[1.04]"
      )}
    >
      {/* Canvas Reveal */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 rounded-3xl overflow-hidden"
          >
            <CanvasRevealEffect
              animationSpeed={4.2}
              containerClassName={preset.bg}
              colors={preset.colors}
              dotSize={1.5}
            />
            <div className="absolute inset-0 [mask-image:radial-gradient(450px_at_center,white,transparent)] " />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Border glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl p-[1px] transition-all duration-700",
          hovered
            ? "bg-[conic-gradient(from_0deg_at_50%_50%,#2563eb_0%,#7dd3fc_50%,#2563eb_100%)]"
            : "bg-transparent"
        )}
      ></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center transition-all duration-500">
        <h3
          className={cn(
            "text-xl font-bold text-brand-primary transition-all duration-500 drop-shadow-sm",
            hovered &&
              "text-white -translate-y-4 scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          )}
        >
          {title}
        </h3>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 12,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "text-brand-text/80 font-semibold text-base mt-4 max-w-sm leading-relaxed transition-all duration-300",
            hovered && "text-white/90 "
          )}
        >
          {desc}
        </motion.p>
      </div>

      {/* Highlight superior */}
      <div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-3xl" />
    </div>
  );
};
