"use client";

import { useAuth } from "@clerk/nextjs";
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

  const auth = useAuth();
  return (
    <Shell
      backLink={navLinks.products}
      page={
        <Stack>
          <Title order={1}>Create New</Title>
          <ProductForm
            submitForm={(values) =>
              createProductMutation.mutate(
                {
                  ...values,
                  admins: auth.userId ? [auth.userId] : [],
                },
                {
                  onError: (error) => console.log(error),
                  onSuccess: () => router.push(navLinks.products!.link),
                },
              )
            }
          />
        </Stack>
      }
    />
  );
}