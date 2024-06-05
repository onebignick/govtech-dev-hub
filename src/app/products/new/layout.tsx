import { type ReactNode } from "react";

export const metadata = {
  title: "New Product",
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  return children;
}
