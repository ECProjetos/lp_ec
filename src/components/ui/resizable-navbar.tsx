"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Ship, Plane } from "lucide-react";
import React, { useRef, useState } from "react";
import Image from "next/image";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}
interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}
interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}
interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}
interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}
interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        backgroundColor: visible
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,1)",
        boxShadow: visible
          ? "0 2px 12px rgba(0,0,0,0.05), 0 1px 0 rgba(0,0,0,0.03)"
          : "0 1px 0 rgba(0,0,0,0.03)",
        borderColor: visible ? "rgba(0,0,0,0.10)" : "rgba(0,0,0,0.08)",
        width: visible ? "32%" : "100%",
        y: visible ? 16 : 0,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 45 }}
      // navbar mais estreita em desktops
      style={{ minWidth: "640px" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-6xl flex-row items-center justify-between self-start rounded-full px-3 py-1.5 lg:flex",
        "border",
        "bg-white text-neutral-900 dark:bg-white dark:text-neutral-900",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1.5 text-[0.85rem] font-medium transition duration-200 lg:flex",
        "text-neutral-900",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-3 py-1.5 font-medium"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-neutral-100 ring-1 ring-inset ring-neutral-200"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        backgroundColor: visible
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,1)",
        boxShadow: visible
          ? "0 2px 12px rgba(0,0,0,0.05)"
          : "0 1px 0 rgba(0,0,0,0.03)",
        width: visible ? "92%" : "100%",
        paddingRight: visible ? "10px" : "0px",
        paddingLeft: visible ? "10px" : "0px",
        borderRadius: visible ? "10px" : "1.75rem",
        y: visible ? 14 : 0,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 45 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-1 lg:hidden",
        "border border-neutral-200",
        "bg-white text-neutral-900 dark:bg-white dark:text-neutral-900",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between gap-1",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className={cn(
            "absolute inset-x-0 top-14 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-lg bg-white/95 px-3 py-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-neutral-200",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const iconClass = "h-5 w-5 text-neutral-800";
  return isOpen ? (
    <Ship className={iconClass} onClick={onClick} />
  ) : (
    <Plane className={iconClass} onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-3 flex items-center space-x-2 px-1.5 py-0.5 text-xs font-normal text-neutral-900"
    >
      {/* logo menor */}
      <Image src="/ecprojetos.png" alt="logo" width={150} height={60} />
    </a>
  );
};
