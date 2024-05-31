"use client";

import {
  AppShell,
  Box,
  Burger,
  Button,
  Center,
  Group,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Head from "next/head";
import NextImage from "next/image";
import { Image } from "@mantine/core";
import logo from "public/logo.webp";
import type { ReactNode } from "react";
import Link from "next/link";
import { subtle } from "crypto";
import { IconChevronLeft } from "@tabler/icons-react";

interface ShellProps {
  page: ReactNode;
  backLink?: Link;
}

interface Link {
  title: string;
  link: string;
}

export const navLinks = {
  admin: { title: "Admin", link: "/admin" },
};

export default function Shell({ page, backLink }: ShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: "8vh" }} padding="md">
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group align="center" justify="space-between" h="8vh" mr="md">
          <Link href="/">
            <Image
              component={NextImage}
              src={logo}
              h="4vh"
              w="auto"
              fit="contain"
              alt="Logo"
              pl="md"
            />
          </Link>
          {Array.from(Object.values(navLinks)).map((link) => (
            <Link href={link.link} key={link.title}>
              <Button variant="subtle">{link.title}</Button>
            </Link>
          ))}
        </Group>
      </AppShell.Header>
      <AppShell.Main bg="var(--mantine-color-body)">
        {backLink && (
          <Button
            leftSection={<IconChevronLeft />}
            component={Link}
            variant="subtle"
            href={backLink.link}
            size="compact-md"
          >
            Back
          </Button>
        )}
        <Box mx="auto" w="70vw">
          {page}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
