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
  const [hoveredLink, setHoveredLink] = useState(null);
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
      {/* Desktop Navbar */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block",
          "w-[92%] max-w-7xl rounded-2xl",
          "border border-white/20 dark:border-white/10",
          "backdrop-blur-xl backdrop-saturate-200",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/30 before:to-transparent dark:before:from-black/30",
          "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-white/20 after:to-transparent dark:after:from-black/20",
          "overflow-hidden",
          scrolled
            ? "bg-white/70 dark:bg-black/60 shadow-2xl"
            : "bg-white/30 dark:bg-black/25"
        )}
      >
        <div className="relative z-10 flex h-16 items-center justify-between px-8">
          {/* Logo with gradient */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link href="/" className="group relative">
              <span className="text-lg font-bold tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {content.portfolioName}
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-primary/50"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-1">
            {content.links.map((link, index) => (
              <motion.div
                key={link.title}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                initial={false}
                animate={{
                  y: hoveredLink === index ? -2 : 0,
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Link
                  href={link.link || "#"}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                    "text-muted-foreground hover:text-foreground",
                    pathname === link.link
                      ? "text-primary font-semibold"
                      : "hover:bg-white/40 dark:hover:bg-white/10"
                  )}
                >
                  {pathname === link.link && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.title}</span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2"
            >
              <ModeToggle />
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Navbar - Always visible */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 md:hidden",
          "backdrop-blur-xl backdrop-saturate-200",
          "border-b border-white/20 dark:border-white/10",
          "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent dark:before:from-black/40",
          scrolled
            ? "bg-white/80 dark:bg-black/70"
            : "bg-white/60 dark:bg-black/50"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* Mobile Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="group">
              <span className="text-lg font-bold tracking-tighter bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                {content.portfolioName}
              </span>
            </Link>
          </motion.div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ModeToggle/>
            </motion.div>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                      >
                        <AlignRight className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={cn(
                  "w-[85vw] sm:w-[400px] p-0 border-l",
                  "bg-gradient-to-b from-white/95 to-white/85 dark:from-black/95 dark:to-black/85",
                  "backdrop-blur-2xl border-white/20 dark:border-white/10",
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent"
                )}
              >
                <SheetHeader className="p-6 pb-4 border-b border-white/10">
                  <SheetTitle className="text-left">
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent text-2xl font-bold">
                      Menu
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                  className="flex flex-col p-6"
                >
                  {content.links.map((link) => (
                    <motion.div
                      key={link.title}
                      variants={{
                        hidden: { x: 20, opacity: 0 },
                        visible: { x: 0, opacity: 1 },
                      }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        href={link.link || "#"}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "relative flex items-center rounded-xl px-4 py-4 my-1 text-lg font-medium transition-all duration-300",
                          "group hover:bg-white/40 dark:hover:bg-white/10",
                          pathname === link.link
                            ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {pathname === link.link && (
                          <motion.div
                            layoutId="mobileActive"
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-full"
                          />
                        )}
                        <span className="relative z-10">{link.title}</span>
                        <motion.div
                          className="ml-auto opacity-0 group-hover:opacity-100"
                          whileHover={{ x: 5 }}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mobile Sheet Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10"
                >
                  <div className="text-center text-sm text-muted-foreground">
                    {content.portfolioName} © {new Date().getFullYear()}
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Nav;