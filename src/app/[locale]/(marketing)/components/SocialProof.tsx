// app/[locale]/(marketing)/components/SocialProof.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { H2, P } from "@/components/ui/typography";
import { CountingNumber } from "@/components/ui/counting-number";

const EMPRESAS_COUNT = 27;

// Gera: /empresas/CLIENTES_01.png ... /empresas/CLIENTES_27.png
const logos = Array.from({ length: EMPRESAS_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/CLIENTEs_${n}.png`;
});

const logoNodes = logos.map((src, idx) => (
  <div key={src} className="relative h-32 w-40 md:h-32 md:w-48">
    <Image
      src={src}
      alt={`Logo cliente ${idx + 1}`}
      fill
      className="object-contain"
    />
  </div>
));

export default function SocialProof() {
  const t = useTranslations("social");

  return (
    <section className="relative w-full bg-blue-900 text-white py-16 px-6 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-col gap-12">
        {/* Título da seção */}
        <div className="text-center text-white">
          <H2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </H2>
        </div>

        {/* Topo: Texto + Métricas */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div className="flex-1">
            <P className="text-xl font-light leading-relaxed max-w-xl text-white">
              {t("text1")}
            </P>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <H2 className="text-3xl md:text-4xl font-bold text-white">
                +
                <CountingNumber
                  number={130}
                  inView={true}
                  transition={{ stiffness: 100, damping: 30 }}
                />
                M ;
              </H2>
              <P className="text-sm md:text-base mt-1 text-white">
                {t("metric1")}
              </P>
            </div>
            <div>
              <H2 className="text-3xl md:text-4xl font-bold text-white">
                +R$
                <CountingNumber
                  number={40}
                  inView={true}
                  transition={{ stiffness: 100, damping: 30 }}
                />
                B;
              </H2>
              <P className="text-sm md:text-base mt-1 text-white">
                {t("metric2")}
              </P>
            </div>
            <div>
              <H2 className="text-3xl md:text-4xl font-bold text-white">
                +
                <CountingNumber
                  number={200}
                  inView={true}
                  transition={{ stiffness: 100, damping: 30 }}
                />
                ;
              </H2>
              <P className="text-sm md:text-base mt-1 text-white">
                {t("metric3")}
              </P>
            </div>
          </div>
        </div>

        {/* Logos */}
        <div className="pt-6 border-t border-white/20">
          <h3 className="text-white text-lg font-semibold mb-4">
            {t("clientsTitle")}
          </h3>
          <div className="bg-white py-6 rounded-md">
            <InfiniteMovingCards
              items={logoNodes}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
