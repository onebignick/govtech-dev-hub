"use client";

import { AppShell, Box, Burger, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NextImage from "next/image";
import { Image } from "@mantine/core";
import logo from "/public/logo.webp";
import type { ReactNode } from "react";
import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import classes from "~/styles/shell.module.css";

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
  guides: { title: "Catalog", link: "/guides", inNavbar: true },
  products: { title: "Products", link: "/products", inNavbar: true },
  createProducts: {
    title: "Create Product",
    link: "/products/new",
    inNavbar: false,
  },
  blog: { title: "Blog", link: "/blog", inNavbar: true },
  createBlogPost: {
    title: "Create Blog Post",
    link: "/blog/new",
    inNavbar: false,
  },
  ideas: { title: "Ideas", link: "/ideas", inNavbar: true },
  createIdea: {
    title: "Create Idea",
    link: "/ideas/new",
    inNavbar: false,
  },
};

export default function Shell({ page, backLink }: ShellProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell padding="md">
      <AppShell.Main className={classes.wrapper}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group
          className={classes.navlinks}
          align="center"
          justify="space-between"
          h="8vh"
          mr="md"
        >
          <Link href="/">
            <Image
              component={NextImage}
              src={logo}
              h="6vh"
              w="auto"
              fit="contain"
              alt="Logo"
              pl="md"
            />
          </Link>
          <Group>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              {Array.from(Object.values(navLinks))
                .filter((link) => link.inNavbar)
                .map((link) => (
                  <Link href={link.link} key={link.title}>
                    <Button
                      classNames={{ root: classes.navlinks }}
                      variant="transparent"
                    >
                      {link.title}
                    </Button>
                  </Link>
                ))}
              <UserButton />
            </SignedIn>
          </Group>
        </Group>
        <Box mx="auto" mt="xl" w="70vw">
          {backLink && (
            <Button
              leftSection={<IconChevronLeft />}
              component={Link}
              href={backLink.link}
              size="compact-md"
              variant="light"
            >
              Back
            </Button>
          )}
          {page}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
