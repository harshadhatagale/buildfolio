"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Sparkles, ShieldCheck, Layout, Zap, ArrowRight, Globe, Palette, TrendingUp } from "lucide-react"
import { Highlighter } from "../ui/highlighter"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Visual Portfolio Editor",
    description:
      "Edit every section visually — text, cards, chips, layouts — with a smooth editor that feels powerful yet simple.",
    gradient: "from-rose-500 to-pink-500",
    badge: "Core"
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "SEO-Optimized Portfolios",
    description:
      "Built-in SEO best practices like clean URLs, fast load times, and semantic structure so your portfolio ranks better.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Zero Coding Required",
    description:
      "No code needed at all. Create a professional developer-grade portfolio without writing a single line of code.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Lightning Fast Performance",
    description:
      "Optimized for speed using modern web technologies so your portfolio loads instantly on any device.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Secure & Reliable",
    description:
      "Your data stays safe with secure infrastructure and reliable deployments you can trust.",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Live Preview & Instant Publish",
    description:
      "See changes in real time and publish your portfolio instantly with a single click.",
    gradient: "from-violet-500 to-purple-500"
  }
]


export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <section id="features" className="relative py-24 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl flex justify-center items-center md:text-5xl font-bold mb-4"
                    >
                        <span>Powerful Features.</span>
                    </motion.h2>
                    <motion.h2
                        className="text-4xl flex justify-center items-center md:text-5xl font-bold mb-4">
                        <Highlighter strokeWidth={8} iterations={1} action="underline" padding={6}>
                            <span className="text-primary text-4xl md:text-5xl font-bold">Simplified.</span>
                        </Highlighter>
                    </motion.h2>
                </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Everything you need to design, build, and launch your personal brand or portfolio in minutes.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative group"
            >
              <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-primary/5 group-hover:to-primary/10 transition-all duration-500" />
                
                {/* Feature Badge */}
                {feature.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {feature.badge}
                    </span>
                  </div>
                )}

                <CardContent className="p-8 relative z-10">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-lg"
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}