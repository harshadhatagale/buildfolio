"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Is BuildFolio really free?",
    a: "Yes. You can create and publish one portfolio completely free with core sections and a BuildFolio subdomain."
  },
  {
    q: "Do I need coding skills to use BuildFolio?",
    a: "Not at all. BuildFolio is a no-code visual editor. You can customize everything without writing a single line of code."
  },
  {
    q: "Can I use my own custom domain?",
    a: "Yes. Custom domain support is available in the Pro and Lifetime plans."
  },
  {
    q: "Can I edit my portfolio after publishing?",
    a: "Absolutely. You can update content, sections, and layout anytime and republish instantly."
  },
  {
    q: "What is the Lifetime plan?",
    a: "The Lifetime plan is a one-time payment that gives you permanent access to all Pro features and future updates."
  },
  {
    q: "Will you add more layouts and sections?",
    a: "Yes. New layouts, sections, and improvements are released regularly. Lifetime users get everything automatically."
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your data is securely stored and only accessible to you. We follow best practices for security and reliability."
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. You can cancel your Pro subscription anytime. Your portfolio will remain accessible on the free plan."
  }
]

export default function FAQSection() {
  return (
    <section className="relative py-18 bg-background px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border border-border rounded-xl mb-4 px-4"
            >
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
