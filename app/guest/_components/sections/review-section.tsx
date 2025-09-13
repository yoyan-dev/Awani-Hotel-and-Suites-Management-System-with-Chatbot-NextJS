"use client";

import React from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Maria Gonzales",
    role: "Business Traveler",
    review:
      "The suites were clean, modern, and very comfortable. The staff went above and beyond to make my stay enjoyable!",
    rating: 5,
    avatar: "/guests/maria.jpg",
  },
  {
    name: "John Carter",
    role: "Family Trip",
    review:
      "Perfect location, amazing pool, and delicious breakfast. My kids loved every minute of our stay.",
    rating: 4,
    avatar: "/guests/john.jpg",
  },
  {
    name: "Aiko Tanaka",
    role: "Couple Getaway",
    review:
      "Romantic ambiance with breathtaking views. The spa treatments were heavenly. Highly recommend!",
    rating: 5,
    avatar: "/guests/aiko.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white dark:bg-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 ">Guest Reviews</h2>
        <p className="text-gray-600 mb-12">
          What our happy guests are saying about their stay.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <Card
              key={idx}
              className="shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <CardBody className="flex flex-col items-center text-center p-6 dark:bg-gray-900">
                <Avatar src={review.avatar} size="lg" className="mb-4" />
                <h4 className="font-semibold text-lg">{review.name}</h4>
                <p className="text-gray-500 text-sm mb-2">{review.role}</p>

                <div className="flex justify-center mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-600 italic">"{review.review}"</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
