// app/[locale]/(marketing)/components/Guide.tsx
"use client";

import { Globe } from "@/components/ui/globe";
import { H2, Muted } from "@/components/ui/typography";
import { FileTextIcon, InputIcon, GlobeIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

export default function Guide() {
  const t = useTranslations("guide");

  const features = [
    {
      Icon: FileTextIcon,
      name: t("card1.title"),
      description: t("card1.desc"),
      href: "/",
      cta: t("cta"),
      background: (
        <div className="flex justify-end">
          <></>
        </div>
      ),
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: InputIcon,
      name: t("card2.title"),
      description: t("card2.desc"),
      href: "/",
      cta: t("cta"),
      background: <></>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: t("card3.title"),
      description: t("card3.desc"),
      href: "/",
      cta: t("cta"),
      background: <></>,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
  ];

  return (
    <>
      <div className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-secondary/80">
        {t("tag")}
      </div>
      <H2 className="mb-6 text-3xl md:text-4xl font-extrabold text-brand-primary drop-shadow-sm">
        {t("title")}
      </H2>
      <Muted className="mb-14 max-w-3xl text-base md:text-lg text-brand-text/70">
        {t("subtitle")}
      </Muted>
      <div className="flex">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6">
          {features.map((feature, i) => (
            <div
              key={feature.name}
              className={`relative overflow-hidden rounded-lg border  p-6 shadow-sm ${
                i === 2 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-center space-x-4 ">
                <div className="rounded-full hover:shadow-lg p-3">
                  <feature.Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.name}</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                {feature.description}
              </p>

              {feature.background}
            </div>
          ))}
        </div>
        <Globe />
      </div>
    </>
  );
}
