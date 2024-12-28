import { Section, Container } from "@/components/craft";
import { FileText, Clock, UserCheck, Shield } from "lucide-react";

const features = [
  {
    icon: <FileText className="h-10 w-10 text-[#7D0303]" />,
    title: "Easy Document Requests",
    description:
      "Submit and track your document requests with just a few clicks.",
  },
  {
    icon: <Clock className="h-10 w-10 text-[#7D0303]" />,
    title: "Quick Processing",
    description:
      "Experience faster turnaround times for your document requests.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-[#7D0303]" />,
    title: "User-Friendly Interface",
    description:
      "Navigate our system with ease, designed with students in mind.",
  },
  {
    icon: <Shield className="h-10 w-10 text-[#7D0303]" />,
    title: "Secure and Confidential",
    description:
      "Your personal information and documents are protected with top-notch security.",
  },
];

const Features = () => {
  return (
    <Section
      id="features"
      className="bg-gray-100 dark:bg-gray-800  min-h-screen flex justify-center items-center"
    >
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Features;
