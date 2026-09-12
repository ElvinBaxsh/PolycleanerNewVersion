/**
 * A short handle for one submission, e.g. PC-260912-4821.
 *
 * Shown on the confirmation and written into the email (subject and body),
 * so the two ends of the same enquiry can be tied together: a buyer can
 * quote it in a follow-up, and sales can search the mailbox for it. It is
 * deliberately not presented as a ticket number — nothing stores it yet,
 * it only travels with the message.
 *
 * Generated in the submit handler (never during render), so the random part
 * can't differ between the server-rendered and hydrated markup.
 */
export function newReference(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const day = `${String(now.getFullYear()).slice(2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `PC-${day}-${suffix}`;
}
