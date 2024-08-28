import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Camera } from "lucide-react";
import { Section, Container } from "@/src/components/craft";
import { Button } from "@/src/components/ui/button";
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
        <h3 className="text-muted-foreground max-md:text-[1rem] max-md:text-justify">
          <Balancer>
            Unlock your academic potential by requesting your personalized
            subject form today. Whether youre looking to explore new subjects or
            need guidance on your current studies, were here to help you make
            the best choices for your educational journey.
          </Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild>
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
