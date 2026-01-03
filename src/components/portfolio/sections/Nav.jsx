"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AlignRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/globals/ModeToggle";
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
      {/* ================= DESKTOP NAV ================= */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block",
          "w-[92%] max-w-7xl rounded-2xl overflow-hidden",
          "border border-white/20 dark:border-white/10",
          "backdrop-blur-xl",
          scrolled
            ? "bg-white/70 dark:bg-black/60 shadow-2xl"
            : "bg-white/30 dark:bg-black/25"
        )}
      >
        <div className="flex h-16 items-center justify-between px-8">
          <Link
            href="/"
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

      {/* ================= MOBILE NAV ================= */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "fixed top-0 left-0 right-0 md:hidden",
          "z-[60] pointer-events-auto",
          "border-b border-white/20 dark:border-white/10",
          "backdrop-blur-xl",
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
            {/* 🔥 FIXED MODE TOGGLE */}
            <div className="relative z-[70] pointer-events-auto">
              <ModeToggle />
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
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
              </SheetTrigger>

              {/* ================= FIXED SHEET ================= */}
              <SheetContent
                side="right"
                className={cn(
                  "z-[50]",
                  "w-[85vw] sm:w-[400px] p-0 border-l",
                  "bg-muted text-foreground",
                  "backdrop-blur-xl"
                )}
              >
                <SheetHeader className="p-6 border-b border-white/10">
                  <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col p-6 gap-2">
                  {content.links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.link || "#"}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-xl px-4 py-3 text-lg transition",
                        pathname === link.link
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-white/40 dark:hover:bg-white/10"
                      )}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-muted/80 backdrop-blur">
                  <p className="text-center text-sm text-muted-foreground">
                    {content.portfolioName} © {new Date().getFullYear()}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Nav;
