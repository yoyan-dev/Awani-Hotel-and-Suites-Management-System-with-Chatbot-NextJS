export function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (file) {
    return URL.createObjectURL(file);
  }
  return null;
}
