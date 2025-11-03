import Example from "@/components/ex";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { H2 } from "@/components/ui/typography";
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
    <div className="flex flex-col items-center text-center px-6 py-14 sm:px-10 md:p-20">
      <H2 className="mb-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700 drop-shadow-sm">
        {t("title")}
      </H2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full mt-6">
        {/* Cards */}
        <div className="w-full md:w-1/2">
          <HoverEffect items={projects} />
        </div>

        {/* Example Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Example />
        </div>
      </div>
    </div>
  );
}
