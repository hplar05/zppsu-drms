import { Main } from "@/components/craft";
import Hero from "./_components/hero";
import Feature from "./_components/features";
import FAQ from "./_components/faqs";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <Main>
        <Hero />
        {/* <Feature />
        <FAQ /> */}
      </Main>
      <Footer />
    </div>
  );
}
