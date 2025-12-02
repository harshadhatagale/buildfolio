"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Frown, LayoutGrid, Home, HelpCircle, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [countdown, setCountdown] = useState(15)

  // Countdown for automatic redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      window.location.href = "/dashboard"
    }
  }, [countdown])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl w-full text-center space-y-8 relative z-10"
      >
        {/* Header with branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-3 mb-4"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-bold text-primary-foreground">B</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">Buildfolio</span>
        </motion.div>

        {/* Main content card */}
        <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-8 md:p-10 shadow-xl">
          {/* Animated icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.3, 
              type: "spring", 
              stiffness: 200,
              damping: 15 
            }}
            className="relative mx-auto w-28 h-28 mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-md" />
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border flex items-center justify-center">
              <div className="relative">
                <Frown className="w-16 h-16 text-primary" strokeWidth={1.5} />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="absolute -inset-4 bg-primary/20 rounded-full blur-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            404 Error • Page Not Found
          </motion.div>

          {/* Title with gradient */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Portfolio Not Found
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl mb-2"
          >
            The portfolio you're looking for doesn't exist or has been removed
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="text-muted-foreground mb-8"
          >
            Redirecting to dashboard in <span className="font-semibold text-primary">{countdown}</span> seconds
          </motion.p>

          {/* Search suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-secondary/30 rounded-xl p-4 mb-8 border"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Search className="w-4 h-4" />
              <span>Double-check the URL or search for the portfolio in your dashboard</span>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button 
                variant="default" 
                className="w-full px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300"
              >
                <Home className="mr-3 h-5 w-5" />
                Go to Dashboard
              </Button>
            </Link>

            <Link href="/templates" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full px-8 py-6 text-base border-2 hover:border-primary/50 transition-all duration-300"
              >
                <LayoutGrid className="mr-3 h-5 w-5" />
                Browse Templates
              </Button>
            </Link>

            <Link href="/dashboard/portfolios" className="w-full sm:w-auto">
              <Button 
                variant="ghost" 
                className="w-full px-8 py-6 text-base hover:bg-secondary/50 transition-all duration-300"
              >
                <ArrowLeft className="mr-3 h-5 w-5" />
                My Portfolios
              </Button>
            </Link>
          </motion.div>

          {/* Help section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="pt-8 border-t"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground text-left">
                <p className="font-medium mb-1">Need assistance?</p>
                <p>Check our documentation or contact support</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Link href="/docs/troubleshooting">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Help Center
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="secondary" size="sm" className="gap-2">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-muted-foreground"
        >
          © {new Date().getFullYear()} Buildfolio. All rights reserved.
          <br />
          If this issue persists, please clear your cache or try again later.
        </motion.p>
      </motion.div>
    </div>
  )
}