import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "~/trpc/react";
import { Raleway } from "next/font/google";

const font = Raleway({ subsets: ["latin"] });

const theme = createTheme({
  fontFamily: font.style.fontFamily,
  headings: {
    sizes: {
      h1: {
        fontWeight: "800",
        fontSize: "2.5rem",
      },
      h2: {
        fontWeight: "800",
        fontSize: "2rem",
      },
      h3: {
        fontWeight: "800",
        fontSize: "1.5rem",
      },
      h4: {
        fontWeight: "800",
        fontSize: "1rem",
      },
    },
  },
});

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
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body>
          <TRPCReactProvider>
            <MantineProvider theme={theme} defaultColorScheme="dark">
              {children}
            </MantineProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
