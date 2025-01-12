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
