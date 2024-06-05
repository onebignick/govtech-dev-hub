"use client";

import { Stack, Group, Title, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { navLinks } from "../shell";
import { ProductCardsGrid } from "./product-cards-grid";
import classes from "~/styles/title.module.css";
import { type ProductSummary } from "~/server/api/routers/product";

export function ProductsList({ products }: { products: ProductSummary[] }) {
  return (
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
      <ProductCardsGrid products={products} />
    </Stack>
  );
}
