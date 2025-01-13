"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Section, Container } from "@/components/craft";

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    text: "W375+4J8, R.T.Lim St, Zamboanga, Zamboanga del Sur",
  },
  {
    icon: <Phone className="w-6 h-6 text-primary" />,
    text: "(062) 993 5096",
  },
  {
    icon: <Mail className="w-6 h-6 text-primary" />,
    text: "admin@zppsu-drms.online",
  },
];

const ContactInfoItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <div className="flex items-center space-x-4 bg-card/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
      <span className="text-foreground">{text}</span>
    </div>
  );
};

export default function ContactUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="min-h-screen flex justify-center items-center bg-gradient-to-b from-background to-background/80 py-20"
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
            Contact Us
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-foreground">
              Contact Information
            </h3>
            <p className="text-muted-foreground">
              Don't hesitate to reach out using the information below:
            </p>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <ContactInfoItem icon={item.icon} text={item.text} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1307.5780589233772!2d122.0599213!3d6.9149936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325041ddc653c873%3A0xe6618d24408bbb26!2sZamboanga%20Peninsula%20Polytechnic%20State%20University!5e0!3m2!1sen!2sph!4v1696840704844!5m2!1sen!2sph&z=18&t=k"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"
          />
        </div>
      </Container>
    </section>
  );
}
