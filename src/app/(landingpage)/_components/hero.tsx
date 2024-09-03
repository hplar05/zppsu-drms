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
    <Section id="home" className="border-b">
      <Container className="flex flex-col items-center text-center">
        <Image
          src={Logo}
          width={172}
          height={72}
          alt="Company Logo"
          className="not-prose mb-6 dark:invert md:mb-8 max-md:hidden"
        />
        <h1 className="!mb-0 max-md:text-[2rem]">
          <Balancer>Zamboanga Peninsula Polytechnic State University</Balancer>
        </h1>
        <h3 className="text-muted-foreground max-md:text-[1rem] ">
          <Balancer>
            Effortlessly Request Essential Documents Like Diplomas, TORs, Grade
            Slips, Form 137, and More Through Our Registration Portal
          </Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
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
