import Navbar from "@/components/website/Navbar";
import Hero from "@/components/website/Hero";
import Footer from "@/components/website/Footer";
import Categories from "@/components/website/CategorySection";
import FeaturedProducts from "@/components/website/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Categories/>
      <FeaturedProducts />

      </main>

      <Footer />
    </>
  );
}