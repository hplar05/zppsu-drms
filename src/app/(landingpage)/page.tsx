import { Main } from "@/components/craft";
import Hero from "./_components/hero";
import Feature from "./_components/features";
import FAQ from "./_components/faqs";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import About from "./_components/about";
import MoreAbout from "./_components/moreabout";
import ContactUs from "./_components/contact";

export default function Page() {
  return (
    <div>
      <Navbar />
      <Main>
        <Hero />
        <About />
        <MoreAbout />
        <Feature />
        <FAQ />
        <ContactUs />
      </Main>
      <Footer />
    </div>
  );
}
