import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.jpg";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";

const Hero = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Section
      id="home"
      className="bg-header-img relative bg-fixed bg-cover min-h-[80vh] flex justify-center items-center before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#7D0303]/60 before:-transparent before:z-0"
    >
      <Container className="text-center relative z-10">
        <Image
          src={Logo}
          width={120}
          height={120}
          alt="ZPPSU Logo"
          className="mx-auto mb-8 dark:invert"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <Balancer>Document Request Management System</Balancer>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-200 mb-8">
          <Balancer>
            of Zamboanga Peninsula Polytechnic State University{" "}
          </Balancer>
        </h2>
        <Button
          className="bg-[#7D0303] text-white hover:bg-[#5D0202] text-lg px-8 py-3"
          asChild
        >
          <Link href={session?.user ? "/student/dashboard" : "/login"}>
            Get Started
          </Link>
        </Button>
      </Container>
    </Section>
  );
};

export default Hero;
