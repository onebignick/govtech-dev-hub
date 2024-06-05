"use client";

import { Stack, Title } from "@mantine/core";
import Shell, { navLinks } from "@frontend/_components/shell";
import titleClasses from "~/styles/title.module.css";
import { api } from "~/trpc/react";
import { CategoriesForm } from "~/app/_components/categories/categories-form";
import { type ProductCategory } from "~/server/api/routers/category";

export default function CategoriesManagement({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const utils = api.useUtils();

  const createCategoriesMutation = api.category.create.useMutation({
    onSuccess() {
      utils.category.invalidate().catch((error) => console.log(error));
    },
  });
  return (
    <Shell
      backLink={navLinks.admin}
      page={
        <Stack>
          <Title order={1} c="white" className={titleClasses.titleUnderline}>
            Categories Management
          </Title>
          <CategoriesForm
            initialValues={categories}
            submitForm={(values) => {
              createCategoriesMutation.mutate(values, {
                onError: (error) => console.log(error),
              });
            }}
          />
        </Stack>
      }
    />
  );
}
