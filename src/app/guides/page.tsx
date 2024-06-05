"use client";

import classes from "~/styles/title.module.css";
import Shell, { navLinks } from "@frontend/_components/shell";
import { Button, Group, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { GuideDisplay } from "../_components/guides/guide-page";

export default function Guides() {
  return (
    <Shell
      page={
        <Stack>
          <Group justify="space-between" mb="md">
            <Title order={1} c="white" className={classes.titleUnderline}>
              Product Catalog
            </Title>
            <Button
              component={Link}
              href={navLinks.products!.link}
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              See All Products
            </Button>
          </Group>
          <GuideDisplay />
        </Stack>
      }
    />
  );
}
