"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CheckPortfolio() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleCheck = () => {
    if (!url.trim()) return;
    router.push(`/tools/check-portfolio/result?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Portfolio Score Checker
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-700">Portfolio URL</label>
            <Input
              placeholder="https://your-portfolio.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="focus-visible:ring-gray-300"
            />
          </div>

          <Button
            onClick={handleCheck}
            className="w-full"
          >
            Check Score
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
