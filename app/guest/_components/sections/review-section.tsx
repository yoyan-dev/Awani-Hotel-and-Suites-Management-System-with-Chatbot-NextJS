"use client";

import React from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Maria Gonzales",
    role: "Business Traveler",
    review:
      "The suites were clean, modern, and incredibly comfortable. The staff went above and beyond to make my stay memorable.",
    rating: 5,
    avatar: "/guests/maria.jpg",
  },
  {
    name: "John Carter",
    role: "Family Trip",
    review:
      "Perfect location, wonderful amenities, and the kids absolutely loved the pool. A truly relaxing getaway!",
    rating: 4,
    avatar: "/guests/john.jpg",
  },
  {
    name: "Aiko Tanaka",
    role: "Couple Getaway",
    review:
      "Such a romantic and peaceful place. The spa services were heavenly and the views were breathtaking.",
    rating: 5,
    avatar: "/guests/aiko.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Guest Reviews
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 mb-12 text-lg"
        >
          Hear from guests who experienced comfort, luxury, and world-class
          hospitality.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <Card
                className="
                  shadow-xl rounded-2xl 
                  bg-white/70 dark:bg-gray-900/70 
                  backdrop-blur-xl 
                  border border-white/20 dark:border-gray-800
                  hover:shadow-2xl transition-all duration-300
                "
              >
                <CardBody className="flex flex-col items-center text-center p-8">
                  <Avatar
                    src={review.avatar}
                    size="lg"
                    className="mb-4 shadow-md ring-2 ring-primary/30"
                  />

                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {review.name}
                  </h4>
                  <p className="text-gray-500 text-sm mb-3">{review.role}</p>

                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-sm"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    “{review.review}”
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
