"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title } from "@mantine/core";
import { LoaderShell } from "~/app/_components/loader";
import { ProductForm } from "~/app/_components/products/product-form";
import { api } from "~/trpc/react";

export default function AdminEditProduct({
  params,
}: {
  params: { productID: string };
}) {
  const utils = api.useUtils();
  const productRes = api.product.get.useQuery({
    id: params.productID,
  });

  const editProductMutation = api.product.update.useMutation({
    onSuccess() {
      utils.product.invalidate().catch((error) => console.log(error));
    },
  });

  if (!productRes.data) {
    return <LoaderShell />;
  }

  const product = productRes.data;

  return (
    <Shell
      backLink={navLinks.manageProducts}
      page={
        <Stack>
          <Title order={1}>Edit Product</Title>
          <ProductForm
            initialValues={product}
            submitForm={(values) => {
              editProductMutation.mutate(values);
            }}
          />
        </Stack>
      }
    />
  );
}
