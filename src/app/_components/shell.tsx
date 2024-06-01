"use client";

import { AppShell, Box, Burger, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextImage from "next/image";
import { Image } from "@mantine/core";
import logo from "public/logo.webp";
import type { ReactNode } from "react";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface ShellProps {
  page: ReactNode;
  backLink?: Link;
}

interface Link {
  title: string;
  link: string;
  inNavbar?: boolean;
}

export const navLinks: Record<string, Link> = {
  admin: { title: "Admin", link: "/admin", inNavbar: true },
  manageProducts: {
    title: "Manage Products",
    link: "/admin/products",
    inNavbar: false,
  },
  products: { title: "Products", link: "/products", inNavbar: true },
  createProducts: {
    title: "Create Product",
    link: "/products/new",
    inNavbar: false,
  },
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
          <Group>
            <SignedOut>
              <SignInButton/>
            </SignedOut>
            <SignedIn>
              {Array.from(Object.values(navLinks))
                .filter((link) => link.inNavbar)
                .map((link) => (
                  <Link href={link.link} key={link.title}>
                    <Button variant="subtle">{link.title}</Button>
                  </Link>
                ))}
                <UserButton/>
            </SignedIn>
          </Group>
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
