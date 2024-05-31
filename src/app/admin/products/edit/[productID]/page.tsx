"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title } from "@mantine/core";
import { ProductForm } from "~/app/_components/products/product-form";
import { api } from "~/trpc/react";

export default function AdminEditProduct({
  params,
}: {
  params: { productID: string };
}) {
  const utils = api.useUtils();
  const product = api.product.getProduct.useQuery({
    id: parseInt(params.productID),
  });
  const editProductMutation = api.product.update.useMutation({
    onSuccess() {
      utils.product.invalidate().catch((error) => console.log(error));
    },
  });

  if (!product.data) {
    return <div>Loading...</div>;
  }

  return (
    <Shell
      backLink={navLinks.manageProducts}
      page={
        <Stack>
          <Title order={1}>Edit Product</Title>
          <ProductForm
            initialValues={product.data[0]}
            submitForm={(values) => {
              editProductMutation.mutate({
                ...values,
                type: "product",
              });
            }}
          />
        </Stack>
      }
    />
  );
}
