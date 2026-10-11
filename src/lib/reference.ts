// A short reference for one submission, e.g. PC-260912-4821. Shown on the
// confirmation and written into the email. Generated on submit, never during
// render.
export function newReference(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const day = `${String(now.getFullYear()).slice(2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `PC-${day}-${suffix}`;
}
