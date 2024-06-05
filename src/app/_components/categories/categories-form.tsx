"use client";

import { Stack, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  type ProductCategory,
  type CategoriesInput,
} from "~/server/api/routers/category";
import { ProductCategoriesInput } from "./category-input";
import { api } from "~/trpc/react";
import { LoaderDisplay } from "../loader";

export function CategoriesForm({
  initialValues = null,
  submitForm,
}: {
  initialValues?: ProductCategory[] | null;
  submitForm: (object: CategoriesInput) => void;
}) {
  const processedValues: CategoriesInput | null = initialValues
    ? {
        categories: initialValues?.map((category) => ({
          name: category.name,
          description: category.description ?? undefined,
          statement: category.statement ?? undefined,
          items: category.items.map((item) => ({
            label: item.label,
            product: item.productId,
          })),
          children: category.children.map((child) => ({
            name: child.name,
            description: child.description ?? undefined,
            statement: category.statement ?? undefined,
            children: [],
            items: child.items.map((item) => ({
              label: item.label,
              product: item.productId,
            })),
          })),
        })),
      }
    : null;

  const form = useForm<CategoriesInput>({
    mode: "uncontrolled",
    initialValues: processedValues ?? {
      categories: [],
    },
    validate: {},
  });

  const productsRes = api.product.getAll.useQuery();

  if (!productsRes.data) {
    return <LoaderDisplay />;
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
