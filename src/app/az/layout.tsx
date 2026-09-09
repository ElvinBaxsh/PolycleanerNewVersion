import type { ReactNode } from "react";
import AppShell from "@/components/layout/AppShell";

export default function AzLayout({ children }: { children: ReactNode }) {
  return <AppShell initialLocale="az">{children}</AppShell>;
}
