"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Button, Group, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { ProductCardsGrid } from "../_components/products/product-cards-grid";

export default function Products() {
  return (
    <Shell
      page={
        <Stack>
          <Group justify="space-between">
            <Title order={1}>GovTech Products</Title>
            <Button
              component={Link}
              href={navLinks.createProducts.link}
              leftSection={<IconPlus />}
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
