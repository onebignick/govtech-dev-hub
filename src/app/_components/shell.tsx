"use client";

import { AppShell, Box, Burger, Center, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Head from "next/head";
import NextImage from "next/image";
import { Image } from "@mantine/core";
import logo from "public/logo.webp";
import type { ReactNode } from "react";

interface ShellProps {
  page: ReactNode;
}

export default function Shell({ page }: ShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: "8vh" }} padding="md">
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Stack align="flex-start" h="8vh" justify="center">
          <Image
            component={NextImage}
            src={logo}
            h="4vh"
            w="auto"
            fit="contain"
            alt="Logo"
            pl="md"
          />
        </Stack>
      </AppShell.Header>
      <AppShell.Main bg="var(--mantine-color-body)">
        <Box mx="auto" w="70vw">
          {page}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
