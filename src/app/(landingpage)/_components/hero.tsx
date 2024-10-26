import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Camera } from "lucide-react";
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.jpg";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";

const Hero = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Section id="home" className="border-b bg-header-img bg-fixed bg-cover">
      <Container className="flex flex-col items-center text-center">
        <Image
          src={Logo}
          width={172}
          height={52}
          alt="Company Logo"
          className="mb-6 dark:invert md:mb-8 max-md:hidden"
        />
        <h1 className="!mb-0 max-md:text-[2rem] text-white font-semibold">
          <Balancer>Zamboanga Peninsula Polytechnic State University</Balancer>
        </h1>
        <h3 className="text-gray-200 max-md:text-[0.5rem] text-justify">
          <Balancer>
            Zamboanga Peninsula Polytechnic State University is dedicated to
            empowering individuals through knowledge, diversity, and positive
            global impact.
          </Balancer>
        </h3>
        <div className="not-prose flex gap-2 md:mt-12">
          <Button className="bg-[#800000]" asChild>
            <Link href={session?.user ? "/student/dashboard" : "/login"}>
              Get Started -{">"}
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
