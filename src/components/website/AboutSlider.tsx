"use client";

import { useEffect, useState } from "react";
import { Wrench, ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/about.png", "/about2.png"];

export default function AboutSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-orange-500/10 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10">

        <img
          src={images[currentImage]}
          alt="Workshop"
          className="h-[420px] w-full object-cover transition-all duration-700 hover:scale-105 sm:h-[500px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-orange-500 transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-orange-500 transition"
        >
          <ChevronRight size={22} />
        </button>

        {/* Badge */}
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
              <Wrench className="text-white" />
            </div>

            <div>
              <p className="font-bold text-white">
                Professional Craftsmanship
              </p>

              <p className="text-sm text-gray-300">
                Quality you can trust
              </p>
            </div>

          </div>

        </div>

        {/* Dots */}
        <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? "w-8 bg-orange-500"
                  : "w-2.5 bg-white/60"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}