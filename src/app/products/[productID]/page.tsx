"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title } from "@mantine/core";
import { ProductForm } from "~/app/_components/products/product-form";
import { ProductPage } from "~/app/_components/products/product-page";
import { api } from "~/trpc/react";

export default function AdminEditProduct({
  params,
}: {
  params: { productID: string };
}) {
  const utils = api.useUtils();
  const productRes = api.product.getProduct.useQuery({
    id: params.productID,
  });
  const editProductMutation = api.product.update.useMutation({
    onSuccess() {
      utils.product.invalidate().catch((error) => console.log(error));
    },
  });

  if (!productRes.data) {
    return <div>Loading...</div>;
  }

  const product = productRes.data[0];

  return (
    <Shell
      backLink={navLinks.products}
      page={<Stack>{product && <ProductPage product={product} />}</Stack>}
    />
  );
}
