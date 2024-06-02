"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack } from "@mantine/core";
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
      backLink={navLinks.products}
      page={<Stack>{product && <ProductPage product={product} />}</Stack>}
    />
  );
}
