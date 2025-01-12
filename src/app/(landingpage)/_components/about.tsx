"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section, Container } from "@/components/craft";
import Core from "@/public/core.jpg";
import Mission from "@/public/mission.jpg";
import Vision from "@/public/vision.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const About = () => {
  return (
    <Section
      id="about"
      className="min-h-screen flex justify-center items-center py-16"
    >
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          {/* <h3 className="text-2xl font-semibold mb-4 text-center">
            Our Core Values
          </h3> */}
          <div className="flex justify-center">
            <Image
              src={Mission}
              alt="ZPPSU Vision"
              width={500}
              height={320}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          {/* <h3 className="text-2xl font-semibold mb-4 text-center">
            Our Core Values
          </h3> */}
          <div className="flex justify-center">
            <Image
              src={Vision}
              alt="ZPPSU Vision"
              width={500}
              height={320}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          {/* <h3 className="text-2xl font-semibold mb-4 text-center">
            Our Core Values
          </h3> */}
          <div className="flex justify-center">
            <Image
              src={Core}
              alt="ZPPSU Core Values"
              width={500}
              height={320}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default About;
