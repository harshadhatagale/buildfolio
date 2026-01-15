"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AlignRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ModeToggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const Nav = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setScrolled(y > 20);
    });
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed top-5 left-1/2 -translate-x-1/2 z-20 hidden md:block",
          "w-[92%] max-w-7xl rounded-2xl overflow-hidden",
          "border border-white/20 dark:border-white/10 backdrop-blur-xl",
          scrolled
            ? "bg-white/70 dark:bg-black/60 shadow-2xl"
            : "bg-white/30 dark:bg-black/25"
        )}
      >
        <div className="flex h-16 items-center justify-between px-8">
          <Link
            href=""
            className="font-bold text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            {content.portfolioName}
          </Link>

          <nav className="flex items-center gap-2">
            {content.links.map((link) => (
              <Link
                key={link.title}
                href={link.link || "#"}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition",
                  pathname === link.link
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-white/40 dark:hover:bg-white/10"
                )}
              >
                {link.title}
              </Link>
            ))}
            <ModeToggle />
          </nav>
        </div>
      </motion.header>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "w-[92%] rounded-2xl overflow-hidden",
          "fixed top-5 left-1/2 -translate-x-1/2 md:hidden z-20",
          "border-b border-white/20 dark:border-white/10 backdrop-blur-xl",
          scrolled
            ? "bg-white/80 dark:bg-black/70"
            : "bg-white/60 dark:bg-black/50"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link
            href="/"
            className="font-bold text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            {content.portfolioName}
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative z-[80]">
              <ModeToggle />
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen((v) => !v)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <AlignRight />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "border border-l-muted fixed top-0 right-0 bottom-0 z-[60] md:hidden",
                "w-[85vw] max-w-sm",
                "bg-background backdrop-blur-xl",
                "border-l border-white/10",
                "flex flex-col"
              )}
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Menu
                </h2>
              </div>

              <div className="flex-1 p-6 space-y-2">
                {content.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.link || "#"}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block w-full rounded-xl px-4 py-4 text-lg transition",
                      pathname === link.link
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
