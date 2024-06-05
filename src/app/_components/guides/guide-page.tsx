"use client";

import { Button, Group, Stack, Title } from "@mantine/core";
import { CategoryDisplay } from "../categories/category-display";
import Link from "next/link";
import Shell, { navLinks } from "../shell";
import classes from "~/styles/title.module.css";
import { type ProductCategory } from "~/server/api/routers/category";

export function GuideDisplay({
  categories,
}: {
  categories: ProductCategory[];
}) {
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
          <CategoryDisplay categories={categories} />
        </Stack>
      }
    />
  );
}
