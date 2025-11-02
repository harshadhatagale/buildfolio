"use client"
import { motion } from "framer-motion"
import { Code, Sparkles, ShieldCheck, Zap } from "lucide-react"
import { Highlighter } from "../ui/highlighter"

const features = [
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: "AI-Powered Builder",
        description:
            "Build your portfolio with smart AI suggestions that understand your goals and style automatically.",
    },
    {
        icon: <Code className="h-8 w-8 text-primary" />,
        title: "Zero Coding Required",
        description:
            "Completely no-code, yet developer-grade customization. Just drag, drop, and launch instantly.",
    },
    {
        icon: <Zap className="h-8 w-8 text-primary" />,
        title: "Lightning Fast Performance",
        description:
            "Optimized with Next.js 14, your portfolio loads in milliseconds and runs smoothly across all devices.",
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "Secure & Reliable",
        description:
            "Your data is encrypted and stored securely with enterprise-grade reliability.",
    },
]

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 bg-background text-foreground">
            <div className="max-w-6xl mx-auto px-6 text-center">
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground max-w-2xl mx-auto mb-12"
                >
                    Everything you need to design, build, and launch your personal brand or portfolio in minutes.
                </motion.p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="p-6 border border-border rounded-xl bg-card shadow-md hover:shadow-lg transition-all"
                        >
                            <div className="flex justify-center mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
