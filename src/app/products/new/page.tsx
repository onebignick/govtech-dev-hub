"use client";

import Shell, { navLinks } from "@frontend/_components/shell";
import { Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ProductForm } from "~/app/_components/products/product-form";
import { api } from "~/trpc/react";

export default function CreateNewProduct() {
  const router = useRouter();
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
            submitForm={(values) => {
              console.log(values);
              createProductMutation.mutate(values, {
                onError: (error) => console.log(error),
                onSuccess: () => router.push(navLinks.products!.link),
              });
            }}
          />
        </Stack>
      }
    />
  );
}
