import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqData } from '@/data';

export const FAQ = () => {
  return (
    <section
      className="mx-auto w-full max-w-screen-lg px-4 py-10 text-center md:px-8 xl:px-0"
      id="faq"
    >
      <div>
        <h2 className="mb-4 text-lg font-bold md:text-3xl">FAQs</h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-start">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-start">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
