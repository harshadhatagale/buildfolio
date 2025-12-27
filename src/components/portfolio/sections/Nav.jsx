"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ModeToggle } from "@/components/globals/ModeToggle";
import { usePathname } from "next/navigation";

const Nav = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(

          "border-b bg-background/80 backdrop-blur",
          "supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3">
          {/* Logo */}
          <Link href="/" className="text-lg font-semibold">
            {content.portfolioName.split("").map((char, index) => (
              <span
                key={index}
                className={
                  index >= content.portfolioName.length - 3
                    ? "text-primary"
                    : ""
                }
              >
                {char}
              </span>
            ))}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {content.links.map((link) => (
              <Link
                key={link.title}
                href={link.link || "#"}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.link && "text-primary"
                )}
              >
                {link.title}
              </Link>
            ))}
            <ModeToggle />
          </nav>

          {/* Mobile Nav */}
          <div className="flex items-center gap-2 md:hidden">
            <AnimatedThemeToggler />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlignRight className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full">
                <SheetHeader>
                  <SheetTitle className="text-left text-xl">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 pt-6">
                  {content.links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.link || "#"}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.link && "text-primary"
                      )}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;