import AppShell from "@/components/layout/AppShell";
import NotFoundContent from "@/components/layout/NotFoundContent";

// Unknown URLs land here. The page can't tell which language was intended,
// so it falls back to English.
export default function NotFound() {
  return (
    <AppShell initialLocale="en">
      <NotFoundContent />
    </AppShell>
  );
}
