"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlignRight } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { ModeToggle } from "../basics/ModeToggle";

const Nav = ({ id, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSection = useSelector((state) => state.portfolio.selectedSection)
  const [isSelected, setSelected] = useState(false)
  useEffect(() => {
    const handleSelection = () => {
      if (selectedSection._id === id) {
        setSelected(true)
      }
      else {
        setSelected(false)
      }
    }
    if (selectedSection) {
      handleSelection()
    }
  }, [selectedSection])
  return (
    <header className={`${isSelected ? "selected-section" : ""} fixed left-0 px-3 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}>
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

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <AlignRight className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 pt-6">
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
    </header>
  );
};

export default Nav;