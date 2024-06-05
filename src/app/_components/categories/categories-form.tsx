"use client";

import { Stack, Button, Group, TextInput, Textarea } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { type CategoriesInput } from "~/server/api/routers/category";
import { ProductCategoriesInput } from "./category-input";
import { api } from "~/trpc/react";

export function CategoriesForm({
  initialValues = null,
  submitForm,
}: {
  initialValues?: CategoriesInput | null;
  submitForm: (object: CategoriesInput) => void;
}) {
  const form = useForm<CategoriesInput>({
    mode: "uncontrolled",
    initialValues: initialValues ?? {
      categories: [],
    },
    validate: {},
  });

  const productsRes = api.product.getAll.useQuery();

  if (!productsRes.data) {
    return <div>Loading...</div>;
  }

  const products = productsRes.data;

  return (
    <form onSubmit={form.onSubmit((values) => submitForm(values))}>
      <Stack>
        <ProductCategoriesInput form={form} products={products} />
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 90 }}
          >
            {initialValues ? "Save" : "Submit"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
