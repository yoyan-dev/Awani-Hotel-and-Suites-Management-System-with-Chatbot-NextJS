"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { TrendingUp, BedDouble, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col gap-10">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 text-lg">
          Overview of hotel performance and real-time metrics
        </p>
      </div>

      {/* STAT CARDS — Inspired by Dribbble clean minimal UI */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-3xl shadow-lg p-4 bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
          <CardBody>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <h2 className="text-4xl font-bold mt-1">128</h2>
              </div>
              <TrendingUp className="text-gray-400" size={40} />
            </div>
          </CardBody>
        </Card>

        <Card className="rounded-3xl shadow-lg p-4 bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
          <CardBody>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Occupied Rooms</p>
                <h2 className="text-4xl font-bold mt-1">74%</h2>
              </div>
              <BedDouble className="text-gray-400" size={40} />
            </div>
          </CardBody>
        </Card>

        <Card className="rounded-3xl shadow-lg p-4 bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
          <CardBody>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Active Guests</p>
                <h2 className="text-4xl font-bold mt-1">42</h2>
              </div>
              <Users className="text-gray-400" size={40} />
            </div>
          </CardBody>
        </Card>

        <Card className="rounded-3xl shadow-lg p-4 bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
          <CardBody>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <h2 className="text-4xl font-bold mt-1">₱189,000</h2>
              </div>
              <DollarSign className="text-gray-400" size={40} />
            </div>
          </CardBody>
        </Card>
      </div> */}

      {/* RECENT BOOKINGS — Clean curved cards inspired by Dribbble */}
      {/* <Card className="rounded-3xl shadow-xl bg-white border border-gray-100 p-6">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-4">
            {[
              { name: "Juan Dela Cruz", date: "Jan 12 - Jan 15" },
              { name: "Maria Santos", date: "Jan 14 - Jan 18" },
              { name: "John Smith", date: "Jan 10 - Jan 12" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-5 bg-gray-50 rounded-2xl border border-gray-200 flex justify-between hover:bg-gray-100 transition duration-200"
              >
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card> */}
    </div>
  );
}
