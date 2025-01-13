"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Section, Container } from "@/components/craft";
import { FileText, Clock, UserCheck, Shield } from "lucide-react";

const features = [
  {
    icon: <FileText className="h-12 w-12 text-primary" />,
    title: "Easy Document Requests",
    description:
      "Submit and track your document requests with just a few clicks.",
  },
  {
    icon: <Clock className="h-12 w-12 text-primary" />,
    title: "Quick Processing",
    description:
      "Experience faster turnaround times for your document requests.",
  },
  {
    icon: <UserCheck className="h-12 w-12 text-primary" />,
    title: "User-Friendly Interface",
    description:
      "Navigate our system with ease, designed with students in mind.",
  },
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: "Secure and Confidential",
    description:
      "Your personal information and documents are protected with top-notch security.",
  },
];

const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card dark:bg-card/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50"
    >
      <div className="mb-4 bg-primary/10 rounded-full p-3 inline-block">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">
        {feature.title}
      </h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      className="bg-background/50 dark:bg-background/80 min-h-screen flex justify-center items-center py-20"
      ref={sectionRef}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Our Features
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
