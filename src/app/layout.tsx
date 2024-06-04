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
        fontSize: "3em",
      },
      h2: {
        fontWeight: "800",
        fontSize: "2.5em",
      },
      h3: {
        fontWeight: "800",
        fontSize: "2em",
      },
      h4: {
        fontWeight: "800",
        fontSize: "1.5em",
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
