import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@uploadthing/react/styles.css";
import "@mantine/dropzone/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <TRPCReactProvider>
            <MantineProvider>{children}</MantineProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
