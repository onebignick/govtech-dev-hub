"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title } from "@mantine/core";
import { ProductForm } from "~/app/_components/products/product-form";
import { type Product } from "~/server/api/routers/product";
import titleClasses from "~/styles/title.module.css";
import { api } from "~/trpc/react";

export default function EditProduct({ product }: { product: Product }) {
  const utils = api.useUtils();
  const editProductMutation = api.product.update.useMutation({
    onSuccess() {
      utils.product.invalidate().catch((error) => console.log(error));
    },
  });

  return (
    <Shell
      backLink={navLinks.manageProducts}
      page={
        <Stack>
          <Title order={1} c="white" className={titleClasses.titleUnderline}>
            Edit Product
          </Title>
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
