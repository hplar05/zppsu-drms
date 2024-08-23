import { Main } from "@/src/components/craft";
import Hero from "./_components/hero";
import Feature from "./_components/features";
import FAQ from "./_components/faqs";
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
