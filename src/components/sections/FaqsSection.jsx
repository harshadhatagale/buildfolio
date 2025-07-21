'use client';
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export default function FaqsSection({id, content}) {
 const selectedSection= useSelector((state)=> state.portfolio.selectedSection)
  const [isSelected, setSelected]= useState(false)
  useEffect(()=>{
    const handleSelection=()=>{
      if (selectedSection._id===id) {
        setSelected(true)
      }
      else
      {
        setSelected(false)
      }
    }
    if(selectedSection)
    {
      handleSelection()
    }
  }, [selectedSection])
  return (
    <section className={`${isSelected? "selected-section": ""} relative w-full py-3 bg-background px-6`}>
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
