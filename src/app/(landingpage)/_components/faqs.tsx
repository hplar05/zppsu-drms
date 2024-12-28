import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, Container } from "@/components/craft";

const faqItems = [
  {
    question: "How do I request a document?",
    answer:
      "Log in to your account, navigate to the document request section, select the type of document you need, and follow the prompts to submit your request.",
  },
  {
    question: "How long does it take to process a document request?",
    answer:
      "Processing times vary depending on the type of document requested. Generally, it takes 3-5 business days, but some documents may take longer.",
  },
  {
    question: "Is there a fee for requesting documents?",
    answer:
      "Some documents may require a processing fee. The fee amount will be displayed before you confirm your request.",
  },
  {
    question: "How will I know when my document is ready?",
    answer:
      "You'll receive an email notification when your document is ready for pickup or has been sent digitally, depending on the option you chose.",
  },
];

const FAQ = () => {
  return (
    <Section id="faq" className="min-h-screen flex justify-center items-center">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="mb-4">
              <AccordionItem value={item.question}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
