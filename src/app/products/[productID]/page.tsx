"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Button, Group, Stack } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { ProductPage } from "~/app/_components/products/product-page";
import { api } from "~/trpc/react";

export default function AdminEditProduct({
  params,
}: {
  params: { productID: string };
}) {
  const productRes = api.product.get.useQuery({
    id: params.productID,
  });

  if (!productRes.data) {
    return <div>Loading...</div>;
  }

  const product = productRes.data;

  return (
    <Shell
      page={
        <Stack>
          <Group>
            <Button
              leftSection={<IconChevronLeft />}
              component={Link}
              href={navLinks.products!.link}
              size="compact-md"
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
            >
              Back to All Products
            </Button>
            <Button
              leftSection={<IconChevronLeft />}
              component={Link}
              href={navLinks.guides!.link}
              size="compact-md"
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 90 }}
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
