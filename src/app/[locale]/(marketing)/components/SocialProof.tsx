// app/[locale]/(marketing)/components/SocialProof.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { H2, P } from "@/components/ui/typography";
import { CountingNumber } from "@/components/ui/counting-number";

const logos = [
  "/CLIENTEs_01.png",
  "/CLIENTEs_02.png",
  "/CLIENTEs_03.png",
  "/CLIENTEs_04.png",
  "/CLIENTEs_05.png",
  "/CLIENTEs_06.png",
  "/CLIENTEs_07.png",
  "/CLIENTEs_08.png",
  "/CLIENTEs_09.png",
  "/CLIENTEs_10.png",
  "/CLIENTEs_11.png",
  "/CLIENTEs_12.png",
  "/CLIENTEs_13.png",
  "/CLIENTEs_14.png",
  "/CLIENTEs_15.png",
  "/CLIENTEs_16.png",
  "/CLIENTEs_17.png",
  "/CLIENTEs_18.png",
  "/CLIENTEs_19.png",
  "/CLIENTEs_20.png",
  "/CLIENTEs_21.png",
  "/CLIENTEs_22.png",
  "/CLIENTEs_23.png",
  "/CLIENTEs_24.png",
  "/CLIENTEs_25.png",
  "/CLIENTEs_26.png",
  "/CLIENTEs_27.png",
  "/CLIENTEs_28.png",
  "/CLIENTEs_29.png",
  "/CLIENTEs_30.png",
];

const logoNodes = logos.map((src, idx) => (
  <div
    key={`${src}-${idx}`}
    className="flex h-28 w-44 items-center justify-center px-6 md:h-32 md:w-52"
  >
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={`Logo cliente ${idx + 1}`}
        fill
        sizes="208px"
        className="object-contain"
      />
    </div>
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
                M
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
                B
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

          <p className="mt-6 text-center text-base md:text-lg font-light leading-relaxed text-white/90">
            A EC Projetos é representante oficial na América Latina e Caribe do
            software de simulação dinâmica SIMUL8, da Minitab.
          </p>
        </div>
      </div>
    </section>
  );
}
