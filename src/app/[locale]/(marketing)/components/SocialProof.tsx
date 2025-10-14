// app/[locale]/(marketing)/components/SocialProof.tsx
"use client";

import Image from "next/image";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useTranslations } from "next-intl";
import { H2 } from "@/components/ui/typography";

const EMPRESAS_COUNT = 27;

// gera: /empresas/CLIENTES_01.png ... /empresas/CLIENTES_27.png
const logos = Array.from({ length: EMPRESAS_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/empresas/CLIENTEs_${n}.png`;
});

// se o InfiniteMovingCards espera "items" como objetos, use este formato.
// (Se ele aceitar ReactNode direto, você pode passar `logoNodes` em vez de `items`.)
const logoNodes = logos.map((src, idx) => (
  <div key={src} className="relative h-24 w-60 lg:h-32 lg:w-72">
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
    <div className="relative flex h-[20rem] items-center justify-center overflow-hidden rounded-md bg-white antialiased">
      <H2 className="m-10 text-blue-700">{t("title")}</H2>
      <InfiniteMovingCards
        items={logoNodes} // <- usa TODAS as imagens da pasta
        direction="right"
        speed="slow"
      />
    </div>
  );
}
