"use client";

import React from "react";
import { H2 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useReducedMotion,
} from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";
// ⬇️ ícones (exemplo)
import { CircleQuestionMarkIcon } from "lucide-react";

// =====================
// Variants (Framer)
// =====================
const sectionVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: cubicBezier(0, 0, 0.2, 1), // ✅ em vez de [0,0,0.2,1]
      // ou: ease: "ease-out",
    },
  },
};
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: cubicBezier(0, 0, 0.2, 1), // ✅ Correto para motion/react
    },
  },
};

export default function Problem() {
  const t = useTranslations("problem");

  // cards com ÍCONES
  const cards: {
    title: string;
    desc: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[] = [
    {
      title: t("card1.title"),
      desc: t("card1.desc"),
      Icon: CircleQuestionMarkIcon,
    },
    {
      title: t("card2.title"),
      desc: t("card2.desc"),
      Icon: CircleQuestionMarkIcon,
    },
    {
      title: t("card3.title"),
      desc: t("card3.desc"),
      Icon: CircleQuestionMarkIcon,
    },
  ];

  const shouldReduce = useReducedMotion();

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className={cn("relative overflow-hidden py-24")}
    >
      {/* fundo azul contínuo */}

      <div className="p-30 bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={sectionVariants}
          custom={0}
          className="mx-auto max-w-5xl"
        >
          <H2 className="mb-30 text-white">{t("title")}</H2>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {cards.map((c, i) => (
            <motion.div key={i} variants={cardVariants}>
              <HoverCard
                title={c.title}
                desc={c.desc}
                index={i}
                reduceMotion={!!shouldReduce}
                Icon={c.Icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// =====================
// Card com ÍCONE sempre visível + CanvasRevealEffect
// =====================
const HoverCard = ({
  title,
  desc,
  reduceMotion,
  Icon,
}: {
  title: string;
  desc: string;
  index: number;
  reduceMotion: boolean;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  const [hovered, setHovered] = React.useState(false);

  const preset = {
    bg: "bg-blue-600",
    colors: [
      [37, 99, 235],
      [59, 130, 246],
      [147, 197, 253],
    ] as [number, number, number][],
  };

  const toggle = () => setHovered((h) => !h);

  return (
    <div className="relative">
      {/* anel de foco */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-3xl transition",
          hovered ? "ring-2 ring-blue-400/50" : "ring-0"
        )}
      />

      <button
        type="button"
        aria-pressed={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onClick={toggle}
        className={cn(
          "relative group grid h-[15.5rem] w-full cursor-pointer place-items-center overflow-hidden rounded-3xl p-8 text-left outline-none",
          "bg-white/70 backdrop-blur-xl transition-all duration-500",
          "border border-black/5 dark:border-white/10",
          "shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_40px_rgba(37,99,235,0.16)]",
          hovered ? "scale-[1.03]" : "scale-[1.00]"
        )}
      >
        {/* Canvas Reveal */}
        <AnimatePresence>
          {!reduceMotion && hovered && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 overflow-hidden rounded-3xl"
            >
              <CanvasRevealEffect
                animationSpeed={4.2}
                containerClassName={preset.bg}
                colors={preset.colors}
                dotSize={1.6}
              />
              <div className="absolute inset-0 [mask-image:radial-gradient(420px_at_center,white,transparent)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow de borda */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-3xl p-[1px] transition-all duration-700",
            hovered
              ? "bg-[conic-gradient(from_0deg_at_50%_50%,#2563eb_0%,#7dd3fc_50%,#2563eb_100%)] opacity-90"
              : "opacity-0"
          )}
        />

        {/* Conteúdo */}
        <div className="relative z-10 flex max-w-sm flex-col items-center text-center">
          {/* Título no topo */}
          <motion.h3
            layout="position"
            animate={{
              opacity: hovered ? 0 : 1, // ⬅️ some quando hovered
              y: hovered ? -8 : 0, // opcional: sobe um pouquinho ao sumir
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "text-xl text-gray-700 font-semibold drop-shadow-sm transition-all duration-300"
            )}
          >
            {title}
          </motion.h3>

          {/* Área “stack” com altura fixa: ícone (default) ↔ descrição (hover) */}
          <div className="relative mt-2 h-16 w-full">
            {/* Ícone centralizado abaixo do título (some no hover) */}
            <motion.div
              initial={false}
              animate={{
                opacity: hovered ? 0 : 1,
                scale: hovered ? 0.95 : 1,
                y: hovered ? -2 : 0,
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Icon className="h-12 w-12 text-blue-600 drop-shadow-sm" />
            </motion.div>

            {/* Descrição aparece no lugar do ícone no hover */}
            <motion.p
              initial={false}
              animate={{
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : 8,
              }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              className={cn(
                "absolute inset-0 flex items-center justify-center px-4 text-center text-base font-semibold leading-relaxed text-brand-text/80",
                hovered && "text-white/90"
              )}
            >
              {desc}
            </motion.p>
          </div>
        </div>

        {/* highlight superior */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-[80px] w-full rounded-t-3xl bg-gradient-to-b from-white/40 to-transparent"
        />
      </button>
    </div>
  );
};
