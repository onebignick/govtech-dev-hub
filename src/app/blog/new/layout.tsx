import { type ReactNode } from "react";

export const metadata = {
  title: "New Blog Post",
};

export default function ClientLayout({ children }: { children: ReactNode }) {
  return children;
}
