// app/(marketing)/components/InfraGrid.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/container";
import { H2, Muted } from "@/components/ui/typography";

export default function InfraGrid() {
  const t = useTranslations("infra");

  return (
    <section id="infra" className="relative overflow-hidden bg-white py-20">
      {/* Background map */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/map.png"
          alt="Mapa de fundo"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      <Container>
        <div className="relative z-10 text-center mb-12">
          <H2 className="text-3xl font-semibold text-gray-700   ">
            {t("title")}
          </H2>
          <Muted className="text-base max-w-3xl mx-auto mt-2 text-gray-600 ">
            {t("subtitle")}
          </Muted>
        </div>

        {/* Flow image */}
        <div className="relative z-10 flex justify-center mb-16">
          <Image
            src="/flow_ec.svg"
            alt="Fluxo de infraestrutura"
            width={1080}
            height={320}
            className="w-full max-w-5xl"
          />
        </div>

        {/* Grid with descriptions */}
        <div className="relative z-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-left text-gray-800 dark:text-gray-200">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              {t("block1.title")}
            </h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-600">
              <li>{t("block1.item1")}</li>
              <li>{t("block1.item2")}</li>
              <li>{t("block1.item3")}</li>
              <li>{t("block1.item4")}</li>
              <li>{t("block1.item5")}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              {t("block2.title")}
            </h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-600">
              <li>{t("block2.item1")}</li>
              <li>{t("block2.item2")}</li>
              <li>{t("block2.item3")}</li>
              <li>{t("block2.item4")}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              {t("block3.title")}
            </h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-600">
              <li>{t("block3.item1")}</li>
              <li>{t("block3.item2")}</li>
              <li>{t("block3.item3")}</li>
              <li>{t("block3.item4")}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">
              {t("block4.title")}
            </h3>
            <ul className="space-y-1 text-sm leading-relaxed text-gray-600">
              <li>{t("block4.item1")}</li>
              <li>{t("block4.item2")}</li>
              <li>{t("block4.item3")}</li>
              <li>{t("block4.item4")}</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
