import { ProductsTable } from "~/app/_components/admin/product-table";
import { Suspense } from "react";
import { api } from "~/trpc/server";
import { LoaderShell } from "~/app/_components/loader";

export default async function Admin() {
  return (
    <Suspense fallback={<LoaderShell />}>
      {api.product
        .getAll()
        .then((products) =>
          products ? <ProductsTable products={products} /> : null,
        )}
    </Suspense>
  );
}
