"use client";
import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";

/* =========================
   Config
========================= */
const LOGOS = [
  { src: "/excel.png", alt: "Excel" },
  { src: "/python.png", alt: "Python" },
  { src: "/powerbi.png", alt: "Power BI" },
  { src: "/qgis.png", alt: "QGIS" },
  { src: "/autodesk.jpg", alt: "Autodesk" },
  { src: "/altoqi.png", alt: "altoqi" },
  { src: "/simul8.png", alt: "SIMUL8" },
  { src: "/visum.png", alt: "PTV Visum" },
  { src: "/ecdata_comp.png", alt: "ECData" },
] as const;

const CENTER_IMG = { src: "/ecprojetos.png", alt: "EC Projetos" } as const;
const BEAM_DURATION = 3;

/* =========================
   Utils
========================= */
function useArrayRefs<T>(length: number) {
  const refs = useRef<React.RefObject<T | null>[]>([]);
  if (refs.current.length !== length) {
    refs.current = Array.from({ length }, () => React.createRef<T>());
  }
  return refs.current;
}

/* =========================
   UI
========================= */
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; title?: string }
>(({ className, children, title }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // ainda menor em telas menores
        "z-10 flex size-18 md:size-20 lg:size-24 items-center justify-center rounded-full border-2 bg-white p-2 md:p-2.5 lg:p-3",
        "shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
      role="img"
      aria-label={title}
      title={title}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

const LogoCircle = forwardRef<
  HTMLDivElement,
  { src: string; alt: string; className?: string; imgW?: number; imgH?: number }
>(({ src, alt, className, imgW = 50, imgH = 50 }, ref) => {
  return (
    <Circle
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      title={alt}
    >
      <Image src={src} alt={alt} width={imgW} height={imgH} />
    </Circle>
  );
});
LogoCircle.displayName = "LogoCircle";

/* =========================
   Component
========================= */
const Example = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // refs estáveis para cada logo de origem
  const sourceRefs = useArrayRefs<HTMLDivElement>(LOGOS.length);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full items-center justify-center",
        // padding responsivo
        "p-4 md:p-6",
        // só min-height, nada de height fixa
        "min-h-[380px] md:min-h-[420px] lg:min-h-[480px]",
        // deixa beams aparecerem em todos tamanhos
        "overflow-visible"
      )}
    >
      <div
        className={cn(
          "flex size-full max-w-5xl flex-col md:flex-row",
          "items-center md:items-stretch",
          "justify-between gap-5 md:gap-6 lg:gap-10"
        )}
      >
        {/* Usuário */}
        <div className="flex justify-center md:justify-start items-center">
          <Circle ref={userRef} title="Você">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Circle>
        </div>

        {/* Centro */}
        <div className="flex justify-center items-center">
          <LogoCircle
            ref={centerRef}
            className="size-20 md:size-24 lg:size-28"
            src={CENTER_IMG.src}
            alt={CENTER_IMG.alt}
            imgW={90}
            imgH={90}
          />
        </div>

        {/* Fontes */}
        <div
          className={cn(
            "flex flex-wrap md:flex-col justify-center md:justify-center",
            "gap-2 md:gap-2.5 lg:gap-3",
            "max-w-[260px] md:max-w-none"
          )}
        >
          {LOGOS.map((logo, idx) => (
            <LogoCircle
              key={logo.src}
              ref={sourceRefs[idx]}
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </div>
      </div>

      {/* Beams: fontes -> centro */}
      {LOGOS.map((_, idx) => (
        <AnimatedBeam
          key={`beam-${idx}`}
          containerRef={containerRef}
          fromRef={sourceRefs[idx]}
          toRef={centerRef}
          duration={BEAM_DURATION}
        />
      ))}

      {/* Beam: centro -> usuário */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={userRef}
        duration={BEAM_DURATION}
      />
    </div>
  );
};

export default Example;
