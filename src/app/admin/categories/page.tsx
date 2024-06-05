"use client";

import { Stack, Title } from "@mantine/core";
import Shell, { navLinks } from "@frontend/_components/shell";
import titleClasses from "~/styles/title.module.css";
import { api } from "~/trpc/react";
import { CategoriesForm } from "~/app/_components/categories/categories-form";
import { LoaderShell } from "~/app/_components/loader";

export default function GuideAdmin() {
  const utils = api.useUtils();
  const categoriesRes = api.category.getAll.useQuery();
  const createCategoriesMutation = api.category.create.useMutation({
    onSuccess() {
      utils.category.invalidate().catch((error) => console.log(error));
    },
  });

  if (!categoriesRes.data) {
    return <LoaderShell />;
  }

  const categories = categoriesRes.data;

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
