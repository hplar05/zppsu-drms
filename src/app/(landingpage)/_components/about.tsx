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
        {/* <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          About ZPPSU
        </motion.h2> */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0, x: -50 },
              animate: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            {/* <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Provide effective and efficient services through advanced
              technological studies and researches for the empowerment of human
              resources.
            </p> */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={Mission}
                alt="ZPPSU Mission"
                width={500}
                height={300}
                className="rounded-lg shadow-lg object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0, x: 50 },
              animate: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              ZPPSU as the leading provider of globally competitive human
              resources.
            </p> */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={Vision}
                alt="ZPPSU Vision"
                width={500}
                height={320}
                className="rounded-lg shadow-lg object-cover"
              />
            </motion.div>
          </motion.div>
        </div>

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
