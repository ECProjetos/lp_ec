import { HoverEffect } from "@/components/ui/card-hover-effect";
import { H2, Muted } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

export default function ActionPlan() {
  const t = useTranslations("actionPlan");
  const projects = [
    {
      title: t("step1.title"),
      description: t("step1.desc"),
    },
    {
      title: t("step2.title"),
      description: t("step2.desc"),
    },
    {
      title: t("step3.title"),
      description: t("step3.desc"),
    },
  ];

  return (
    <div>
      <H2 className="mb-6 text-3xl md:text-4xl font-extrabold text-brand-primary drop-shadow-sm">
        {t("title")}
      </H2>
      <Muted className="mb-14 max-w-3xl text-base md:text-lg text-brand-text/70">
        {t("subtitle")}
      </Muted>

      <HoverEffect items={projects} />
    </div>
  );
}
