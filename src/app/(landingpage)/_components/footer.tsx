import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { Section, Container } from "@/components/craft";
import Logo from "@/public/logo.jpg";

export default function Footer() {
  return (
    <footer className="not-prose border-t bg-[#800000f1]">
      <Section>
        <Container className="grid gap-6">
          <div className="grid gap-6">
            <Link href="/">
              <Image
                src={Logo}
                alt="Logo"
                width={60}
                height={10}
                className="transition-all hover:opacity-75 dark:invert"
              ></Image>
            </Link>
            <p className="text-white">
              <Balancer>
                Zamboanga Peninsula Polytechnic State University
              </Balancer>
            </p>
            <div className="mb-6 flex flex-col gap-4 text-sm underline underline-offset-4 md:mb-0 md:flex-row text-gray-200">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-service">Terms of Service</Link>
              <Link href="/cookie-policy">Cookie Policy</Link>
            </div>
            <p className="text-gray-200">
              © <a href="https://github.com/hplar05">ZPPSU</a>. All rights
              reserved. 2024-present.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
