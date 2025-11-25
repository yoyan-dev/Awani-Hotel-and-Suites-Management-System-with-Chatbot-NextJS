export function formatDate(date: any) {
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return formatted;
}
