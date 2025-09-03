import { Button } from "@heroui/react";

export default function HeroBanner() {
  return (
    <section
      className="h-[500px] flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/hotel-bg.jpg')" }}
    >
      <p className="text-yellow-400 text-lg mb-2">⭐⭐⭐⭐⭐ 1.0</p>
      <h1 className="text-4xl font-bold">
        Welcome to Our Luxurious Hotel & Resort
      </h1>
      <p className="text-gray-200 mt-2">Modern Luxury and Timeless Elegance</p>
      <Button className="mt-6" color="primary">
        Book Apartments
      </Button>
    </section>
  );
}
