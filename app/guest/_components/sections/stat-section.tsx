import { Card, CardBody } from "@heroui/react";

const stats = [
  { value: "98%", label: "Positive Feedback" },
  { value: "15+", label: "Years of Expertise" },
  { value: "25k+", label: "Happy Clients" },
];

export default function Stats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto py-12">
      {stats.map((s, i) => (
        <Card key={i}>
          <CardBody className="text-center">
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-gray-500">{s.label}</p>
          </CardBody>
        </Card>
      ))}
    </section>
  );
}
