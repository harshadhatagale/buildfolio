"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from "recharts";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setError("No URL provided");
      setLoading(false);
      return;
    }

    const analyzePortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/check-portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error(`Analysis failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.score === -1) {
          throw new Error(data.improvements?.[0] || "Invalid portfolio URL");
        }

        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to analyze portfolio");
      } finally {
        setLoading(false);
      }
    };

    analyzePortfolio();
  }, [url]);

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#f59e0b"; // amber
    if (score >= 40) return "#f97316"; // orange
    return "#ef4444"; // red
  };

  const getCategoryColor = (percentage) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-amber-100 text-amber-800";
    if (percentage >= 40) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const copyToClipboard = async () => {
    if (!result) return;
    
    const text = `My Portfolio Score: ${result.score}/${result.maxScore} (${result.percentage}% - ${result.grade})\n\n${url}`;
    
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      alert("Score copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-gray-700">Analyzing your portfolio...</p>
          <p className="text-sm text-gray-500">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-red-200">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-lg font-semibold text-red-800 mb-2">Analysis Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.history.back()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <p className="text-red-600 text-lg">No analysis results found.</p>
      </div>
    );
  }

  const graphData = [
    { 
      name: "Score", 
      value: result.score,
      maxValue: result.maxScore,
      fill: getScoreColor(result.percentage)
    }
  ];

  const categoryData = Object.entries(result.categories).map(([name, category]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    score: category.score,
    maxScore: category.maxScore,
    percentage: Math.round((category.score / category.maxScore) * 100)
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* MAIN SCORE CARD */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Portfolio Analysis
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">Analyzed: {url}</p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* SCORE OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600 font-medium">Overall Score</p>
                <div className="flex items-baseline justify-center gap-2">
                  <p className="text-5xl font-bold text-gray-900">{result.score}</p>
                  <p className="text-lg text-gray-500">/ {result.maxScore}</p>
                </div>
                <Badge className={`text-sm ${getCategoryColor(result.percentage)}`}>
                  {result.percentage}% - {result.grade}
                </Badge>
              </div>

              <div className="md:col-span-2 flex items-center">
                <div className="w-full h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={graphData}>
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, result.maxScore]} />
                      <Bar
                        dataKey="value"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={80}
                      >
                        {graphData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <Separator />

            {/* CATEGORY BREAKDOWN */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Category Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {category.score}/{category.maxScore}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: getScoreColor(category.percentage)
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{category.percentage}%</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* IMPROVEMENTS SECTION */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Suggested Improvements
                </h2>
                <Badge variant="outline" className="text-sm">
                  {result.improvements.length} suggestions
                </Badge>
              </div>

              <div className="space-y-3">
                {result.improvements.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-amber-200 bg-amber-50 flex items-start gap-3"
                  >
                    <span className="text-amber-600 mt-0.5">💡</span>
                    <p className="text-sm text-gray-800 flex-1">{item}</p>
                  </div>
                ))}
                
                {result.improvements.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-2 block">🎉</span>
                    <p className="font-medium">Excellent! No improvements needed.</p>
                    <p className="text-sm mt-1">Your portfolio is well optimized.</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* SUMMARY & ACTIONS */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                <p>
                  Passed {result.summary.passedChecks} out of {result.summary.totalChecks} checks
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => window.history.back()}>
                  Analyze Another
                </Button>
                <Button onClick={copyToClipboard}>
                  Copy Score
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}