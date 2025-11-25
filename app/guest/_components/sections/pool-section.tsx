"use client";
import { Card, CardBody, Image, Button } from "@heroui/react";

export default function HotelPoolSection() {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative">
          <Image
            src="/pool.png"
            alt="Hotel Pool"
            className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-lg shadow">
            <p className="text-sm text-gray-700">
              {/* Open daily ● (7:00 AM - 9:00 PM) */}
            </p>
          </div>
        </div>

        <div>
          <p className="text-tiny uppercase tracking-wide text-primary font-bold">
            Relax & Refresh
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Dive into Our Infinity Pool
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Unwind by our luxurious infinity pool. Whether you want to take a
            refreshing dip, lounge under the sun, or enjoy cocktails by the
            water, our poolside is the perfect spot to relax and recharge during
            your stay.
          </p>

          <ul className="space-y-2 mb-6 text-gray-700">
            <li>✔ Temperature-controlled water</li>
            <li>✔ Poolside bar & dining service</li>
            <li>✔ Lounge chairs & private cabanas</li>
            <li>✔ Lifeguard on duty</li>
          </ul>

          <Button color="primary" radius="full" size="lg">
            Book Your Stay
          </Button>
        </div>
      </div>
    </section>
  );
}
