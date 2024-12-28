import Image from "next/image";
import Link from "next/link";
import { Section, Container } from "@/components/craft";
import Logo from "@/public/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-[#7D0303] text-white">
      <Section>
        <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={Logo}
                alt="ZPPSU Logo"
                width={40}
                height={40}
                className="invert"
              />
              <span className="text-lg font-bold">ZPPSU DRMS</span>
            </Link>
            <p className="text-sm">
              Zamboanga Peninsula Polytechnic State University Document Request
              Management System
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#home">Home</Link>
              </li>
              <li>
                <Link href="#about">About Us</Link>
              </li>
              <li>
                <Link href="#features">Features</Link>
              </li>
              <li>
                <Link href="#faq">FAQ</Link>
              </li>
              <li>
                <Link href="#contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>W375+4J8, R.T.Lim St, Zamboanga, Zamboanga del Sur</p>
            <p>(062) 993 5096</p>
            <p>admin@zppsu-drms.online</p>
          </div>
        </Container>
      </Section>
      <div className="bg-[#5D0202] py-4 text-center text-sm">
        <Container>
          © {new Date().getFullYear()} ZPPSU DRMS. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
