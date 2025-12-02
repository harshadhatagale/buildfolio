"use client";

import Link from "next/link";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ModeToggle } from "@/components/globals/ModeToggle";

const Nav = ({ id, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`px-3 sticky top-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
      <div className="flex h-16 items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          {content.portfolioName.split("").map((char, index) => (
            <span key={index} className={index >= content.portfolioName.length - 3 ? "text-primary" : ""}>
              {char}
            </span>
          ))}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {content.links.map((link) => (
            <Link
              key={link.title}
              href={link.link || "#"}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
          <ModeToggle/>
        </nav>

        {/* Mobile Navigation - Fixed Structure */}
        <div className="flex items-center gap-2 md:hidden">
          <AnimatedThemeToggler />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <AlignRight className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <SheetHeader>
                <SheetTitle className="text-left text-xl">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 pt-2 w-full px-4">
                {content.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.link || "#"}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-2 text-lg font-medium transition-colors hover:text-primary",
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
  );
};

export default Nav;