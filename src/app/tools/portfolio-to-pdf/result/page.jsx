"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ResultPage() {
  const params = useSearchParams();
  const url = params.get("url");

  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!url) return;

    fetch("/api/portfolio-to-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob));
        setLoading(false);
      });
  }, [url]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Generating PDF...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Your PDF is Ready</h2>

        <Button asChild>
          <a href={pdfUrl} download="portfolio.pdf">
            Download PDF
          </a>
        </Button>
      </div>
    </div>
  );
}
