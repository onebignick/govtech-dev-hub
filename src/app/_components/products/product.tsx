"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Button, Group, Stack } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { LoaderShell } from "~/app/_components/loader";
import { ProductPage } from "~/app/_components/products/product-page";
import { Product } from "~/server/api/routers/product";
import { api } from "~/trpc/react";

export default function ProductComponent({ product }: { product: Product }) {
  return (
    <Shell
      page={
        <Stack>
          <Group>
            <Button
              variant="light"
              leftSection={<IconChevronLeft />}
              component={Link}
              href={navLinks.products!.link}
              size="compact-md"
            >
              Back to All Products
            </Button>
            <Button
              variant="light"
              leftSection={<IconChevronLeft />}
              component={Link}
              href={navLinks.guides!.link}
              size="compact-md"
            >
              Back to Product Catalog
            </Button>
          </Group>
          {product && <ProductPage product={product} />}
        </Stack>
      }
    />
  );
}
