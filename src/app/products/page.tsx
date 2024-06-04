"use client";

import classes from "~/styles/title.module.css";
import Shell, { navLinks } from "@frontend/_components/shell";
import { Button, Group, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { ProductCardsGrid } from "@frontend/_components/products/product-cards-grid";

export default function Products() {
  return (
    <Shell
      page={
        <Stack>
          <Group justify="space-between" mb="md">
            <Title order={1} c="white" className={classes.titleUnderline}>
              GovTech Products
            </Title>
            <Button
              component={Link}
              href={navLinks.createProducts!.link}
              leftSection={<IconPlus />}
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              Create
            </Button>
          </Group>
          <ProductCardsGrid />
        </Stack>
      }
    />
  );
}
