import { Main } from "@/src/components/Craft";
import Hero from "./_components/Hero";
import Feature from "./_components/Features";
import FAQ from "./_components/Faqs";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export default function Page() {
  return (
    <Main>
      <Navbar />
      <Hero />
      <Feature />
      <FAQ />
      <Footer />
    </Main>
  );
}
