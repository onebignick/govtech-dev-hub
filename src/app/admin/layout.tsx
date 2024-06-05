import { type ReactNode } from "react";

export const metadata = {
  title: "Admin Panel",
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  return children;
}
