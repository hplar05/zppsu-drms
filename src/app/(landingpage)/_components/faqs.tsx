"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
    question: "What document can I request?",
    answer:
      "Enrolment Form, Diploma, Official Transcript of Records, Report of Grades, Certificate of Transfer (Honorable Dismal), Application of Cross Enrolment, Certification of Graduation, Certification of Grades & Credit Eamed, Certification of Enrolment ,Request Form for Student's Permanent Record, Evaluation Form, Request Form for Document Issuance ,College Student's Permanent Record, Application Form for Graduation ,Completion/Removal Form, and Prospectus",
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
    question: "What are the fees for requesting documents?",
    answer:
      "Records Verification/ Background Check - No fees, Records Authentication - 60/page, Completion form - 50/page, TOR - 65/page, Issuance of Diploma/ Proficiency certificates - 250 for the 2nd issuance, Evaluation of subjects, grades & units earned - No fees, Issuance of certifications/CAV (certification, authentication, verification) - 60/page",
  },
  {
    question: "How will I know when my document is ready?",
    answer:
      "You'll receive an email notification when your document is ready for pickup or has been sent digitally, depending on the option you chose.",
  },
];

const FAQ = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="faq"
      className="min-h-screen flex justify-center items-center py-20 bg-gradient-to-b from-background to-background/80"
      ref={sectionRef}
    >
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion type="single" collapsible className="mb-4">
                <AccordionItem
                  value={item.question}
                  className="border-b border-border/50"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 px-6 bg-card/50 rounded-t-lg transition-colors duration-200 hover:bg-card/80">
                    <span className="flex items-center text-foreground">
                      {item.question}
                      <ArrowUpRight className="ml-2 h-4 w-4 text-primary/60" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground bg-card/30 px-6 py-4 rounded-b-lg">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"
          />
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
