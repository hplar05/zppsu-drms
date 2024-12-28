import Image from "next/image";
import { Section, Container } from "@/components/craft";
import Placeholder from "@/public/placeholder.jpg";

const About = () => {
  return (
    <Section
      id="about"
      className="min-h-screen flex justify-center items-center"
    >
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          About ZPPSU
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Provide effective and efficient services through advanced
              technological studies and researches for the empowerment of human
              resources.
            </p>
            <Image
              src={Placeholder}
              alt="ZPPSU Campus"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              ZPPSU as the leading provider of globally competitive human
              resources.
            </p>
            <Image
              src={Placeholder}
              alt="ZPPSU Students"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default About;
