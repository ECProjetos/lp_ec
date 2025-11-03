/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { useTranslations } from "next-intl";
import { HeroHighlight, Highlight } from "./hero-highlight";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-200, 200]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 100]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[135vh] overflow-hidden antialiased relative flex flex-col self-auto 
      [perspective:700px] [transform-style:preserve-3d]
      bg-white"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-5">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export function Header() {
  const t = useTranslations("hero");
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-dm lg:text-md font-bold text-neutral-700 text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        <Highlight className="text-white ">{t("title")}</Highlight>
        <div>{t("subtitle")}</div>
      </motion.h1>
    </HeroHighlight>
  );
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0 border-1 rounded-xl border-blue-700"
    >
      <a
        href={product.link}
        onClick={(e) => {
          if (product.link === "/#infra") {
            e.preventDefault(); // impede abrir o link
            const section = document.querySelector("#infra");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
        target={product.link === "/#infra" ? undefined : "_blank"}
        rel={product.link === "/#infra" ? undefined : "noopener noreferrer"}
        className="block group-hover/product:shadow-2xl"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
        />
      </a>

      {/* overlay azul translúcido */}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-gradient-to-t from-blue-800 via-blue-500/80 to-transparent pointer-events-none transition-all duration-300 rounded-xl"></div>

      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-lg font-semibold transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};
