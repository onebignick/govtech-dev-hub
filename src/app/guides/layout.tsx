import { type ReactNode } from "react";

export const metadata = {
  title: "Product Catalog",
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  return children;
}
