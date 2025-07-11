'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export default function FaqsSection() {
  const content = {
    heading: "Frequently Asked Questions",
    subHeading: "Got questions? I’ve got answers.",
    items: [
      {
        question: "Can I customize my portfolio after publishing?",
        answer: "Yes! You can log in anytime to edit, add, or remove sections as you like."
      },
      {
        question: "Is the portfolio mobile-friendly?",
        answer: "Absolutely! All portfolios are fully responsive and look great on any device."
      },
      {
        question: "Do I need to know coding?",
        answer: "No coding needed. The builder is completely drag and drop with customizable sections."
      },
      {
        question: "Is there a free plan?",
        answer: "Yes, there is a basic free plan with limited features. You can upgrade anytime."
      }
    ]
  }
  return (
    <section className="w-full py-3 bg-background px-6">
      <div className="container space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            {content?.heading || 'FAQs'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content?.subHeading || 'Common questions and answers.'}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {content?.items?.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
