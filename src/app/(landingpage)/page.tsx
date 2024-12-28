import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import About from "./_components/about";
import Features from "./_components/features";
import FAQ from "./_components/faqs";
import ContactUs from "./_components/contact";
import Footer from "./_components/footer";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Features />
        <FAQ />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
