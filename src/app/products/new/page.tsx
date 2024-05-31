"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title } from "@mantine/core";
import { ProductForm } from "~/app/_components/products/product-form";
import { api } from "~/trpc/react";

export default function CreateNewProduct() {
  const utils = api.useUtils();
  const createProductMutation = api.product.create.useMutation({
    onSuccess() {
      utils.product.invalidate().catch((error) => console.log(error));
    },
  });

  return (
    <Shell
      backLink={navLinks.products}
      page={
        <Stack>
          <Title order={1}>Create New</Title>
          <ProductForm
            submitForm={(values) =>
              createProductMutation.mutate({
                ...values,
                type: "product",
              })
            }
          />
        </Stack>
      }
    />
  );
}
