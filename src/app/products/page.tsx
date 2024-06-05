import Shell from "@frontend/_components/shell";
import { ProductsList } from "../_components/products/products-list";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { LoaderShell } from "../_components/loader";

export const metadata = {
  title: "GovTech Products",
};

export default async function Products() {
  return (
    <Suspense fallback={<LoaderShell />}>
      {api.product.getAll().then((products) => (
        <Shell page={<ProductsList products={products} />} />
      ))}
    </Suspense>
  );
}
