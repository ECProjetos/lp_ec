// app/[locale]/(marketing)/components/Guide.tsx
"use client";

import { H2, Muted } from "@/components/ui/typography";
import Image from "next/image";
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
    <div className="px-6 py-16 md:p-30 bg-blue-800">
      <H2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center md:text-left drop-shadow-sm">
        {t("title")}
      </H2>
      <Muted className="mb-10 md:mb-14 max-w-3xl text-sm sm:text-base md:text-lg text-white text-center md:text-left">
        {t("subtitle")}
      </Muted>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-6 overflow-visible">
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 sm:p-4 md:p-6">
          {features.map((feature, i) => (
            <div
              key={feature.name}
              className={`relative overflow-hidden rounded-lg border bg-gray-200 p-5 sm:p-6 shadow-sm transition-all hover:shadow-md ${
                i === 2 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="rounded-full hover:shadow-lg p-2 sm:p-3 bg-white">
                  <feature.Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl text-gray-700 font-semibold">
                  {feature.name}
                </h3>
              </div>
              <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
                {feature.description}
              </p>

              {feature.background}
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/cgd.svg"
            alt="cdg"
            width={600}
            height={400}
            priority={false}
            className="h-auto w-full max-w-[400px] sm:max-w-[500px] md:max-w-[560px] px-4 sm:px-5"
          />
        </div>
      </div>
    </div>
  );
}
