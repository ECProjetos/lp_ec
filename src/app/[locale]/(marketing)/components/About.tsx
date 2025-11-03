"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { H2 } from "@/components/ui/typography";

type BulletProps = {
  children: React.ReactNode;
  className?: string;
};

function BulletCard({ children, className }: BulletProps) {
  return (
    <figure
      className={cn(
        "relative mx-auto w-full cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-brand-primary/10"></div>
        <figcaption className="text-base font-medium leading-snug ">
          {children}
        </figcaption>
      </div>
    </figure>
  );
}

export default function About() {
  const t = useTranslations("about");

  const bullets = [
    t("items.legitimacy"),
    t("items.speed"),
    t("items.partnership"),
    t("items.techDNA"),
  ];

  // ---- in-view trigger ----
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const once = { root: null, threshold: 0.3 };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, once);

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative text-center bg-blue-900 py-16"
      aria-label={t("title")}
    >
      <div className="mx-auto max-w-6xl px-4">
        <H2 className="text-white">{t("title")}</H2>

        {/* layout lado a lado (imagem primeiro, lista depois) */}
        <div className="mt-8 grid grid-cols-1 items-center md:grid-cols-2 gap-8 md:gap-16 xl:gap-24">
          {/* coluna da imagem */}
          <div className="flex justify-center md:justify-start md:pr-8 xl:pr-12">
            <Image
              src="/mapa_ativos2.svg"
              alt="cdg"
              width={600}
              height={400}
              priority={false}
              className="h-auto w-full max-w-[660px]"
            />
          </div>

          {/* coluna da lista */}
          <div className="relative md:pl-8 xl:pl-12">
            <div className="relative flex h-[440px] w-full flex-col overflow-hidden p-2 text-left">
              {isInView ? (
                <AnimatedList>
                  {bullets.map((b, i) => (
                    <BulletCard key={i}>{b}</BulletCard>
                  ))}
                </AnimatedList>
              ) : (
                <div className="space-y-3 opacity-0">
                  {bullets.map((b, i) => (
                    <BulletCard key={i}>{b}</BulletCard>
                  ))}
                </div>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-brand-light2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
