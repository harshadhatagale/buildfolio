"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Type, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import FontCard from "./FontCard";

const MAX_RESULTS = 5;

export default function FontEditor() {
  const [open, setOpen] = useState(false);
  const [fonts, setFonts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  // 🔥 fetch fonts ONLY when sheet opens
  useEffect(() => {
    if (!open || fetched) return;

    const fetchFonts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/fonts.json");
        const data = await res.json();
        setFonts(data || []);
        setFetched(true);
      } catch (err) {
        console.error("Failed to fetch fonts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFonts();
  }, [open, fetched]);

  const filteredFonts = fonts
    .filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, MAX_RESULTS);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* 🎯 Trigger Icon */}
      <SheetTrigger asChild>
        <Type className="cursor-pointer" size={20} />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div>
              <h3 className="text-2xl font-bold">Font Editor</h3>
              <p className="text-lg font-semibold text-muted-foreground">
                Search & preview fonts
              </p>
            </div>
          </SheetTitle>

          <SheetDescription asChild>
            <div
              suppressHydrationWarning
              className="mt-4 px-5 overflow-y-auto grid grid-cols-2 gap-3"
            >
              {/* 🔍 Search */}
              <div className="col-span-2">
                <Input
                  placeholder="Search fonts…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {/* ⏳ Initial Loader */}
              {loading ? (
                <div className="col-span-2 flex justify-center">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              ) : filteredFonts.length > 0 ? (
                filteredFonts.map((font) => (
                  <FontCard key={font.name} font={font} />
                ))
              ) : query ? (
                <p className="col-span-2 text-muted-foreground text-sm">
                  No fonts found
                </p>
              ) : (
                <p className="col-span-2 text-muted-foreground text-sm">
                  Start typing to search fonts
                </p>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
