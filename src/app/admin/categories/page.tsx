import { LoaderShell } from "~/app/_components/loader";
import { Suspense } from "react";
import { api } from "~/trpc/server";
import CategoriesManagement from "~/app/_components/categories/categories-management";

export default function GuideAdmin() {
  return (
    <Suspense fallback={<LoaderShell />}>
      {api.category
        .getAll()
        .then((categories) =>
          categories ? <CategoriesManagement categories={categories} /> : null,
        )}
    </Suspense>
  );
}
